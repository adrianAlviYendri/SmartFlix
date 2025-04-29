"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsToMany(models.User, {
        through: models.Favorite,
        foreignKey: "MovieId",
        otherKey: "UserId",
      });
    }
  }
  Movie.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Title cannot be empty" },
          notNull: { msg: "Title is required" },
        },
      },
      overview: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Overview cannot be empty" },
          notNull: { msg: "Overview is required" },
        },
      },
      posterPath: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Poster path cannot be empty" },
          notNull: { msg: "Poster path is required" },
          isUrl: { msg: "Poster path must be a valid URL" },
        },
      },
      releaseDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Release date cannot be empty" },
          notNull: { msg: "Release date is required" },
          isDate: { msg: "Release date must be a valid date" },
        },
      },
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  return Movie;
};
