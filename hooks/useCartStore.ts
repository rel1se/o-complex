import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = {
    id: number;
    title: string;
    price: number;
    quantity: number;
};

type State = {
    cart: CartItem[];
    phone: string;
    addItem: (item: CartItem) => void;
    removeItem: (id: number) => void;
    setItemQuantity: (id: number, quantity: number) => void;
    getQuantity: (id: number) => number;
    setPhone: (phone: string) => void;
};

export const useCartStore = create<State>()(
    persist(
        (set, get) => ({
            cart: [],
            phone: '',
            addItem: (item) => {
                const exists = get().cart.find(p => p.id === item.id);
                if (exists) {
                    set({
                        cart: get().cart.map(p =>
                            p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p
                        ),
                    });
                } else {
                    set({ cart: [...get().cart, item] });
                }
            },
            removeItem: (id) => set({ cart: get().cart.filter(p => p.id !== id) }),
            setItemQuantity: (id, quantity) =>
                set({
                    cart: get().cart.map(p => (p.id === id ? { ...p, quantity } : p)),
                }),
            getQuantity: (id) => get().cart.find(p => p.id === id)?.quantity || 0,
            setPhone: (phone) => set({ phone }),
        }),
        {
            name: 'cart-storage',
        }
    )
);
