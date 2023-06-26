
class AppError extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

class SequelizeValidationError extends Error {
    constructor(err, statusCode){
        // let errMessage;
        // err.errors.map(e => {
        //     console.log(e.message);
        //     errMessage = e.message;
        // })
        super(err.errors.message);
        this.statusCode = statusCode;
    }
}

module.exports = { AppError, SequelizeValidationError }