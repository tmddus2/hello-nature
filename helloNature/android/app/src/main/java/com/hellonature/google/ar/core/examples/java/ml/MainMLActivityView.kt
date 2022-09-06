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

import android.opengl.GLSurfaceView
import android.view.View
import androidx.appcompat.widget.AppCompatButton
import androidx.appcompat.widget.SwitchCompat
import androidx.lifecycle.DefaultLifecycleObserver
import androidx.lifecycle.LifecycleOwner
import com.hellonature.google.ar.core.examples.java.common.helpers.SnackbarHelper
import com.hellonature.google.ar.core.examples.java.common.samplerender.SampleRender
import com.hellonature.R
import java.util.ArrayList
import java.util.UUID
import androidx.recyclerview.widget.RecyclerView;
import java.util.Objects
import sun.jvm.hotspot.debugger.win32.coff.DebugVC50X86RegisterEnums.TAG
import com.google.cloud.dialogflow.v2.DetectIntentResponse;
import com.google.cloud.dialogflow.v2.QueryInput;
import com.google.cloud.dialogflow.v2.SessionName;
import com.google.cloud.dialogflow.v2.SessionsClient;
import com.google.cloud.dialogflow.v2.SessionsSettings;
import com.google.cloud.dialogflow.v2.TextInput;
import com.hellonature.google.ar.core.examples.java.helloar.BotReply;
import com.hellonature.google.ar.core.examples.java.helloar.Message;
import com.hellonature.google.ar.core.examples.java.helloar.SendMessageInBg;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.ServiceAccountCredentials;
import android.widget.Toast;
import android.util.Log;
import java.util.List;
import com.google.common.collect.Lists;
import com.google.api.gax.core.FixedCredentialsProvider;
import android.widget.EditText;
import android.widget.ImageButton;

import java.io.InputStream
import jdk.internal.joptsimple.internal.Messages.message










/**
 * Wraps [R.layout.activity_main] and controls lifecycle operations for [GLSurfaceView].
 */
class MainMLActivityView(val activity: MainMLActivity, renderer: AppRenderer) : DefaultLifecycleObserver, BotReply {
  val root = View.inflate(activity, R.layout.activity_main, null)
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

  var chatView = findViewById(R.id.linearLayout3) // 보낸 메시지
  var messageList: List<String> = java.util.List<String>()
  var btnSend: ImageButton? = null
  var editMessage: EditText? = null
  var chatView: LinearLayout? = null
  var resMessage:TextView? = null

  chatView = findViewById(R.id.linearLayout3) // 보낸 메시지
  resMessage = findViewById(R.id.textView)  // 받은 메시지
  editMessage = findViewById(R.id.editMessage) // 메시지 작성
  btnSend = findViewById(R.id.Button_send)  // 보내기 버튼

  //dialogFlow
  var sessionsClient: SessionsClient? =null
  var sessionName: SessionName? =null
  val uuid: String = UUID.randomUUID().toString()

  // 보낸 메시지 리스트
  btnSend.setOnClickListener(new View.OnClickListener() {
    override void onClick(View view) {
      var message = editMessage.getText().toString();
      if (!message.isEmpty()) {
        messageList.add(message);
        editMessage.setText("");
        sendMessageToBot(message);
        Objects.requireNonNull(chatView.getAdapter()).notifyDataSetChanged(); // 새로고침
        Objects.requireNonNull(chatView.getLayoutManager())
                .scrollToPosition(messageList.size - 1);
      } else {
        //Toast.makeText(TAG, "메시지를 입력해주세요!", Toast.LENGTH_SHORT).show();
      }
    }
  });

  setUpBot();

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

  private fun setUpBot() {
    try {
      //val context:Context
      val stream: java.io.InputStream = activity.getResources().openRawResource(R.raw.plantchatbot_credentials)
      val credentials: GoogleCredentials = GoogleCredentials.fromStream(stream)
              .createScoped(Lists.newArrayList("https://www.googleapis.com/auth/cloud-platform"))
      val projectId: String = (credentials as ServiceAccountCredentials).getProjectId()
      val settingsBuilder: SessionsSettings.Builder = SessionsSettings.newBuilder()
      val sessionsSettings: SessionsSettings = settingsBuilder.setCredentialsProvider(
              FixedCredentialsProvider.create(credentials)).build()
      sessionsClient = SessionsClient.create(sessionsSettings)
      sessionName = SessionName.of(projectId, uuid)
      Log.d(TAG, "projectId : $projectId")
    } catch (e: java.lang.Exception) {
      Log.d(TAG, "setUpBot: " + e.message)
    }
  }

  fun sendMessageToBot(message: String) {
    val input: QueryInput = QueryInput.newBuilder()
            .setText(TextInput.newBuilder().setText(message).setLanguageCode("ko")).build()
    SendMessageInBg(this, sessionName, sessionsClient, input).execute()
  }

  override fun callback(returnResponse: DetectIntentResponse?) {
    if (returnResponse != null) {
      val botReply: String = returnResponse.getQueryResult().getFulfillmentText()
      if (!botReply.isEmpty()) {
        resMessage = botReply
        //chatAdapter.notifyDataSetChanged()
        //Objects.requireNonNull(chatView.getLayoutManager()).scrollToPosition(messageList.size - 1)
      } else {
        //Toast.makeText(this, "something went wrong", Toast.LENGTH_SHORT).show()
      }
    } else {
      //Toast.makeText(this, "failed to connect!", Toast.LENGTH_SHORT).show()
    }
  }
}