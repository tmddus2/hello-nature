
package com.hellonature;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import android.util.Log;
import android.content.Context;
import android.widget.Toast;

// native module을 reactPackage에 추가하는 코드

public class RNNativeToastLibraryModule extends ReactContextBaseJavaModule {

  private final ReactApplicationContext reactContext;

  public RNNativeToastLibraryModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNNativeToastLibrary";
  }

  @ReactMethod
  public void show(String text) {
    //callback.invoke("Call Me!!!!");

    Context context = getReactApplicationContext();
    Toast.makeText(context, text, Toast.LENGTH_LONG).show();
    Log.d("CalendarModule", "Create event called with name: " + text);

  }
}