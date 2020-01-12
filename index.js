
const cv = require ('opencv4nodejs');
  //video capture from raspberry2
wCap = new cv.VideoCapture(0);
wCap.set(cv.CAP_PROP_FRAME_WIDTH, 300);
wCap.set(cv.CAP_PROP_FRAME_HEIGHT, 240);

const fs = require('fs');
const socket2 = require('socket.io-client')('https://raspberrypi.local:5000/',{
  ca: fs.readFileSync('cert.pem'),
  rejectUnauthorized: false
}); // connect to raspberry1 socket server

socket2.on('connect', function(){
console.log('connect') //test connection
});

setInterval(()=>{
  const frame = wCap.read();
  const image = cv.imencode('.jpeg', frame, [cv.IMWRITE_JPEG_QUALITY, 45])
  const imageFormated=image.toString('base64')
  socket2.emit('image2', imageFormated); // send binary data to raspberry1 server
  }, 140)

                          
