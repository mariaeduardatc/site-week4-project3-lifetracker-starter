"use strict";

const db = require("../config/db");
const { validateFields } = require("../utils/validate");

class Exercise {
  /**
   * Convert a exercise from the database into an exercise object that can be viewed publically.
   *
   *
   * @param {Exercise} exercise - exercise from database
   * @returns public exercise
   */
  // static _createExercise(exercise) {
  //   return {
  //     id: exercise.id,
  //     name: exercise.name,
  //     category: exercise.category,
  //     duration: exercise.duration,
  //     intensity: exercise.intensity,
  //     user_id: exercise.user_id
  //   };
  // }

  static async addExercise(creds) {
    const { name, category, duration, intensity, userId } = creds;
    console.log("adding exercise");
    const requiredCreds = ["name", "category", "duration", "intensity", "userId"];

    try {
      console.log("creds exercise", creds);
      validateFields({
        required: requiredCreds,
        obj: creds,
        location: "exercise creation",
      });
    } catch (err) {
      throw err;
    }

    const result = await db.query(
      `INSERT INTO exercise (
            name,
            category,
            duration,
            intensity,
            user_id
          )
          VALUES ($1, $2, $3, $4, $5)
          RETURNING id,
                    name,            
                    category, 
                    duration,
                    intensity,
                    user_id
                    `,
      [name, category, duration, intensity, userId]
    );

    const exercise = result.rows[0];

    return exercise;
  }

  static async getExerciseById(userId) {
    console.log(userId,'models')
    const result = await db.query(
      `SELECT id,
              name, 
              category,
              duration,
              intensity       
           FROM exercise
           WHERE user_id = $1`,
      [userId]
    );
    const exercises = result.rows;

    return exercises;
  }
}

module.exports = Exercise;
