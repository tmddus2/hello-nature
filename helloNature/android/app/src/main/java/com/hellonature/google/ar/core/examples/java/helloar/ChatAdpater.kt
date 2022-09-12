
package com.hellonature.google.ar.core.examples.java.helloar

import android.app.Activity
import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.hellonature.R
import com.hellonature.google.ar.core.examples.java.ml.AppRenderer


class ChatAdapter(val messageList: List<String>, val activity:Context) :
    RecyclerView.Adapter<ChatAdapter.MyViewHolder?>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MyViewHolder {
        val view: View =
            LayoutInflater.from(activity).inflate(R.layout.adapter_message_one, parent, false)
        return MyViewHolder(view)
    }

    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
        val message = messageList[position]
        holder.messageSend.visibility = View.VISIBLE;
        holder.messageSend.text = message;
    }

    override fun getItemCount(): Int {
        return messageList.size
    }

    class MyViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        var messageSend: TextView
        init {
            messageSend = itemView.findViewById(R.id.message_send)
        }
    }
}