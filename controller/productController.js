import Product from '../model/productModel.js'

const createProduct = async (req, res) => {
    try {
        const { name, sku, category, price, quantity, reorderLevel, supplier } = req.body

        const product = await Product.create({name, sku, category, price, quantity, reorderLevel, supplier})

        res.status(201).json({
            message: "Product created successfully",
            success: true,
            product
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

const getProducts = async (req, res) => {
    try {
        const { category, search, sort, page = 1, limit = 10 } = req.query

        let filter = {}

        if (category) {
            filter.category = category
        }

        if (search) {
            filter.name = { $regex: search, $options: 'i' }
        }

        const products = await Product.find(filter)
            .sort(sort ? { price: sort === 'asc' ? 1 : -1 } : {})
            .skip((page - 1) * limit)
            .limit(Number(limit))

        res.status(200).json({
            message: "Products fetched successfully",
            success: true,
            products
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            })
        }

        res.status(200).json({
            message: "Product fetched successfully",
            success: true,
            product
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        )

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            })
        }

        res.status(200).json({
            message: "Product updated successfully",
            success: true,
            product
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false
            })
        }

        res.status(200).json({
            message: "Product deleted successfully",
            success: true,
            product
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

const lowStockReport = async (req, res) => {
    try {
        const lowStockItems = await Product.find({
            $expr: {
                $lte: ['$quantity', '$reorderLevel']
            }
        })

        res.status(200).json({
            message: "Low stock report generated successfully",
            success: true,
            count: lowStockItems.length,
            lowStockItems
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}

const categorySummary = async (req, res) => {
    try {
        const summary = await Product.aggregate([
            {
                $group: {
                    _id: '$category',
                    totalProducts: { $sum: 1 },
                    totalQuantity: { $sum: '$quantity' },
                    averagePrice: { $avg: '$price' }
                }
            }
        ])

        res.status(200).json({
            message: "Category summary generated successfully",
            success: true,
            summary
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

const updateStock = async (req, res) => {
    try {
        const { change } = req.body

        if (!Number.isInteger(change) || change === 0) {
            return res.status(400).json({
                message: "Change must be a non-zero integer",
                success: false
            })
        }

        const product = await Product.findOneAndUpdate(
            {
                _id: req.params.id,
                quantity: { $gte: Math.max(0, -change) }
            },
            {
                $inc: { quantity: change }
            },
            {
                new: true
            }
        )

        if (!product) {
            return res.status(400).json({
                message: "Product not found or insufficient stock",
                success: false
            })
        }

        res.status(200).json({
            message: "Stock updated successfully",
            success: true,
            product
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export { createProduct, getProducts, getProductById, updateProduct, deleteProduct, lowStockReport, categorySummary, updateStock }