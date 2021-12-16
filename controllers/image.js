const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "6f6968867f3c4783ac2dd9f11db5bf79",
});

const handleApiCall = (req, res) => {
  Promise.all([
    app.models.predict(Clarifai.GENERAL_MODEL, req.body.input),
    app.models.predict(Clarifai.CELEBRITY_MODEL, req.body.input),
  ])
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("unable to work with API"));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;

  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => res.json(entries[0]))
    .catch((err) => console.log("unable to get entries"));
};

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall,
};
