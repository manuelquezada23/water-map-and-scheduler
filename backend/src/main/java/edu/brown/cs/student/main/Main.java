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
//    new Api(this.args, "..data/test-data.sqlite");
    try {
      System.out.println("running");
      BuildingCommands buildingCommands = new BuildingCommands(new Database("../data/test-data.sqlite"));
      List<Building> bl = buildingCommands.getBuildings();

      NearestFountain nf = new NearestFountain(bl);
      List<Fountain> fountainList = nf.findNearestFountains(bl.get(0));

      for (Fountain f : fountainList) {
        System.out.println(f.getBuildingName() + " " + f.getFloor() + " " + f.getId());
      }

    } catch (SQLException e) {
      e.printStackTrace();
    } catch (ClassNotFoundException e) {
      e.printStackTrace();
    }
  }
}
