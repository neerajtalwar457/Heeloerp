const{validationResult}= require('express-validator');
var ProductionDeptModel= require('./ProductionDepartmentModel');

exports.AddProductionDepartment=AddProductionDepartment;
exports.FetchallProductionDepartment=FetchallProductionDepartment;
exports.FetchSingleProductionDepartment=FetchSingleProductionDepartment;
exports.UpdateProductionDepartment=UpdateProductionDepartment;
//exports.InsertInventory=AddInventory;
function AddProductionDepartment(req,res)
{
    const errors= validationResult(req);
    if(!errors.isEmpty())
    {
        res.send({
            Status:201,
            Error:{
            ErrorCode:1,
            Errors:errors
            },
            Message:"Validation error"
        })
    }
    else
    {
        
        ProductionDeptModel.AddProductionDepartment(req.body,res);
    }
}

//this function is to fetchall production departments
function FetchallProductionDepartment(req,res)
{
   
    ProductionDeptModel.FetchallProductionDepartment(req,res);
}

//this function is to fetch single production department
function FetchSingleProductionDepartment(req,res)
{
    ProductionDeptModel.FetchSingleProductionDepartment(req,res);
}

//this fucntion is to update production department

function UpdateProductionDepartment(req,res)
{
    const errors= validationResult(req);
    if(!errors.isEmpty())
    {
        res.send({
            Status:201,
            Error:{
            ErrorCode:1,
            Errors:errors
            },
            Message:"Validation error"
        })
    }
    else
    {
        
        ProductionDeptModel.UpdateProductionDepartment(req.body,res);
    }
}