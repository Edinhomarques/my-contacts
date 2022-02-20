const errorHandler = (error, request, response, next) => {
  console.log(error);
  response.sendStatus(500);
};

module.exports = errorHandler;
