/*
package com.hellonature.google.ar.core.examples.java.helloar

import android.app.Activity
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.bae.dialogflowbot.R
import com.bae.dialogflowbot.models.Message

class ChatAdapter(messageList: List<Message>, activity: Activity) : RecyclerView.Adapter<ChatAdapter.MyViewHolder?>() {
    private val messageList: List<Message>
    private val activity: Activity
    @NonNull
    fun onCreateViewHolder(@NonNull parent: ViewGroup?, viewType: Int): MyViewHolder {
        val view: View = LayoutInflater.from(activity).inflate(R.layout.adapter_message_one, parent, false)
        return MyViewHolder(view)
    }

    fun onBindViewHolder(@NonNull holder: MyViewHolder, position: Int) {
        val message: String = messageList[position].getMessage()
        val isReceived: Boolean = messageList[position].getIsReceived()
        if (isReceived) {
            holder.messageReceive.setVisibility(View.VISIBLE)
            holder.messageSend.setVisibility(View.GONE)
            holder.messageReceive.setText(message)
        } else {
            holder.messageSend.setVisibility(View.VISIBLE)
            holder.messageReceive.setVisibility(View.GONE)
            holder.messageSend.setText(message)
        }
    }

    val itemCount: Int
        get() = messageList.size

    internal class MyViewHolder(@NonNull itemView: View) : RecyclerView.ViewHolder(itemView) {
        var messageSend: TextView
        var messageReceive: TextView

        init {
            messageSend = itemView.findViewById(R.id.message_send)
            messageReceive = itemView.findViewById(R.id.message_receive)
        }
    }

    init {
        this.messageList = messageList
        this.activity = activity
    }
}*/
