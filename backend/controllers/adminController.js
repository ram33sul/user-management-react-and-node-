const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');
const bcrypt = require('bcrypt');
module.exports = {
    login: (req,res) => {
        const { username, password} = req.body;
        if(!(username && password)){
            return res.status(400).send("All inputs are required");
        };
        if(username === 'admin' && password === 'admin'){
            const token = jwt.sign(
                {
                    username,
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn: '2h',
                }
            )
            return res.status(200).json(token);
        };
        return res.status(401).send("username or password is incorrect");
    },

    getUsers: async (req,res) => {
        try {
            const users = await User.find();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(404).send("database error occured");
        }
    },

    deleteUser: async (req,res) => {
        const userId = req.query.id;
        if(!userId){
            return res.status(400).send("Missing user id");
        }
        try {
            await User.deleteOne({_id: userId});
            const users = await User.find()
            return res.status(200).json(users);
        } catch (error) {
            return res.status(404).send("database error occured");
        }
    },

    editUser: async (req, res) => {
        const userId = req.query.id;
        const { name, username, email, phone } = req.body;
        if(!(userId && name && username && email && phone)){
            return res.status(400).send("All inputs are required");
        }
        try {
            const user = await User.updateOne({_id: userId},{ name, username, email, phone});
            return res.status(200).json(user);
        } catch (error) {
            return res.status(404).send("database error occured");
        }
    },

    createUser: async (req, res) => {
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
            return res.status(201).json(user);
        }
        else if(oldUser1){
            return res.status(409).send("email already exists");
        }
        else if(oldUser2){
            return res.status(409).send("username already exists");
        }
    },

    getUser: async (req,res) => {
        const id = req.query.id;
        console.log(id);
        if(!id){
            return res.status(400).send("user id is required");
        }
        try {
            const user = await User.find({_id: id});
            return res.status(200).json(user);
        } catch (error) {
            return res.status(404).send("database error occured");
        }
    }
}