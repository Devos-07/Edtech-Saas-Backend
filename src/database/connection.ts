import {Sequelize} from 'sequelize-typescript'

const sequelize = new Sequelize({
  database : process.env.DB_NAME, //database ko name 
  username : process.env.DB_USERNAME, //database ko username, bydefault root hunxa
  password : process.env.DB_PASSWORD, //dtabase ko password , bydefault "" hunxa
  host : process.env.DB_HOST, //databse ko location ,kaha xa vaney kura, localhost(mycomputer)
  dialect : "mysql", //k databse use garna laako vaney kura
  port : Number(process.env.DB_PORT),  // mysql lay use garnya port ,bydefault 3306 hunxa
  models : [__dirname + '/models']  //current location + '/models'
})

sequelize.authenticate()
.then(() =>{
  console.log("Authenticated, connected succesfully!!")
})
.catch((error) =>{
  console.log(error)
})

//migrate garney/ push garney
sequelize.sync({force:false})
.then(()=>{
  console.log('Migrated succsfully new changes!!')
})

export default sequelize