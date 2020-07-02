var connection= require('../../connetion/connection');
const sql= require('mssql/msnodesqlv8');
const  DateTime  = require('mssql/msnodesqlv8');



var ProcessModel={};
//this function is for inserting a new process
ProcessModel.InsertProcess= function(data,res)
{ 
    const table= new sql.Table('Tbl_ProductionProcess');
    table.create= false;
    connection.connect().then(()=>{    
        table.columns.add('ProductionDepartmentId',sql.VarChar);
        table.columns.add('ProcessName',sql.VarChar);
        table.columns.add('CreatedBy',sql.VarChar);
        table.columns.add('Status',sql.VarChar);
        table.columns.add('CreatedDate',sql.DateTime);
        table.columns.add('UpdatedDate',sql.DateTime);
        var processlength= data.data;
        var count= Object.keys(data).length;
         for(var j=0;j<count;j++){
             table.rows.add(processlength[j].ProductionDepartmentId,processlength[j].ProcessName,processlength[j].CreatedBy,'A',new Date(),new Date());
         }
         let request= connection.request();
         request.bulk(table,(errors,results)=>
         {
             if(errors)
             {
                res.send({
                           Status:201,
                           Errors:{
                             ErrorCode:1,
                             ErrorMessage:'Unable to add process'
                                 },
                              Error:errors,                        
                         })

             }
             else{
                res.send({
                    Status:200,
                    Errors:{
                        ErrorCode:0,
                        Message:'process inserted successfully'
                    },
                    Data:data
                })
             }
         }
         )
    })

}

//this process is for update Process
ProcessModel.UpdateProcess=function(data,res)
{
  
  console.log(data);
    connection.connect().then(()=>
    {
        
        let request= connection.request();
        request.input('ProductionProcessId',sql.Int,data.ProductionProcessId);
        request.input('ProductionDepartmentId',sql.VarChar,data.ProductionDepartmentId);
        request.input('ProcessName',sql.VarChar,data.ProcessName);
        request.input('CreatedBy',sql.VarChar,data.CreatedBy);

        request.query(`update  Tbl_ProductionProcess set ProductionDepartmentId=@ProductionDepartmentId, ProcessName=@ProcessName,CreatedBy=@CreatedBy,UpdatedDate=getdate() where ProductionProcessId=@ProductionProcessId`,function(errors,results)
        {
            if(errors)
            {
                res.send({
                    Status:201,
                    Errors:{
                        ErrorCode:1,
                        ErrorMessage:'Unable to update process'
                    },
                    Error:errors,
    
                })
            }
            else
            {
                res.send({
                    Status:200,
                    Errors:{
                        ErrorCode:0,
                        Message:'process updated successfully'
                    },
                    Data:results
                })         

            }
        })
    })
}

//this function is for deleting/dactivating a process
ProcessModel.DeleteProcess= function(data,res)
{
    connection.connect().then(()=>
    {
        let request= connection.request();
        request.input('ProductionProcessId',sql.Int,data.ProductionProcessId);
        request.query(`update Tbl_ProductionProcess set Status = case Status when 'A' then 'D' else 'A' End where ProductionProcessId = @ProductionProcessId`,function(errors,results)
        {
            if(errors)
            {
                res.send({
                    Status:201,
                    Errors:{
                        ErrorCode:1,
                        ErrorMessage:'Unable to Change Status'
                    },
                    Error:errors,    
                })
            }
            else
            {
                res.send({
                    Status:200,
                    Errors:{
                        ErrorCode:0,
                        Message:'Status changed successfully'
                    },
                    Results:results
                })

            }
        })
    })
}


//this function is for fetching single process details
ProcessModel.FetchSingle=function(req,res)
{
    connection.connect().then(()=>
    {
        let request= connection.request();
        request.input('ProductionProcessId',req.params['ProductionProcessId']);
        request.query(`select Tbl_ProductionProcess.*, Tbl_ProductionDepartment.ProductionDepartmentName from Tbl_ProductionProcess inner join Tbl_ProductionDepartment
        on Tbl_ProductionProcess.ProductionDepartmentId = Tbl_ProductionDepartment.ProductionDepartmentId
        where Tbl_ProductionProcess.Status = 'A' and ProductionProcessId=@ProductionProcessId`,function(errors,results)
        {
            if(errors)
            {
                res.send({
                    Status:201,
                    Errors:{
                        ErrorCode:1,
                        ErrorMessage:'Unable to fetch details'
                    },
                    Error:errors,    
                })               
            }
            else
            {
                if(results.recordset.length>0)
                {
                    res.send({
                        Status:200,
                        Error:{
                        ErrorCode : 0,
                        Error:errors,
                        Error:'No error',
                        },
                        Message:"Production process details fetched successfully",
                        Data:results.recordset  
    
                    })
                }
                else
                {
                    res.send({
                        Status:404,
                        Error:{
                        ErrorCode : 2,
                        Error:errors
                        },
                        Message:"Production Process details not found",
                        Data:{}
                    })
                }
            }
        })
    })
}

//this function is for fetching all process details
ProcessModel.FetchAll=function(req,res)
{
    connection.connect().then(()=>
    {
        let request= connection.request();
        request.query(`select Tbl_ProductionProcess.*, Tbl_ProductionDepartment.ProductionDepartmentName from Tbl_ProductionProcess inner join Tbl_ProductionDepartment
        on Tbl_ProductionProcess.ProductionDepartmentId = Tbl_ProductionDepartment.ProductionDepartmentId
        where Tbl_ProductionProcess.Status = 'A' `,function(errors,results)
        {
            if(errors)
            {
                res.send({
                    Status:201,
                    Errors:{
                        ErrorCode:1,
                        ErrorMessage:'Unable to fetch details'
                    },
                    Error:errors,
    
                })
                
            }
            else
            {
                if(results.recordset.length>0)
                {
                    res.send({
                        Status:200,
                        Error:{
                        ErrorCode : 0,
                        Error:errors,
                        Error:'No error',
                        },
                        Message:"Production process details fetched successfully",
                        Data:results.recordset   
    
                    })
                }
                else
                {
                    res.send({
                        Status:404,
                        Error:{
                        ErrorCode : 2,
                        Error:errors
                        },
                        Message:"Production Process details not found",
                        Data:{}
                    })
                }
            }
        })
    })
}
module.exports=ProcessModel;




