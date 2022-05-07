package edu.brown.cs.student.main.buildings;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.PriorityQueue;

public class NearestFountain {
    private List<Building> buildingList;
    private static final int NUM_RETURNED_FOUNTAINS = 3;

    public NearestFountain(List<Building> buildingList) {
        this.buildingList = buildingList;
    }

    public List<Fountain> findNearestFountains(Building building) {
        Comparator<Fountain> comparator = new FountainComparator(building, this.buildingList);

        PriorityQueue<Fountain> fountainPQ = new PriorityQueue<>(comparator);
        for (Building currBuilding : this.buildingList) {
            fountainPQ.addAll(currBuilding.getFountainList());
        }

        List<Fountain> nearestFountainList = new ArrayList<>();

        for (int i = 0; i < NUM_RETURNED_FOUNTAINS; i++) {
            nearestFountainList.add(fountainPQ.poll());
        }

        return nearestFountainList;
    }
}
