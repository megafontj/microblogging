import http from "../../api/http.js";
import {API_ROUTES} from "../../api/api_routes.js";
import {useState} from "react";
import {toast} from "react-toastify";

export const TweetForm = ({updateTweets}) => {
    const [content, setContent] = useState('');

    const createTweet = async () => {
        if (!content) {
            alert("Запольните форма!");
            return;
        }
        const response = await http.post(`${API_ROUTES.TWEETS}`, {content});
        if (response.status === 201) {
            toast('Вы успешно создали твит');
            setContent('');
            updateTweets()
            return;
        }
        toast(response.data?.data?.message)
    }

    return (<div>
            <div className='text-white'>
                <label htmlFor="content" className='text-lg mb-2 block'>Есть новости?</label>
                <textarea
                    name="content"
                    placeholder='Что нового?'
                    className='w-full text-white rounded-lg textarea bg-gray-800'
                    onChange={(e) => {
                        if (e.target.value.length <= 500) {
                            setContent(e.target.value)
                        }
                    }}
                    value={content}
                    rows="2"></textarea>
                <small>{content.length}/500</small>
            </div>
            <button
                onClick={createTweet}
                className='btn float-right mt-1 btn-sm text-primary'>Создать</button>
        </div>)
}
