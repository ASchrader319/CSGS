const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;


exports.getValidJWT = async (req,res) => {
    
    const payload = { id: 1};

    const token = jwt.sign(payload, secretKey, { expiresIn: '72h' });

    return res.status(201).json({token: token});
}

exports.validateJWT = (req, res) => {
    
    try {
        const authHeader = req.headers.authorization;

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, secretKey);

        return res.status(200).json({ decoded: decoded });

    } catch (err) {
        console.error('Error validating token:', err.message);
        return res.status(401).json({ message: 'Forbidden - Invalid token', error: err.message});
    }
  };