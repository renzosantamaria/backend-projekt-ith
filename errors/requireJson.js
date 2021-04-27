const JsonErrorHandler = (req, res, next) => {
    if(req.method == 'POST' && req.headers['content-type'] != 'application/json'){
      return res.status(400).json({error: 'Missing header Content-Type: application/json'})
    }
    next()
  }

  module.exports = JsonErrorHandler