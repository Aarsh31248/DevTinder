const adminAuth = (req, res, next) => {
  const token = "abc";
  const isAuth = token === "abc";

  if (!isAuth) {
    res.status(401).send("Unauthorized Access");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  const token = "abc";
  const isAuth = token === "abc";

  if (!isAuth) {
    res.status(401).send("Unauthorized Access");
  } else {
    next();
  }
};

module.exports = { adminAuth, userAuth };
