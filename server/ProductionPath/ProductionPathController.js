const{validationResult}= require('express-validator');
var ProductionPathModel= require('./ProductionPathModel');

//exports.AddProductionPath=AddProductionPath;
//exports.UpdateProductionPath=UpdateProductionPath;
exports.AddProductionPaths=AddProductionPaths;
exports.UploadFile=UploadFile;

//exports.InsertInventory=AddInventory;

//this function is for uploading the file to uploads folder
function UploadFile(req,res)
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
        
        ProductionPathModel.UploadFile(req,res);
    }
}

//this function is for Update Production Path
function UpdateProductionPath(req,res)
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
        
        ProductionPathModel.UpdateProductionPath(req,res);
    }

}

//this function is for inserting ProductionPath
function AddProductionPaths(req,res)
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
    else{
        ProductionPathModel.AddProductionPaths(req.body,res);
    }
}