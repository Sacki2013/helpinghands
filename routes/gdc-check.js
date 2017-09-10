const express = require('express');
const router = express.Router();
const request = require('request');


router.get('/verify', function(req, res){ 

request('https://olr.gdc-uk.org/SearchRegister/SearchResult?RegistrationNumber=134816', function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred and handle it
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      res.send(body)
    });
});