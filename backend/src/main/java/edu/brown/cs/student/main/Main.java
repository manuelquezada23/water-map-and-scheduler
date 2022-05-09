package edu.brown.cs.student.main;

import edu.brown.cs.student.main.buildings.Building;
import edu.brown.cs.student.main.buildings.BuildingCommands;
import edu.brown.cs.student.main.buildings.Fountain;
import edu.brown.cs.student.main.buildings.NearestFountain;
import edu.brown.cs.student.main.database.Database;

import java.sql.SQLException;
import java.util.List;

/**
 * The Main class of our project. This is where execution begins.
 */

public final class Main {

  /**
   * The initial method called when execution begins.
   *
   * @param args An array of command line arguments
   */
  public static void main(String[] args) {
    new Main(args).run();
  }

  private String[] args;

  private Main(String[] args) {
    this.args = args;
  }

  private void run() {
    Api api = new Api(this.args, "..data/test-data.sqlite");
  }
}