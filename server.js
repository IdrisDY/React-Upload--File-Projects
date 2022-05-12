/*  */
/* Importing the express module. */
const express = require('express')
const fileUpload =require('express-fileupload')

/* Importing the express module and using the fileUpload() function. */
const app = express()
app.use(fileUpload())


//Upload Endpoint
/* A function that is listening to the upload endpoint.
the post takes two parameters the endpoint in string and a function with two parameters req and res
req is the request parameter and if it null will return status msg
Note res is in json format
the upload is the endpoint, the req argument
 */
app.post("/upload",(req,res)=>{
   if(req.files === null){
      return res.status(400).json({ msg:'No file uploaded'})
   }
/* Moving the file to the uploads folder. */
   const file = req.files.file
   file.mv(`${__dirname}/client/public/uploads/${file.name}`, err =>{
      if (err){
         console.error(err);
         return res.status(500).send(err);
      }
/* Returning the file name and the file path. */
      res.json({ fileName:file.name, filePath: `/uploads/${file.name}`})
   })
})
/* Listening to the port 5000 and printing the message "Server has started Mfjpm" in the console. */
app.listen(5000, ()=> console.log("Server has started Mfjpm"))