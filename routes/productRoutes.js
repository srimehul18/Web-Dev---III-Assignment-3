import express from 'express'
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct, lowStockReport } from '../controller/productController.js'

const router = express.Router()

router.post('/', createProduct)
router.get('/', getProducts)
router.get('/low-stock', lowStockReport)
router.get('/:id', getProductById)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)

export default router