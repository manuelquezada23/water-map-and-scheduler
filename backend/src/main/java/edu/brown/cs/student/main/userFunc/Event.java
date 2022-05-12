package edu.brown.cs.student.main.userFunc;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;

public class Event {
  private String building;
  private final int startTime;
  private final int endTime;
  private final String dayOfWeek;
  private static final int MARGIN_OF_ERROR = 30;

  public Event(String building, String startTime, String endTime, String dayOfWeek) {
    this.building = building;
    this.startTime = this.convertUTC(startTime);
    this.endTime = this.convertUTC(endTime);
    this.dayOfWeek = dayOfWeek;
  }

  public boolean isHappening() {
    String day = LocalDate.now().getDayOfWeek().name().toLowerCase();
    int now = this.convertUTC(Instant.now().toString()) -400;
    return (now >= this.startTime - MARGIN_OF_ERROR)
            && (now <= this.endTime + MARGIN_OF_ERROR) && (day.equals(this.dayOfWeek.toLowerCase()));
  }

  private int convertUTC(String utc) {
    String substring = utc.substring(11, 16);
    return Integer.parseInt(substring.replace(":",""));
  }


  public String getBuilding() {
    return this.building;
  }

  public void setBuilding(String building) {
    this.building = building;
  }

  public String toString() {
    return "start: "+startTime +", end: "+endTime;
  }
}


