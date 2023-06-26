export default function errorHandler(error, _request, response, next) {
    console.error(error.message);

    if (error.name === "CastError") {
        return response.status(500).send({error: "malformed id"});
    }

    next(error);
}