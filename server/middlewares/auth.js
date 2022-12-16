const boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { config } = require("../../config/config");

function tokenHandler(req, res, next) {
  const passUrl = ["customers", "drivers", "agencies"];
  const isInclude = passUrl.some((word) => req.url.includes(word));

  if (!(isInclude && req.method == "POST")) {
    const token = req.get("JWT");
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) throw boom.unauthorized();
      else req.payload = decoded;
    });
  }
  next();
}

function loginHandler(getUser, role) {
  return async (req, res, next) => {
    try {
      const user = await getUser(req.body);

      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) throw boom.notFound(`Not found`);

      const payload = {
        sub: user.id,
        role,
      };

      const token = jwt.sign(payload, config.jwtSecret);

      res.status(200).json({ user, token });
    } catch (error) {
      next(error);
    }
  };
}

function autorizationHandler(...roles) {
  return (req, res, next) => {
    if (roles.includes(req.payload.role)) next();
    else throw boom.forbidden(`You don't have this permission`);
  };
}

function sameIdHanlder(req, res, next) {
  const userId = req.payload.sub;
  const { id } = req.params;
  if (userId == id) next();
  else throw boom.forbidden(`You don't have this permission`);
}

module.exports = {
  tokenHandler,
  loginHandler,
  autorizationHandler,
  sameIdHanlder,
};
