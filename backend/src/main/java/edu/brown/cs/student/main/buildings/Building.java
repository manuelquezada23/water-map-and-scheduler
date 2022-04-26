package edu.brown.cs.student.main.buildings;

public class Building {
    private int code;
    private String name;
    private double lat;
    private double lon;

    public Building(int code) {
        this.code = code;
    }

    public int getCode() {
        return this.code;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public void setLat(double latitude) {
        this.lat = latitude;
    }

    public double getLat() {
        return this.lat;
    }

    public void setLon(double longitude) {
        this.lon = longitude;
    }

    public double getLon() {
        return this.lon;
    }
}
