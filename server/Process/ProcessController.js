const{validationResult}= require('express-validator');

var ProcessModel= require('./ProcessModel');

//exports.InsertProcess=AddPorcess;
exports.AddPorcess=AddPorcess;
exports.UpdatePorcess=UpdatePorcess;
exports.DeleteProcess=DeleteProcess;
exports.ProcessListByid=ProcessListByid;
exports.ProcessFetchAll=ProcessFetchAll;


//this controller function is for Add process
function AddPorcess(req,res)
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
        
        ProcessModel.InsertProcess(req.body,res);
    }
}
//this function is for update process
function UpdatePorcess(req,res)
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
        
        ProcessModel.UpdateProcess(req.body,res);
    }
}

//This function is for Deleting/Deactivate a process
function DeleteProcess(req,res)
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
        
        ProcessModel.DeleteProcess(req.body,res);
    }
}


//This function is for Deleting/Deactivate a process
function ProcessListByid(req,res)
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
        
        ProcessModel.FetchSingle(req,res);
    }
}


//This function is for Deleting/Deactivate a process
function ProcessFetchAll(req,res)
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
        
        ProcessModel.FetchAll(req,res);
    }
}
