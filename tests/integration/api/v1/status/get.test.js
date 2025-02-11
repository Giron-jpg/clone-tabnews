import orchestrator from "../orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      expect(response.status).toBe(200);

      const responseBody = await response.json();
      // const parsedUpdateAt = new Date(responseBody.update_at).toISOString();
      // expect(responseBody.update_at).toEqual(parsedUpdateAt);

      expect(responseBody.dependencies.database.postgre_v).toBeDefined();
      expect(responseBody.dependencies.database.postgre_v).toBe("16.4");
      //console.log(responseBody.dependencies.postgre_v);

      expect(responseBody.dependencies.database.max_con).toBeDefined();
      expect(responseBody.dependencies.database.max_con).not.toBe(null);
      //console.log(responseBody.dependencies.max_con);

      expect(responseBody.dependencies.database.con_on).toBeDefined();
      expect(responseBody.dependencies.database.con_on).not.toBe(null);
      expect(responseBody.dependencies.database.con_on).toEqual(1);
    });
  });
});
