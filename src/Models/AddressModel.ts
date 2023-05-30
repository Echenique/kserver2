import { Schema, model } from 'mongoose';

const AddressSchema = new Schema({
    address: {type: String},
    number: {type: String},
    neighborhood: {type: String},
    zip: {type: String},  
    city: {type: Schema.Types.ObjectId, ref: 'City', require: true},
})

let AddressModel = model('Address', AddressSchema);
export default AddressModel;