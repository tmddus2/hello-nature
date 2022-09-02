package com.example.myapplication;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    private RecyclerView mRecyclerView;
    private messageRecyclerAdapter mRecyclerAdapter;
    private ArrayList<userMessage> mUserMessage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mRecyclerView = (RecyclerView) findViewById(R.id.recyclerView);

        /* initiate adapter */
        mRecyclerAdapter = new messageRecyclerAdapter();

        /* initiate recyclerview */
        mRecyclerView.setAdapter(mRecyclerAdapter);
        mRecyclerView.setLayoutManager(new LinearLayoutManager(this));

        mUserMessage = new ArrayList<>();
        for(int i=1;i<=10;i++){
            if(i%2==0)
                mUserMessage.add(new userMessage(i+"번째 보낸 메세지"));
            else
                mUserMessage.add(new userMessage(i+"번째 상태메시지"));

        }
        mRecyclerAdapter.setUserMassageList(mUserMessage);
    }
}