import {Tweet} from "./common/Tweet.jsx";
import http from "../api/http.js";
import {API_ROUTES} from "../api/api_routes.js";
import {useEffect, useState} from "react";

export const  FollwoingTweets = () => {
    const [tweets, setTweets] = useState([]);

    const getFollowingTweets = async () => {
        const response = await http.get(API_ROUTES.FOLLOWING_TWEETS,)
        if (response.status === 200) {
            setTweets(response.data?.data);
        }
    }

    useEffect(() => {
        getFollowingTweets();
    }, []);

    return (<div className='blok'>
        {tweets?.map(item => (<Tweet key={item.id} item={item} showOwner={true} getTweets={getFollowingTweets}/>))}
    </div>)
}