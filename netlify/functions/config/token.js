import jwt from 'jsonwebtoken'
// @ Generate Token
export const GenerateToken=(userdata)=> {

    const jwttoken= jwt.sign(userdata,`${process.env.JWT_SECRET}`,{
    expiresIn:'1d',
    
  })
   return jwttoken
}


export default GenerateToken;