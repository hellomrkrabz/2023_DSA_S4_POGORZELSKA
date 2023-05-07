import { GoogleBooksAPI } from "google-books-js";
import loading from "../media/loading.gif"

async function fetchBooksById(id) {
    const googleBooksApi = new GoogleBooksAPI();

    var book;
    try {
        book = await googleBooksApi.getVolume(id);
    } catch (error) {
        book = {title:"error", authors:["Try again Later",""], imageLinks:{smallThumbnail: {loading}}}
    }

    return book
}

export default fetchBooksById;