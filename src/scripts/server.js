import express from "express";

let app = express();
app.use(express.static('.'));

app.get('/', function(req, res){
  res.sendFile('index.html', { root: './dist' })
});

app.listen(3000, function(){
  console.log('listening on *:3000');
});