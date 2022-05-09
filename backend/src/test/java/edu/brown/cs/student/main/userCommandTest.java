// package edu.brown.cs.student.main;

// import edu.brown.cs.student.main.database.Database;
// import edu.brown.cs.student.main.userFunc.userCommands;
// import org.junit.Test;

// import java.sql.SQLException;

// import static org.junit.Assert.assertEquals;

// public class userCommandTest {

//   @Test
//   public void userExtractTest() throws SQLException, ClassNotFoundException {
//     Database data = new Database("../data/test-data.sqlite");
//     userCommands users = new userCommands(data);
//     users.getData();
//     assertEquals(3, users.getUsers().size());
//   }

//   @Test
//   public void correctData() throws SQLException, ClassNotFoundException {
//     Database data = new Database("../data/test-data.sqlite");
//     userCommands users = new userCommands(data);
//     users.getData();
//     assertEquals("stephen", users.getUsers().get(2).getName());
//     assertEquals("stephen_hinds@gmail.com", users.getUsers().get(2).getEmail());
//     assertEquals(3, users.getUsers().get(2).getUserid());
//     assertEquals("password123", users.getUsers().get(2).getKey());

//   }

//   @Test
//   public void correctEvents() throws SQLException, ClassNotFoundException {
//     Database data = new Database("../data/test-data.sqlite");
//     userCommands users = new userCommands(data);
//     users.getData();
//     assertEquals(1, users.getUsers().get(2).getEvents().size());
//     assertEquals(2, users.getUsers().get(1).getEvents().size());
//     assertEquals("Watson Institute", users.getUsers().get(2).getEvents().get(0).getBuilding());
//   }

// }


