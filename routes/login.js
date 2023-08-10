const express = require('express');
const router = express.Router();
const sql=require('mysql');
var db=require('../connection');
const path= require('path');
const EventEmmiter =require('events');
const { Console } = require('console');
const event =new EventEmmiter();



//Global Variable Initialization
let admin;
let table;
let park;
let cid;

// router for get req of login 
router.get('/login', function(req, res, next) {
 res.render('login', { title: 'Express' });
});



event.on("pagin",function(req, res){
try{ 
let type="null";
type=req.body;
var id=type.id;
var roles;
var ques=`select role from user_dtl where id=${id};`
db.query(ques, function (err, data, fields) {
if (err) throw err;
Object.keys(data).forEach(function(key) {
roles = data[key].role;
});
if(roles=="ADMIN"){
console.log("admin");
admin="ADMIN";
var sql=`SELECT * FROM table_user_role where userrole="${admin}"`;
db.query(sql, function (err, data, fields) {
if (err) throw err;
conso();
res.render('chome', {dta:data});
console.log(data);
});
}
else if (roles=="CUSTOMER"){
console.log("customer");
admin="CUSTOMER";
 var sql=`SELECT * FROM table_user_role where userrole="${admin}"`;
 db.query(sql, function (err, data, fields) {
 if (err) throw err;
 conso();
 res.render('chome', {dta:data});
});
}
else if (roles=="SALES EXECUTIVE"){
admin="SALES EXE";
var sql=`SELECT * FROM table_user_role where userrole="${admin}"`;
db.query(sql, function (err, data, fields) {
if (err) throw err;
conso();
res.render('shome', {dta:data});
console.log("tableeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"+table);
console.log(data);
});
}
else if(roles=="VENDOR"){
console.log("vendor");
admin="VENDOR";
var sql=`SELECT * FROM table_user_rolewhere userrole="${admin}"`;
db.query(sql, function (err, data, fields) {
if (err) throw err;
conso();
console.log(admin);
res.render('chome', {dta:data});
console.log("tableeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"+table);
console.log(data);
});
}
else{
 res.redirect("/err");
}
});
}
catch{
res.render('err')
}
});

router.post('/login', (req, res) => {
event.emit("pagin", req, res);
});

router.get('/home2', (req, res) => {
res.render('home2', {dta: JSON.parse(table)});
});

router.get('/chome', (req, res) => {
res.render('chome', {dta: JSON.parse(table)});
 });

router.get('/sales1', (req, res) => {
res.render('sales1', {dta: JSON.parse(table)});
});


router.get('/admin1', (req, res) => {
   res.render('admin1', {dta: JSON.parse(table)});
 });

 router.get('/admindis', (req, res) => {

  
      var que=`select cid,name from customer_frm`;
      db.query(que, function (err, data, fields) {
      if (err) throw err;
      res.render('admindis', {dta: JSON.parse(table), datas:data});
      });

  
 });

 router.get('/adminchng', (req, res) => {
   var que=`select cid,name from customer_frm`;
   db.query(que, function (err, data, fields) {
   if (err) throw err;
   res.render('adminchng', {dta: JSON.parse(table), datas:data});
   });
 });

 router.post('/admindis', (req, res) => {
   console.log(req.body.cid);
   var que=`select * from customer_frm where cid=${req.body.cid} `;
   db.query(que, function (err, data, fields) {
   if (err) throw err;
   console.log(data);
   res.render('customerdata', {dta: JSON.parse(table), datas:data});
   });
 

 });

 router.post('/adminchng', (req, res) => {
 
   var que=`select * from customer_frm where cid=${req.body.cid} `;
db.query(que, function (err, data, fields) {
if (err) throw err;
console.log(data);
res.render('chngcustomerdata', {dta: JSON.parse(table), datas:data});
});
    console.log(req.body.cid);
 
 });

 
 router.post('/customerform', (req, res) => {
   console.log(req.body);
   function getCord() {
      return new Promise((resolve, reject) => {
    
      var ques=`select cid from customer_id `;
      db.query(ques, (err, output)=>{
      if (err){
      console.log("Errrrrrrrrrrrrrrrrrr");
      return;
      }
      else{
      cid=output[0].cid;
   
      }
      resolve(true);
      });
      var sets=`update customer_id set cid=cid+1 `;
      db.query(sets, (err, output)=>{
      if (err)
      {
      console.log("Errrrrrrrrrrrrrrrrrr");
      return;
      }
      else{
      console.log("updated bro");
      }
      resolve(true);
      });
      });
      }
      getCord().then(() => console.log("done"));




 
   const { name , cnum ,Email,state , city, pin, addr, vnum, vtype  } = req.body;
setTimeout(() => {
const user = { cid, name , cnum ,Email,state , city, pin, addr, vnum, vtype  };
console.log(user);
db.query('INSERT INTO customer_frm SET ?', user, (err, output) => {
if (err) throw err 
console.log('User saved successfully!');
res.render('admin1', {dta: JSON.parse(table)});
});
var sl = `insert into user_dtl values( ${cid}, "${name}", "CUSTOMER")`;
db.query(sl,(err, output) => {
   if (err) throw err 
   console.log('User saved-------------------------------------- successfully!');
   });
}, 1000);
});







router.post('/sales1', (req, res)=>{
let bodies=req.body;
let bcname=req.body.Cname;
let btel=bodies.tel;
let bfax=bodies.fax;
let bcity=req.body.city;
let breg=bodies.reg;
let bemail=bodies.email;
let bCtype=bodies.Ctype;
let bbranch=bodies.branch;
let bicv=bodies.icv;
let bicv_percentage=bodies.icv_percentage;
let bpoint=bodies.point;
let bemp_no=bodies.emp_no;
let bowner=bodies.owner;
let bpan=bodies.pan;
let bmailing=bodies.mailing;
let bcont=bodies.cont;
let bzip=bodies.zip;
let bweb=bodies.web;
let bp_com=bodies.p_com;
let btrade=bodies.trade;
let bgstin=bodies.gstin;
let bmsmed=bodies.msmed;
let bCemail=bodies.Cemail;
let bCref=bodies.Cref;
let bgen_detail=bodies.gen_detail;
let bestd=bodies.estd;
let bgeo=bodies.geo;
let bBtype=bodies.Btype;
let baffi=bodies.affi;
let badditional=bodies.additional;
let bannual=bodies.annual;
let bstatements=bodies.statements;
let bpaymenrt=bodies.paymenrt;
let bB_name=bodies.B_name;
let bcurrency=bodies.currency;
let bbeneficiary=bodies.beneficiary;
let bscode=bodies.scode;
let bacc_no=bodies.acc_no;
let biban=bodies.iban;
let baba=bodies.aba;
let bb_add=bodies.b_add;
let bifsc=bodies.ifsc;
let bswf=bodies.swf;
let bp_name=bodies.p_name;
let bsign=bodies.sign;
let bttl=bodies.ttl;
let bdates=bodies.dates;
let idds;
var rr=`SELECT vid FROM pcodes ORDER BY vid DESC LIMIT 1;`
db.query(rr, (err, results, fields) => {
if (err) {
return console.error(err.message);
}
idds=JSON.stringify(results[0].vid);
});
setTimeout(() => {
let nums=parseInt(idds)+1;
var sr=`insert into pcodes values (${nums}, 1)`;
db.query(sr, (err, results, fields) => {
if (err) {
return console.error(err.message);
}
});
console.log(nums);
var que=` insert into sls_vnd_frm (FID, Cname, tel,fax , city, reg,email,Ctype,branch,icv, icv_percentage,point,emp_no,owner,pan,mailing,cont,zip,web,p_com,trade,gstin,msmed,Cemail,Cref,gen_detail,estd,geo,Btype,affi,additional,annual,statements,paymenrt,B_name,currency,benefeciary,scode,acc_no,iban,aba,b_add,ifsc,swf,p_name,sign,ttl,dates)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`
let todo = [ nums,`${bcname}`, `${btel}`, `${bfax}`, `${ bcity}`, `${breg}` ,`${bemail}`,`${bCtype}`,`${bbranch}`,`${bicv}`,`${bicv_percentage}`,`${bpoint}`,`${bemp_no}`,`${bowner}`,`${bpan}`,`${bmailing}`,`${bcont}`,`${bzip}`, `${bweb}`,`${bp_com}`,`${btrade}`,`${bgstin}`,`${bmsmed}`,`${bCemail}`,`${bCref}`,`${bgen_detail}`,`${bestd}`,`${bgeo}`,`${bBtype}`,`${baffi}`,`${badditional}`,`${bannual}`,`${bstatements}`,`${bpaymenrt}`,`${bB_name}`,`${bcurrency}`,`${bbeneficiary}`,`${bscode}`, `${bacc_no}`,`${biban}`,`${baba}`,`${bb_add}`,`${bifsc}`,`${bswf}`,`${bp_name}`,`${bsign}`,`${bttl}`,`${bdates}`];
 db.query(que, todo, (err, results, fields) => {
if (err) {
return console.error(err.message);
}
});
res.render('sales1', {dta: JSON.parse(table)});
}, 1000);
});


router.get('/sales2', (req, res) => {
var que=`select FID,Cname,owner from sls_vnd_frm`;
db.query(que, function (err, data, fields) {
if (err) throw err;
res.render('parking', {dta: JSON.parse(table), datas:data});
});
});

router.post('/sales2',(req,res)=>{
console.log("id" + req.body.id);
var que=`select * from sls_vnd_frm where FID=${req.body.id} `;
db.query(que, function (err, data, fields) {
if (err) throw err;
console.log(data);
res.render('sales5', {dta: JSON.parse(table), datas:data});
});
});

router.get('/sales3', (req, res) => {
var que=`select FID,Cname,owner from sls_vnd_frm`;
db.query(que, function (err, data, fields) {
if (err) throw err;
res.render('sales3', {dta: JSON.parse(table), datas:data});
});
});

router.post('/sales3',(req,res)=>{
console.log("id" + req.body.id);
var que=`select * from sls_vnd_frm where FID=${req.body.id} `;
db.query(que, function (err, data, fields) {
if (err) throw err;
res.render('sales5', {dta: JSON.parse(table), datas:data});
});
});

router.get('/sales4', (req, res) => {
var que=`select FID,Cname,owner from sls_vnd_frm ss `;
db.query(que, function (err, data, fields) {
if (err) throw err;
res.render('sales4', {dta: JSON.parse(table), datas:data});
});
});

router.post('/sales4',(req,res)=>{
console.log("id" + req.body.id);
var que=`select * from sls_vnd_frm where FID=${req.body.id} `;
db.query(que, function (err, data, fields) {
if (err) throw err;
res.render('sales4', {dta: JSON.parse(table), datas:data});
});
});

router.get('/sales5', (req, res) => {
var que=`select * from sls_vnd_frm where FID=${req.body.id} `;
db.query(que, function (err, data, fields) {
if (err) throw err;
res.render('sales5', {dta: JSON.parse(table), datas:data});
});
});

router.post('/updateform',(req,res)=>{
res.render('sales1', {dta: JSON.parse(table)});
});






   router.get('/customer2',(req,res)=>{

      var que=`select distinct type from parktable `;
      db.query(que, function (err, data, fields) {
      if (err) throw err;
      res.render('customer2', {dta: JSON.parse(table), datas:data});
      });



 
      });



let item;

let flag=false;
      router.get('/get_data', function(request, response, next){

         var type = request.query.type;
     
         var search_query = request.query.parent_value;
         console.log(search_query)
     
         if(type == 'load_state')
         {
             var query = `
             SELECT DISTINCT city AS Data FROM parktable 
             WHERE type = '${search_query}'  `;
             console.log("state")
         }
     
         if(type == 'load_city')
         {
             var query = `
             SELECT pname AS Data FROM parktable 
             WHERE city = '${search_query}'  `;
         }

         if(type == 'load')
         {
             var query = `
             SELECT area AS Data FROM parktable 
             WHERE pname = '${search_query}'  `;
         }

         if(type == 'load2')
         {
            flag=true;
             var query = `
             SELECT pname,area,min_cost,hcost  FROM parktable 
             WHERE area = '${search_query}'  `;

             db.query(query, function(error, data){
     
               var data_arr = [];
       
               data.forEach(function(row){
                 const obj={
                    "pname" :row.pname,
                    "area": row.area,
                    "min_cost" : row.min_cost,
                    "hcost": row.hcost
                 }
                   data_arr.push(obj);
                   console.log("objext"+ obj);
                   console.log("dfssss"+data_arr);
                 
               });
               console.log(data_arr[0]);
             console.log(JSON.stringify(data));
               response.json(data_arr);
       
           });
           return;
         }
         if(type == 'final')
         {
          
             item=search_query;
             var data_arr = [];
             data_arr.push(search_query);
             console.log("DSFffffffff" + data_arr);
             response.json(data_arr);
           return ;
         }
     
         db.query(query, function(error, data){
     
            var data_arr = [];
            console.log("------###-----"+item);
            data.forEach(function(row){
                data_arr.push(row.Data);
                console.log(data_arr);
            });
          console.log(JSON.stringify(data));
            response.json(data_arr);
    
        });
       
     
     });
     



     router.get('/customer1',(req,res)=>{
      console.log("printed------------------" + item);
      res.render('bookparking', {dta: JSON.parse(table)});
      });
   

      router.post('/submitkaro',(req,res)=>{
       
            var que=`select pname,area,city from parktable where pname="${req.body.pname}"`;
            db.query(que, function (err, data, fields) {
            if (err) throw err;
            console.log(data);
            res.render('bookparking',{dta: JSON.parse(table), datas:data});
        
      
            });   
 });

 router.post('/done',(req,res)=>{
console.log(req.body)

    
});
            
            

      












router.post('/parkingdata',(req,res)=>{
var que=`select * from parktable where vid=${req.body.id} `;
db.query(que, function (err, data, fields) {
if (err) throw err;
res.render('parkingdata', {dta: JSON.parse(table), datas:data});
});
});

router.post('/parkingformsent',(req,res)=>{
function getCord() {
return new Promise((resolve, reject) => {
console.log("testing" +req.body.vid);
var ques=`select code from pcodes where vid=${req.body.vid};`;
db.query(ques, (err, output)=>{
if (err){
console.log("Errrrrrrrrrrrrrrrrrr");
return;
}
else{
console.log("op"+output[0].code);
park=output[0].code;
}
resolve(true);
});
var sets=`update pcodes set code=code+1 where vid=${req.body.vid};`;
db.query(sets, (err, output)=>{
if (err)
{
console.log("Errrrrrrrrrrrrrrrrrr");
return;
}
else{
console.log("updated bro");
}
resolve(true);
});
});
}
getCord().then(() => console.log("in pro"+park));
const {vid, loc_code,pname, city, area, landmark, pincode, longitude,latitude, min_cost, hcost, type } = req.body;
setTimeout(() => {
let parkcode=park;
const user = { parkcode, vid, loc_code,pname, city, area, landmark, pincode, longitude,latitude, min_cost, hcost, type };
console.log(user);
db.query('INSERT INTO parktable SET ?', user, (err, output) => {
if (err) throw err 
console.log('User saved successfully!');
res.render('formConfirm',{dta: JSON.parse(table)});
});
}, 1000);
});

router.post('/parkingform', (req, res) => {
console.log("dffffffffffff"+req.body.id);
res.render('parkingform',{dta: JSON.parse(table), datt:req.body.id});
});

router.get('/parking', (req, res) => {
var que=`select FID,Cname,owner from sls_vnd_frm`;
db.query(que, function (err, data, fields) {
if (err) throw err;
console.log(data);
res.render('parking', {dta: JSON.parse(table), datas:data});
});
});

function conso(){
function getCord() {
return new Promise((resolve, reject) => {
 var queryString = `SELECT * FROM table_user_role where userrole="${admin}"`;
 db.query(queryString, function(err, recordset){
if(err){
console.log(err)
return;
}
else{
table = JSON.stringify(recordset);
}
resolve(true);
   });
});
}
getCord().then(() => console.log(table));
}
let meme="ayush";

module.export =meme;
module.exports =router;


