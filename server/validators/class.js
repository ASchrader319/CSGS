const Validator = require("fastest-validator");

const v = new Validator();

const classSchema = {
    ClassID: { type: "number", positive: true, integer: true, optional: true }, // optional because it's auto-generated (SERIAL)
    ClassName: { type: "string", min: 1, max: 255, empty: false },
    StartDate: { type: "date", convert: true }, // convert ensures that the input is converted to a Date object
    EndDate: { type: "date", convert: true },
    ProfessorID: { type: "number", positive: true, integer: true, optional: true } // optional because it can be null
};

const checkClass = v.compile(classSchema);

module.exports = checkClass;
