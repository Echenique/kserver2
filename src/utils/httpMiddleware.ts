import {Request, Response, NextFunction} from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';
import UserModel from '../Models/UserAccountModel';

interface DecodeJWT{
    id: String,
    iat: Number,
    exp: Number,
}

export interface UserRequest extends Request {
    user?:any;
}

const checkAuthAndGetUser = async (token: string) => {
    try {
        let decode:DecodeJWT = jwt.verify(token, global.env.SERVER_SECRET) as unknown as DecodeJWT

        let user:any = await UserModel.findOne({'_id': decode.id});
        user = JSON.parse(user);
        if(!user){
            return false
        }

        return user;
    } catch (error) {
        return false;
    }
}

const httpMiddleware = {
    async checkAuth(req:UserRequest, res:Response, next:NextFunction){
        const token = req.get('Auth-token');
        
        if(!token){
            return res.status(401).json({message: 'No token provided'});
        }

        let user = await checkAuthAndGetUser(token);
        
        if(!user){
            return res.status(401).json({message: 'Not authorized.'});
        }

        req.user = user;
        next();
    },
}

export default httpMiddleware;