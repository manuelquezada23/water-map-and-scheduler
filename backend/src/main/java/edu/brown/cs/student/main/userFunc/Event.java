package edu.brown.cs.student.main.userFunc;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Date;

public class Event {
  private int building;
  private final int startTime;
  private final int endTime;
  private final String dayOfWeek;
  private static final int MARGIN_OF_ERROR = 10;

  public Event(int building, String startTime, String endTime, String dayOfWeek) {
    this.building = building;
    this.startTime = this.convertUTC(startTime);
    this.endTime = this.convertUTC(endTime);
    this.dayOfWeek = dayOfWeek;
  }

  public boolean isHappening() {
    String day = LocalDate.now().getDayOfWeek().name();
    int now = this.convertUTC(Instant.now().toString());
    return (now >= this.startTime - MARGIN_OF_ERROR)
            && (now <= this.endTime + MARGIN_OF_ERROR) && (day.equals(this.dayOfWeek));
  }

  private int convertUTC(String utc) {
    String substring = utc.substring(11, 16);
    return Integer.parseInt(substring.replace(":",""));
  }


  public int getBuildingId() {
    return this.building;
  }

  public void setBuilding(int building) {
    this.building = building;
  }
}


