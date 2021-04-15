import { useState } from 'react';

const Quantity = (props) => {
    const [quantity, setQuantity] = useState(props.item.quantity);
    const handleUpdate = props.handleUpdateQuantity;

    const itemId = props.item.id;
    const decrementQuantity = () => {
        if (quantity === 1) {
            setQuantity(1)
        } else {
            setQuantity(quantity - 1)
            handleUpdate(itemId, quantity -1)
        }
    }
    const incrementQuantity = () => {
        setQuantity(quantity + 1)
        handleUpdate(itemId, quantity +1)
    }

    return (
        <div className="product-quantity">
            <label
                className="product-quantity__item"
                onClick={decrementQuantity}
            >-</label>
            <output className="product-quantity__item" value={quantity}>{quantity}</output>
            <label
                className="product-quantity__item"
                onClick={incrementQuantity}
            >+</label>
        </div>
    );
}
export default Quantity;