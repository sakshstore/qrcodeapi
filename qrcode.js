
const express = require('express')
const app = express()
const port = 80
var QRCode = require('qrcode')
app.use(express.json());
var fs = require('fs');
var path = require('path');
var request = require('request');
var morgan = require('morgan')



app.use(express.static('public'))



 
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

 
var cron = require('node-cron');
   
    

 
 
  

 
 
  
 


function getQRcodeURL( data,host ) {
  return new Promise(resolve => { 


const path = './public/'+data.name+'.png';
 

QRCode.toFile(path, data.content , function (err) {
  if (err) throw err
  console.log('saved.')
  
  var responsv3=Object();


  responsv3= {
	  "status": true,
    
        "URL": "https://"+ host + "/"+ data.name+'.png',
       
       
        "content": data.content,
        "name": data.name,
		
        "support": "info@aistore2030.com"
      
     
	}; 
    
	
	
      resolve(responsv3);
	  
}) ; 
});
 
}
 
 



app.post("/QRCode", (req, res) => {
	
var host = req.get('host');

 console.log(host);
	
	getQRcodeURL(req.body ,host ).then(( data) => {
	
	     
		 
  res.json ( data );
		
		
	  
	   
});

});

 
 

 

 
app.get("/", (req, res) => {
	
	 
 
		 
  res.send ( "LIVE..."  );
		
		
	  

 

});



 
 


 



 




app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
