package edu.brown.cs.student.main.buildings;

import java.util.Comparator;
import java.util.List;

public class FountainComparator implements Comparator<Fountain> {
    private final Building targetBuilding;
    private List<Building> buildingList;
    private static final double MARGIN_OF_ERROR = 0.000001; // lat or lon unit

    public FountainComparator(Building building, List<Building> buildingList) {
        this.targetBuilding = building;
        this.buildingList = buildingList;
    }

    /**
     * Compares its two arguments for order.  Returns a negative integer,
     * zero, or a positive integer as the first argument is less than, equal
     * to, or greater than the second.
     * @param fountain1 the first object to be compared.
     * @param fountain2 the second object to be compared.
     * @return a negative integer, zero, or a positive integer as the
     * first argument is less than, equal to, or greater than the
     * second.
     * "Note: this comparator
     * imposes orderings that are inconsistent with equals."
     */
    @Override
    public int compare(Fountain fountain1, Fountain fountain2) {
        Building building1 = this.findBuildingFromFountain(fountain1);
        Building building2 = this.findBuildingFromFountain(fountain2);
        assert building1 != null;
        assert building2 != null;
        double distance1 = this.euclideanDistance(building1);
        double distance2 = this.euclideanDistance(building2);
        double difference = distance2 - distance1;

        if (difference < 0 && difference > -1 * MARGIN_OF_ERROR) {
            return -1;
        } else if (difference > 0 && difference < MARGIN_OF_ERROR) {
            return 1;
        } else {
            return this.breakTie(fountain1, fountain2);
        }
    }

    private int breakTie(Fountain fountain1, Fountain fountain2) {
        if (fountain1.getAverageRating() > fountain2.getAverageRating()) {
            return 1;
        } else {
            return -1;
        }
    }

    /**
     * Given a fountain, finds the building it's in and returns that object.
     * @param fountain fountain to find building of
     * @return Building object that the fountain is in
     */
    private Building findBuildingFromFountain(Fountain fountain) {
        for (Building building : this.buildingList) {
            if (building.getCode() == fountain.getBuildingCode()) {
                return building;
            }
        }
        return null;
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
