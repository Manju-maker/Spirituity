package com.spirituity;

import com.facebook.react.ReactActivity;

import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

import org.devio.rn.splashscreen.SplashScreen; 

import android.os.Bundle;

public class MainActivity extends ReactActivity {

   
  @Override
  protected String getMainComponentName() {
    return "Spirituity";
  }
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
   return new ReactActivityDelegate(this, getMainComponentName()) {
      @Override
     protected ReactRootView createRootView() {
       return new RNGestureHandlerEnabledRootView(MainActivity.this);
     }
    };
  }

   @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
    }
}
