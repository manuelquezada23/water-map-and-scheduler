package edu.brown.cs.student.main;

import com.google.common.collect.ImmutableMap;
import com.google.gson.Gson;
import edu.brown.cs.student.main.buildings.Building;
import edu.brown.cs.student.main.buildings.BuildingCommands;
import edu.brown.cs.student.main.buildings.Fountain;
import edu.brown.cs.student.main.buildings.NearestFountain;
import edu.brown.cs.student.main.database.Database;
import edu.brown.cs.student.main.userFunc.User;
import edu.brown.cs.student.main.userFunc.UserCommands;
import joptsimple.OptionParser;
import joptsimple.OptionSet;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONArray;
import spark.Request;
import spark.Response;
import spark.Route;
import spark.Spark;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;


public class Api {
  private Database db;
  private static final int DEFAULT_PORT = 4567;

  public Api(String[] args, String dataasepath) {
    OptionParser parser = new OptionParser();
    parser.accepts("gui");
    parser.accepts("port").withRequiredArg().ofType(Integer.class).defaultsTo(Api.DEFAULT_PORT);

    OptionSet options = parser.parse(args);

    if (options.has("gui")) {
      runSparkServer((int) options.valueOf("port"));
    }

    try {
      this.db = new Database(dataasepath);
    } catch (SQLException | ClassNotFoundException e) {
      e.printStackTrace();
    }
  }

  public void setDb(Database db) {
    this.db = db;
  }

  /**
   * Sets up the spark server.
   *
   * @param port the port number
   */
  private void runSparkServer(int port) {
    Spark.port(port);
    Spark.externalStaticFileLocation("src/main/resources/static");

    Spark.options("/*", (request, response) -> {
      String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
      if (accessControlRequestHeaders != null) {
        response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
      }

      String accessControlRequestMethod = request.headers("Access-Control-Request-Method");

      if (accessControlRequestMethod != null) {
        response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
      }

      return "OK";
    });

    Spark.before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));

    // put Routes Here
    Spark.post("/get-sql-rs", new getSQLResultSetHandler());
    Spark.post("/get-fountains-schedule", new getNearestFountainScheduleHandler());
    Spark.post("/get-fountains-location", new getNearestFountainLocationHandler());
    Spark.post("/get-average-rating", new getAverageRatingHandler());

    Spark.init();
  }

  public JSONArray turnRSIntoString(ResultSet rs) throws SQLException, JSONException {
    JSONArray json = new JSONArray();
    ResultSetMetaData rsmd = rs.getMetaData();
    while (rs.next()) {
      int numColumns = rsmd.getColumnCount();
      JSONObject obj = new JSONObject();
      for (int i = 1; i <= numColumns; i++) {
        String column_name = rsmd.getColumnName(i);
        obj.put(column_name, rs.getObject(column_name));
      }
      json.put(obj);
    }
    return json;
  }

  private class getSQLResultSetHandler implements Route {
    @Override
    public String handle(Request req, Response res) throws JSONException, SQLException {
      JSONObject obj = new JSONObject(req.body());
      String command = obj.getString("sql");

      Gson gson = new Gson();
      ResultSet rs = Api.this.db.executeCommand(command);
      if (rs == null && command.contains("INSERT")) {
        return "success";
      }
      if (rs != null) {
        String json = gson.toJson(turnRSIntoString(rs));
        return json;
      }
      return "";
    }
  }


  private class getNearestFountainScheduleHandler implements Route {

    /**
     * Handles requests for getting the nearest 3 fountains based on schedule.
     * @param req request which maps "user" to their user ID
     * @return GSON which maps "first" "second" and "third" to the respective
     *         fountain IDs; returns null if there isn't a current event (within 10 minutes).
     */
    @Override
    public String handle(Request req, Response res) throws JSONException {
      JSONObject obj = new JSONObject(req.body());
      String userID = obj.getString("user");

      JSONObject json = new JSONObject();
      Gson gson = new Gson();

      BuildingCommands buildingCommands = new BuildingCommands(Api.this.db);
      NearestFountain nearestFountain = new NearestFountain(buildingCommands.getBuildings());
      UserCommands userCommands = new UserCommands(Api.this.db);
      User user = userCommands.idToUser(userID);
      int buildingID = user.checkEvent();

      if (buildingID != -1) {
        Building currBuilding = buildingCommands.idToBuilding(buildingID);
        List<Fountain> fountainList = nearestFountain.findNearestFountains(currBuilding);
        json.put("first", fountainList.get(0).getId());
        json.put("second", fountainList.get(1).getId());
        json.put("third", fountainList.get(2).getId());
        System.out.println("json"+json);
        return gson.toJson(json);
      } else {
        System.out.println("failed");
        return "Failed";
      }
    }
  }

  private class getNearestFountainLocationHandler implements Route {

    /**
     * Handles requests for getting the nearest 3 fountains based on location.
     * @param req request which maps "building" to the building id
     * @return GSON which maps "first" "second" and "third" to the respective
     *         fountain IDs; returns null if there isn't a current event (within 10 minutes).
     */
    @Override
    public String handle(Request req, Response res) throws JSONException {
      JSONObject obj = new JSONObject(req.body());
      String buildingID = obj.getString("building");

      BuildingCommands buildingCommands = new BuildingCommands(Api.this.db);
      NearestFountain nearestFountain = new NearestFountain(buildingCommands.getBuildings());
      Building currBuilding = buildingCommands.idToBuilding(Integer.parseInt(buildingID));

      JSONObject json = new JSONObject();
      Gson gson = new Gson();

      List<Fountain> fountainList = nearestFountain.findNearestFountains(currBuilding);
      json.put("first", fountainList.get(0).getId());
      json.put("second", fountainList.get(1).getId());
      json.put("third", fountainList.get(2).getId());

      return gson.toJson(json);
    }
  }

  private class getAverageRatingHandler implements Route {

    /**
     * Handles requests for getting the average rating of a water fountain.
     * @param req request which maps "fountain" to the fountain id
     * @return GSON which maps "rating" to the average fountain rating
     */
    @Override
    public String handle(Request req, Response res) throws JSONException {
      JSONObject obj = new JSONObject(req.body());
      int fountainID = obj.getInt("fountain");

      BuildingCommands buildingCommands = new BuildingCommands(Api.this.db);
      Fountain currFountain = buildingCommands.idToFountain(fountainID);
      JSONObject json = new JSONObject();

      Gson gson = new Gson();
      json.put("rating", currFountain.getAverageRating());
      return gson.toJson(json);
    }
  }
}