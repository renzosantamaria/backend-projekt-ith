

class FuskeluringError extends Error{}

class accessDenied extends FuskeluringError {
    constructor() {
        super()
        this.errorCode = 403
        this.errorMessage = "Access denied!"
    }
}

//-------------------------------------------
class userNotFound extends FuskeluringError{
    constructor(payload){
    super()
    this.errorCode = 404
    this.errorMessage = `User: ${payload} not found`
    }
}

class serverError extends FuskeluringError{
    constructor(){
    super()
    this.errorCode = 500
    this.errorMessage = `We could not handle your request, please try again later`
    }
}
class dataBaseError extends FuskeluringError{
    constructor(){
    super()
    this.errorCode = 500
    this.errorMessage = `We could not handle your request, please try again later`
    }
}

class tooManyRequestError extends FuskeluringError{
    constructor(){
    super()
    this.errorCode = 429
    this.errorMessage = `You have reached your daily limit, try again after 00:00`
    }
}

class invalidQuery extends FuskeluringError{
    constructor(...params){
    super()
    this.errorCode = 400
    this.errorMessage = `Invalid query. ${params} required`
    }
}

class passwordTooShort extends FuskeluringError{
    constructor(){
    super()
    this.errorCode = 400
    this.errorMessage = `Password is shorter than 4 digits`
    }
}



module.exports = {
    FuskeluringError,
    accessDenied,
    serverError,
    invalidQuery,
    userNotFound,
    dataBaseError,
    tooManyRequestError,
    passwordTooShort
}