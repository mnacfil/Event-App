

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log('=====error handler=====');
    console.log(err)
    if(err.name === 'CastError') {
        res.status(404).json({error: 'No event found!'})
        return 
    }
    res.status(400).json({err: "There's an error, check you terminal"});
}

module.exports = errorHandlerMiddleware;