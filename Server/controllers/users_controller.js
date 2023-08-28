const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports.create = async function (req, res) {
    // console.log(req.body);
    if (req.body.password != req.body.confirm) {
        return res.status(422).json({
            data: {
                message: "Passwords didn't match",
            }
        });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            await User.create({
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
            });
            return res.status(200).json({
                data:{
                    message: 'the user is created successfully',
                }
            });
        } else {
            return res.status(422).json({
                data: {
                    message: "This user email already exists",
                }
            });
        }
    } catch (error) {
        console.log('Error in creating user: ', error);
        return res.status(500).json({
            data: {
                message: "Error in creating user",
            }
        });
    }

}

module.exports.createSession = async function(req, res){
    try {
        let user = await User.findOne({email: req.body.email});    
        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message:"Invalid username or password"
            });
        }

        return res.status(200).json({
            message: 'Sign in successful, here is your token, please keep it safe',
            data:{
                token: jwt.sign(user.toJSON(), 'blahSomething', {expiresIn: '100000'})
            }
        })

    } catch (error) {
        console.log("Error in creating session: ", error);
        return res.status(500).json({
            data:{
                message: 'Internal server error',
            }
        });
    }
}