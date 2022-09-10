package com.hellonature.google.ar.core.examples.java.common

import android.content.Context
import android.util.AttributeSet
import androidx.recyclerview.widget.RecyclerView

class CustomRecyclerView(context: Context, attrs: AttributeSet?) : RecyclerView(context, attrs) {

    //하단 Alpha 제거
    override fun getBottomFadingEdgeStrength(): Float {
        return 0f
    }
}