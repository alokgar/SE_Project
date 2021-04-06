const Address = require("../../models/Address");
const { checkAndaddCity } = require("./city");

async function getAddress(line1) {
  var add = await Address.findOne({ line1 });
  return add;
}

async function addAddress(line1, landmark, pincode, cityid) {
  let newaddress = new Address({
    line1,
    landmark,
    pincode,
    city: cityid,
  });
  await newaddress.save();
  return newaddress;
}

async function updateAddress(oldAddid, line1, landmark, pincode, city) {
  var curr_city = await checkAndaddCity(city);
  const up_add = {};
  if (line1) up_add.line1 = line1;
  if (landmark) up_add.landmark = landmark;
  if (pincode) up_add.pincode = pincode;
  up_add.city = curr_city;

  address_up = await Address.findByIdAndUpdate(
    oldAddid,
    { $set: up_add },
    { new: true }
  );
  return address_up;
}

module.exports.getAddress = getAddress;
module.exports.addAddress = addAddress;
module.exports.updateAddress = updateAddress;
