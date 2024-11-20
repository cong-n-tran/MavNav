package com.mavnav.PathFinder;

import org.opencv.core.Mat;
import org.opencv.core.Point;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.HashSet;
import java.util.Set;

public class PathFinderPackage {

    // Node class for A* search
    private static class AStarNode implements Comparable<AStarNode> {
        Point point;
        double gCost;
        double hCost;
        double fCost;
        AStarNode parent;

        AStarNode(Point point, double gCost, double hCost, AStarNode parent) {
            this.point = point;
            this.gCost = gCost;
            this.hCost = hCost;
            this.fCost = gCost + hCost;
            this.parent = parent;
        }

        @Override
        public int compareTo(AStarNode other) {
            return Double.compare(this.fCost, other.fCost);
        }
    }


        // Perform A* search to find a path
    public ArrayList<Point> performAStar(Mat image, Mat distanceTransformed, Point start, Point end) {
        ArrayList<Point> path = new ArrayList<>();

        // Create open and closed sets
        PriorityQueue<AStarNode> openSet = new PriorityQueue<>();
        Map<Point, AStarNode> openSetMap = new HashMap<>();
        Set<Point> closedSet = new HashSet<>();

        // Mocking 4 directions movement
        int[][] directions = {
                {0, 1},  // Down
                {0, -1}, // Up
                {1, 0},  // Right
                {-1, 0}  // Left
        };

        // Add the start node to the open set
        AStarNode startNode = new AStarNode(start, 0, calculateHeuristic(start, end), null);
        openSet.add(startNode);
        openSetMap.put(start, startNode);

        while (!openSet.isEmpty()) {
            // Get the node with the lowest f-cost
            AStarNode current = openSet.poll();
            openSetMap.remove(current.point);

            // If the destination is reached, reconstruct the path
            if (current.point.equals(end)) {
                AStarNode temp = current;
                while (temp != null) {
                    path.add(0, temp.point); // Add the node to the path (reverse order)
                    temp = temp.parent;
                }
                break;
            }

            // Add current node to closed set
            closedSet.add(current.point);

            // Explore neighbors (4 directions)
            for (int[] direction : directions) {
                Point neighbor = new Point(
                        current.point.x + direction[0],
                        current.point.y + direction[1]
                );

                // Check if the neighbor is within bounds and not an obstacle
                if (isWithinBounds(image, neighbor) && !isObstacle(image, neighbor) && !closedSet.contains(neighbor)) {
                    double tentativeGCost = current.gCost + 1;

                    // Add distance from walls as a factor to encourage centrality
                    double wallDistance = getDistanceFromWalls(distanceTransformed, neighbor);
                    tentativeGCost -= wallDistance * 0.1; // Adjust weight (0.1) as needed

                    double hCost = calculateHeuristic(neighbor, end);

                    // Check if the neighbor is already in the open set
                    if (openSetMap.containsKey(neighbor)) {
                        AStarNode existingNode = openSetMap.get(neighbor);
                        if (tentativeGCost < existingNode.gCost) {
                            // Update the existing node with a better path
                            openSet.remove(existingNode); // Remove and re-add to update priority
                            existingNode.gCost = tentativeGCost;
                            existingNode.fCost = tentativeGCost + hCost;
                            existingNode.parent = current;
                            openSet.add(existingNode);
                        }
                    } else {
                        // Add new node to the open set
                        AStarNode neighborNode = new AStarNode(neighbor, tentativeGCost, hCost, current);
                        openSet.add(neighborNode);
                        openSetMap.put(neighbor, neighborNode);
                    }
                }
            }
        }

        return path;
    }

    // Calculate the Manhattan heuristic (for 4-directional movement)
    private double calculateHeuristic(Point p1, Point p2) {
        return Math.abs(p2.x - p1.x) + Math.abs(p2.y - p1.y);
    }

    // Check if a point is within the bounds of the image
    private boolean isWithinBounds(Mat image, Point point) {
        return point.x >= 0 && point.x < image.cols() && point.y >= 0 && point.y < image.rows();
    }

    // Check if a point is an obstacle (using a simple threshold for grayscale image)
    private boolean isObstacle(Mat image, Point point) {
        double[] pixelValues = image.get((int) point.y, (int) point.x);
        double pixelValue = pixelValues[0];
        return pixelValue != 255;  // Assuming obstacles are represented by dark/black pixels
    }

    // Get the distance from walls using the distance-transformed map
    private double getDistanceFromWalls(Mat distanceTransformed, Point point) {
        double[] pixelValues = distanceTransformed.get((int) point.y, (int) point.x);
        return pixelValues[0] / 255.0; // Normalize to 0-1
    }

}
