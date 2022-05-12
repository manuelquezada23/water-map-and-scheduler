package edu.brown.cs.student.main.userFunc;

import java.util.ArrayList;
import java.util.List;

public class User {
  private final String userid;
  private String email;
  private String key;
  private String name;
  private List<Event> events;

  public User(String userid) {
    this.userid = userid;
    this.events = new ArrayList<>();
  }

  public String checkEvent(){
    for (Event event: this.events) {
      System.out.println("event: "+event);
    }
    for (Event event : this.events) {
      if (event.isHappening()) {
        return event.getBuilding();
      }
    }
    return null;
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

  public String getUserid() {
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
