
import * as jwt from 'jsonwebtoken'
export const userAuthentication = (req, res, next) => {
    //check if auhorization header exists
    if (!req.get('Authorization')) {
        req.isAuthenticated = false
        return next()
    }
    //check if the request has a valid token
    const token = req.get('Authorization').split(' ')[1] //Bearer token
    if (!token || token === "") {
        req.isAuthenticated = false
        return next()
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        if (!decodedToken) {
            req.isAuthenticated = false;
            return next()
        }

    } catch (err) {
        req.isAuthenticated = false
        return next()
    }
    if (!decodedToken) {
        req.isAuthenticated = false
        return next()
    }
    req.isAuthenticated = true
    req.user = decodedToken
    req.token = token;
    req.email = decodedToken.email;
    return next()
}
export default userAuthentication;