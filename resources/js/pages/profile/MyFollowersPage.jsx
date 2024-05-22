import {useEffect, useState} from "react";
import http from "../../api/http.js";
import {API_ROUTES} from "../../api/api_routes.js";
import {Link} from "react-router-dom";

export const MyFollowersPage = () => {
    const [followers, setFollowers] = useState([]);

    const getFollowers = async () => {
        const response = await http.get(API_ROUTES.ACCOUNT_FOLLOWERS)
        setFollowers(response?.data?.data)
    }

    useEffect(() => {
        getFollowers();
    }, []);


    return (<div className='flex-[3_3_0] text-white border-r border-gray-700'>
        <h1 className='text-3xl my-3 mx-2'>Мои подписчики</h1>
        {followers?.map(item => (
            <div key={item.id} className='flex justify-between border-b border-white mb-5'>
                <Link
                    to={`/profile`}
                    className='flex items-center justify-between gap-4'
                >
                    <div className='flex gap-2 items-center'>
                        <div className='avatar'>
                            <div className='w-8 rounded-full'>
                                <img src={"/assets/avatar-placeholder.png"} security={item.full_name} />
                            </div>
                        </div>
                        <div className='flex flex-col'>
										<span className='font-semibold tracking-tight truncate w-28'>
											{item.full_name}
										</span>
                            <span className='text-sm text-slate-500'>@{item.username}</span>
                        </div>
                    </div>
                </Link>
                <div>
                    <Link to={`/chats/${item.username}`}
                          className='btn bg-primary text-white hover:opacity-80 hover:opacity-90 rounded-full btn-sm'
                    >
                        Написать
                    </Link>
                </div>
            </div>
        ))}
    </div>);
}
