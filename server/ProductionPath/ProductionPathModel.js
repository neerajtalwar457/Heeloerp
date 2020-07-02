var connection=require('../../connetion/connection');
const sql = require('mssql/msnodesqlv8');
var dateTime = require('node-datetime');
var ProductionPathModel={};
var fs = require('fs');
var path = require('path');
var moment = require('moment');
var moment= require('moment-timezone');
const { timeStamp } = require('console');
const { DateTimeOffset, DateTime } = require('mssql/msnodesqlv8');
const { create } = require('lodash');

ProductionPathModel.UploadFile= function(req,res)
{
    
  try {
    if(!req.files) {
        res.send({
            status: false,
            message: 'No file uploaded'
        });
    } 
    else 
    {
        let PdfPath = req.files.PdfPath;        
        var FileName = 'uploads/'+Date.now()+path.extname(PdfPath.name);
        var FileReturn=Date.now()+path.extname(PdfPath.name);
        PdfPath.mv('./'+FileName);
        res.send({
            
            data: {               
               FileName                
            }
        });
    }
  } catch (err) {
    res.send({
            Status:false,
            Message:'Unable to file upload'
    })
}
}

//this function is for inserting ProductionPath and having a function to insert production path details
ProductionPathModel.AddProductionPaths=function(data,res)
{
    var object= data.data[0];
    var keys=['OCN','Style','CSImage','BuyerId','PathPdf','CreatedBy'];
    connection.connect().then(() => {
        let request=connection.request();
        request.input('OCN',sql.VarChar,object.OCN);
        request.input('Style',sql.VarChar,object.Style);
        request.input('CSImage',sql.VarChar,object.CSImage);
        request.input('BuyerId',sql.VarChar,object.BuyerId);
        request.input('PathPdf',sql.VarChar,object.PathPdf);
        request.input('CreatedBy',sql.VarChar,object.CreatedBy);                 
        request.query(`insert into Tbl_ProductionPath(${keys.join(',')}) values (@OCN,@Style,@CSImage,@BuyerId,@PathPdf,@CreatedBy);select @@identity as ProductionPathId`, function(errors, result)
        {
            var PathId= result.recordset[0].ProductionPathId;
            if(errors)
            {
                res.send({
                    Status:201,
                    Errors:{
                        ErrorCode:1,
                        ErrorMessage:'Unable to add  production path'
                    },
                    Error:errors,
                })
            }
            else
            {                      
                AddPathDetails(PathId,data,res);
            }
        })
    })
}

//this function is for adding details to productionPath details
function AddPathDetails(PathId,data,res)
{
    const table = new sql.Table('tbl_PathDetail');
    table.create= false;
    connection.connect().then(()=>
    {
        table.columns.add('PathId',sql.VarChar);
        table.columns.add('ProductionDepartmentId',sql.VarChar);
        table.columns.add('ProductionProcessId',sql.VarChar);
        table.columns.add('CreatedDate',sql.DateTime, new Date().toString());
        table.columns.add('UpdatedDate',sql.DateTime,new Date().toString());

        for(var i = 0; i < data.PathDetails.length; i++)
        { 
            for(var j = 0; j < data.PathDetails[i].ProductionProcessId.length; j++)
            {   
                
                table.rows.add(PathId,data.PathDetails[i].ProductionDepartmentId,data.PathDetails[i].ProductionProcessId[j],new Date(),new Date());
                // console.log('DepartmentId : '+data.PathDetails[i].ProductionDepartmentId);
                // console.log('ProcessId : '+data.PathDetails[i].ProductionProcessId[j]);
            }
        }               
         let request= new sql.Request(connection);
         request.bulk(table,(errors,results)=>{
            if(errors)
            {
                connection.close();
                res.send({

                    Status:201,
                    Errors:{
                        ErrorCode:1,
                        ErrorMessage:'Unable to insert path details'
                    }                    
                })
            }
            else
            {
                res.send({
                    Status:200,
                    Errors:{
                        ErrorCode:0,
                        Message:'Production path details inserted successfully'
                    },
                    Data:results

                })

            }
        })

   })
}

module.exports=ProductionPathModel;