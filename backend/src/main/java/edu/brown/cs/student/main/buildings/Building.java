package edu.brown.cs.student.main.buildings;

import java.util.ArrayList;
import java.util.List;

public class Building {
    private int code;
    private String name;
    private double lat;
    private double lon;
    private List<Fountain> fountainList;

    public Building(int code) {
        this.code = code;
        this.fountainList = new ArrayList<>();
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

    public void addFountain(Fountain fountain) {
        this.fountainList.add(fountain);
    }

    public List<Fountain> getFountainList() {
        return this.fountainList;
    }
}
