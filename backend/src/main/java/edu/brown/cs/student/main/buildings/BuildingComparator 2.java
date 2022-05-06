package edu.brown.cs.student.main.buildings;

import java.util.Comparator;

/**
 * This class is a comparator for Buildings that compares their
 * latitude and longitude based on Euclidean distance.
 */
public class BuildingComparator implements Comparator<Building> {
    private final Building targetBuilding;

    /**
     * Stores target building.
     * @param targetBuilding building to base comparison on
     */
    public BuildingComparator(Building targetBuilding) {
        this.targetBuilding = targetBuilding;
    }

    /**
     * Compares its two arguments for order.  Returns a negative integer,
     * zero, or a positive integer as the first argument is less than, equal
     * to, or greater than the second.
     * @param building1 the first building to be compared.
     * @param building2 the second building to be compared.
     * @return a negative integer, zero, or a positive integer as the
     * first argument is less than, equal to, or greater than the
     * second.
     */
    @Override
    public int compare(Building building1, Building building2) {
        return Double.compare(this.euclideanDistance(building1), this.euclideanDistance(building2));
    }

    /**
     * Calculates the Euclidean distance between given building and target
     * building based on latitude and longitude.
     * @param building building to find distance between with target
     * @return Euclidean distance
     */
    private double euclideanDistance(Building building) {
        double latDifference = building.getLat() - this.targetBuilding.getLat();
        double lonDifference = building.getLon() - this.targetBuilding.getLon();
        return Math.sqrt(Math.pow(latDifference, 2) + Math.pow(lonDifference, 2));
    }
}
