
import jwt from 'jsonwebtoken'
export const userAuthentication = (req, res, next) => {
    let authHeader= req.headers['authorization'];
   let token= authHeader && authHeader.split(' ')[1] //Bearer token
    //check if the request has a valid token
    if (!token || token === "") {
      return res.json({ message: "You are not logged in, please login to view this page" });
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        if (!decodedToken) {
            return res.json({ message: "You are not authorized to view this page" });
        }
    } catch (err) {
        return res.json({ message: "Unexpected error has occured while processing your request. Please try later," });
    }
    req.user = decodedToken
    req.token = token;
    req.email = decodedToken.email;
    return next()
}
export default userAuthentication;