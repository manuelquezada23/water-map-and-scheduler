package edu.brown.cs.student.main;

import edu.brown.cs.student.main.database.Database;
import joptsimple.OptionParser;
import joptsimple.OptionSet;
import org.json.JSONException;
import org.json.JSONObject;
import spark.Request;
import spark.Response;
import spark.Route;
import spark.Spark;

import java.sql.SQLException;

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

    //put Routes Here
    Spark.post("/get-users", new getUsersHandler());
    Spark.post("/get-review", new getReviewsHandler());
    Spark.post("/get-buildings-fountains", new getBuildingsFountainHandler());
    //not sure about primary condition
    //update needs form "column1 = value1, column2 = value2, ..."
    Spark.init();
  }

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
        json = Api.this.db.getUsers(tableName);
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
        json = Api.this.db.getReviews(tableName);
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
        json = Api.this.db.getBuildingsFountain(tableName);
      } catch (SQLException e) {
        e.printStackTrace();
      }
      return json;
    }
  }

}    