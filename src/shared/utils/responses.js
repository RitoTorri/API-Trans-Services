const QuerySuccess = (res, details) => {
    res.status(200).json({
        success: true,
        code: 'REQUEST_SUCCESSFUL',
        message: 'The request was successful.',
        details: details
    })
}

const ItemCreated = (res, details) => {
    res.status(201).json({
        success: true,
        code: 'ITEM_CREATED',
        message: 'The item was created successfully.',
        details: details
    })
}

const ItemDeleted = (res) => {
    res.status(204).json({
        success: true,
        code: 'ITEM_DELETED',
        message: 'The item was deleted successfully.',
    })
}

const ResConflict = (res, details) => {
    res.status(409).json({
        success: false,
        code: 'RESOURCE_CONFLICT', // Más específico
        message: 'The resource already exists or conflicts with existing data.',
        details: details
    })
}

const BadRequest = (res, details) => {
    res.status(400).json({
        success: false,
        code: 'BAD_REQUEST',
        message: 'The request was invalid.',
        details: details
    })
}

const ParametersInvalid = (res, details) => {
    res.status(422).json({
        success: false,
        code: 'VALIDATION_ERROR',
        message: 'Parameter validation failed.',
        details: details
    })
}

const ItemNotFound = (res, details) => {
    res.status(404).json({
        success: false,
        code: 'ITEM_NOT_FOUND',
        message: 'The item was not found.',
        details: details
    })
}

const ErrorAuthorization = (res, details) => {
    res.status(401).json({
        success: false,
        code: 'ERROR_AUTHORIZATION',
        message: 'Authorization error.',
        details: details
    })
}

const UnauthorizedEdit = (res, details) => {
    res.status(403).json({
        success: false,
        code: 'UNAUTHORIZED_EDIT',
        message: 'You are not authorized to edit this resource.',
        details: details
    })
}

const ErrorInternal = (res, details) => {
    res.status(500).json({
        success: false,
        code: 'ERROR_INTERNAL',
        message: 'Internal error.',
        details: details
    })
}



export default {
    BadRequest, ParametersInvalid, ItemNotFound, QuerySuccess, ResConflict, ItemCreated,
    ErrorAuthorization, ErrorInternal, UnauthorizedEdit, ItemDeleted
}