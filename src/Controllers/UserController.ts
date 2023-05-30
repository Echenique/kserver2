import {Request, Response} from 'express';
import UserModel from '../Models/UserAccountModel';
import { createHash, verify } from 'crypto'
import jwt from 'jsonwebtoken';
import httpMiddleware, { UserRequest } from './../utils/httpMiddleware';

export default {
    async getUsers(req: Request, res: Response){
        
    },
    async registerUser(req: Request, res: Response){
        const { username, password, team, firstname, lastname, email} = req.body;

        if(await UserModel.findOne({username})){
            return res.status(400).json({message: 'username already exists.'});
        }

        try {
            let user = await UserModel.create({
                username,
                password: createHash('md5').update(password).digest('hex'),
                email,
                team,
                firstname,
                lastname,
            });

            return res.json({message: `User created! ${username}`})
        } catch (error) {
            return res.status(400).json({message: 'Register failed.',error});
        }
    },

    async checkAuth(req: UserRequest, res: Response){
        let user = Object.assign({}, req.user);
        delete user.password;
        delete user.sessions;
        //console.log(user)
        res.json(user);
    },

    async signin(req: UserRequest, res: Response){
        const { email, password } = req.body;

        let user = await UserModel.findOne({
            email, 
            password: createHash('md5').update(password).digest('hex')
        });

        if(!user){
            return res.status(400).json({message: 'Invalid username or password.'});
        }

        user.token = jwt.sign({id: user._id}, global.env.SERVER_SECRET, {expiresIn: 86600}),

        await user.save();        
        res.json(user);
    },

    async updateProfile(req: UserRequest, res: Response){
        let user:any = await UserModel.findOne({'_id': req.user._id});
        user.config = req.body.user.config;
        user.email = req.body.user.email;
        user.firstname = req.body.user.firstname;
        user.lastname = req.body.user.lastname;

        if(req.body.user.password){
            user.password = createHash('md5').update(req.body.user.password).digest('hex');
        }

        await user.save();
        delete user.password;
        res.json({message: 'updated!'});
    },
}