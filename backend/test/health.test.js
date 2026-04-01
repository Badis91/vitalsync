const request = require("supertest");
const express = require("express");
const app = express();
app.get("/health", (req, res) => res.json({ status: "ok", version: "1.0.0" }));
test("GET /health returns 200", async () => {
  const res = await request(app).get("/health");
  expect(res.statusCode).toBe(200);
  expect(res.body.status).toBe("ok");
});
test("GET /health returns version", async () => {
  const res = await request(app).get("/health");
  expect(res.body.version).toBe("1.0.0");
});
