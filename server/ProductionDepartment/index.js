var express= require('express');
var ProductionDeptRouter= express.Router();

var ProductionDeptController=require('./ProductionDepartmentController');
var ProductionDeptVlalidation=require('./ProductionDepartmentValidation');

//this route is for adding production department
ProductionDeptRouter.post('/AddProductionDepartment',ProductionDeptVlalidation.ValidateProductionDept,ProductionDeptController.AddProductionDepartment);

// this route is for fetch all production department
 ProductionDeptRouter.get('/FetchallProductionDepartment',ProductionDeptController.FetchallProductionDepartment);

// this route is for fetch single production department
ProductionDeptRouter.get('/FetchSingleProductionDepartment/:ProductionDepartmentId',ProductionDeptController.FetchSingleProductionDepartment);

//this route is for updating production  
ProductionDeptRouter.put('/UpdateProductionDepartment',ProductionDeptVlalidation.ValidateProductionDeptUpdate,ProductionDeptController.UpdateProductionDepartment);

ProductionDeptRouter.use('**',(req,res)=>
{
    res.send({
        Status:404,
        Message:'Request Denied'
    })
})

module.exports=ProductionDeptRouter;