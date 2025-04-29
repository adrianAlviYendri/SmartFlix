const request = require("supertest");
const app = require("../app"); // Import express app
const { sequelize, Movie, User, Favorite } = require("../models"); // Import Sequelize instance & User model
const {
  test,
  expect,
  describe,
  beforeAll,
  afterAll,
} = require("@jest/globals");
const { hashPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

let token;
let movieId;
let userId;

beforeAll(async () => {
  const user = await User.create({
    username: "testuser",
    email: "testuser@example.com",
    password: "password123",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  userId = user.id;
  token = signToken({ id: user.id });

  const movie = await Movie.create({
    title: "Test Movie",
    overview: "This is a test movie",
    posterPath: "https://image.tmdb.org/t/p/original/test.jpg",
    releaseDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  movieId = movie.id;
});

afterAll(async () => {
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await Movie.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await Favorite.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("POST /register", () => {
  test("berhasil register", async () => {
    const res = await request(app).post("/register").send({
      username: "johndoe",
      email: "johndoe@example.com",
      password: "password123",
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "Register succesfully");
    expect(res.body).toHaveProperty("id", 2);
    expect(res.body).toHaveProperty("email", "johndoe@example.com");
  });

  test("register gagal kerna email kosong", async () => {
    const res = await request(app).post("/register").send({
      username: "johndoe",
      email: "",
      password: "password123",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "email cannot be empty");
  });

  test("register gagal kerna email null", async () => {
    const res = await request(app).post("/register").send({
      username: "johndoe",
      email: null,
      password: "password123",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "email is required");
  });

  test("register gagal karna email sudah terdaftar", async () => {
    const res = await request(app).post("/register").send({
      username: "johndoe",
      email: "johndoe@example.com",
      password: "password123",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "email must be unique");
  });

  test("register gagal karna it is not email", async () => {
    const res = await request(app).post("/register").send({
      username: "johndoe",
      email: "johndoexample.com",
      password: "password123",
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty(
      "message",
      "email must be a valid email address"
    );
  });
  test("register gagal karna username kosong", async () => {
    const res = await request(app).post("/register").send({
      username: "",
      email: "johndoexample.com",
      password: "password123",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "username cannot be empty");
  });
  test("register gagal karna username null", async () => {
    const res = await request(app).post("/register").send({
      username: null,
      email: "johndoexample.com",
      password: "password123",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "username is required");
  });
  test("register gagal karna username kurang dari 3", async () => {
    const res = await request(app).post("/register").send({
      username: "jo",
      email: "johndoexample.com",
      password: "password123",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty(
      "message",
      "username must be between 3 and 50 characters"
    );
  });
  test("register gagal karna password kosong", async () => {
    const res = await request(app).post("/register").send({
      username: "johndoe",
      email: "johndo@example.com",
      password: "",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "password cannot be empty");
  });
  test("register gagal karna password null", async () => {
    const res = await request(app).post("/register").send({
      username: "johndoe",
      email: "johndo@example.com",
      password: null,
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "password is required");
  });
  test("register gagal karna password kurang dari 5", async () => {
    const res = await request(app).post("/register").send({
      username: "johndoe",
      email: "johndo@example.com",
      password: "pass",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty(
      "message",
      "password must be at least 5 characters"
    );
  });
});

describe("POST /login", () => {
  test("berhasil login", async () => {
    const res = await request(app).post("/login").send({
      email: "johndoe@example.com",
      password: "password123",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "succes login");
    expect(res.body).toHaveProperty("access_token", expect.any(String));
  });
  test("gagal login karna email kosong", async () => {
    const res = await request(app).post("/login").send({
      email: "",
      password: "password123",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty(
      "message",
      "login failed, please input your email"
    );
  });
  test("gagal login karna password kosong", async () => {
    const res = await request(app).post("/login").send({
      email: "johndoe@example.com",
      password: "",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty(
      "message",
      "login failed, please input your password"
    );
  });
  test("gagal login karna invalid email", async () => {
    const res = await request(app).post("/login").send({
      email: "johndoeexample.com",
      password: "password123",
    });
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Invalid email");
  });
  test("gagal login karna invalid password", async () => {
    const res = await request(app).post("/login").send({
      email: "johndoe@example.com",
      password: "password",
    });
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Invalid password");
  });
});

describe("POST /google-login", () => {
  test("gagal google login karna token invalid", async () => {
    const res = await request(app).post("/google-login").send({
      googleToken: "",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Token google must be filed");
  });
});

describe("GET /public", () => {
  test("berhasil get data public", async () => {
    const res = await request(app).get("/public");
    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty("id", expect.any(Number));
    expect(res.body[0]).toHaveProperty("title", expect.any(String));
    expect(res.body[0]).toHaveProperty("overview", expect.any(String));
    expect(res.body[0]).toHaveProperty("posterPath", expect.any(String));
    expect(res.body[0]).toHaveProperty("releaseDate", expect.any(String));
  });
});

describe("GET /movies", () => {
  test("berhasil get data movie", async () => {
    const res = await request(app)
      .get("/movies")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body[0]).toHaveProperty("id", expect.any(Number));
    expect(res.body[0]).toHaveProperty("title", expect.any(String));
    expect(res.body[0]).toHaveProperty("overview", expect.any(String));
    expect(res.body[0]).toHaveProperty("posterPath", expect.any(String));
    expect(res.body[0]).toHaveProperty("releaseDate", expect.any(String));
  });
});

describe("POST /favorites/:MovieId", () => {
  test("berhasil menambahkan film ke favorit", async () => {
    const res = await request(app)
      .post(`/favorites/${movieId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "Added to favorites");
  });

  test("gagal menambahkan film karena MovieId tidak ditemukan", async () => {
    const res = await request(app)
      .post(`/favorites/99999`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Movie not found");
  });

  test("gagal menambahkan film yang sudah ada di favorit", async () => {
    const res = await request(app)
      .post(`/favorites/${movieId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Movie already favorited");
  });

  test("gagal menambahkan film ke favorit tanpa token", async () => {
    const res = await request(app).post(`/favorites/${movieId}`);

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "token is required");
  });
});

describe("GET /favorites", () => {
  test("berhasil mendapatkan daftar film favorit", async () => {
    const res = await request(app)
      .get("/favorites")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty("UserId", expect.any(Number));
      expect(res.body[0]).toHaveProperty("MovieId", expect.any(Number));
      expect(res.body[0]).toHaveProperty("Movie");
      expect(res.body[0].Movie).toHaveProperty("title", expect.any(String));
      expect(res.body[0].Movie).toHaveProperty("overview", expect.any(String));
      expect(res.body[0].Movie).toHaveProperty(
        "posterPath",
        expect.any(String)
      );
      expect(res.body[0].Movie).toHaveProperty(
        "releaseDate",
        expect.any(String)
      );
    }
  });

  test("gagal mendapatkan daftar film favorit tanpa token", async () => {
    const res = await request(app).get("/favorites");

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "token is required");
  });
});

describe("DELETE /favorites/:MovieId", () => {
  test("berhasil menghapus film dari favorit", async () => {
    const res = await request(app)
      .delete(`/favorites/${movieId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Favorite deleted successfully");
  });

  test("gagal menghapus film yang tidak ada di favorit", async () => {
    const res = await request(app)
      .delete(`/favorites/99999`) // ID film yang tidak ada
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Favorite not found");
  });

  test("gagal menghapus film dari favorit tanpa token", async () => {
    const res = await request(app).delete(`/favorites/${movieId}`);

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "token is required");
  });
});

describe("GET /profile", () => {
  test("berhasil mendapatkan profil pengguna", async () => {
    const res = await request(app)
      .get("/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("username", expect.any(String));
  });

  test("gagal mendapatkan profil tanpa token", async () => {
    const res = await request(app).get("/profile");

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "token is required");
  });
});

describe("PUT /profile", () => {
  test("berhasil mengupdate username", async () => {
    const res = await request(app)
      .put("/profile")
      .set("Authorization", `Bearer ${token}`)
      .send({ username: "newUsername" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Username updated successfully");
    expect(res.body).toHaveProperty("username", "newUsername");
  });

  test("gagal mengupdate username tanpa token", async () => {
    const res = await request(app)
      .put("/profile")
      .send({ username: "newUsername" });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "token is required");
  });

  test("gagal mengupdate username tanpa mengirimkan username", async () => {
    const res = await request(app)
      .put("/profile")
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Username is required");
  });
});

describe("POST /recommend gagal", () => {
  test("gagal mendapatkan rekomendasi film tanpa preferences", async () => {
    const res = await request(app)
      .post("/recommend")
      .set("Authorization", `Bearer ${token}`)
      .send({});

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Preferences are required");
  });
});

describe("POST /recommend berhasil", () => {
  test("berhasil mendapatkan rekomendasi film", async () => {
    const res = await request(app)
      .post("/recommend")
      .set("Authorization", `Bearer ${token}`)
      .send({ preferences: "action" });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty("title", expect.any(String));
      expect(res.body[0]).toHaveProperty("genre", expect.any(String));
      expect(res.body[0]).toHaveProperty("description", expect.any(String));
      expect(res.body[0]).toHaveProperty("year", expect.any(String));
      expect(res.body[0]).toHaveProperty("rating", expect.any(String));
    }
  }, 10000);
});
