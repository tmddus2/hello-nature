package com.hellonature.google.ar.core.examples.java.helloar

import com.google.cloud.dialogflow.v2.DetectIntentResponse

interface BotReply {
    fun callback(returnResponse: DetectIntentResponse?)
}