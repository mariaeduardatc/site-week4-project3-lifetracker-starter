"use strict";

const db = require("../config/db");
const { validateFields } = require("../utils/validate");

class Nutrition {
  /**
   * Convert a Nutrition log from the database into an Nutrition object that can be viewed publically.
   *
   *
   * @param {Nutrition} nutrition - nutrition from database
   * @returns public nutrition log
   */

  static async addNutrition(creds) {
    const { name, category, calories, imageUrl, userId } = creds;
    console.log("adding nutrition");
    const requiredCreds = ["name", "category", "calories", "imageUrl", "userId"];

    try {
      console.log("creds nutrition", creds, requiredCreds);
      validateFields({
        required: requiredCreds,
        obj: creds,
        location: "nutrition creation",
      });
    } catch (err) {
      throw err;
    }

    const result = await db.query(
      `INSERT INTO nutrition (
            name,
            category,
            calories,
            image_url,
            user_id
          )
          VALUES ($1, $2, $3, $4, $5)
          RETURNING id,
                    name,
                    category,
                    calories,
                    image_url,
                    user_id
                    `,
      [name, category, calories, imageUrl, userId]
    );

    const nutrition = result.rows[0];

    return nutrition;
  }

  static async getNutritionById(userId) {
    const result = await db.query(
      `SELECT id,
            name,
            category,
            calories,
            image_url       
           FROM nutrition
           WHERE user_id = $1`,
      [userId]
    );
    const nutritionTag = result.rows;

    return nutritionTag;
  }
}

module.exports = Nutrition;
