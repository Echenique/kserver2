import {Request, Response} from 'express';
import HotelModel from '../Models/HotelModel';

export default {
    async getHotels(req: Request, res: Response){
        let list = await HotelModel.find();
        res.json(list)
    },
}