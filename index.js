var express =require("express");
var app =express();
var mysql=require("mysql");
var bodyParser=require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
var cnt=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'react'
});
app.listen(3000);
app.get("/",(req,res) =>{
	res.sendFile(__dirname+'/site/index.html');
})
app.use(express.static(__dirname+'/site/public'));
cnt.connect();
//增删改查
app.get('/data',function(req,res){
	cnt.query('select * from data',function(err,result){
		res.json(result);
	})
}).post('/data',function(req,res){
	cnt.query('insert into data set name=?,parentId=?',
		[req.body.name,req.body.parentId],
		function(err,result){
		if(!err){
			res.json(result.insertId);
		}
	});
}).delete('/data',function(req,res){
	console.log([req.body.num])
	cnt.query('delete from data where id in ('+req.body.num+')'
		,function(err,result){
		if(!err){
			res.json(1);
		}
	})
}).put("/data",function(req,res){
	cnt.query("update data set name=? where id=?",[req.body.name,req.body.id],function(err,result){
		if(!err){
			res.json(1);
		}
	})
})