"use strict";

const db = require("../config/db");
const { validateFields } = require("../utils/validate");

class Sleep {
  /**
   * Convert a sleep log from the database into an sleep object that can be viewed publically.
   *
   *
   * @param {Sleep} sleep - sleep from database
   * @returns public sleep log
   */

  static async addSleep(creds) {
    const { dating, bedTime, wakeTime, userId } = creds;
    console.log("adding sleep");
    const requiredCreds = ["dating", "bedTime", "wakeTime", "userId"];

    try {
      console.log("creds sleep", creds);
      validateFields({
        required: requiredCreds,
        obj: creds,
        location: "sleep creation",
      });
    } catch (err) {
      throw err;
    }

    const result = await db.query(
      `INSERT INTO sleep (
            dating,
            bed_time,
            wake_time,
            user_id
          )
          VALUES ($1, $2, $3, $4)
          RETURNING id,
                    dating,
                    bed_time,
                    wake_time,
                    user_id
                    `,
      [dating, bedTime, wakeTime, userId]
    );

    const sleep = result.rows[0];

    return sleep;
  }

  static async getSleepById(userId) {
    const result = await db.query(
      `SELECT id,
            dating,
            bed_time,
            wake_time,       
           FROM sleep
           WHERE user_id = $1`,
      [userId]
    );
    const sleepTag = result.rows;

    return sleepTag;
  }
}

module.exports = Sleep;
