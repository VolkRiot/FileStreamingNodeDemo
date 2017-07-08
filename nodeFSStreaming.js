var fs = require('fs');
var path = require('path');
// var http = require('http');
var sleep = require('sleep');

// Creates a fairly large file with a repeated string;
// for (var i = 0; i < 100000; i++) {
//   try {
//     fs.appendFileSync('./long.txt', 'Hello Node.js');
//   } catch(e) {
//     console.log('Error ', e.stack)
//   }
// }

// Testing the write file feature
// try {
//   fs.writeFileSync('./readTest.txt', 'Hello World this is a test for reading in a file');
// } catch(e) {
//   console.log("Error ", e.stack);
// }

// Testing the Read File feature
// fs.readFile('./readTest.txt','utf-8' /* Ommitting this 'utf-8' will return a Buffer! COOL! */ , function(err, data) {
//     if (err) throw err;
//     console.log(data);
// });

// Use FS to get the file size in bites

const stats = fs.statSync("./long.txt")
const fileSizeInBytes = stats.size
let dataLength = 0;

console.log(`File size in bytes is, ${stats.size} bytes`);

var readStream = fs.createReadStream("./long.txt", { highWaterMark: 128 });
var writeStream = fs.createWriteStream('./writo.txt');
var totalData = 0;

readStream.on('data', (data) => {
  // Callback to the data event return a Buffer Object;
  totalData += data.length;
  console.log(`Received ${data.length} bytes of data.`);

  if (totalData < 1280) {
      // As a test use the toString() to convert the buffer to a string
      console.log(data.toString());
      writeStream.write(data);
  } else {
    readStream.close();
    return;
  }

  readStream.pause();

  setTimeout(() => {
    console.log('Now data will start flowing again.');
    readStream.resume();
  }, 2000);

});

readStream
  .on('close', function () {  // done
    console.log('The length was:', totalData);
  });
