import { Schema, model } from 'mongoose';

const HotelSchema = new Schema({
    city: {type: Schema.Types.ObjectId, ref: 'City', require: true},
    address: {type: Schema.Types.ObjectId, ref: 'Address', require: true},
    
    name: {type: String},
    classification: {type: String},
    value: {type: String},
    location: {type: String},
    site: {type: String},  
    phone: {type: String},  
    email: {type: String},  
    obs: {type: String},  
})

let HotelModel = model('Hotel', HotelSchema);
export default HotelModel;