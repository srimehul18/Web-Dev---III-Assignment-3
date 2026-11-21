const validateProduct = (req, res, next) => {
    const { name, sku, category, price, quantity, reorderLevel, supplier } = req.body

    const fields = { name, sku, category, price, quantity, reorderLevel, supplier }

    if (req.method === 'POST') {
        for (let key in fields) {
            if (fields[key] === undefined || fields[key] === null || fields[key] === '') {
                return res.status(400).json({
                    message: `${key} is required`,
                    success: false
                })
            }
        }
    }

    if (name !== undefined && (typeof name !== 'string' || !name.trim())) {
        return res.status(400).json({ message: "Invalid product name", success: false })
    }

    if (sku !== undefined && (typeof sku !== 'string' || !sku.trim())) {
        return res.status(400).json({ message: "Invalid SKU", success: false })
    }

    if (category !== undefined && (typeof category !== 'string' || !category.trim())) {
        return res.status(400).json({ message: "Invalid category", success: false })
    }

    if (supplier !== undefined && (typeof supplier !== 'string' || !supplier.trim())) {
        return res.status(400).json({ message: "Invalid supplier", success: false })
    }

    for (let key of ['price', 'quantity', 'reorderLevel']) {
        if (fields[key] !== undefined && (!Number.isFinite(fields[key]) || fields[key] < 0)) {
            return res.status(400).json({
                message: `${key} must be a non-negative number`,
                success: false
            })
        }
    }

    next()
}

export default validateProduct