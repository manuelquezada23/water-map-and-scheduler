package edu.brown.cs.student.main.buildings;

import java.util.ArrayList;
import java.util.List;

public class Fountain {
    private int id;
    private int buildingCode;
    private String buildingName;
    private int floor;
    private int nearestRoom;
    private List<Review> reviewList;

    public Fountain(int id, int buildingCode, String buildingName, int floor, int nearestRoom) {
        this.id = id;
        this.buildingCode = buildingCode;
        this.buildingName = buildingName;
        this.floor = floor;
        this.nearestRoom = nearestRoom;
        this.reviewList = new ArrayList<>();
    }

    public int getId() {
        return this.id;
    }

    public int getBuildingCode() {
        return this.buildingCode;
    }

    public String getBuildingName() {
        return this.buildingName;
    }

    public void setBuildingCode(int buildingCode) {
        this.buildingCode = buildingCode;
    }

    public int getFloor() {
        return this.floor;
    }

    public int getNearestRoom() {
        return this.nearestRoom;
    }

    public void addReview(Review review) {
        this.reviewList.add(review);
    }

    public List<Review> getReviewList() {
        return this.reviewList;
    }

    public double getAverageRating() {
        double sum = 0;
        for (Review review : this.reviewList) {
            sum += review.getStarRating();
        }
        if (reviewList.size() == 0) {
            return 0; //if there are no ratings (can be changed)
        }
        return sum/this.reviewList.size();
    }
}
