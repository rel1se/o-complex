import ReviewList from "@/components/reviews/review-list";

import './globals.scss'
import ProductList from "@/components/product-list";
import Cart from "@/components/cart";

export default function Home() {
    return (
        <main>
            <ReviewList/>
            <Cart/>
            <ProductList/>
        </main>
    );
}
