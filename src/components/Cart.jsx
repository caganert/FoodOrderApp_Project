import Modal from "./UI/Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgress.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart(){

    const cartCtx = useContext(CartContext)
    const userProgressCtx = useContext(UserProgressContext)

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity* item.price, 0)

    function handleCloseCart(){
        userProgressCtx.hideCart()
    }

    function handleOpenCheckout(){
        userProgressCtx.showCheckout()
    }

    return(
        <Modal className="cart" open={userProgressCtx.progress === 'cart'} onCLose={userProgressCtx.progress === "cart" ? handleCloseCart : null}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map(item => <CartItem key={item.id }item={item} onDecrease={() => cartCtx.removeItem(item.id)} onIncrease={() => cartCtx.addItem(item)}/>)}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                {cartCtx.items.length>0 && (<Button onClick={handleOpenCheckout}>Go to Checkout</Button>)}
            </p>
        </Modal>
    )
}