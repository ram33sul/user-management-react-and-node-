const User = require('../model/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
const fs = require('fs');

module.exports = {
    signup: async (req,res) => {
        const { name, username, email, phone, password } = req.body;
        if(!(name && username && email && phone && password)){
            return res.status(400).send("All inputs are required");
        }
        const oldUser1 = await User.findOne({ email });
        const oldUser2 = await User.findOne({ username });
        if(!(oldUser1 || oldUser2)){
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                name,
                username: username.toLowerCase(),
                email: email.toLowerCase(),
                phone,
                password: hashedPassword,
            });
            const token = jwt.sign(
                { 
                    userId: user._id,
                    username, 
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn: '2h',
                }
            )
            return res.status(201).json({user,token});
        }
        else if(oldUser1){
            return res.status(409).send("email already exists");
        }
        else if(oldUser2){
            return res.status(409).send("username already exists");
        }
    },
    login : async (req, res) => {
        console.log(req.body);
        const { username, password } = req.body;
        if(!(username && password)){
            return res.status(400).send("all inputs are required");
        }
        const user = await User.findOne({ username });
        if(user && (await bcrypt.compare(password, user.password))){
            const token = jwt.sign(
                {
                    userId: user._id,
                    username,
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn: '2h',
                }
            )
            return res.status(200).json({ user, token});
        }
        return res.status(401).send("username or password is incorrect");
    },

    editProfile: async (req,res) => {
        console.log("hi");
        console.log(req.files);
        if(req.files){
            const imageName = '../frontend/public/images/'+req.body.username+'.png';
            const images = await req.files.image;
            images.mv(imageName, (err) => {
                if(err){
                    console.log(err);
                    return res.status(400).send("image cannot be uploaded");
                }
            });
    
        }
        const { name, username, email, phone } = req.body;
        if(!(name && username && email && phone)){
            return res.status(400).send("All inputs are required");
        }
        try {
            await User.updateOne({username},{
                name,
                username: username.toLowerCase(),
                email: email.toLowerCase(),
                phone,
            });
            const user = await User.findOne({username});
            return res.status(201).json(user);

        } catch (error) {
            console.log(error);
            return res.status(502).send("database error occured");
        }
    }
}


