if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const { User, Movie, Favorite } = require("./models");
const { signToken } = require("./helpers/jwt");
const { comparePassword, hashPassword } = require("./helpers/bcrypt");
const errorHandler = require("./middleware/error-handler");
const authentication = require("./middleware/authentication");
const { getMovieRecommendation } = require("./services/gemini");
const { Op } = require("sequelize");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res, next) => {
  try {
    let { username, email, password } = req.body;

    let user = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({
      message: "Register succesfully",
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    console.log("🚀 ~ app.post ~ error:", error);
    next(error);
  }
});

app.post("/login", async (req, res, next) => {
  try {
    let { email, password } = req.body;

    if (!email) {
      throw {
        name: "BadRequest",
        message: "login failed, please input your email",
      };
    }

    if (!password) {
      throw {
        name: "BadRequest",
        message: "login failed, please input your password",
      };
    }

    let user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw { name: "Unauthorized", message: "Invalid email" };
    }

    const isValidPassword = comparePassword(password, user.password);

    if (!isValidPassword) {
      throw { name: "Unauthorized", message: "Invalid password" };
    }

    const access_token = signToken({ id: user.id });

    res.status(200).json({ message: "succes login", access_token });
  } catch (error) {
    console.log("🚀 ~ app.get ~ error:", error);
    next(error);
  }
});

app.post("/google-login", async (req, res, next) => {
  try {
    const { googleToken } = req.body;

    if (!googleToken) {
      throw { name: "BadRequest", message: "Token google must be filed" };
    }

    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      throw { name: "BadRequest", message: "Token Google invalid" };
    }

    const [user, created] = await User.findOrCreate({
      where: {
        email: payload.email,
      },
      defaults: {
        username: payload.name || "Google User",
        email: payload.email,
        password: hashPassword("google_id"),
      },
      hooks: false,
    });

    const access_token = signToken({ id: user.id });

    res
      .status(created ? 201 : 200)
      .json({ message: "succes login with google", access_token });
  } catch (error) {
    console.log("🚀 ~ app.post ~ error:", error);
    next(error);
  }
});

app.get("/public", async (req, res, next) => {
  try {
    const { search } = req.query;

    let whereCondition = {};
    if (search) {
      whereCondition.title = { [Op.iLike]: `%${search}%` };
    }

    let movies = await Movie.findAll({
      where: search ? whereCondition : {},
    });
    res.status(200).json(movies);
  } catch (error) {
    console.log("🚀 ~ GET /movies ~ error:", error);
    next(error);
  }
});

app.use(authentication);

app.get("/movies", async (req, res, next) => {
  try {
    let movies = await Movie.findAll();
    res.status(200).json(movies);
  } catch (error) {
    console.log("🚀 ~ GET /movies ~ error:", error);
    next(error);
  }
});

app.post("/favorites/:MovieId", async (req, res, next) => {
  try {
    const { MovieId } = req.params;

    const UserId = req.user.id;

    const movie = await Movie.findByPk(MovieId);
    if (!movie) {
      throw { name: "NotFound", message: "Movie not found" };
    }

    const isFavorited = await Favorite.findOne({
      where: {
        UserId,
        MovieId,
      },
    });

    if (isFavorited) {
      return res.status(200).json({ message: "Movie already favorited" });
    }

    await Favorite.create({ UserId, MovieId });
    res.status(201).json({ message: "Added to favorites" });
  } catch (error) {
    console.error("🚀 ~ error:", error);
    next(error);
  }
});

app.get("/favorites", async (req, res, next) => {
  try {
    const UserId = req.user.id;

    const favorites = await Favorite.findAll({
      where: { UserId },
      include: {
        model: Movie,
      },
    });

    res.status(200).json(favorites);
  } catch (error) {
    console.log("🚀 ~ error:", error);
    next(error);
  }
});

app.delete("/favorites/:MovieId", async (req, res, next) => {
  try {
    const { MovieId } = req.params;
    console.log("🚀 ~ app.delete ~ MovieId:", MovieId);
    const UserId = req.user.id;
    console.log("🚀 ~ app.delete ~ UserId:", UserId);

    const favorite = await Favorite.findOne({ where: { MovieId, UserId } });

    if (!favorite) {
      throw { name: "NotFound", message: "Favorite not found" };
    }

    await favorite.destroy();

    res.status(200).json({ message: "Favorite deleted successfully" });
  } catch (error) {
    next(error);
  }
});

app.get("/profile", async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId, {
      attributes: ["username"],
    });

    res.status(200).json(user);
  } catch (error) {
    console.log("🚀 ~ error:", error);
    next(error);
  }
});

app.put("/profile", async (req, res, next) => {
  try {
    const { username } = req.body;
    const userId = req.user.id;

    if (!username) {
      throw { name: "BadRequest", message: "Username is required" };
    }

    const user = await User.findByPk(userId);

    await user.update({ username });

    res
      .status(200)
      .json({ message: "Username updated successfully", username });
  } catch (error) {
    console.log("🚀 ~ error:", error);
    next(error);
  }
});

app.post("/recommend", async (req, res, next) => {
  try {
    const { preferences } = req.body;

    if (!preferences) {
      throw { name: "BadRequest", message: "Preferences are required" };
    }

    const recommendations = await getMovieRecommendation(preferences);
    res.status(200).json(recommendations);
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);

module.exports = app;
