const handleSignIn = (req, res, db, bcrypt) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("incorrect form submission");
  }
  db.select("email", "password_hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].password_hash);
      if (isValid) {
        db.select("*")
          .from("users")
          .where("email", "=", email)
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json("error loging in"));
      }
    })
    .catch((err) => res.status(400).json("wrong credentials"));
};

module.exports = {
  handleSignIn: handleSignIn,
};
