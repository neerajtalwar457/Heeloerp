const {check} = require('express-validator');


exports.ValidateInsertAPIFields=[
    check('data.*.ProcessName').exists()
    .notEmpty().withMessage('Process Name must not be empty')
    .matches(/^[a-zA-Z]+$/).withMessage('ProcessName must be alphabetic only'),

    check('data.*.ProductionDepartmentId').exists()
    .isNumeric().withMessage('ProductionDepartmentId must be numeric only')
    .notEmpty().withMessage('ProductionDepartmentId must not be empty'),

    check('data.*.CreatedBy').exists()
    .matches(/^[a-zA-Z]+$/).withMessage('CreatedBy must be alphabetic only')
    .notEmpty().withMessage('CreatedBy must not be empty'),

];

exports.ValidateUpdateAPIFields=[
    check('data.*.ProductionProcessId').exists()
    .notEmpty().withMessage('ProductionProcessId cannot be empty')
    .isNumeric().withMessage('Production process id must be numeric only'),

    check('data.*.ProcessName').exists()
    .matches(/^[a-zA-Z]+$/).withMessage('ProcessName must be alphabetic only')
    .notEmpty().withMessage('Process Name must not be empty'),

    check('data.*.ProductionDepartmentId').exists()
    .isNumeric().withMessage('ProductionDepartmentId must be numeric only')
    .notEmpty().withMessage('ProductionDepartmentId must not be empty'),

    check('data.*.CreatedBy').exists()
    .matches(/^[a-zA-Z]+$/).withMessage('CreatedBy must be alphabetic only')
    .notEmpty().withMessage('CreatedBy must not be empty'),
];

exports.ValidateDeleteAPI=
[
    check('ProductionProcessId')
    .notEmpty().withMessage('ProductionProcessId cannot be empty')
    .isNumeric().withMessage('Production process id must be numeric only')
];

exports.ValidateFetchSingleApi=[
    check('ProductionProcessId')
    .notEmpty().withMessage('ProductionProcessId cannot be empty')
    .isNumeric().withMessage('Production process id must be numeric only')

];