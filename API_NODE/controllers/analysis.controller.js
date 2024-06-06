const {answer} = require("./ControllerAnswer");
const {connection} = require("mongoose");

const getAnalyzes = async function (req, res, next) {
    answer.reset()

    console.log('get analyzes');
    let analyzes = null
    try {
        const collection = connection.db.collection('images');
        analyzes = await collection.find({}).toArray();
        analyzes.forEach(a => {
            a.image = `${process.env.SERVER_MULTIMEDIA_URI}/images/${a.image}`
        })
    }
    catch(err) {
        answer.set(err)
        return next(answer);
    }

    answer.data = analyzes;
    res.status(200).send(answer);
};

module.exports = {
    getAnalyzes
}