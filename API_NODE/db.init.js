const User = require('./models/user.model');
const Module = require('./models/module.model');
const Chipset = require('./models/chipset.model')
const Measure = require('./models/measure.model')
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

// two chipsets are initialized
let lm35 = null;
let bme280 = null;
let ky018 = null;

async function initChipsets() {
  try {
    lm35 = await Chipset.findOne({name: 'lm35'}).exec()
    if (lm35 === null) {
      lm35 = new Chipset({
        name: "lm35",
        description: "temperature sensor",
        links: ["https://arduino-france.site/capteur-lm35/"],
        image: "https://www.gotronic.fr/ori-capteur-de-t-lm35-gravity-dfr0023-19287.jpg",
        caps: ["temperature"],
      })
      lm35 = await lm35.save()
      console.log("added lm35 chipset");
    }
  } catch (err) {
    console.log("cannot add lm35 chipset", err)
  }
  try {
    bme280 = await Chipset.findOne({name: 'bme280'}).exec()
    if (bme280 === null) {
      bme280 = new Chipset({
        name: "bme280",
        description: "temperature/humidity/pressure sensor",
        links: ["https://passionelectronique.fr/tutorial-bme280/"],
        image: "https://i.ebayimg.com/images/g/XnQAAOSwlfldl0TK/s-l1200.webp",
        caps: ["temperature", "humidity", "pressure"],
      })
      bme280 = await bme280.save()
      console.log("added bme280 chipset");
    }
  } catch (err) {
    console.log("cannot add bme280 chipset", err)
  }
  try {
    ky018 = await Chipset.findOne({name: 'ky018'}).exec()
    if (ky018 === null) {
      ky018 = new Chipset({
        name: "ky018",
        description: "brightness sensor",
        links: ["https://sensorkit.joy-it.net/fr/sensors/ky-018"],
        image: "https://www.picclickimg.com/nDcAAOSw1lxcwwFN/Module-Photoresistance-Ldr-Photoelectrique-KY-018-Capteur-de-Lumiere.webp",
        caps: ["brightness"],
      })
      ky018 = await ky018.save()
      console.log("added ky018 chipset");
    }
  } catch (err) {
    console.log("cannot add bme280 chipset", err)
  }
}

async function initModules() {
  let mod1 = null;
  let mod2 = null;
  try {
    mod1 = await Module.findOne({name: 'module 1'}).exec()
    if (mod1 === null) {
      mod1 = new Module({
        name: "module 1",
        shortname: "mod1",
        key: "58ae1d8f-027b-4061-a4c7-b37c3f8ed54e",
        uc: "esp32",
        chipsets: [ lm35._id, bme280._id],
      })
      mod1 = await mod1.save()
      console.log("added module 1");
    }
  } catch (err) {
    console.log("cannot add module 1", err)
  }
  try {
    mod2 = await Module.findOne({name: 'module 2'}).exec()
    if (mod2 === null) {
      mod2 = new Module({
        name: "module 2",
        shortname: "mod2",
        key: "2e46990d-3e85-45f8-82c8-f05eec1a1212",
        uc: "esp8266",
        chipsets: [ lm35._id],
      })
      mod2 = await mod2.save()
      console.log("added module 2");
    }
  } catch (err) {
    console.log("cannot add module 2", err)
  }
  // Assuming you have a function to create a fake measure
  async function createFakeMeasure(module, type, value) {
    const measure = new Measure({
      type: type,
      date: new Date(),
      value: value,
      module: module._id,
    });
    return await measure.save();
  }

  // Add fake temperature, humidity, and pressure measures for module 1
  await createFakeMeasure(mod1, 'temperature', '25.5');
  await createFakeMeasure(mod1, 'humidity', '50');
  await createFakeMeasure(mod1, 'pressure', '1013.25');

  // Add fake temperature, humidity measures for module 2
  await createFakeMeasure(mod2, 'temperature', '22.3');
  await createFakeMeasure(mod2, 'humidity', '60');
}

async function initUsers() {
  let admin = null
  try {
    admin = await User.findOne({login: 'admin'}).exec()
    if (admin === null) {
      const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
      const password = bcrypt.hashSync('admin', salt);
      admin = new User({
        login: "admin",
        password: password,
        email: "sdomas@univ-fcomte.fr",
        rights: ['admin'],
      })
      admin = await admin.save()
      console.log("added admin");
    }
  } catch (err) {
    console.log("cannot add admin", err)
  }
  let test = null
  try {
    test = await User.findOne({login: 'test'}).exec()
    if (test === null) {
      const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
      const password = bcrypt.hashSync('azer', salt);
      test = new User({
        login: "test",
        password: password,
        email: "sdomas@univ-fcomte.fr",
        rights: ['basic'],
      })
      test = await test.save()
      console.log("added test");
    }
  } catch (err) {
    console.log("cannot add test", err)
  }  
  
}

async function initBdD() {
  await initChipsets()
  await initModules()
  await initUsers()
}


module.exports = {
  initBdD,
};


