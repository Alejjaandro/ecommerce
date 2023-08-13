import mongoose from 'mongoose';

// Create the model data for cart.
const CartSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },

        // Products is an array that contains a productId & quantity.
        products: [
            {
                productId: {
                    type: String
                },
                
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],
        
    },

    {timestamps: true}
);

export default mongoose.model('Cart', CartSchema);