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

import android.annotation.SuppressLint
import android.opengl.GLSurfaceView
import android.util.Log
import android.view.View
import android.widget.*
import androidx.appcompat.widget.AppCompatButton
import androidx.appcompat.widget.SwitchCompat
import androidx.constraintlayout.widget.ConstraintLayout
import androidx.lifecycle.DefaultLifecycleObserver
import androidx.lifecycle.LifecycleOwner
import androidx.recyclerview.widget.RecyclerView
import com.google.api.gax.core.FixedCredentialsProvider
import com.google.auth.oauth2.GoogleCredentials
import com.google.auth.oauth2.ServiceAccountCredentials
import com.google.cloud.dialogflow.v2.*
import com.google.common.collect.Lists
import com.hellonature.R
import com.hellonature.google.ar.core.examples.java.common.helpers.SnackbarHelper
import com.hellonature.google.ar.core.examples.java.common.samplerender.SampleRender
import com.hellonature.google.ar.core.examples.java.helloar.BotReply
import com.hellonature.google.ar.core.examples.java.helloar.ChatAdapter
import com.hellonature.google.ar.core.examples.java.helloar.SendMessageInBg
import java.util.*
import java.io.InputStream
import java.lang.Exception
import com.tomergoldst.tooltips.ToolTip;
import com.tomergoldst.tooltips.ToolTipsManager;

/**
 * Wraps [R.layout.activity_main] and controls lifecycle operations for [GLSurfaceView].
 */
class MainMLActivityView(val activity: MainMLActivity, renderer: AppRenderer) : DefaultLifecycleObserver, BotReply {
  val root = View.inflate(activity, R.layout.activity_main, null)
  val linearlayout = root.findViewById<ConstraintLayout>(R.id.coordinatorLayout)

  val surfaceView = root.findViewById<GLSurfaceView>(R.id.surfaceview).apply {
    SampleRender(this, renderer, activity.assets)
  }
  val useCloudMlSwitch = root.findViewById<SwitchCompat>(R.id.useCloudMlSwitch)
  val scanButton = root.findViewById<AppCompatButton>(R.id.scanButton)
  val resetButton = root.findViewById<AppCompatButton>(R.id.clearButton)
  val snackbarHelper = SnackbarHelper().apply {
    setParentView(root.findViewById(R.id.coordinatorLayout))
    setMaxLines(6)
  }
  //val closeButton = root.findViewById<View>(R.id.closeButton)
  var TAG = "MainMLActivityView"

  val chatView = root.findViewById<RecyclerView>(R.id.recyclerView) // 보낸 메시지
  val messageList: ArrayList<String> = ArrayList()
  val btnSend = root.findViewById<Button>(R.id.Button_send)
  val btnHeart = root.findViewById<Button>(R.id.Button_heart)

  val editMessage = root.findViewById<EditText>(R.id.editMessage)
  var resMessage = root.findViewById<TextView>(R.id.textView)
  var chatAdapter: ChatAdapter? = null

  //dialogFlow
  lateinit var sessionsClient: SessionsClient
  lateinit var sessionName: SessionName
  val uuid: String = UUID.randomUUID().toString()

  var toolTipsManager: ToolTipsManager? = null
  var count = 0


  override fun onResume(owner: LifecycleOwner) {
    surfaceView.onResume()
  }

  override fun onPause(owner: LifecycleOwner) {
    surfaceView.onPause()
  }

  fun post(action: Runnable) = root.post(action)

  /**
   * Toggles the scan button depending on if scanning is in progress.
   */
  fun setScanningActive(active: Boolean) = when(active) {
    true -> {
      scanButton.isEnabled = false
      scanButton.setText(activity.getString(R.string.scan_busy))
    }
    false -> {
      scanButton.isEnabled = true
      scanButton.setText(activity.getString(R.string.scan_available))
    }
  }

  private fun hideSnackbar() = activity.view.snackbarHelper.hide(activity)

  @SuppressLint("NotifyDataSetChanged")
  fun setSendingActive(){
      var message:String = editMessage.getText().toString();
      if (message.isNotEmpty()) {
        messageList.add(message);
        editMessage.setText("");
        sendMessageToBot(message);
        Objects.requireNonNull(chatView.adapter).notifyDataSetChanged(); // 새로고침
        Objects.requireNonNull(chatView.layoutManager)?.scrollToPosition(messageList.size - 1);
        Log.d(TAG, "잘 보내짐")
      } else {
        activity.view.snackbarHelper.showMessage(activity, "메시지를 입력해주세요")
      }
  }

  fun setHeartActive(){ // plant heart reaction for a seconds
    count++
    Log.d(TAG, "pressed count: $count")
  }

  fun setUpBot() {
    try {
      //val context:Context
      val stream: InputStream = activity.resources.openRawResource(R.raw.plantchatbot1)
      val credentials: GoogleCredentials = GoogleCredentials.fromStream(stream)
              .createScoped(Lists.newArrayList("https://www.googleapis.com/auth/cloud-platform"))
      val projectId: String = (credentials as ServiceAccountCredentials).projectId
      val settingsBuilder: SessionsSettings.Builder = SessionsSettings.newBuilder()
      val sessionsSettings: SessionsSettings = settingsBuilder.setCredentialsProvider(
              FixedCredentialsProvider.create(credentials)).build()
      sessionsClient = SessionsClient.create(sessionsSettings)
      sessionName = SessionName.of(projectId, uuid)
      Log.d(TAG, "projectId : $projectId")

    } catch (e: Exception) {
      Log.d(TAG, "setUpBot: " + e.message)
    }
  }

  fun sendMessageToBot(message: String) {
    val input: QueryInput = QueryInput.newBuilder()
            .setText(TextInput.newBuilder().setText(message).setLanguageCode("ko")).build()
    SendMessageInBg(this, sessionName, sessionsClient, input).execute()
  }

  @SuppressLint("NotifyDataSetChanged")
  override fun callback(returnResponse: DetectIntentResponse?) {
    Log.d(TAG, "야호???$returnResponse")

    if (returnResponse != null) {
      val botReply: String = returnResponse.getQueryResult().getFulfillmentText()
      if (!botReply.isEmpty()) {
        Log.d(TAG, "야홍야ㅑㅑ향ㅎ ++ ???$botReply")
        resMessage.text = botReply
        chatAdapter?.notifyDataSetChanged()
        Objects.requireNonNull(chatView.getLayoutManager())?.scrollToPosition(messageList.size - 1)
      } else {
        Log.d(TAG, "뀨뀨")

        Toast.makeText(activity, "something went wrong", Toast.LENGTH_SHORT).show()
      }
    } else {
      Log.d(TAG, "뀨뀨2")

      Toast.makeText(activity, "failed to connect!", Toast.LENGTH_SHORT).show()
    }
  }
}