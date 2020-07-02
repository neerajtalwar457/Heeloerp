var express = require('express');
var router = express.Router();

//var jwt = require('jsonwebtoken');
//var inventory= require('./Inventory/index');
var ProductionDepartment=require('./ProductionDepartment/index');


//this route is for Porcess related apis
var Process= require('./Process/index');

//this routte is for PdfPath related api
var ProductionPath= require('./ProductionPath/index');


//this route is for inventory related apis
//router.use('/AddInventory',inventory);

//this route is for production department
router.use('/ProductionDepartment',ProductionDepartment);

router.use('/Process',Process);

// this route is to add pdfPath
router.use('/ProductionPath',ProductionPath);




router.use('**', (req, res) => {
	res.send({
		Status: 404,
		Error: {
			ErrorCode: 2,
			ErrorMessage: 'Requested api is not found'
		},
		Message: 'Request denied!'
	})
})
module.exports = router;
