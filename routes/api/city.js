const City = require('../../models/City');

async function getCity(name){
    var _city = await City.find({name});
    if(!_city) return null;
    else return _city;
}

async function checkAndaddCity(name){
    let fcity = await City.findOne({name});
    if(!fcity){
        let newcity = new City({ name : name});
        await newcity.save();
        return newcity;
    }
    else{
        return fcity;
    }
}

module.exports.checkAndaddCity = checkAndaddCity;
module.exports.getCity = getCity;