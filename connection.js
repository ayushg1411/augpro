const mysql= require("mysql");
const conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"admin"
})

conn.connect((err)=>{
if(err)
console.log(err);
else
console.log("connection established")
})

module.exports=conn;