const v = new Validator();

const testCaseSchema = {
    TestCaseID: { type: "number", positive: true, integer: true, optional: true }, 
    Description: { type: "string", optional: true, max: 20000 }, 
    Input: { type: "string", optional: true, max: 100000 },
    ExpectedOutput: { type: "string", optional: true, max: 100000 },
    Weight: { type: "number", integer: true, optional: true, positive: true }, 
    Visibility: { type: "boolean" },
    MaxExecutionTime: { type: "string", optional: true, pattern: /^[0-9]+:[0-9]{2}:[0-9]{2}$/ }, // format as 'HH:MM:SS'
    Type: { type: "number", integer: true }
};

const checkTestCase = v.compile(testCaseSchema);

module.exports = checkTestCase;
