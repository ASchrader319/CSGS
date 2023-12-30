const Validator = require("fastest-validator");

const v = new Validator();

const userSchema = {
    UserID: { type: "number", positive: true, integer: true, optional: true }, // optional because it's auto-generated
    Password: { type: "string", min: 6, max: 255 },
    Email: { type: "email", max: 255 },
    Role: { type: "string", min: 3, max: 255 },
    $$strict: true // don't allow additional properties
};

const checkUser = v.compile(userSchema);

module.exports = checkUser;
