package com.mavnav;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

public class FirebaseAuthModule extends ReactContextBaseJavaModule {

    private FirebaseAuth mAuth;

    public FirebaseAuthModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mAuth = FirebaseAuth.getInstance();
    }

    @Override
    public String getName() {
        return "FirebaseAuthModule";
    }

    @ReactMethod
    public void loginUser(String email, String password, final Callback successCallback, final Callback errorCallback) {
        mAuth.signInWithEmailAndPassword(email, password)
                .addOnCompleteListener(task -> {
                    if (task.isSuccessful()) {
                        FirebaseUser user = mAuth.getCurrentUser();
                        if (user != null) {
                            successCallback.invoke(user.getEmail());
                        }
                    } else {
                        errorCallback.invoke(task.getException().getMessage());
                    }
                });
    }

    @ReactMethod
    public void registerUser(String email, String password, final Callback successCallback, final Callback errorCallback) {
        mAuth.createUserWithEmailAndPassword(email, password)
                .addOnCompleteListener(task -> {
                    if (task.isSuccessful()) {
                        FirebaseUser user = mAuth.getCurrentUser();
                        if (user != null) {
                            successCallback.invoke(user.getEmail());
                        }
                    } else {
                        errorCallback.invoke(task.getException().getMessage());
                    }
                });
    }
}