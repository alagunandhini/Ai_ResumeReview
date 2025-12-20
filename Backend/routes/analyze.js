var express = require('express');
var router = express.Router();
var analyzeResume=require('..//controller/analyzeController.js')



router.post("/", analyzeResume);

module.exports = router;
