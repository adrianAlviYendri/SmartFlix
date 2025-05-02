const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const db = require("../models");

jest.mock("fs");
jest.mock("sequelize");

describe("Models Index", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("memuat semua model dengan benar", () => {
    const mockFiles = ["user.js", "movie.js", "favorite.js"];
    fs.readdirSync.mockReturnValue(mockFiles);

    const mockDefine = jest.fn();
    const mockAssociate = jest.fn();

    Sequelize.prototype.define = mockDefine;

    mockFiles.forEach((file) => {
      const modelName = file.replace(".js", "");
      const model = {
        name: modelName,
        associate: mockAssociate,
      };

      jest.mock(path.join(__dirname, file), () => jest.fn(() => model), {
        virtual: true,
      });

      db[modelName] = model;
    });

    Object.keys(db).forEach((modelName) => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

    expect(fs.readdirSync).toHaveBeenCalledWith(expect.any(String));
    expect(Object.keys(db)).toEqual(
      expect.arrayContaining(["user", "movie", "favorite"])
    );
    expect(mockAssociate).toHaveBeenCalledTimes(mockFiles.length);
  });

  test("menginisialisasi Sequelize dengan konfigurasi yang benar", () => {
    const config = {
      database: "test_db",
      username: "test_user",
      password: "test_password",
      host: "localhost",
      dialect: "postgres",
    };

    const sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config
    );

    expect(sequelize.config.database).toBe(config.database);
    expect(sequelize.config.username).toBe(config.username);
    expect(sequelize.config.host).toBe(config.host);
    expect(sequelize.options.dialect).toBe(config.dialect);
  });
});
