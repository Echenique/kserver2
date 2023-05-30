import UserModel from "../Models/UserAccountModel";
import CompanyModel from "../Models/CompanyModel";
import DeviceModel from "../Models/DeviceModel";
import TeamModel from "../Models/TeamModel";
import { createHash } from 'crypto'

let company = new CompanyModel({
    name: 'DeviceLab',
    users: [],
    deviceFarm: [],
    defaultStyle: {
        logo: 'https://br.crashken.com/assets/images/logo_100.png',
        background: '#ffab00'
    }
})

let user = new UserModel({
    username: 'admin',
    password: createHash('md5').update('deviceLab@123!!').digest('hex'),
    firstname: 'Matheus',
    lastname: 'Echenique',
    email: 'matheus.echenique@devicelab.com.br',
    roles: ['root','admin','user']
})

let device = new DeviceModel({
    alias: 'iPhone 11 Pro Max',
    serial: '00008030-00094C340E92802E',
    thumbImg: 'http://crashken-store.s3.amazonaws.com/Volans%20Demo/2022/3/public/thumbs/dc9acdf2-6a2b-4f36-8acd-9434330d3495.jpg',
    model: {name: 'iPhone 11 Pro Max', manufacturer: 'Apple'},
    resolution: {
        width: 1242,
        height: 2688,
        logicalWidth: 414,
        logicalHeight: 896
    },
    system: {name: 'iOS', version: 16}
})

export default async () => {
    // await company.save();
    // let team = await TeamModel.findOne({'company': company._id});
    // user.team = team?._id;
    // await user.save();
    // await device.save();

    // company.deviceFarm.push(device._id);
    // company.users.push(user._id);
    // await company.save();
    // team?.allowedDevices.push(device._id);
    // team?.allowedUsers.push(user._id);
    // await team?.save();
}