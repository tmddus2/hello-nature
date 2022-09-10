package com.hellonature.google.ar.core.examples.java.helloar


import android.os.AsyncTask
import android.util.Log
import com.hellonature.google.ar.core.examples.java.helloar.BotReply;
import com.google.cloud.dialogflow.v2.DetectIntentRequest
import com.google.cloud.dialogflow.v2.DetectIntentResponse
import com.google.cloud.dialogflow.v2.QueryInput
import com.google.cloud.dialogflow.v2.SessionName
import com.google.cloud.dialogflow.v2.SessionsClient
import kotlinx.coroutines.*
import kotlin.coroutines.CoroutineContext


class SendMessageInBg(botReply: BotReply, session: SessionName, sessionsClient: SessionsClient,
                      queryInput: QueryInput) : CoroutineScope {
    private val session: SessionName
    private val sessionsClient: SessionsClient
    private val queryInput: QueryInput
    val TAG = "async"
    private val botReply: BotReply
    private var job: Job = Job()

    fun execute() = launch {
        Log.d(TAG, "야호~!!@?")

        val result = doInBackground() // runs in background thread without blocking the Main Thread
        onPostExecute(result)
    }

    override val coroutineContext: CoroutineContext
        get() = Dispatchers.Main + job // to run code in Main(UI) Thread

    private suspend fun doInBackground(vararg voids: Void?): DetectIntentResponse? = withContext(Dispatchers.IO) {
        try {
            val detectIntentRequest: DetectIntentRequest = DetectIntentRequest.newBuilder()
                    .setSession(session.toString())
                    .setQueryInput(queryInput)
                    .build()
            Log.d(TAG, "야호~!$detectIntentRequest")
            return@withContext sessionsClient.detectIntent(detectIntentRequest)
        } catch (e: java.lang.Exception) {
            e.printStackTrace()
            Log.d(TAG, "야호~!!")
        }
        return@withContext null
    }

    private fun onPostExecute(response: DetectIntentResponse?){
        //handle return response here
        Log.d(TAG, "야호!$response")
        botReply.callback(response)
        Log.d(TAG, "야호!!$response")

    }

    init {
        this.botReply = botReply
        this.session = session
        this.sessionsClient = sessionsClient
        this.queryInput = queryInput
    }
}

interface CoroutineResult {
    fun success(result: String)
    fun error(error: String)
}
