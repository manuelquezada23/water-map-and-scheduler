package edu.brown.cs.student.main.userFunc;

import java.util.List;

public class Event {
  private String building;
  private int startTime;
  private int endTime;
  private List<String> dayOfWeek;

  public Event(String building, int startTime, int endTime, List<String> dayOfWeek) {
    this.building = building;
    this.startTime = startTime;
    this.endTime = endTime;
    this.dayOfWeek = dayOfWeek;
  }

  public String getBuilding() {
    return this.building;
  }

  public void setBuilding(String building) {
    this.building = building;
  }
}


