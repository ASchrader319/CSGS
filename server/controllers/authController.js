const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

// Causes weird error in docker
// const bcrypt = require('bcrypt');

const User = require('../models/userModel');

exports.register = async (req, res) => {
    try {
      const { email, password, role } = req.body;
      
      if (!password || !email || !role) {
        return res.status(400).json({ message: 'All fields are required: email, password & role' });
      }

      const passwordRegex = [
        { regex: /(?=.*[A-Z])/, message: 'Password must contain at least one uppercase letter' },
        { regex: /(?=.*[a-z])/, message: 'Password must contain at least one lowercase letter' },
        { regex: /(?=.*[0-9])/, message: 'Password must contain at least one number' },
        { regex: /(?=.*[^A-Za-z0-9])/, message: 'Password must contain at least one special character' },
        { regex: /^.{6,}$/, message: 'Password must be at least 6 characters long' }
      ];
  
      const invalidPasswordMessages = passwordRegex
        .filter(({ regex }) => !regex.test(password))
        .map(({ message }) => message);
  
      if (invalidPasswordMessages.length > 0) {
        return res.status(400).json({ message: invalidPasswordMessages.join('. ') });
      }
  
      // Hash password before storing it - not working with docker
      // const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user in db
      const user = await User.createUser(email, password, role);
      // Generate jwt
      const token = jwt.sign({ userId: user.userid, role: user.role }, secretKey, { expiresIn: '72h' }); // Expires in 2 hours
  
      // Return user info in jwt
      res.status(201).json({ message: 'User registered successfully', token: token });
      
    } catch (err) {
      res.status(500).json({ message: 'Error registering user', "error": err.message});
      console.error('Error registering user [/server/controllers/authController.js : register]\n', err);
    }
  };

  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!password || !email) {
        return res.status(400).json({ message: 'All fields are required: email & password' });
      }
  
      // Hash password before storing it - not working with docker
      // const hashedPassword = await bcrypt.hash(password, 10);

      // Try login
      const user = await User.login(email, password);

      // Generate jwt
      const token = jwt.sign({ userId: user.userid, role: user.role }, secretKey, { expiresIn: '72h' }); // Expires in 2 hours
  
      // Return user info in jwt
      res.status(201).json({ message: 'User successfully logged in', token: token });
      
    } catch (err) {
      if(err.message === 'Error: Invalid email or password')
        return res.status(500).json({ message: 'Invalid email or password'});

      res.status(500).json({ message: "Error logging in"});
      console.error('Error logging user in [/server/controllers/authController.js : login]\n', err);
    }
  };



exports.getValidJWT = async (req,res) => {
    
    const payload = { id: 1};

    const token = jwt.sign(payload, secretKey, { expiresIn: '72h' });

    return res.status(201).json({token: token});
}

exports.decodeJWT = (req, res) => {
    
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader)
          throw new Error("Please pass jwt in the Authorization header");

        const token = authHeader.split(' ')[1];

        if (!token)
          throw new Error("Please pass jwt in the Authorization header as 'Barer [jwt]'")

        const decoded = jwt.verify(token, secretKey);

        return res.status(200).json({ decoded: decoded });

    } catch (err) {
        return res.status(401).json({ message: 'Forbidden - Invalid token', error: err.message});
    }
  };