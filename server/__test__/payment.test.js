const request = require("supertest");
const app = require("../app"); // Import aplikasi Express
const { signToken } = require("../helpers/jwt"); // Import helper untuk token
const { User } = require("../models"); // Import model User

let token;

beforeAll(async () => {
  // Buat user untuk autentikasi
  const user = await User.create({
    username: "testuser",
    email: "testuser@example.com",
    password: "password123",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Buat token autentikasi
  token = signToken({ id: user.id });
});

afterAll(async () => {
  // Hapus data user setelah pengujian selesai
  await User.destroy({
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("GET /payment/midtrans", () => {
  test("berhasil mendapatkan token transaksi Midtrans", async () => {
    const res = await request(app)
      .get("/payment/midtrans")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", expect.any(String));
    expect(res.body).toHaveProperty("transactionToken", expect.any(String));
  });

  test("gagal mendapatkan token transaksi Midtrans tanpa token", async () => {
    const res = await request(app).get("/payment/midtrans");

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "token is required");
  });
});
