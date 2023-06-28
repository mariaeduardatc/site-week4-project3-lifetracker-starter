"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const { validateFields } = require("../utils/validate");

const { BCRYPT_WORK_FACTOR } = require("../config");

class User {
  /**
   * Convert a user from the database into a user object that can be viewed publically.
   * Don't show user's password
   *
   *
   * @param {User} user - user from database
   * @returns public user
   */
  static _createUser(user) {
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
      date: user.date,
    };
  }

  static async register(creds) {
    const { email, password, firstName, lastName, location, date } = creds;
    const requiredCreds = [
      "email",
      "password",
      "firstName",
      "lastName",
      "location",
      "date",
    ];

    try {
      validateFields({
        required: requiredCreds,
        obj: creds,
        location: "user registration",
      });
    } catch (err) {
      throw err;
    }

    const existingUserWithEmail = await User.fetchUserByEmail(email);
    if (existingUserWithEmail) {
      throw new BadRequestError(`Duplicate email: ${email}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    const normalizedEmail = email.toLowerCase();

    const result = await db.query(
      `INSERT INTO users (
            password,
            first_name,
            last_name,
            email,
            location,
            date
          )
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING id,
                    email,            
                    first_name AS "firstName", 
                    last_name AS "lastName",
                    location,
                    date
                    `,
      [hashedPassword, firstName, lastName, normalizedEmail, location, date]
    );

    const user = result.rows[0];

    return user;
  }

  static async login(creds) {
    const { email, password } = creds;
    const requiredCreds = ["email", "password"];
    try {
      validateFields({
        required: requiredCreds,
        obj: creds,
        location: "user authentication",
      });
    } catch (err) {
      throw err;
    }

    const user = await User.fetchUserByEmail(email);

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        return User._createPublicUser(user);
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  static fetchByUserEmail(user) {}
}
