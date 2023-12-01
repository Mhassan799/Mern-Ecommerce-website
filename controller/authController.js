const bcrypt = require('bcryptjs')
const User = require('../model/userModel')
const jwt = require('../utils/jwt')


const authController ={

    async register (req,res){
        try{
            const { name,email,password,phone,answer} = req.body;
            if (!name||!email||!password||!phone || !answer){
              return res.status(400).json({message:"all fields required"})
            }
            // Check if the user already exists
            const exitingUser = await User.findOne({email});
            if (exitingUser)
            {
                return res.status(400).json({message:"email already exist"})
            }
              // Hash the password
              const salt = await bcrypt.genSalt(10);
              const hashPaswd = await bcrypt.hash(password,salt)
              //create user
              const newUser = new User({
                name,
                email,
                password:hashPaswd,
                phone,
                answer
              })
              await newUser.save()
              res.status(201).json({message:"User reggistered"})
             
            //   const token = jwt.sign(req.body)
            //   res.json({token})
        }
        catch(error){
                res.status(500).json({message:"internal server error",error:error.message})
        }
        
    },

    async login(req,res){
        try{
        const {email , password} = req.body;

        // find user 

        const user = await User.findOne({email})
        console.log(user)

        if(!user){
            return res.status(400).json({messege:"email does not exist/ invalid eail or password"})
        }
        // compare passwordd 
        const isPassword = await bcrypt.compare(password, user.password);
        if(!isPassword){
            return res.status(400).json({messege:"wrong password"})
        }
        // generate jwt token 
        const token = jwt.sign({ userId: user._id, email: user.email });

        res.json({ token, user })

    }
    catch(error){
        return res.status(500).json({message:"internal server error",error:error.message})
        
    }
},
        async testController(req,res){
            try{
                res.send("protected routes")
            }
            catch(error){
                console.log(erorr)
                ressend({error})
            }
        },
        async forgotPassword(req,res){

            try{
            const { email,answer, newPassword} = req.body;

                if(!email || !answer|| !newPassword){
                    res.status(400).send({message: "all feilds are required"})
                }
                const user = await User.findOne({email,answer})
                if(!user){
                    return res.status(404).send({
                        success:false,
                        message:"wrong email or answer"
                    })
                }
                const hashed = await hashPswd(newPassword);

                await User.findByIdAndUpdate(user._id, {password:hashed});
                res.status(200).send({
                    success:true,
                    message:"passwrd reset succesfully"
                })
            } catch(error){
                console.log(error)
                res.status(500).send({
                    success:false,
                    message:"something went wrong",
                    error,
                })

            }
        },
        async UpdateProfile(req,res){
                            try {
                    const { name, email, password,  phone } = req.body;
                    const user = await User.findById(req.user._id);
                    //password
                    if (password && password.length < 6) {
                      return res.json({ error: "Passsword is required and 6 character long" });
                    }
                 const salt = await bcrypt.genSalt(10);
                              const hashPaswd = await bcrypt.hash(password,salt)
                    const updatedUser = await User.findByIdAndUpdate(
                      req.user._id,
                      {
                        name: name || user.name,
                        password: hashPaswd || user.password,
                        phone: phone || user.phone,
                        
                      },
                      { new: true }
                    );
                    res.status(200).send({
                      success: true,
                      message: "Profile Updated SUccessfully",
                      updatedUser,
                    });
                            }
                            catch(error){
                                console.log(error)
                                res.status(500).send({
                                    success:false,
                                    message:"error in updating",
                                    error
                                })
                            }
        },
}


module.exports = authController;
// module.exports = isAdmin;
