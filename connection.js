const mysql= require("mysql");
const conn=mysql.createConnection({
    host:"templesql.mysql.database.azure.com",
    user:"templesql",
    password:"Sql@12345",
    database:"admin"
})

conn.connect((err)=>{
if(err)
console.log(err);
else
console.log("connection established")
})

module.exports=conn;
