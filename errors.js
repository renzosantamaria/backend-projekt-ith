const errorHandler = (err, req, res, next) => {
    if (err.errorMessage) {
        res
        .status(err.errorCode)
        .json({error: err.errorMessage})
    }else{
        res.json({error: err})
    }      
}

class accessDenied extends Error {
    constructor() {
        super()
        this.errorCode = 403
        this.errorMessage = "Access denied!"
    }
}



module.exports = {
    errorHandler,
    accessDenied
}