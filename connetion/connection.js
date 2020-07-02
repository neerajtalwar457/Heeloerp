const sql = require('mssql/msnodesqlv8');
const pool = new sql.ConnectionPool({
  database: 'LajExportDTest',
  server: 'DESKTOP-S7CGNKF',
  driver: 'msnodesqlv8',
  port :1433,

  options: {
    trustedConnection: true,
    instanceName:""
  }
})
module.exports=pool;
