package com.mavnav.ImageProcessing;


import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import org.opencv.core.Mat;
import org.opencv.core.Point;
import org.opencv.core.Scalar;
import org.opencv.core.CvType;
import org.opencv.imgproc.Imgproc;
import org.opencv.android.Utils;

import java.util.Queue;
import java.util.LinkedList;

public class ImageProcessorModule extends ReactContextBaseJavaModule {
    public ImageProcessorModule(ReactApplicationContext reactContext) {
        super(reactContext);
        // Load OpenCV library
        System.loadLibrary("opencv_java4");
    }

    @Override
    public String getName() {
        return "ImageProcessor";
    }

    @ReactMethod
    public void processImage(String imagePath, int startX, int startY, int endX, int endY, Promise promise) {
        try {
            // Load image as Bitmap
            Bitmap bitmap = BitmapFactory.decodeFile(imagePath);
            Mat imageMat = new Mat();
            Utils.bitmapToMat(bitmap, imageMat);

            // Convert to grayscale and threshold to binary (if necessary)
            Imgproc.cvtColor(imageMat, imageMat, Imgproc.COLOR_BGR2GRAY);
            Imgproc.threshold(imageMat, imageMat, 128, 255, Imgproc.THRESH_BINARY);

            // Implement A* search to find the path from (startX, startY) to (endX, endY)
            Queue<Point> path = aStarSearch(imageMat, new Point(startX, startY), new Point(endX, endY));

            // Draw the path on the image
            for (Point p : path) {
                Imgproc.circle(imageMat, p, 2, new Scalar(0, 0, 255), -1); // Draw red dots for the path
            }

            // Convert Mat back to Bitmap
            Bitmap processedBitmap = Bitmap.createBitmap(imageMat.cols(), imageMat.rows(), Bitmap.Config.ARGB_8888);
            Utils.matToBitmap(imageMat, processedBitmap);

            // Save or pass back the processed image
            String processedImagePath = saveBitmapToFile(processedBitmap); // Custom function to save Bitmap
            promise.resolve(processedImagePath); // Return the path to React Native
        } catch (Exception e) {
            promise.reject("Image processing failed", e);
        }
    }

    // Example A* search implementation
    private Queue<Point> aStarSearch(Mat image, Point start, Point end) {
        Queue<Point> path = new LinkedList<>();
        // Add your A* algorithm implementation here
        // Populate `path` with Points from `start` to `end`

        return path;
    }

    private String saveBitmapToFile(Bitmap bitmap) {
        // Implement file saving logic here
        // Return the file path
        return "/path/to/processed_image.png";
    }
}
