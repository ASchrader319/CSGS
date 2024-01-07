const authenticateInstructor = (req, res, next) => {
    
    if(req.user) {
        if(req.user.role === "instructor") {
            next();
        }
        else {
            return res.sendStatus(403);
        }
    }
    res.sendStatus(401);
  };


module.exports = authenticateInstructor;