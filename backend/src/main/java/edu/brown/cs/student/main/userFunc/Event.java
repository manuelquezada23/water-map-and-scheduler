package edu.brown.cs.student.main.userFunc;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public class Event {
  private int building;
  private int startTime;
  private int endTime;
  private final List<String> daysOfWeek;
  private static final int MARGIN_OF_ERROR = 10;

  public Event(int building, int startTime, int endTime, List<String> daysOfWeek) {
    this.building = building;
    this.startTime = startTime;
    this.endTime = endTime;
    this.daysOfWeek = daysOfWeek;
  }

  public boolean isHappening() {
    Date currentDate = new Date();
    String day = LocalDate.now().getDayOfWeek().name();
    SimpleDateFormat formatter = new SimpleDateFormat("kk:mm:ss");
    String time = formatter.format(currentDate); // hh:mm:ss format (24 hour)
    String hourMinCombined = time.substring(0,4);
    hourMinCombined = hourMinCombined.replace(":", ""); // HHMM format (24 hr)
    int hourMinCombinedInt = Integer.parseInt(hourMinCombined);

    // check if correct day of the week and within time range
    return (hourMinCombinedInt >= this.startTime - MARGIN_OF_ERROR)
            && (hourMinCombinedInt <= this.endTime + MARGIN_OF_ERROR) && (this.correctDay(day));
  }

  private boolean correctDay(String day) {
    for (String dayHappening : this.daysOfWeek) {
      if (day.equals(dayHappening)) {
        return true;
      }
    }
    return false;
  }

  public int getBuildingId() {
    return this.building;
  }

  public void setBuilding(int building) {
    this.building = building;
  }
}


