package edu.brown.cs.student.main.buildings;

import edu.brown.cs.student.main.database.Database;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class BuildingCommands {
    private final Database database;
    private final List<Building> buildings;

    public BuildingCommands(Database database) {
        this.database = database;
        this.buildings = new ArrayList<>();
        try {
            this.setUpBuildings();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    /**
     * Builds the list of buildings from the database.
     * @throws SQLException if issue is encountered with SQL
     */
    private void setUpBuildings() throws SQLException {
        this.buildings.clear();
        ResultSet rs = this.database.executeCommand("SELECT * FROM buildings");
        while (rs.next()) {
            Building building = new Building(rs.getInt("PropertyCode"));
            building.setName(rs.getString("BuildingName"));
            building.setLat(rs.getDouble("Latitude"));
            building.setLon(rs.getDouble("Longitude"));
            this.buildings.add(building);
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
        String sqlCommand = "SELECT FountainID, Floor FROM fountains WHERE PropertyCode = " + buildingCode;
        ResultSet rs = this.database.executeCommand(sqlCommand);
        while (rs.next()) {
            Fountain fountain = new Fountain(rs.getInt("FountainID"), building.getCode(), building.getName(), rs.getInt("Floor"));
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
        String sqlCommand = "SELECT UserID, Review, Rating FROM reviews WHERE FountainID = " + fountainID;
        ResultSet rs = this.database.executeCommand(sqlCommand);
        while (rs.next()) {
            Review review = new Review(rs.getInt("UserID"), fountainID);
            review.setReviewBody(rs.getString("Review"));
            review.setStarRating(rs.getInt("Rating"));
            fountain.addReview(review);
        }
    }

    public List<Building> getBuildings() {
        return this.buildings;
    }

    public Building idToBuilding(int buildingID) {
        for (Building building : this.buildings) {
            if (building.getCode() == buildingID) {
                return building;
            }
        }
        return null;
    }

    public Fountain idToFountain(int fountainID) {
        for (Building building : this.buildings) {
            for (Fountain fountain : building.getFountainList()) {
                if (fountain.getId() == fountainID) {
                    return fountain;
                }
            }
        }
        return null;
    }
}