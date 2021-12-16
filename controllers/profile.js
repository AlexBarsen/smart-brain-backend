const handleProfileGet = (req, res, db) => {
  const { id } = req.body;
  db("*")
    .from("users")
    .where("id", "=", id)
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("error getting user");
      }
    })
    .catch((err) => console.log(err));
};

module.exports = {
  handleProfileGet: handleProfileGet,
};
