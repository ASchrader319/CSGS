//this won't be used in the final product but it'll be used temporarily 
//while we wait for SSO access to be granted
const Validator = require('fastest-validator');

const v = new Validator();

const schema = {
    username: {type: "string"},
    password : {type : "string"},
    $$strict: true,
};

const checker = v.compile(schema)

module.exports = checker;