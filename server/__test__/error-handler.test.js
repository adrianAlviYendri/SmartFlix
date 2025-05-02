const request = require("supertest");
const app = require("../app");
const errorHandler = require("../middleware/error-handler");

describe("Middleware: errorHandler", () => {
  test("mengembalikan 400 untuk SequelizeValidationError", async () => {
    const err = {
      name: "SequelizeValidationError",
      errors: [{ message: "Validation error" }],
    };
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Validation error" });
  });

  test("mengembalikan 400 untuk BadRequest", async () => {
    const err = { name: "BadRequest", message: "Bad request error" };
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Bad request error" });
  });

  test("mengembalikan 401 untuk Unauthorized", async () => {
    const err = { name: "Unauthorized", message: "Unauthorized error" };
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized error" });
  });

  test("mengembalikan 404 untuk NotFound", async () => {
    const err = { name: "NotFound", message: "Not found error" };
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Not found error" });
  });

  test("mengembalikan 500 untuk error lainnya", async () => {
    const err = { name: "UnknownError", message: "Unknown error occurred" };
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Unknown error occurred",
    });
  });

  test("mengembalikan 403 untuk Forbidden", async () => {
    const err = { name: "Forbidden", message: "Access is forbidden" };
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Access is forbidden" });
  });

  test("mengembalikan 401 untuk JsonWebTokenError", async () => {
    const err = { name: "JsonWebTokenError" };
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid token" });
  });

  test("mengembalikan 500 untuk error lainnya", async () => {
    const err = { name: "UnknownError", message: "An unknown error occurred" };
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "An unknown error occurred",
    });
  });
});
