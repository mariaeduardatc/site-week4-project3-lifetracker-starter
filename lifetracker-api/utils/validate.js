const { UnprocessableEntityError } = require("./error")

const isNil = (value) => value === null || typeof value === "undefined" || String(value).trim() === ""

const validateFields = ({ required, obj, location }) => {
  if (!obj) throw new UnprocessableEntityError(`Missing object for validation.`)

  required.forEach((item) => {
    console.log(item)
    if (isNil(obj[item])) {
      throw new UnprocessableEntityError(`Required field - ${item} missing${location ? ` at ${location}` : ""}`)
    }
  })
}

module.exports = { validateFields, isNil }