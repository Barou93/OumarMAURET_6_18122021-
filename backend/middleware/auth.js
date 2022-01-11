const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = (req, res, next) => {
  // récupération du jwt dans le header de la session
  const token = req.headers.authorization.split(' ')[1];
  if (token) {
    //Decoded the token 
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.userId;
    req.auth = { userId };
    //Verify if the body id != userId
    if (req.body.userId && req.body.userId !== userId) {
      res.locals.user = null;
      res.cookie("jwt", "", { maxAge: 1 });
      next();
    } else {
      next();
    }

  } else {
    res.locals.user = null;
    next();
  }
};
