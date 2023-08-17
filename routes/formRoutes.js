
// routes/formRoutes.js
const express = require('express');
const router = express.Router();
var db=require('../connection');
const EventEmmiter =require('events');
const event =new EventEmmiter();
const fs=require('fs');
let mp =require('./login');



//hello json


router.get('/formConfirm', (req, res) => {
  res.render('formConfirm');
});





router.get('/admin2', (req, res) => {
  res.render('admin2');
});




router.get('/register', (req, res) => {
  res.render('register');
});
router.post('/register', (req,res)=>{
 let id=req.body.id;
 let name=req.body.name;
let role=req.body.role;
console.log(id+name+role);
  var que= `insert into user_dtl values(${id}, '${name}', '${role}')`
  db.query(que, function (err, result ){
    if (err) throw err;
  console.log("dfffffffffffffff")
  res.redirect("/login")
    });

})








router.get('/', (req, res) => {
  res.render('login');
});







router.get('/err', (req, res) => {
  res.render('err');
});








router.get('/basic', function(req, res, next) {
  res.render('basic', { title: 'Express' });
});







event.on("callme", ()=>{


  
 function ExcelToJson(file)
 {
     

     console.log("file converyed_______________")
         try {
           var reader = new FileReader();
           reader.readAsBinaryString(file);
           reader.onload = function(e) {
 
               var data = e.target.result;
               var workbook = XLSX.read(data, {
                   type : 'binary'
               });
               var result = {};
               var firstSheetName = workbook.SheetNames[0];
               //reading only first sheet data
               var jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName]);
               alert("your task is done");
               //console.log(jsonData);
               //displaying the json result into HTML table
          
               }
           }catch(e){
               console.error(e);
           }
 }



 

  console.log("inside----------- ------fffffffffffffffffff-");
     var file=document.getElementById('file_upload').files;
   if(file.length==0)
  {   alert("please choose any file");
      return ;}
 
   var filename=file[0].name;
   
   var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
 if(extension==".XLSX" || extension=="XLS")
    ExcelToJson(file[0]);   // pass file[0] as a argument
    else
 {    alert(" please choose only excel file");
    }


 console.log("called---------------------------");


 
}


)






/* GET home page. */










router.get('/excel', function(req, res, next) {
  res.render('excel', { title: 'Express' });
});





router.get('/user', function(req, res, next) {
  var sql='SELECT * FROM table_user_role';
  db.query(sql, function (err, data, fields) {
  if (err) throw err;
  res.render('user', { title: 'user', userData: data});
 
  console.log(  "data...................."+data);
  
});


});

let names="";

event.on("onme", ()=>{

  // <a href="/generate"><i class="fa fa-angle-right"></i>l</a>

  const data = [
    {  name :"ADMIN",   title: "HOME",link: "http://localhost:5050/home" },
    {  name : "ADMIN",   title: "CUSTOMER",link:  "http://localhost:5050/login"  },
    {  name : "ADMIN",   title: "USER",link:  "http://localhost:5050/user"  },
    {  name : "ADMIN",   title: "VENDOR",link:  "http://localhost:5050/login"  },
    {  name : "ADMIN",   title: "LOCATION INFO.",link:  "http://localhost:5050/generate"  },
    {  name : "ADMIN",   title: "RANGE",link:  "http://localhost:5050/data"  },
    {  name : "ADMIN",   title: "ADD TABLE",link:  "http://localhost:5050/excel"  },
    {  name :"CUSTOMER",   title: "HOME",link: "http://localhost:5050/home" },
    {  name : "CUSTOMER",   title: "CUSTOMER",link:  "http://localhost:5050/login"  },
    {  name : "CUSTOMER",   title: "USER",link:  "http://localhost:5050/user"  },
    {  name :"VENDOR",   title: "HOME",link: "http://localhost:5050/home" },
    {  name : "VENDOR",   title: "CUSTOMER",link:  "http://localhost:5050/login"  },
    {  name : "VENDOR",   title: "USER",link:  "http://localhost:5050/user"  },
    {  name : "VENDOR",   title: "VENDOR",link:  "http://localhost:5050/login"  },
    {  name : "VENDOR",   title: "LOCATION INFO.",link:  "http://localhost:5050/generate"  },

  ];


  var sql='insert into table_user_role (userrole, linkpage, linktext) values ?';
  db.query(sql, [data.map(item => [ item.name,  item.link, item.title])], (err, result) => {
    if (err) throw err;
    console.log('Data inserted successfully.');

    // Close the connection to the database

});

console.log("called")
});


router.post('/user',(req,res)=>{
  names=req.body.name;
  event.emit("onme");

  console.log(  "name " + req.body.name);
  console.log("saved");
  res.render('edit');

});





router.get('/edit', function(req, res, next) {

  res.render('edit', { title: 'Express' });
});




  




  




router.get('/generate', function(req, res, next) {
 

  var sql='SELECT * FROM loc_code order by LOCATION_CODE';
  db.query(sql, function (err, data, fields) {
  if (err) throw err;
  res.render('generate', { title: 'loc', userData: data});
 
  console.log(data);
  
});
});









router.get('/admin2', (req, res) => {
  res.render('admin2');
});





  


module.exports = router;
