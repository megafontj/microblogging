import {BiCalendar} from "react-icons/bi";
import moment from "moment/moment.js";
import {Tweet} from "../../components/common/Tweet.jsx";
import {useEffect, useState} from "react";
import http from "../../api/http.js";
import {API_ROUTES} from "../../api/api_routes.js";
import {Link, useParams} from "react-router-dom";


export const UserProfile = () => {
    const [user, setUser] = useState();
    const {username} = useParams();

    useEffect(() => {
        http.post(`${API_ROUTES.USERS}:search`, {
            filter: {
                username: username
            },
            include: ['tweets']
        }).then(res => {
            setUser(res?.data?.data[0])
        })
    }, [username]);

    return (
        <div className='flex-[3_3_0] text-white border-r border-gray-700'>
            <div className='flex justify-between  my-5 p-4 border-b border-white'>
                <div>
                    <h2 className='text-2xl font-bold'>{user?.full_name}</h2>
                    <span className='text-xs'>@{user?.username}</span>
                    <div className='flex flex-col mt-5'>
                        <span className='flex items-center gap-1'><BiCalendar /> Создан в {moment(user?.created_at).format('D-MM-Y')}</span>
                    </div>
                    <br/>
                    <div className='flex gap-5'>
                        <button className='text-xs btn btn-sm rounded-lg bg-white text-black hover:text-white'>Подписчики {user?.followers_count}</button>
                        <button className='text-xs btn btn-sm rounded-lg bg-white text-black hover:text-white'>Подписан {user?.followings_count}</button>
                        <Link to={`/chats/${user?.username}`} className='text-xs btn btn-sm bg-primary rounded-lg'>Написать</Link>
                    </div>
                </div>
            </div>
            <div className='py-1 px-4'>
                <h2 className='text-2xl mb-3 font-bold'>Посты {user?.full_name}</h2>
                {user?.tweets.length > 0 && user?.tweets.map(item => (<Tweet key={item.id} item={item}/>))}
            </div>
        </div>
    );
}
