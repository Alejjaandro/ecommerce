const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../middleware/verifyToken');

const Order = require('../models/Order');

const router = require('express').Router();

// MORE EXPLANATIONS ON "/auth.js" & "/user.js" //

// ===== CREATE Order ===== //
router.post('/', verifyToken, async (req, res) => {

    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();

        res.status(200).json(savedOrder);

    } catch (error) {
        res.status(500).json(error);
    }
});

// ===== UPDATE Order ===== //
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {

    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })

        res.status(200).json(updatedCart);

    } catch (error) {
        res.status(500).json(error);
    }
});

// ===== DELETE Order ===== //
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {

    try {
        await Cart.findByIdAndDelete(req.params.id);

        res.status(200).json('Order Deleted');

    } catch (error) {
        res.status(500).json(error);
    }
});

// ===== GET User Order ===== //
router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {

    try {
        const orders = await Order.findOne({ userId: req.params.userId });

        res.status(200).json(orders);

    } catch (error) {
        res.status(500).json(error);
    }
});

// ===== GET all Orders ===== //
router.get('/', verifyTokenAndAdmin, async (req, res) => {

    try {
        const orders = await Order.find();

        res.status(200).json(orders);

    } catch (error) {
        res.status(500).json(error);
    }
});

// ===== GET MONTHLY INCOME ===== //
router.get('/income', verifyTokenAndAdmin, async (req, res) => {

    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },

            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$ammount",
                },
            },
            
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                },
            },
        ]);

        res.status(200).json(income);

    } catch (error) {
        res.status(500).json(error);
    }
});



module.exports = router;