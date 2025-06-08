import './review.scss'
import {sanitize} from "@/lib/sanitize-html";


interface ReviewProps {
    id: number;
    text: string;
}

export default function Review({id, text}: ReviewProps) {
    return (
        <div className="review-card">
            <h2>Отзыв {id}</h2>
            <div dangerouslySetInnerHTML={{ __html: sanitize(text) }}/>
        </div>
    )
}