import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

import './styles/Cart.css';
import { useCart } from '../context/CartContext';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Cart() {
    // We extract what we need from the context.
    const { cart, productsNumber, getCart, deleteProduct, addToCart } = useCart();

    // Initialize some variables for later
    let subtotal;
    let shippingCost;
    let quantity;

    // We call getCart with the userId.
    const userId = useLocation().pathname.split('/')[2];
    useEffect(() => { getCart(userId) }, []);

    // We calculate the subtotal by summing the products cost.
    if (cart) {
        subtotal = cart.reduce((total, product) => total + (product.product.price * product.quantity), 0);
        // shippingCost is hard coded just as example.
        (subtotal > 0) ? shippingCost = 10.50 : shippingCost = 0;
    }

    // Function to decrease product ammount and delete it if its quantity is 1.  
    const decreaseAmmount = (userId, product) => {
        if (product.quantity > 1) {
            addToCart(userId, product.product, quantity = -1);
        } else {
            deleteProduct(userId, product.product._id);
        }
    }

    return (
        <>
            <Navbar />

            <div className='cart-container'>

                <h1 className='cart-title'>YOUR SHOPPING CART</h1>

                <div className="cart-top">

                    <button className='top-button'>CONTINUE SHOPPING</button>

                    <div className='top-texts'>
                        <span className='top-text'>Shopping Cart ({productsNumber})</span>
                        <span className='top-text'>Your Wishlist (0)</span>
                    </div>

                    <button className='top-button'>CHECKOUT NOW</button>

                </div>

                {/* Body container */}
                <div className="cart-body">

                    {/* Product list container */}
                    <div className="product-list">
                        {/* 
                        We render the products only if "cart" exists and it has at least 1 product,
                        then we access its data to complete the info on the page.
                        */}
                        {(cart && cart.length >= 1) ? Array.from(cart).map((product) => {
                            return (
                                <>
                                    <div className="product" key={product.product._id}>

                                        <div className='product-details'>

                                            <img className='info-img' src={`${product.product.thumbnail}`} alt="" />

                                            <div className='details'>
                                                <span className='id'><b>ID:</b> {product.product._id}</span>
                                                <span className='name'><b>Product:</b> {product.product.title}</span>
                                                <span className='ram'><b>RAM:</b> {product.ram}</span>
                                                <span><b>Color:</b> {product.color}</span>
                                            </div>
                                        </div>

                                        <div className="product-price">

                                            <div className="product-ammount">
                                                <button onClick={() => decreaseAmmount(userId, product)} className="ammount-icon flex-center">
                                                    <RemoveIcon />
                                                </button>

                                                <span className="amount-num flex-center">{product.quantity}</span>

                                                <button onClick={() => addToCart(userId, product.product)} className="ammount-icon flex-center">
                                                    <AddIcon />
                                                </button>
                                            </div>

                                            <div className="price">${(product.product.price * product.quantity)}</div>
                                            <button onClick={() => deleteProduct(userId, product.product._id)} className='delete-button'>
                                                Remove Product
                                            </button>
                                        </div>

                                    </div>
                                    <hr />
                                </>
                            );
                        }) : (
                            <div> No Producs in Cart</div>
                        )}

                    </div>

                    {/* Product Summary container */}
                    <div className="product-summary">

                        <h1 className='summary-title'>ORDER SUMMARY</h1>

                        <div className="summary-item">
                            <span className='summary-item-text'>Subtotal: </span>
                            <span className='summary-item-price'>
                                ${subtotal}
                            </span>
                        </div>

                        <div className="summary-item">
                            <span className='summary-item-text'>Shipping: </span>
                            <span className='summary-item-price'>${shippingCost}</span>
                        </div>

                        <div className="summary-item summary-total">
                            <span className='summary-item-totalText'>Total: </span>
                            <span className='summary-item-totalPrice'>${subtotal + shippingCost}</span>
                        </div>

                        <button className='summary-button'>BUY NOW</button>

                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}