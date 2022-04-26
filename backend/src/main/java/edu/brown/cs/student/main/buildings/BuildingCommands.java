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

    private void getData() throws SQLException {
        this.buildings = null;
        ResultSet rs = this.database.executeCommand("SELECT Property Code FROM buildings");
        while (rs.next()) {
            this.buildings.add(new Building(rs.getInt(1)));
        }
        for (Building building : this.buildings) {
            rs = this.database.executeCommand("SELECT Property Name FROM buildings");
            while (rs.next()) {
                building.setName(rs.getString(1));
            }
            rs = this.database.executeCommand("SELECT Latitude FROM buildings");
            while (rs.next()) {
                building.setLat(rs.getDouble(1));
            }
            rs = this.database.executeCommand("SELECT Longitude FROM buildings");
            while (rs.next()) {
                building.setLon(rs.getDouble(1));
            }
        }
    }

}