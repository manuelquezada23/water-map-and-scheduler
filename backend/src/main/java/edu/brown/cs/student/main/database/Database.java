package edu.brown.cs.student.main.database;


import edu.brown.cs.student.main.buildings.BuildingCommands;

import java.sql.*;

public class Database {
  private static Connection conn = null;
  private BuildingCommands buildingCommands;

  public Database(String filename) throws SQLException, ClassNotFoundException {

    /*
     * TODO: Initialize the database connection, turn foreign keys on, and then
     * create the tas and ta_horoscope tables if they do not exist.
     */

    Class.forName("org.sqlite.JDBC");
    String urlToDB = "jdbc:sqlite:" + filename;
    Database.conn = DriverManager.getConnection(urlToDB);
    // these two lines tell the database to enforce foreign keys during operations,
    // and should be present
    Statement stat = Database.conn.createStatement();
    stat.executeUpdate("PRAGMA foreign_keys=ON;");

    this.buildingCommands = new BuildingCommands(this);
  }

  /**
   * executes and retrieves information from the database.
   *
   * @param sqlCommand command to be executed
   * @return the ResultSet or null
   */
  public ResultSet executeCommand(String sqlCommand) {
    //execute
    try {
      PreparedStatement roleFinder = Database.conn.prepareStatement(sqlCommand);
      //indicates there will be no result set returned
      if (sqlCommand.contains("UPDATE") || sqlCommand.contains("INSERT")
              || sqlCommand.contains("DELETE")) {
        roleFinder.executeUpdate();
        return null;
      }
      //returns the result
      return roleFinder.executeQuery();
    } catch (Exception e) {
      System.out.println("ERROR: Exception:" + e.getMessage());
      return null;
    }
  }

  /**
   *
   * @return
   * @throws SQLException
   */
  public String getUsers() throws SQLException {
    return null;
  }

  public String getReviews() throws SQLException {
    return null;
  }

  public String getBuildingsFountain() throws SQLException {
    return null;
  }
}
