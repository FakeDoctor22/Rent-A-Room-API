export default function errorHandler(error, _request, response, next) {
    console.error(error.message);

    if (error.name === "CastError") {
        return response.status(500).send({error: "malformed id"});
    } else if (error.name === "ValidationError") {
        return response.status(400).send({error: error.message});
    } else if (error.name === "JsonWebTokenError") {
        return response.status(401).send({error: "invalid token"});
    } else if (error.name === "TokenExpiredError") {
        return response.status(401).send({error: "token expired"});
    }
    
    next(error);
}
