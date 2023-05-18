import nc from 'next-connect';
import Product from '../../../models/Product';
import db from '../../../utils/database';
const handler = nc();

handler.get(async (req, res) => {
    try {
        db.connectDb();
        const id = req.query.id;
        const style = req.query.style || 0;
        const size = req.query.size || 0;
        const product = await Product.findById(id).lean();
        let discount = product.subProducts[style].discount;
        let priceBefore = product.subProducts[style].sizes[size].price;
        let price = discount ? priceBefore - priceBefore / discount : priceBefore;

        const details = product.details.map((detail) => ({
            name: detail.name,
            value: detail.value,
        }));

        const questions = product.questions.map((question) => ({
            name: question.name,
            value: question.value,
        }));
        db.disconnectDb();
        return res.json({
            _id: product._id,
            style: Number(style),
            name: product.name,
            description: product.description,
            slug: product.slug,
            sku: product.subProducts[style].sku,
            brand: product.brand,
            category: product.category,
            subCategories: product.subCategories,
            shipping: product.shipping,
            images: product.subProducts[style].images,
            color: product.subProducts[style].color,
            size: product.subProducts[style].sizes[size].size,
            price,
            priceBefore,
            quantity: product.subProducts[style].sizes[size].qty,
            details,
            questions,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

handler.put(async (req, res) => {
    try {
        db.connectDb();
        const id = req.query.id;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(400).json({
                message: "Product not found!",
            });
        }
        if (req.body.parent) {
            const parent = await Product.findById(req.body.parent);
            if (!parent) {
                return res.status(400).json({
                    message: "Parent product not found!",
                });
            } else {
                const newParent = await parent.updateOne(
                    {
                        $push: {
                            subProducts: {
                                sku: req.body.sku,
                                color: req.body.color,
                                images: req.body.images,
                                sizes: req.body.sizes,
                                discount: req.body.discount,
                            },
                        },
                    },
                    { new: true }
                );
            }
        } else {
            product.name = req.body.name;
            product.description = req.body.description;
            product.brand = req.body.brand;
            product.details = req.body.details;
            product.questions = req.body.questions;
            product.slug = req.body.slug;
            product.category = req.body.category;
            product.subCategories = req.body.subCategories;
            product.subProducts = [
                {
                    sku: req.body.sku,
                    color: req.body.color,
                    images: req.body.images,
                    sizes: req.body.sizes,
                    discount: req.body.discount,
                },
            ];

            const updatedProduct = await product.save();
            res.status(200).json({ message: "Product updated successfully." });
        }

        db.disconnectDb();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default handler;
