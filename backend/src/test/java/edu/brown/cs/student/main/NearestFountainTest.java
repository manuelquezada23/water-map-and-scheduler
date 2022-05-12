// package edu.brown.cs.student.main;

// import edu.brown.cs.student.main.buildings.Building;
// import edu.brown.cs.student.main.buildings.BuildingCommands;
// import edu.brown.cs.student.main.buildings.Fountain;
// import edu.brown.cs.student.main.buildings.NearestFountain;
// import edu.brown.cs.student.main.database.Database;
// import org.junit.Assert;
// import org.junit.Test;

// import java.sql.SQLException;
// import java.util.List;

// public class NearestFountainTest {

//     @Test
//     public void TestNearestFountain() {
//         try {
//             BuildingCommands buildingCommands = new BuildingCommands(new Database("../data/test-data.sqlite"));
//             List<Building> buildings = buildingCommands.getBuildings();

//             NearestFountain nearestFountain = new NearestFountain(buildings);
//             List<Fountain> fountainList = nearestFountain.findNearestFountains(buildings.get(0));

//             Assert.assertEquals(fountainList.get(0).getBuildingName(), "Sharpe Refectory");
//             Assert.assertEquals(fountainList.get(1).getBuildingName(), "Metcalf Hall");
//             Assert.assertEquals(fountainList.get(2).getBuildingName(), "Ladd Observatory");

//         } catch (SQLException | ClassNotFoundException e) {
//             System.out.println("Error encountered " + e.getMessage());
//         }
//     }
// }
