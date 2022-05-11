package edu.brown.cs.student.main.userFunc;

import edu.brown.cs.student.main.database.Database;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class UserCommands {
  private Database database;
  private List<User> users;

  public UserCommands(Database database) {
    this.database = database;
    this.users = new ArrayList<>();
    try {
      this.getData();
    } catch (SQLException e) {
      e.printStackTrace();
    }
  }

  public void getData() throws SQLException {
    this.users = new ArrayList<>();
    ResultSet rs = this.database.executeCommand("SELECT UserID FROM users");
    while (rs.next()) {
      this.users.add(new User(rs.getInt(1)));
    }
    for (User user : this.users) {
      int id = user.getUserid();
      rs = this.database.executeCommand("SELECT * FROM users WHERE UserID = " + id);
      while (rs.next()) {
        user.setName(rs.getString("Name"));
        user.setEmail(rs.getString("Email"));
        user.setKey(rs.getString("Key"));
      }
      rs = this.database.executeCommand("SELECT * FROM events WHERE UserID = " + id);
      while (rs.next()) {
        int location = rs.getInt("ProperyCode");
        int startTime = rs.getInt("StartTime");
        int endTime = rs.getInt("EndTime");
        String day = rs.getString("DaysOfWeek");
        user.addEvents(new Event(location, startTime, endTime, day));
      }
    }
  }

  public List<User> getUsers() {
    return this.users;
  }

  public User idToUser(int userID) {
    for (User user : this.users) {
      if (user.getUserid() == userID) {
        return user;
      }
    }
    return null;
  }
}
