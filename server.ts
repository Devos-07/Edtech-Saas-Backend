import app from "./src/app";
import {config} from 'dotenv'
config()

//import database connection
//import garena vaney file excute hudaina or file connect hudainw
import "./src/database/connection"

function startServer(){
  const port = process.env.PORT
  app.listen(port,function(){
    console.log(`Server has started at port ${port}`)
  })
}
startServer()