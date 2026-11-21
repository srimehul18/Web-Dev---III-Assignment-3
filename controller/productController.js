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

export { createProduct, getProducts, getProductById }