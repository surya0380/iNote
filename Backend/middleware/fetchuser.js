var jwt = require('jsonwebtoken');
var Jsecret = "signature";

const fetchuser = (request, response, next) => {
    const token = request.header("auth-token")
    if(!token){
        response.status(401).send({error: "please enter valid token"})
    }
    try {
        const data = jwt.verify(token, Jsecret)
        request.user = data;
        next();
    } catch (error) {
        response.status(401).send({error: "please enter valid token"})
    }
}

module.exports = fetchuser