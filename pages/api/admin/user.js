import nc from "next-connect";
import auth from "../../../middleware/auth";
import admin from "../../../middleware/admin";
import User from "../../../models/User";
import db from "../../../utils/database";
const handler = nc().use(auth).use(admin);

handler.delete(async (req, res) => {
    try {
        const { id } = req.body;
        db.connectDb();
        await User.findByIdAndRemove(id);
        db.disconnectDb();
        return res.json({
            message: "Users has been deleted successfuly",
            categories: await User.find({}).sort({ updatedAt: -1 }),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export default handler;