const Validator = require("fastest-validator");

const v = new Validator();

const commentSchema = {
    CommentID: { type: "number", positive: true, integer: true, optional: true }, 
    SubmissionID: { type: "number", positive: true, integer: true },
    UserID: { type: "number", positive: true, integer: true },
    LineNumber: { type: "number", positive: true, integer: true },
    CharNumber: { type: "number", positive: true, integer: true },
    HighlightLength: { type: "number", positive: true, integer: true },
    CommentText: { type: "string", min: 1, max: 10000 }, 
    Timestamp: { type: "date", convert: true } // TIMESTAMP type; converts string or number to Date
};

const checkComment = v.compile(commentSchema);

module.exports = checkComment;
