package edu.brown.cs.student.main.userFunc;

import edu.brown.cs.student.main.database.Database;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class userCommands {
  private Database database;
  private List<User> users;

  public userCommands(Database database) {
    this.database = database;
    this.users = new ArrayList<User>();
  }

  private void getData() throws SQLException {
    this.users = null;
    ResultSet rs = this.database.executeCommand("SELECT UserID FROM users");
    while (rs.next()) {
      this.users.add(new User(rs.getInt(1)));
    }
    for (int i = 0; i < this.users.size(); i++) {
      int id = this.users.get(i).getUserid();
      rs = this.database.executeCommand("SELECT Name FROM users WHERE UserID = " + id);
      while (rs.next()) {
        this.users.get(i).setName(rs.getString(1));
      }
      rs = this.database.executeCommand("SELECT Email FROM users WHERE UserID = " + id);
      while (rs.next()) {
        this.users.get(i).setEmail(rs.getString(1));
      }
      rs = this.database.executeCommand("SELECT WaterBottleSize FROM users WHERE UserID = " + id);
      while (rs.next()) {
        this.users.get(i).setWaterBottleSize(rs.getDouble(1));
      }
      rs = this.database.executeCommand("SELECT Key FROM users WHERE UserID = " + id);
      while (rs.next()) {
        this.users.get(i).setKey(rs.getString(1));
      }
      rs = this.database.executeCommand()
      //get list of events from other database 
    }
  }

}
