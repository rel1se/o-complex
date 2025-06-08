'use client';

import { useCartStore } from '@/hooks/useCartStore';;
import './product.scss';
import { Button } from '@/components/button';
import ProductCounter from '@/components/product-counter';

type ProductProps = {
    id: number;
    title: string;
    description: string;
    image_url: string;
    price: number;
};

export default function Product({ id, title, description, image_url, price }: ProductProps) {
    const quantity = useCartStore(state =>
        state.cart.find(item => item.id === id)?.quantity || 0
    );
    const addItem = useCartStore(state => state.addItem);
    const setItemQuantity = useCartStore(state => state.setItemQuantity);
    const removeItem = useCartStore(state => state.removeItem);

    const handleChange = (value: number) => {
        if (value < 1) {
            return removeItem(id);
        }
        if (quantity === 0) {
            addItem({ id, title, price, quantity: value });
        } else {
            setItemQuantity(id, value);
        }
    };
    return (
        <div className="product-card">
            <div className="product-card__header">
                <img src={image_url} width={250} height={200} alt={title} />
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
            <div className="product-card__buy">
                <div className="price">цена: {price}₽</div>
                <div className="product-card__button">
                    {quantity > 0 ? (
                        <ProductCounter quantity={quantity} setQuantityAction={handleChange} />
                    ) : (
                        <Button title="купить" onClick={() => handleChange(1)} />
                    )}
                </div>
            </div>
        </div>
    );
}
