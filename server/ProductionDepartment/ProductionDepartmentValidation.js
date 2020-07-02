const {check} = require('express-validator');

//validation for adding new production department
exports.ValidateProductionDept = [
	check('ProductionDepartmentName')
    .matches(/^[a-zA-Z ]+$/).withMessage("must be alphabets")
    .notEmpty().withMessage('Production Department name must be in valid format'),
    	
];

// validation for updating  production department
exports.ValidateProductionDeptUpdate = [
    check('ProductionDepartmentId')
    .notEmpty().withMessage('Production Department mus not be empty')
    .isInt({min:1}).withMessage('Production Department id must be in valid format'),
    
	check('ProductionDepartmentName')
    .matches(/^[a-zA-Z ]+$/).withMessage("must be alphabets")
    .notEmpty().withMessage('Production Department name must be in valid format'),
    	
];