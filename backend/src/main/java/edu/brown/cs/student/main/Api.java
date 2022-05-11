package edu.brown.cs.student.main;

import com.google.common.collect.ImmutableMap;
import com.google.gson.Gson;
import edu.brown.cs.student.main.database.Database;
import joptsimple.OptionParser;
import joptsimple.OptionSet;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONArray;
import spark.Request;
import spark.Response;
import spark.Route;
import spark.Spark;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.ResultSetMetaData;
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
    Spark.post("/get-users", new getUsersHandler());
    Spark.post("/get-review", new getReviewsHandler());
    Spark.post("/get-buildings-fountains", new getBuildingsFountainHandler());
    // not sure about primary condition
    // update needs form "column1 = value1, column2 = value2, ..."
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

  // private class getSQLResultSetHandler implements Route {
  //   @Override
  //   public String handle(Request req, Response res) throws JSONException {
  //     JSONObject obj = new JSONObject(req.body());
  //     String command = obj.getString("sql");

  //     Gson gson = new Gson();
  //     ResultSet rs = Api.this.db.executeCommand(command);
  //     if (rs != null) {
  //       Map dataToJson = ImmutableMap.of("rs", Api.this.db.executeCommand(command));
  //       String json = gson.toJson(dataToJson);
  //       return json;
  //     }
  //     return "";
  //   }
  // }



  /**
   * Handles requests for updating a row in the table.
   *
   * @return GSON which contains the updated table; returns null if any error.
   */
  private class getUsersHandler implements Route {
    @Override
    public String handle(Request req, Response res) throws JSONException {
      JSONObject obj = new JSONObject(req.body());
      String tableName = obj.getString("table");

      String json = "";
      try {
        json = Api.this.db.getUsers();
      } catch (SQLException e) {
        e.printStackTrace();
      }
      return json;
    }
  }

  /**
   * Handles requests for updating a row in the table.
   *
   * @return GSON which contains the updated table; returns null if any error.
   */
  private class getReviewsHandler implements Route {
    @Override
    public String handle(Request req, Response res) throws JSONException {
      JSONObject obj = new JSONObject(req.body());
      String tableName = obj.getString("table");

      String json = "";
      try {
        json = Api.this.db.getReviews();
      } catch (SQLException e) {
        e.printStackTrace();
      }
      return json;
    }
  }

  /**
   * Handles requests for updating a row in the table.
   *
   * @return GSON which contains the updated table; returns null if any error.
   */
  private class getBuildingsFountainHandler implements Route {
    @Override
    public String handle(Request req, Response res) throws JSONException {
      JSONObject obj = new JSONObject(req.body());
      String tableName = obj.getString("table");

      String json = "";
      try {
        json = Api.this.db.getBuildingsFountain();
      } catch (SQLException e) {
        e.printStackTrace();
      }
      return json;
    }
  }

}