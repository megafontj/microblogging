import {Tweet} from "./common/Tweet.jsx";
import http from "../api/http.js";
import {API_ROUTES} from "../api/api_routes.js";

export const  NewTweets = ({tweets, updateTweets}) => {
    return (<div className='blok'>
        {tweets?.map(item => (<Tweet key={item.id} item={item} showOwner={true} getTweets={updateTweets}/>))}
    </div>)
}