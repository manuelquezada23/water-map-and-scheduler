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
    this.users = new ArrayList<>();
  }

  private void getData() throws SQLException {
    this.users = null;
    ResultSet rs = this.database.executeCommand("SELECT id FROM users");
    while (rs.next()) {
      this.users.add(new User(rs.getInt(1)));
    }
    for (int i = 0; i < this.users.size(); i++) {
      rs = this.database.executeCommand("SELECT name FROM users");
      while (rs.next()) {
        this.users.get(i).setName(rs.getString(1));
      }
      rs = this.database.executeCommand("SELECT email FROM users");
      while (rs.next()) {
        this.users.get(i).setEmail(rs.getString(1));
      }
      rs = this.database.executeCommand("SELECT Water Bottle Size FROM users");
      while (rs.next()) {
        this.users.get(i).setWaterBottleSize(rs.getDouble(1));
      }
      rs = this.database.executeCommand("SELECT key FROM users");
      while (rs.next()) {
        this.users.get(i).setKey(rs.getString(1));
      }
      rs = this.database.executeCommand;
      //get list of events from other database 
    }
  }

}
