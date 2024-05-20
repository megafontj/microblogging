import {TweetForm} from "../components/common/TweetForm.jsx";
import {NewTweets} from "../components/NewTweets.jsx";
import http from "../api/http.js";
import {API_ROUTES} from "../api/api_routes.js";
import {useEffect, useState} from "react";
import {FollwoingTweets} from "../components/FollwoingTweets.jsx";

export const Home = () => {
    const [tweets, setTweets] = useState([]);
    const [tabActive, setTabActive] = useState(1);

    const getNewTweets = async () => {
        const response = await http.post(API_ROUTES.TWEET_SEARCH, {
            sort: ['-created_at'],
            include: ['owner']
        })
        if (response.status === 200) {
            setTweets(response.data?.data);
        }
    }

    useEffect( () => {
         getNewTweets();
    }, []);

    return (<div className='text-white flex-[3_3_0] p-3 border-r border-gray-700'>
        <TweetForm updateTweets={getNewTweets}/>
        <br/>
        <div className='mt-6'>
            <div role="tablist" className="tabs tabs-boxed">
                <a role="tab" onClick={() => setTabActive(1)} className={`tab ${tabActive === 1 && 'tab-active'}`}>Новие твиты</a>
                <a role="tab" onClick={() => setTabActive(2)} className={`tab ${tabActive === 2 && 'tab-active'}`}>Подписки</a>
            </div>
            <div className='content mt-3'>
                {tabActive === 1 ? (<NewTweets tweets={tweets} updateTweets={getNewTweets}/>) : (<FollwoingTweets />)}
            </div>
        </div>
    </div>)
};

