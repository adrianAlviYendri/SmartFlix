"use strict";
const axios = require("axios");
require("dotenv").config();
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          headers: {
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
          },
        }
      );

      const movies = response.data.results.map((movie) => {
        return {
          title: movie.title,
          overview: movie.overview,
          posterPath: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
          releaseDate: movie.release_date,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      });

      await queryInterface.bulkInsert("Movies", movies, {});
    } catch (error) {
      console.log("🚀 ~ up ~ error:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Movies", null, {});
  },
};
