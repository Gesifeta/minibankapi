
import * as jwt from 'jsonwebtoken'
export const userAuthentication = (req, res, next) => {
    const token = req.header['authorization'].split(' ')[1] //Bearer token
    //check if the request has a valid token
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