require("dotenv").config()

function convertPayloadToJWT(payload) {
    // Step 1: Convert the payload to a JSON string
    const payloadString = JSON.stringify(payload);
  
    // Step 2: Encode the payload string into base64 format
    const encodedPayload = Buffer.from(payloadString).toString('base64');
  
    // Step 3: Create a JWT using the encoded payload
    const secretKey = process.env.SECRET_KEY; // Replace with your secret key
    const algorithm = 'HS256'; // Replace with the desired algorithm
  
    const jwt = encodeJWT(encodedPayload, secretKey, algorithm);
  
    return jwt;
  }
  
// Helper function to encode the JWT
function encodeJWT(payload, secretKey, algorithm) {
    // Implement the encoding logic based on the chosen JWT library or algorithm
    // Here's an example using the `jsonwebtoken` library
    const jwt = require('jsonwebtoken');

    const options = {
        algorithm: algorithm
    };

    const encodedJWT = jwt.sign(payload, secretKey, options);
    return encodedJWT;
}


function decodeJWTAndValidate(jwt) {
    const secretKey = 'your_secret_key'; // Replace with your secret key
  
    try {
      // Step 1: Decode the JWT to extract the payload
      const decodedPayload = decodeJWT(jwt, secretKey);
  
      // Step 2: Convert the payload from base64 to a JSON string
      const payloadString = Buffer.from(decodedPayload, 'base64').toString('utf-8');
  
      // Step 3: Parse the JSON string to get the payload as a JSON object
      const payload = JSON.parse(payloadString);
  
      return payload;
    } catch (error) {
      console.error('Invalid JWT:', error.message);
      return null;
    }
  }
  
// Helper function to decode the JWT
function decodeJWT(jwt, secretKey) {
    // Implement the decoding logic based on the chosen JWT library or algorithm
    // Here's an example using the `jsonwebtoken` library
    const jwt = require('jsonwebtoken');

    const decodedJWT = jwt.verify(jwt, secretKey);
    return decodedJWT;
}


module.exports = {convertPayloadToJWT, decodeJWTAndValidate}