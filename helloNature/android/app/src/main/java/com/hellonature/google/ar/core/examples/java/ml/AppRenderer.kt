/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.hellonature.google.ar.core.examples.java.ml

import android.opengl.Matrix
import android.os.Build
import android.util.Log
import android.view.Gravity
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.lifecycle.DefaultLifecycleObserver
import androidx.lifecycle.LifecycleOwner
import com.google.ar.core.Anchor
import com.google.ar.core.Coordinates2d
import com.google.ar.core.Frame
import com.google.ar.core.TrackingState
import com.google.ar.core.exceptions.CameraNotAvailableException
import com.google.ar.core.exceptions.NotYetAvailableException
import com.google.ar.sceneform.ux.ArFragment
import com.hellonature.R
import com.hellonature.google.ar.core.examples.java.common.helpers.DisplayRotationHelper
import com.hellonature.google.ar.core.examples.java.common.samplerender.SampleRender
import com.hellonature.google.ar.core.examples.java.common.samplerender.arcore.BackgroundRenderer
import com.hellonature.google.ar.core.examples.java.helloar.ChatAdapter
import com.hellonature.google.ar.core.examples.java.ml.classification.DetectedObjectResult
import com.hellonature.google.ar.core.examples.java.ml.classification.GoogleCloudVisionDetector
import com.hellonature.google.ar.core.examples.java.ml.classification.MLKitObjectDetector
import com.hellonature.google.ar.core.examples.java.ml.classification.ObjectDetector
import com.hellonature.google.ar.core.examples.java.ml.render.LabelRender
import com.hellonature.google.ar.core.examples.java.ml.render.PointCloudRender
import com.tomergoldst.tooltips.ToolTipsManager
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.MainScope
import kotlinx.coroutines.launch
import java.util.*


/**
 * Renders the HelloAR application into using our example Renderer.
 */
class AppRenderer(val activity: MainMLActivity) : DefaultLifecycleObserver, SampleRender.Renderer, CoroutineScope by MainScope() {
  companion object {
    val TAG = "HelloArRenderer"
  }

  lateinit var view: MainMLActivityView

  val displayRotationHelper = DisplayRotationHelper(activity)
  lateinit var backgroundRenderer: BackgroundRenderer
  val pointCloudRender = PointCloudRender()
  val labelRenderer = LabelRender()

  val viewMatrix = FloatArray(16)
  val projectionMatrix = FloatArray(16)
  val viewProjectionMatrix = FloatArray(16)

  val arLabeledAnchors = Collections.synchronizedList(mutableListOf<ARLabeledAnchor>())
  var scanButtonWasPressed = false
  var plantWasDetected = false


  val mlKitAnalyzer = MLKitObjectDetector(activity)
  val gcpAnalyzer = GoogleCloudVisionDetector(activity)

  var currentAnalyzer: ObjectDetector = gcpAnalyzer

  override fun onResume(owner: LifecycleOwner) {
    displayRotationHelper.onResume()
  }

  override fun onPause(owner: LifecycleOwner) {
    displayRotationHelper.onPause()
  }

  @RequiresApi(Build.VERSION_CODES.N)
  fun bindView(view: MainMLActivityView) {
    this.view = view

    view.setUpBot()

    // initial message (for making the scroll starts from bottom)
    view.messageList.add("  ");
    view.messageList.add("  ");

    // 보낸 메시지 리스트
    view.chatAdapter = ChatAdapter(view.messageList, activity)
    view.chatView.setAdapter(view.chatAdapter)

    view.btnSend.setOnClickListener{
      view.setSendingActive()
    }

    view.btnHeart.setOnClickListener{
      if(plantWasDetected) {
        view.setHeartActive()
        view.toast = Toast.makeText(activity, "반려식물의 ❤ 지수가 올라갔어요.", Toast.LENGTH_SHORT)
        view.toast.setGravity(Gravity.CENTER, 0, 0)
        view.toast.show()
      }
    }

    Log.d(TAG, "안녕안녕")

    // AR
    // view.fragment = activity.supportFragmentManager.findFragmentById(R.id.sceneform_fragment) as ArFragment

    //  tooltips
    view.toolTipsManager = ToolTipsManager();
    view.toolTipsManager!!.findAndDismiss(view.scanButton)
    // create tooltip
    view.showTooltip_init()


    view.scanButton.setOnClickListener {
      // frame.acquireCameraImage is dependent on an ARCore Frame, which is only available in onDrawFrame.
      // Use a boolean and check its state in onDrawFrame to interact with the camera image.
      scanButtonWasPressed = true
      view.setScanningActive(true)
      hideSnackbar()
      view.toolTipsManager!!.dismissAll();
    }

    view.useCloudMlSwitch.setOnCheckedChangeListener { _, isChecked ->
      currentAnalyzer = if (isChecked) gcpAnalyzer else mlKitAnalyzer
    }

    val gcpConfigured = gcpAnalyzer.credentials != null
    view.useCloudMlSwitch.isChecked = gcpConfigured
    view.useCloudMlSwitch.isEnabled = gcpConfigured
    currentAnalyzer = if (gcpConfigured) gcpAnalyzer else mlKitAnalyzer

    if (!gcpConfigured) {
      showSnackbar("Google Cloud Vision isn't configured (see README). The Cloud ML switch will be disabled.")
    }

    view.resetButton.setOnClickListener {
      arLabeledAnchors.clear()
      view.resetButton.isEnabled = false
      hideSnackbar()
      plantWasDetected=false
    }
  }

  override fun onSurfaceCreated(render: SampleRender) {
    backgroundRenderer = BackgroundRenderer(render).apply {
      setUseDepthVisualization(render, false)
    }
    pointCloudRender.onSurfaceCreated(render)
    labelRenderer.onSurfaceCreated(render)
  }

  override fun onSurfaceChanged(render: SampleRender?, width: Int, height: Int) {
    displayRotationHelper.onSurfaceChanged(width, height)
  }

  var objectResults: List<DetectedObjectResult>? = null

  fun onDrawHeart(render: SampleRender){
//
//    if(view.Heartanchor==null) return
//
//    val session = activity.arCoreSessionHelper.sessionCache ?: return
//    session.setCameraTextureNames(intArrayOf(backgroundRenderer.cameraColorTexture.textureId))
//
//    val frame = try {
//      session.update()
//    } catch (e: CameraNotAvailableException) {
//      Log.e(TAG, "Camera not available during onDrawFrame", e)
//      showSnackbar("Camera not available. Try restarting the app.")
//      return
//    }
//
//    val camera = frame.camera
//    camera.getViewMatrix(viewMatrix, 0)
//    camera.getProjectionMatrix(projectionMatrix, 0, 0.01f, 100.0f)
//
//    // Handle tracking failures.
//    if (camera.trackingState != TrackingState.TRACKING) {
//      return
//    }


//    labelRenderer.draw(
//      render,
//      viewProjectionMatrix,
//      view.Heartanchor!!.pose,
//      camera.pose,
//      "❤️"
//    )
  }

  override fun onDrawFrame(render: SampleRender) {
    val session = activity.arCoreSessionHelper.sessionCache ?: return
    session.setCameraTextureNames(intArrayOf(backgroundRenderer.cameraColorTexture.textureId))

    // Notify ARCore session that the view size changed so that the perspective matrix and
    // the video background can be properly adjusted.
    displayRotationHelper.updateSessionIfNeeded(session)

    val frame = try {
      session.update()
    } catch (e: CameraNotAvailableException) {
      Log.e(TAG, "Camera not available during onDrawFrame", e)
      showSnackbar("Camera not available. Try restarting the app.")
      return
    }

    backgroundRenderer.updateDisplayGeometry(frame)
    backgroundRenderer.drawBackground(render)

    // Get camera and projection matrices.
    val camera = frame.camera
    camera.getViewMatrix(viewMatrix, 0)
    camera.getProjectionMatrix(projectionMatrix, 0, 0.01f, 100.0f)
    Matrix.multiplyMM(viewProjectionMatrix, 0, projectionMatrix, 0, viewMatrix, 0)

    // Handle tracking failures.
    if (camera.trackingState != TrackingState.TRACKING) {
      return
    }

    // Draw point cloud.
    frame.acquirePointCloud().use { pointCloud ->
      pointCloudRender.drawPointCloud(render, pointCloud, viewProjectionMatrix)
    }

    // Frame.acquireCameraImage must be used on the GL thread.
    // Check if the button was pressed last frame to start processing the camera image.
    if (scanButtonWasPressed) {
      scanButtonWasPressed = false
      val cameraImage = frame.tryAcquireCameraImage()
      if (cameraImage != null) {
        // Call our ML model on an IO thread.
        launch(Dispatchers.IO) {
          val cameraId = session.cameraConfig.cameraId
          val imageRotation = displayRotationHelper.getCameraSensorToDisplayRotation(cameraId)
          objectResults = currentAnalyzer.analyze(cameraImage, imageRotation)
          cameraImage.close()
        }
      }
    }

    /** If results were completed this frame, create [Anchor]s from model results. */
    val objects = objectResults
    if (objects != null) {
      objectResults = null
      Log.i(TAG, "$currentAnalyzer got objects: $objects")
      val anchors = objects.mapNotNull { obj ->
        val (atX, atY) = obj.centerCoordinate
        Log.i(TAG, "디텍트"+ obj.label)
        if(obj.label != "Houseplant" && obj.label != "Flowerpot") return@mapNotNull null
        Log.i(TAG, "저장")
        if(obj.label == "Houseplant") {
          view.xCord = atX
          view.yCord = atY
        }
        val anchor = createAnchor(atX.toFloat(), atY.toFloat(), frame) ?: return@mapNotNull null
        Log.i(TAG, "->Created anchor ${anchor.pose} from hit test")
        ARLabeledAnchor(anchor, obj.label)
      }
      arLabeledAnchors.addAll(anchors)
      view.post {
        view.resetButton.isEnabled = arLabeledAnchors.isNotEmpty()
        view.setScanningActive(false)
        when {
          objects.isEmpty() && currentAnalyzer == mlKitAnalyzer && !mlKitAnalyzer.hasCustomModel() -> {
            showSnackbar("AR이 주변 환경을 잘 인식할 수 있게 기기를 움직여 식물을 찾아보세요.") /*"Default ML Kit classification model returned no results. " +
              "For better classification performance, see the README to configure a custom model."*/
            view.showTooltip()
          }
          objects.isEmpty() -> {
            showSnackbar("AR이 주변 환경을 잘 인식할 수 있게 기기를 움직여 식물을 찾아보세요.") // Classification model returned no results.
            view.showTooltip()
          }
          anchors.size != objects.size -> {
            showSnackbar("AR이 주변 환경을 잘 인식할 수 있게 기기를 움직여 식물을 찾아보세요.") /*"Objects were classified, but could not be attached to an anchor. " +
              "Try moving your device around to obtain a better understanding of the environment."*/
            view.showTooltip()
          }
        }
      }
    }
    //var count = 0;
    // Draw labels at their anchor position.
    for (arDetectedObject in arLabeledAnchors) {
      var label = ""
      val anchor = arDetectedObject.anchor
      if (anchor.trackingState != TrackingState.TRACKING) continue
      //if (arDetectedObject.label!="Flowerpot" && arDetectedObject.label!="Houseplant") continue
      Log.d("-라벨->", arDetectedObject.label)
      if(arDetectedObject.label == "Houseplant") {
        label = "\uD83D\uDC40"
        view.Heartanchor = arDetectedObject.anchor
        plantWasDetected=true}
      if(arDetectedObject.label == "Flowerpot") {
        label = "fejka" // 식물 이름
        plantWasDetected=true}
      //count++
      labelRenderer.draw(
        render,
        viewProjectionMatrix,
        anchor.pose,
        camera.pose,
        label
      )
    }
    //if(count==0) showSnackbar("반려식물을 찾지 못했어요. AR이 식물을 더 잘 찾을 수 있게 움직여보세요.")

  }

  /**
   * Utility method for [Frame.acquireCameraImage] that maps [NotYetAvailableException] to `null`.
   */
  fun Frame.tryAcquireCameraImage() = try {
    acquireCameraImage()
  } catch (e: NotYetAvailableException) {
    null
  } catch (e: Throwable) {
    throw e
  }

  private fun showSnackbar(message: String): Unit =
    activity.view.snackbarHelper.showMessage(activity, message)

  private fun hideSnackbar() = activity.view.snackbarHelper.hide(activity)

  /**
   * Temporary arrays to prevent allocations in [createAnchor].
   */
  private val convertFloats = FloatArray(4)
  private val convertFloatsOut = FloatArray(4)

  /** Create an anchor using (x, y) coordinates in the [Coordinates2d.IMAGE_PIXELS] coordinate space. */
  fun createAnchor(xImage: Float, yImage: Float, frame: Frame): Anchor? {
    // IMAGE_PIXELS -> VIEW
    convertFloats[0] = xImage
    convertFloats[1] = yImage
    frame.transformCoordinates2d(
      Coordinates2d.IMAGE_PIXELS,
      convertFloats,
      Coordinates2d.VIEW,
      convertFloatsOut
    )

    // Conduct a hit test using the VIEW coordinates
    val hits = frame.hitTest(convertFloatsOut[0], convertFloatsOut[1])
    val result = hits.getOrNull(0) ?: return null
    return result.trackable.createAnchor(result.hitPose)
  }
}

data class ARLabeledAnchor(val anchor: Anchor, val label: String)