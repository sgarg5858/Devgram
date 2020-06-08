# Mern Stack Application #Devgram  

Links:

1. How Jwt Authenication Works and what makes it secure ? 

https://www.sohamkamani.com/blog/javascript/2019-03-29-node-jwt-authentication/

Process:

1.  npm install express express-validator jsonwebtoken bcryptjs config gravatar mongoose request --save

2. npm i -D nodemon concurrently

3. Connection to Database here we are using mongodb with Atlas 

4. Creating Routes different files for different Api's to keep the code clean

5. After setting up all the above its time to define user Model....

6. First Api Register User....

7. Login API

8. Now we have to implement Authentication Middleware for Protected Routes where Jwt token will be verified....If validated then only goes to next requests otherwise returns response that Invalid Token or Something....
