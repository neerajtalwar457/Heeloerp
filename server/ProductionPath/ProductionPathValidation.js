const {check} = require('express-validator');

exports.ValidateUploadFile=[
    check('PdfPath')
       .notEmpty().withMessage('file must be uploaded'),
];
exports.ValidateProductionPath=[
    check('data.*.OCN').exists()
    .isAlphanumeric().withMessage('OCN no. must be in valid format')
    .notEmpty().withMessage('OCN  must not be empty'),

    check('data.*.Style').exists()
       .isAlphanumeric().withMessage('Style must be in valid format')
       .notEmpty().withMessage('Style Id must not be empty'),

    check('data.*.BuyerId').exists()
    .isNumeric().withMessage('Buyer Id must be numeric only')
    .notEmpty().withMessage('Buyer Id  must not be empty'),

    check('data.*.CreatedBy').exists()
    .matches(/^[a-zA-Z]+$/).withMessage('CreatedBy must be alphabetic only')
    .notEmpty().withMessage('CreatedBy must not be empty'),

    check('PathDetails.*.ProductionDepartmentId').exists()
    .isNumeric().withMessage('Production department Id must be numeric')
    .notEmpty().withMessage('Production department Id must not be empty'),


    check('PathDetails.*.ProductionProcessId').exists()
      .isNumeric().withMessage('Production process Id must be numeric')
      .notEmpty().withMessage('Production Process Id must not be empty'),




];

