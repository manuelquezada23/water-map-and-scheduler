package edu.brown.cs.student.main.userFunc;

import edu.brown.cs.student.main.database.Database;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class userCommands {
  private Database database;
  private List<User> users;

  public userCommands(Database database) {
    this.database = database;
    this.users = new ArrayList<User>();
  }

  public void getData() throws SQLException {
    this.users = new ArrayList<User>();
    ResultSet rs = this.database.executeCommand("SELECT UserID FROM users");
    while (rs.next()) {
      this.users.add(new User(rs.getInt(1)));
    }
    for (int i = 0; i < this.users.size(); i++) {
      int id = this.users.get(i).getUserid();
      rs = this.database.executeCommand("SELECT * FROM users WHERE UserID = " + id);
      while (rs.next()) {
        this.users.get(i).setName(rs.getString("Name"));
        this.users.get(i).setEmail(rs.getString("Email"));
        this.users.get(i).setKey(rs.getString("Key"));
        this.users.get(i).setWaterBottleSize(rs.getDouble("WaterBottleSize"));
      }
      List<Event> events = new ArrayList<Event>();
      rs = this.database.executeCommand("SELECT * FROM events WHERE UserID = " + id);
      while (rs.next()) {
        String location = rs.getString("BuildingName");
        int startTime = rs.getInt("StartTime");
        int endTime = rs.getInt("EndTime");
        List<String> days = Arrays.asList((rs.getString("DaysOfWeek").split(",")));
        this.users.get(i).addEvents(new Event(location, startTime, endTime, days));
      }
    }
  }

  public List<User> getUsers() {
    return this.users;
  }
}
