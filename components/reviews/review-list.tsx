import Review from './review';
import { getReviews, ReviewType } from '@/api';
import './review.scss';

export default async function ReviewList() {
    try {
        const reviews: ReviewType[] = await getReviews();
        return (
            <div className="container">
                {reviews.map((review) => (
                    <Review key={review.id} id={review.id} text={review.text} />
                ))}
            </div>
        );
    } catch (error) {
        return <div>Не удалось загрузить отзывы</div>;
    }
}
