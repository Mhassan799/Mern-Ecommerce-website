const jwt = require('jsonwebtoken')
const User = require('../model/userModel')

const secretKey = "hassan"
const jwtConfig = {
    sign(payload){
        const token = jwt.sign(payload,secretKey)
        return token

    },
  
    verifyToken(req, res, next) {
        const token = req.headers.authorization?.split(' ')[1];
    
        if (!token) {

          return res.status(401).json({ message:'No token provided'});
        }
    
        try {
          const decoded = jwt.verify(token,secretKey);
          console.log(decoded)
          req.userId = decoded.userId; // Add the decoded payload to the request object
          next();
        } catch (error) {
          return res.status(401).json({ message: 'Invalid token' });
        }
      }, 

      async isAdmin (req,res,next){
          try {
            const user = await User.findById(req.userId);
            // console.log('Fetching user with ID:', req.userId);

            // if (!user) {
            //     return res.status(404).send({
            //         success: false,
            //         message: "User not found"
            //     });
            // }
            
            if (user.role !== 1) {
                return res.status(401).send({
                    success: false,
                    message: "Unauthorized user access"
                });
            }


            
            next();
            
          }
          
              
           catch (error) {
              console.log(error)
              res.status(500).send({
                success: false,
                error: error.message,
                message: "Error in admin middleware",
            });
            
              }
          }
      }
      



module.exports = jwtConfig