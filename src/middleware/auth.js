const jwt = require('jsonwebtoken');

module.exports =  function(req,res,next) {

    const token=req.header('x-auth-token');
    if(!token)
    {
        return res.status(400).json({errors:[{msg:"No Authorized Token"}]});
    }
    //Verify Token
    try {
        //header and payload are just base64 encoded they are not encrypted...
        //signature is important it is build using payload,header and secret key and then hashed only one way
        //this works by again generating signature from header and payload if both signature matches then
        //it is authenticated header.payload.signature
      const decoded=  jwt.verify(token,'mySecret');
      req.user=decoded.user;
      next();
      
    } catch (error) {
        res.status(401).json({errors:[{msg:"Invalid Token"}]})   
    }
}