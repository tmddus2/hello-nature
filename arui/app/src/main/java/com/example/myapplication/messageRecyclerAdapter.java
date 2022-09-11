package com.example.myapplication;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;

public class messageRecyclerAdapter extends RecyclerView.Adapter<messageRecyclerAdapter.ViewHolder> {

    private ArrayList<userMessage> mUserMessageList;

    @NonNull
    @Override
    public messageRecyclerAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.chat_list, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull messageRecyclerAdapter.ViewHolder holder, int position) {
        holder.onBind(mUserMessageList.get(position));
    }

    public void setUserMassageList(ArrayList<userMessage> list){
        this.mUserMessageList = list;
        notifyDataSetChanged();
    }

    @Override
    public int getItemCount() {
        return mUserMessageList.size();
    }

    class ViewHolder extends RecyclerView.ViewHolder {
        TextView message;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            message = (TextView) itemView.findViewById(R.id.userMessage);
        }

        void onBind(userMessage item){
            message.setText(item.getMessage());
        }
    }
}
