import nc from "next-connect";
import auth from "../../../middleware/auth";
import admin from "../../../middleware/admin";
import db from "../../../utils/database";
import Order from "../../../models/Order";

const handler = nc().use(auth).use(admin);

handler.put(async (req, res) => {
    try {
        const { id, status } = req.body;
        db.connectDb();
        await Order.findByIdAndUpdate(id, { status });
        db.disconnectDb();
        return res.json({
            message: "Order has been updated successfuly",
            orders: await Order.find({}).sort({ createdAt: -1 }),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default handler;