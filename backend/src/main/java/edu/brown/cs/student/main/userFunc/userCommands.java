package edu.brown.cs.student.main.userFunc;

import edu.brown.cs.student.main.database.Database;

import java.sql.ResultSet;
import java.util.List;

public class userCommands {
  private Database database;

  private List<User> getData() {
    ResultSet results = this.database.executeCommand("");
    return null;
  }

}
