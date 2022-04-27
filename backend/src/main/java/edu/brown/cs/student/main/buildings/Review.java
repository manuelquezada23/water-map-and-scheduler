package edu.brown.cs.student.main.buildings;

public class Review {
    private int userID;
    private int fountainID;
    private String reviewBody;
    private int starRating;

    public Review(int userID, int fountainID) {
        this.userID = userID;
        this.fountainID = fountainID;
    }

    public int getUserID() {
        return userID;
    }

    public int getFountainID() {
        return this.fountainID;
    }

    public void setReviewBody(String reviewBody) {
        this.reviewBody = reviewBody;
    }

    public String getReviewBody() {
        return this.reviewBody;
    }

    public void setStarRating(int starRating) {
        this.starRating = starRating;
    }

    public int getStarRating() {
        return this.starRating;
    }
}
