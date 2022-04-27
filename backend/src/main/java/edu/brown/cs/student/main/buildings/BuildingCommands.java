package edu.brown.cs.student.main.buildings;

import edu.brown.cs.student.main.database.Database;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class BuildingCommands {
    private Database database;
    private List<Building> buildings;

    public BuildingCommands(Database database) {
        this.database = database;
        this.buildings = new ArrayList<>();
    }

    /**
     * Builds the list of buildings from the database.
     * @throws SQLException if issue is encountered with SQL
     */
    private void setUpBuildings() throws SQLException {
        this.buildings.clear();
        ResultSet rs = this.database.executeCommand("SELECT Property Code FROM buildings");
        while (rs.next()) {
            this.buildings.add(new Building(rs.getInt(1)));
        }
        for (Building building : this.buildings) {
            rs = this.database.executeCommand("SELECT Property Name, Latitude, Longitude FROM buildings");
            while (rs.next()) {
                building.setName(rs.getString("Property Name"));
                building.setLat(rs.getDouble("Latitude"));
                building.setLon(rs.getDouble("Longitude"));
            }

            this.setUpFountains(building);
        }
    }

    /**
     * Selects all the fountains for a building and creates a fountain object for each
     * and adds them to the building's list of fountains.
     * @param building building to find fountains of
     * @throws SQLException if issue is encountered with SQL
     */
    private void setUpFountains(Building building) throws SQLException {
        int buildingCode = building.getCode();
        String sqlCommand = "SELECT ID, Floor FROM fountains WHERE Property Code = " + buildingCode;
        ResultSet rs = this.database.executeCommand(sqlCommand);
        while (rs.next()) {
            Fountain fountain = new Fountain(rs.getInt("ID"), building.getCode(), building.getName(), rs.getInt("Floor"));
            building.addFountain(fountain);
            this.setUpReviews(fountain);
        }
    }

    /**
     * Selects all the reviews for a fountain and creates a review object for each
     * and adds them to the fountain's list of reviews.
     * @param fountain fountain to find reviews of
     * @throws SQLException if issue is encountered with SQL
     */
    private void setUpReviews(Fountain fountain) throws SQLException {
        int fountainID = fountain.getId();
        String sqlCommand = "SELECT User ID, Review, Rating FROM reviews WHERE Fountain ID = " + fountainID;
        ResultSet rs = this.database.executeCommand(sqlCommand);
        while (rs.next()) {
            Review review = new Review(rs.getInt("User ID"), fountainID);
            review.setReviewBody(rs.getString("Review"));
            review.setStarRating(rs.getInt("Rating"));
            fountain.addReview(review);
        }
    }

}