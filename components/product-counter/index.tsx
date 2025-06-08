'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/button';
import './product-counter.scss';

type ProductCounterProps = {
    quantity: number;
    setQuantityAction: (value: number) => void;
};

export default function ProductCounter({ quantity, setQuantityAction }: ProductCounterProps) {
    const [inputValue, setInputValue] = useState(quantity.toString());

    useEffect(() => {
        setInputValue(quantity.toString());
    }, [quantity]);

    const increment = () => setQuantityAction(quantity + 1);
    const decrement = () => setQuantityAction(quantity - 1);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const onInputBlur = () => {
        const val = parseInt(inputValue, 10);
        if (!isNaN(val)) {
            setQuantityAction(val);
        } else {
            setInputValue(quantity.toString());
        }
    };

    return (
        <div className="product-counter">
            <Button title="-" size="small" onClick={decrement} />
            <input
                type="number"
                value={inputValue}
                onChange={onInputChange}
                onBlur={onInputBlur}
                className="count"
                min={0}
            />
            <Button title="+" size="small" onClick={increment} />
        </div>
    );
}
