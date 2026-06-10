const logger = (req, res, next) => {
  console.log(`[Student API] Method: ${req.method} | URL: ${req.url} | Time: ${new Date().toLocaleTimeString()}`);
  next();
};
module.exports = logger;
