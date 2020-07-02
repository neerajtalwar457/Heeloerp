var express= require('express');
var ProductionPathRouter= express.Router();

var ProductionPathController=require('./ProductionPathController');
var ProductionPathValidation=require('./ProductionPathValidation');

//this route is for adding production path(temporary)
//ProductionPathRouter.post('/AddProductionPath',ProductionPathController.AddProductionPath);
ProductionPathRouter.post('/UploadFile',ProductionPathController.UploadFile);

//this route is for adding production path details
ProductionPathRouter.post('/AddProductionPaths',ProductionPathValidation.ValidateProductionPath, ProductionPathController.AddProductionPaths);


ProductionPathRouter.use('**',(req,res)=>
{
    res.send({
        Status:404,
        Message:'Request Denied'
    })
})

module.exports=ProductionPathRouter;