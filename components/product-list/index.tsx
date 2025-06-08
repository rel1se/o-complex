'use client';

import {useEffect, useState, useRef} from 'react';
import {getProducts, ProductType} from '@/api';
import './product-list.scss';
import Product from "@/components/product";


export default function ProductList() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const loadingRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        getProducts(1).then(data => {
            setProducts(data.items);
            setHasMore(data.items.length >= 20);
        });
    }, []);


    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && hasMore) {
                const nextPage = page + 1;
                getProducts(nextPage).then(data => {
                    setProducts(prev => [...prev, ...data.items]);
                    setPage(nextPage);
                    if (data.items.length < 20) setHasMore(false);
                });
            }
        });

        if (loadingRef.current) observer.observe(loadingRef.current);
        return () => observer.disconnect();
    }, [hasMore, page]);

    return (
        <div className="product-list">
            {products.map(product => (
                <Product key={product.id} {...product} />
            ))}
            {hasMore && <div ref={loadingRef} style={{height: 1}}/>}
        </div>
    );
}
