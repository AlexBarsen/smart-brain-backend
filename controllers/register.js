const handleRegister = (req, res, db, bcrypt, saltRounds) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json("incorrect form submission");
  }
  const passwordHash = bcrypt.hashSync(password, saltRounds);

  db.transaction((trx) => {
    trx
      .insert({
        password_hash: passwordHash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0],
            username: username,
            joined: new Date(),
          })
          .then((user) => res.json(user[0]));
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json("unable to register"));
};

module.exports = {
  handleRegister: handleRegister,
};
