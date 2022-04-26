package edu.brown.cs.student.main.userFunc;

import java.util.List;

public class User {
  private int userid;
  private String email;
  private String key;
  private List<Event> events;
  private double waterBottleSize;

  public User(int userid) {
    this.userid = userid;
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
}
