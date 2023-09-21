const ServiceError = require('../services/utils/serviceError');
// Mode infos about express handling error : https://expressjs.com/en/guide/error-handling.html
// next param is required on signature even if it's not used (needed for middleware trigger)
// eslint-disable-next-line no-unused-vars
const errorControllerHandler = (err, req, res, next) => {
  if (err instanceof ServiceError) {
    res.status(err.code).json({ message: err.message });
  } else {
    res.status(500).json({ message: err.message });
  }
};

module.exports = errorControllerHandler;
