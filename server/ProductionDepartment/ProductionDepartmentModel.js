var connection=require('../../connetion/connection');
const sql = require('mssql/msnodesqlv8');
var ProductionDeptModel={};

ProductionDeptModel.AddProductionDepartment= function(data,res)
{
var keys=['ProductionDepartmentName','CreatedBy'];
        connection.connect().then(() => {
        let request=connection.request();
        request.input('ProductionDepartmentName',sql.VarChar,data.ProductionDepartmentName);
        request.input('CreatedBy',sql.VarChar,data.CreatedBy);                 
        request.query(`insert into Tbl_ProductionDepartment(${keys.join(',')}) values (@ProductionDepartmentName,@CreatedBy);`,function(errors, result)
    {
        if(errors)
        {
            res.send({
                Status:201,
                Errors:{
                    ErrorCode:1,
                    ErrorMessage:'Unable to add production department'
                },
                Error:errors,

            })

        }
        else{
            res.send({
                Status:200,
                Errors:{
                    ErrorCode:0,
                    Message:'Department inserted successfully'
                },
                Data:result
            })
            
        }
    })
})
}

//this function is to fetch all production department
ProductionDeptModel.FetchallProductionDepartment=function(req,res)
{
    connection.connect().then(() => {
        let request=connection.request();                 
        request.query(`select * from  Tbl_ProductionDepartment`,function(errors, result)
    {
        if(errors)
        {
            res.send({
                Status:201,
                Errors:{
                    ErrorCode:1,
                    ErrorMessage:'Unable to fetch production departments details'
                },
                Error:errors,

            })

        }
        else{
            res.send({
                Status:200,
                Errors:{
                    ErrorCode:0,
                    Message:'Data fetched sucessfully'
                },
                Data:result.recordset
            })
            
        }
    })
})
}

//this function is to fetch single production department
ProductionDeptModel.FetchSingleProductionDepartment=function(req,res)
{
console.log(req.params['ProductionDepartmentId']);
connection.connect().then(() => {
  const request = connection.request();
  request.input('ProductionDepartmentId', req.params['ProductionDepartmentId']); 
  var sql = `select * from Tbl_ProductionDepartment  where ProductionDepartmentId=@ProductionDepartmentId`;
	request.query(sql, (error, result) => {
        if (error){
            			res.send({
            				Status: 202,
            				Error: {
            					ErrorCode: 2,
            					Error:error
            				},
            				Message:'Production  department does not found',
            				Data:{}
            
                        })
            		}else{
                        // console.log(result.recordset.length);
            			if(result.recordset.length > 0){
            				res.send({
            					Status:200,
            					Error:{
            					ErrorCode : 0,
            					Error:error,
            					Error:'No error',
            					},
            					Message:"Production department details fetched sucessfully",
            					Data:result.recordset
            
            
            				})
            			}else{
            				res.send({
            					Status:404,
            					Error:{
            					ErrorCode : 2,
            					Error:error
            					},
            					Message:"Production department details not found",
            					Data:{}
            				})
            			}
            		}
	})
})
}

//this function is to update  production department

ProductionDeptModel.UpdateProductionDepartment=function(data,res)
{
        connection.connect().then(() => {
        let request=connection.request();
        request.input('ProductionDepartmentId',data.ProductionDepartmentId);
        request.input('ProductionDepartmentName',data.ProductionDepartmentName);
        request.input('CreatedBy',data.CreatedBy);        
        request.query(`update  Tbl_ProductionDepartment set ProductionDepartmentName=@ProductionDepartmentName,CreatedBy=@CreatedBy where ProductionDepartmentId=@ProductionDepartmentId`,function(errors, result)
    {
        if(errors)
        {
            res.send({
                Status:201,
                Errors:{
                    ErrorCode:1,
                    ErrorMessage:'Unable to update production department'
                },
                Error:errors,

            })

        }
        else{
            res.send({
                Status:200,
                Errors:{
                    ErrorCode:0,
                    Message:'Production department updated successfully'
                },
                Data:result
            })
            
        }
    })
})

}
module.exports=ProductionDeptModel;
