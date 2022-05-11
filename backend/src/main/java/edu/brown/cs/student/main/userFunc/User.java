package edu.brown.cs.student.main.userFunc;

import java.util.ArrayList;
import java.util.List;

public class User {
  private final int userid;
  private String email;
  private String key;
  private String name;
  private List<Event> events;
  private double waterBottleSize;

  public User(int userid) {
    this.userid = userid;
    this.events = new ArrayList<Event>();
  }

  public int checkEvent(){
    for (Event event : this.events) {
      if (event.isHappening()) {
        return event.getBuildingId();
      }
    }
    return -1;
  }

  public String getEmail() {
    return this.email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getKey() {
    return this.key;
  }

  public void setKey(String key) {
    this.key = key;
  }

  public double getWaterBottleSize() {
    return this.waterBottleSize;
  }

  public void setWaterBottleSize(double waterBottleSize) {
    this.waterBottleSize = waterBottleSize;
  }

  public int getUserid() {
    return this.userid;
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public List<Event> getEvents() {
    return this.events;
  }

  public void setEvents(List<Event> events) {
    this.events = events;
  }

  public void addEvents(Event event) {
    this.events.add(event);
  }
}
