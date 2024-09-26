import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();
  const version = await database.query("SHOW server_version;");
  const maxConnections = await database.query("SHOW max_connections;");

  const databaseName = process.env.POSTGRES_DB;
  const connectionOn = await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const openConnectionsValue = connectionOn.rows[0].count;
  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        postgre_v: version.rows[0].server_version,
        max_con: parseInt(maxConnections.rows[0].max_connections),
        con_on: openConnectionsValue,
      },
    },
  });
}

export default status;
