package com.hellonature.google.ar.core.examples.java.helloar


import android.os.AsyncTask
import android.util.Log
import com.hellonature.google.ar.core.examples.java.helloar.BotReply;
import com.google.cloud.dialogflow.v2.DetectIntentRequest
import com.google.cloud.dialogflow.v2.DetectIntentResponse
import com.google.cloud.dialogflow.v2.QueryInput
import com.google.cloud.dialogflow.v2.SessionName
import com.google.cloud.dialogflow.v2.SessionsClient


class SendMessageInBg(botReply: BotReply, session: SessionName, sessionsClient: SessionsClient,
                      queryInput: QueryInput) : AsyncTask<Void?, Void?, DetectIntentResponse?>() {
    val session: SessionName
    val sessionsClient: SessionsClient
    val queryInput: QueryInput
    val TAG = "async"
    val botReply: BotReply
    override fun doInBackground(vararg voids: Void?): DetectIntentResponse? {
        try {
            val detectIntentRequest: DetectIntentRequest = DetectIntentRequest.newBuilder()
                    .setSession(session.toString())
                    .setQueryInput(queryInput)
                    .build()
            return sessionsClient.detectIntent(detectIntentRequest)
        } catch (e: java.lang.Exception) {
            Log.d(TAG, "doInBackground: " + e.message)
            e.printStackTrace()
        }
        return null
    }

    override fun onPostExecute(response: DetectIntentResponse?) {
        //handle return response here
        botReply.callback(response)
    }

    init {
        this.botReply = botReply
        this.session = session
        this.sessionsClient = sessionsClient
        this.queryInput = queryInput
    }
}