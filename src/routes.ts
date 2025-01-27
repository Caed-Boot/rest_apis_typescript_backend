import { Router } from "express"
import { body, param } from "express-validator"
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"

const router = Router()

// CREATE
router.post('/', 
    
    /// Validacion
    body('name')
    .notEmpty().withMessage('El nombre de producto no puede ir vacio'),
    ///
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio de producto no puede ir vacio')
        .custom( value => value > 0).withMessage('Precio no valido'),
    handleInputErrors,
    createProduct
)

// GET ALL
router.get('/', getProducts)

// GET ONE
router.get('/:id', 
    
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductById
)

// UPDATE
router.put('/:id',
    
    body('name')
    .notEmpty().withMessage('El nombre de producto no puede ir vacio'),
    ///
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio de producto no puede ir vacio')
        .custom( value => value > 0).withMessage('Precio no valido'),
    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no valido'),
    handleInputErrors,
    updateProduct)


router.patch('/:id', 
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    updateAvailability
)


router.delete('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    deleteProduct
)

export default router