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
        const products = await Product.find()

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

export { createProduct, getProducts }