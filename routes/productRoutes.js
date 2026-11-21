import express from 'express'
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct, lowStockReport, categorySummary, updateStock } from '../controller/productController.js'

const router = express.Router()

router.post('/', createProduct)
router.get('/', getProducts)
router.get('/low-stock', lowStockReport)
router.get('/summary', categorySummary)
router.get('/:id', getProductById)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)
router.put('/:id/stock', updateStock)

export default router