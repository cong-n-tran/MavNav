package com.mavnav.ImageProcessing;

import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.mavnav.PathFinder.PathFinderPackage;

import org.opencv.core.*;
import org.opencv.imgproc.Imgproc;
import org.opencv.android.Utils;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class ImageProcessorModule extends ReactContextBaseJavaModule {
    public ImageProcessorModule(ReactApplicationContext reactContext) {
        super(reactContext);
        System.loadLibrary("opencv_java4");
    }

    @Override
    public String getName() {
        return "ImageProcessor";
    }

    @ReactMethod
    public void processImage(String imagePath, int startX, int startY, int endX, int endY, Promise promise) {
        try {
            // Check if the image exists at the given path
            AssetManager assetManager = getReactApplicationContext().getAssets();
            InputStream inputStream = assetManager.open(imagePath);
            Bitmap bitmap = BitmapFactory.decodeStream(inputStream);

            if (bitmap == null) {
                promise.reject("ImageDecodeError", "Failed to decode image at: " + imagePath);
                return;
            }

            // Step 1: Convert Bitmap to Mat and preprocess
            Mat imageMat = new Mat();
            Utils.bitmapToMat(bitmap, imageMat);

            // Step 2: Convert image to grayscale
            Imgproc.cvtColor(imageMat, imageMat, Imgproc.COLOR_BGR2GRAY);

            // Step 3: Apply histogram equalization for better contrast
            Mat equalizedImage = new Mat();
            Imgproc.equalizeHist(imageMat, equalizedImage);

            // Step 4: Adjust contrast and brightness
            Mat adjustedImage = new Mat();
            equalizedImage.convertTo(adjustedImage, -1, 1.5, 20); // Enhance contrast and brightness

            // Step 5: Threshold the image to create a binary image
            Imgproc.threshold(adjustedImage, adjustedImage, 127, 255, Imgproc.THRESH_BINARY_INV);

            // Step 6: Apply morphological operations to clean up the binary image
            Mat kernel = Imgproc.getStructuringElement(Imgproc.MORPH_RECT, new Size(7, 7));
            Imgproc.erode(adjustedImage, adjustedImage, kernel);  // Remove noise
            Imgproc.dilate(adjustedImage, adjustedImage, kernel); // Close gaps

            // Step 7: Create a buffer zone using distance transform
            Mat distanceTransformed = new Mat();
            Imgproc.distanceTransform(adjustedImage, distanceTransformed, Imgproc.DIST_L2, 5);
            Core.normalize(distanceTransformed, distanceTransformed, 0, 255, Core.NORM_MINMAX);

            // Step 8: Convert distanceTransformed to binary (CV_8UC1)
            distanceTransformed.convertTo(adjustedImage, CvType.CV_8UC1);
            Imgproc.threshold(adjustedImage, adjustedImage, 50, 255, Imgproc.THRESH_BINARY_INV);

            // Step 9: Find and fill contours to ensure obstacles are enclosed
            List<MatOfPoint> contours = new ArrayList<>();
            Mat hierarchy = new Mat();
            Imgproc.findContours(adjustedImage.clone(), contours, hierarchy, Imgproc.RETR_TREE, Imgproc.CHAIN_APPROX_SIMPLE);
            for (MatOfPoint contour : contours) {
                Imgproc.drawContours(adjustedImage, contours, -1, new Scalar(0), Imgproc.FILLED);
            }

            // Perform pathfinding to generate the path from start to end
//            int x1 = 796;
//            int y1 = 387;

            int x2 = 942;
            int y2 = 661;
            PathFinderPackage pathfinder = new PathFinderPackage();
            ArrayList<Point> path = pathfinder.performAStar(imageMat, distanceTransformed, new Point(startX, startY), new Point(x2, y2));

            // Draw the path on the image
            for (Point p : path) {
                Imgproc.circle(imageMat, p, 2, new Scalar(0, 0, 255), -1);
            }

            // Convert the processed Mat back to a Bitmap
            Bitmap processedBitmap = Bitmap.createBitmap(imageMat.cols(), imageMat.rows(), Bitmap.Config.ARGB_8888);
            Utils.matToBitmap(imageMat, processedBitmap);

            // Save the processed image and return the path
            String processedImagePath = saveBitmapToFile(processedBitmap);
            promise.resolve(processedImagePath);
        } catch (Exception e) {
            promise.reject("ImageProcessingError", e);
        }
    }

    // convert bitmap into file to be displayed
    private String saveBitmapToFile(Bitmap bitmap) throws Exception {
        File outputDir = getReactApplicationContext().getCacheDir();
        File outputFile = File.createTempFile("processed_image", ".png", outputDir);

        FileOutputStream out = new FileOutputStream(outputFile);
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, out);
        out.close();

        return outputFile.getAbsolutePath();
    }
}
