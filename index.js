const http = require('http');
const fs = require('fs');
var requests = require('requests');

const homefile  = fs.readFileSync("home.html",'utf-8')

const replaceVal= (tempval, orginval)=>{
    let temperature  = tempval.replace("{%tempval%}",orginval.main.temp);
    temperature = temperature.replace("{%tempmin%}",orginval.main.temp_min);
    temperature = temperature.replace("{%tempmax%}",orginval.main.temp_max);
    temperature = temperature.replace("{%location%}",orginval.name);
    temperature = temperature.replace("{%country%}",orginval.sys.country);

    return temperature;
}

const server = http.createServer((request,response)=>{
    if(request.url == '/'){
        requests('https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=ff0488d2384bcb23a705ca2424d8f52f')
        .on('data',  (chunk)=> {
            const par = JSON.parse(chunk)
            const arrdata = [par];
            const realtime = arrdata
        .map((val)=> replaceVal(homefile,val))
        .join("");  
                 response.write(realtime);
                      console.log(realtime);
        })
        
        .on('end',  (err)=> {
          if (err) return console.log('connection closed due to errors', err);
            response.end();
          
        });
    }
    
});




server.listen(7000, "127.0.0.1");