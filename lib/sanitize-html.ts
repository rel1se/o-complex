import createDOMPurify from 'dompurify';
import {JSDOM} from 'jsdom';

const window = new JSDOM('').window;

const DOMPurify = createDOMPurify(window);

export function sanitize(html: string) {
    return DOMPurify.sanitize(html);
}
