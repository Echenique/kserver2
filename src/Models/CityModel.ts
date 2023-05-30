import { Schema, model } from 'mongoose';

const CitySchema = new Schema({
    city: {type: String},
    state: {type: String},
    UF: {type: String},
    country: {type: String},  
})

let CityModel = model('City', CitySchema);
export default CityModel;