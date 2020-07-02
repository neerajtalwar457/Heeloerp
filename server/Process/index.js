var express= require('express');
var ProcessRouter= express.Router();

var ProcessController= require('./ProcessController');
var ProcessValidate= require('./ProcessValidation');
//this route is for inserting a new process
ProcessRouter.post('/AddProcess',ProcessValidate.ValidateInsertAPIFields, ProcessController.AddPorcess);

//this route is for updating a existing process
ProcessRouter.put('/UpdateProcess',ProcessValidate.ValidateUpdateAPIFields, ProcessController.UpdatePorcess);

//this route is for deactivating/deleting Process
ProcessRouter.put('/DeleteProcess',ProcessValidate.ValidateDeleteAPI, ProcessController.DeleteProcess);

//this route is for fetching single process details
ProcessRouter.get('/FetchSingle/:ProductionProcessId',ProcessValidate.ValidateFetchSingleApi, ProcessController.ProcessListByid);

//this route is for fetching all process details
ProcessRouter.get('/Fetchall',ProcessController.ProcessFetchAll);






ProcessRouter.use('**',(req,res)=>
{
    res.send({
        Status:404,
        Message:'Request Deniedd'
    })
})

module.exports=ProcessRouter;