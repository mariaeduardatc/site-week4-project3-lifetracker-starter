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
  static _createExercise(exercise) {
    return {
      id: exercise.id,
      name: exercise.name,
      category: exercise.category,
      duration: exercise.duration,
      intensity: exercise.intensity,
      user_id: exercise.user_id
    };
  }


  static async addExercise(creds) {
    const { name, category, duration, intensity } = creds;
    console.log('adding exercise')
    const requiredCreds = [
      "name",
      "category",
      "duration",
      "intensity",
    ];

    try {
      console.log('creds exercise', creds)
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
            intensity
          )
          VALUES ($1, $2, $3, $4)
          RETURNING id,
                    name,            
                    category, 
                    duration,
                    intensity
                    `,
      [name, category, duration, intensity]
    );

    const exercise = result.rows[0];

    return exercise;
  }
}

module.exports = Exercise
