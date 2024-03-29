
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
import android.content.Intent;
import androidx.appcompat.app.AppCompatActivity;
import android.net.Uri;
import android.app.Activity;
// import com.hellonature.HelloArActivity;
import com.hellonature.google.ar.core.examples.java.ml.MainMLActivity;

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
  public void show(String plantName, String plantID, String UserToken) {
    //callback.invoke("Call Me!!!!");
/*

    Context context = getReactApplicationContext();
    Toast.makeText(context, text, Toast.LENGTH_LONG).show();
    Log.d("CalendarModule1", "Create event called with name: " + text);

    Intent intent = new Intent(getActivity(MainActivity), HelloArActivity.class);
    Log.d("12321312312321312", "Create event called with name: " + text);

    context.startActivity(intent);
*/
    Log.d("CalendarModule1", "Create event called with name: " + plantName + plantID+ UserToken);

    // Context from reactContext
    Context context = reactContext;
    Activity activity = getCurrentActivity();

    // Intent set from packageName
    Intent intent = new Intent(context, MainMLActivity.class); // HelloArActivity
    intent.putExtra("plantName", plantName);
    intent.putExtra("plantID", plantID);
    intent.putExtra("UserToken", UserToken);

    activity.startActivity(intent); // plant ID 넘겨주기 

  }
}