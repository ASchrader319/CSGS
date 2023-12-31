CREATE TABLE Users (
    UserID SERIAL PRIMARY KEY,
    -- Username VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE,
    Role VARCHAR(255) NOT NULL
    --CanvasToken VARCHAR(255)
);

CREATE TABLE Classes (
    ClassID SERIAL PRIMARY KEY,
    ClassName VARCHAR(255) NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL,
    ProfessorID INTEGER REFERENCES Users(UserID)
);

CREATE TABLE Users_Classes (
    UserID INTEGER REFERENCES Users(UserID),
    ClassID INTEGER REFERENCES Classes(ClassID),
    IsGrader BOOLEAN NOT NULL,
    PRIMARY KEY (UserID, ClassID)
);

CREATE TABLE Assignments (
    AssignmentID SERIAL PRIMARY KEY,
    ClassID INTEGER REFERENCES Classes(ClassID),
    AssignmentName VARCHAR(255) NOT NULL,
    Description TEXT,
    DueDate TIMESTAMP NOT NULL
);

CREATE TABLE Submissions (
    SubmissionID SERIAL PRIMARY KEY,
    UserID INTEGER REFERENCES Users(UserID),
    FileName VARCHAR(255) NOT NULL,
    Code TEXT NOT NULL,
    Language INTEGER NOT NULL,
    Timestamp TIMESTAMP NOT NULL,
    Grade INTEGER, 
    AssignmentID INTEGER REFERENCES Assignments(AssignmentID)
);

CREATE TABLE TestCases (
    TestCaseID SERIAL PRIMARY KEY,
    Description TEXT,
    Input TEXT,
    ExpectedOutput TEXT,
    Weight INTEGER,
    Visibility BOOLEAN NOT NULL,
    MaxExecutionTime INTERVAL,
    Type INTEGER NOT NULL
);

CREATE TABLE Comments (
    CommentID SERIAL PRIMARY KEY,
    SubmissionID INTEGER REFERENCES Submissions(SubmissionID),
    UserID INTEGER REFERENCES Users(UserID),
    LineNumber INTEGER NOT NULL,
    CharNumber INTEGER NOT NULL,
    HighlightLength INTEGER NOT NULL,
    CommentText TEXT NOT NULL,
    Timestamp TIMESTAMP NOT NULL
);

CREATE TABLE SubmissionTestCaseResults (
    ResultID SERIAL PRIMARY KEY,
    SubmissionID INTEGER REFERENCES Submissions(SubmissionID),
    TestCaseID INTEGER REFERENCES TestCases(TestCaseID),
    Status INTEGER NOT NULL,
    ExecutionTime INTERVAL,
    MemoryUsed VARCHAR(255)
);

CREATE TABLE OriginalFiles (
    FileID SERIAL PRIMARY KEY,
    TestCaseID INTEGER REFERENCES TestCases(TestCaseID) NULL,
    AssignmentID INTEGER REFERENCES Assignments(AssignmentID),
    FilePath VARCHAR(255) NOT NULL,
    FileType INTEGER NOT NULL
);


CREATE TABLE Rubrics (
    RubricID SERIAL PRIMARY KEY,
    AssignmentID INTEGER REFERENCES Assignments(AssignmentID)
);


CREATE TABLE RubricItems (
    RubricItemID SERIAL PRIMARY KEY,
    RubricID INTEGER REFERENCES Rubrics(RubricID),
    Description TEXT NOT NULL,
    MaxPoints DECIMAL NOT NULL  -- DECIMAL type allows for non-integer values
);


CREATE TABLE ManualGrades (
    ManualGradeID SERIAL PRIMARY KEY,
    SubmissionID INTEGER REFERENCES Submissions(SubmissionID),
    RubricItemID INTEGER REFERENCES RubricItems(RubricItemID),
    Score DECIMAL NOT NULL
);

INSERT INTO Users (Password, Email, Role) VALUES ('password', 'test@test.com', 'test');

