"use strict";

const db = require("../config/db");
const bcrypt = require("bcrypt");
const { BadRequestError, UnauthorizedError } = require("../utils/error");
const { validateFields } = require("../utils/validate");

const { BCRYPT_WORK_FACTOR } = require("../config/config");

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
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password
    };
  }

  static async register(creds) {
    const { email, username, password, firstName, lastName } = creds;
    console.log('registering')
    const requiredCreds = [
      "email",
      "username",
      "password",
      "firstName",
      "lastName",
    ];

    try {
      console.log('creds', creds)
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
            username,
            first_name,
            last_name,
            email
          )
          VALUES ($1, $2, $3, $4, $5)
          RETURNING id,
                    email,            
                    first_name AS "firstName", 
                    last_name AS "lastName"
                    `,
      [hashedPassword, username, firstName, lastName, normalizedEmail]
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
        return User._createUser(user);
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  static async fetchUserByEmail(email) {
    const result = await db.query(
      `SELECT id,
              email, 
              password,
              first_name AS "firstName",
              last_name AS "lastName"       
           FROM users
           WHERE email = $1`,
      [email.toLowerCase()]
    );
    const user = result.rows[0];
  
    return user;  
  
  }
}
module.exports = User