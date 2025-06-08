const API_BASE = 'http://o-complex.com:1337';
const PAGE_SIZE = 20;

export type ProductType = {
    id: number;
    image_url: string;
    title: string;
    description: string;
    price: number;
};

export type GetProductsResponse = {
    items: ProductType[];
    meta: {
        total: number;
        page: number;
        pageSize: number;
    };
};

export const getProducts = async (
    page: number = 1,
): Promise<GetProductsResponse> => {
    const res = await fetch(
        `${API_BASE}/products?page=${page}&page_size=${PAGE_SIZE}`,
    );
    if (!res.ok) {
        throw new Error('Ошибка загрузки товаров');
    }
    return res.json();
};

export type OrderItem = {
    id: number;
    quantity: number;
};

export type CreateOrderPayload = {
    phone: string;
    cart: OrderItem[];
};

export type CreateOrderSuccess = {
    success: 1;
};

export type CreateOrderError = {
    success: 0;
    error: string;
};


export const createOrder = async (
    payload: CreateOrderPayload
): Promise<CreateOrderSuccess | CreateOrderError> => {
    const res = await fetch(`${API_BASE}/order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Order API error (${res.status}): ${text}`);
    }
    return res.json();
};


export type ReviewType = {
    id: number;
    text: string;
};

export const getReviews = async (): Promise<ReviewType[]> => {
    const res = await fetch(`${API_BASE}/reviews`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Ошибка загрузки отзывов');
    }

    return res.json();
};