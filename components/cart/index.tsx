'use client';

import React, { useState, useEffect } from 'react';
import { useCartStore } from '@/hooks/useCartStore';
import { createOrder, CreateOrderPayload, CreateOrderSuccess, CreateOrderError } from '@/api';
import { Button } from '@/components/button';
import './cart.scss';

export default function Cart() {
    const cart = useCartStore((s) => s.cart);
    const removeItem = useCartStore((s) => s.removeItem);
    const setPhoneStore = useCartStore((s) => s.setPhone);

    const [phone, setPhone] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [showPopup, setShowPopup] = useState<boolean>(false);

    useEffect(() => {
        const stored = useCartStore.getState().phone;
        if (stored) setPhone(stored);
    }, []);

    useEffect(() => {
        setPhoneStore(phone);
    }, [phone, setPhoneStore]);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const digits = e.target.value.replace(/\D/g, '').slice(0, 11);
        let formatted = '+7';
        if (digits.length > 1) formatted += ' (' + digits.slice(1, 4);
        if (digits.length >= 4) formatted += ') ' + digits.slice(4, 7);
        if (digits.length >= 7) formatted += '-' + digits.slice(7, 9);
        if (digits.length >= 9) formatted += '-' + digits.slice(9, 11);
        setPhone(formatted);
        setError(false);
    };

    const handleSubmit = async () => {
        const digitsOnly = phone.replace(/\D/g, '');
        if (digitsOnly.length !== 11) {
            setError(true);
            return;
        }
        if (cart.length === 0) {
            return;
        }

        const payload: CreateOrderPayload = {
            phone: digitsOnly,
            cart: cart.map((it) => ({ id: it.id, quantity: it.quantity })),
        };

        try {
            const res = await createOrder(payload);
            if ((res as CreateOrderSuccess).success === 1) {
                setShowPopup(true);
                cart.forEach((it) => removeItem(it.id));
                setTimeout(() => setShowPopup(false), 3000);
            } else {
                console.error('Order error:', (res as CreateOrderError).error);
            }
        } catch (err) {
            console.error('Fetch failed:', err);
        }
    };

    return (
        <div className="cart">
            <h2 className="cart__title">Добавленные товары</h2>

            <ul className="cart__list">
                {cart.map((item) => (
                    <li className="cart__item" key={item.id}>
                        <span className="item__title">{item.title}</span>
                        <span className="item__qty">x{item.quantity}</span>
                        <span className="item__sum">{item.price * item.quantity}₽</span>
                        <button
                            className="item__remove"
                            onClick={() => removeItem(item.id)}
                        >
                            ×
                        </button>
                    </li>
                ))}
            </ul>

            <div className="cart__actions">
                <input
                    type="tel"
                    className={`cart__phone ${error ? 'cart__phone--error' : ''}`}
                    placeholder="+7 (___) ___-__-__"
                    value={phone}
                    onChange={handlePhoneChange}
                />
                <Button
                    title="заказать"
                    size="full"
                    disabled={cart.length === 0}
                    onClick={handleSubmit}
                />
            </div>

            {error && (
                <p className="cart__error">Телефон введён неполностью</p>
            )}

            {showPopup && (
                <div className="cart__popup">
                    <div className="cart__popup-content">
                        <p>Заказ успешно создан!</p>
                    </div>
                </div>
            )}
        </div>
    );
}
