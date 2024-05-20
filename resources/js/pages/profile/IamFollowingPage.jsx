import {useEffect, useState} from "react";
import http from "../../api/http.js";
import {API_ROUTES} from "../../api/api_routes.js";
import {Link} from "react-router-dom";

export const IamFollowingPage = () => {
    const [following, setFollowing] = useState([]);

    const getFollowing = async () => {
        const response = await http.get(API_ROUTES.ACCOUNT_FOLLOWING)
        setFollowing(response?.data?.data)
    }


    const unsubscribe = async (user_id) => {
        await http.post(API_ROUTES.ACCOUNT_UNFOLLOW, {user_id: user_id}).then(() => {
            getFollowing()
        });
    }

    useEffect(() => {
        getFollowing();
    }, []);

    return (<div className='flex-[3_3_0] text-white border-r border-gray-700'>
        <h1 className='text-3xl my-3 mx-2'>Подписки</h1>
        {following?.map(item => (
            <div key={item.id} className='flex flex-col gap-4 mx-4 mb-5 border-b border-gray-200'>
                <div
                    className='flex items-center justify-between gap-4'
                >
                    <div className='flex gap-2 items-center'>
                        <div className='avatar'>
                            <div className='w-8 rounded-full'>
                                <img src={"/avatar-placeholder.png"} />
                            </div>
                        </div>
                        <div className='flex flex-col'>
										<span className='font-semibold tracking-tight truncate w-28'>
											{item.name}
										</span>
                            <span className='text-sm text-slate-500'>@username</span>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={() => unsubscribe(item.id)}
                            className='btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm'
                        >
                            Отписаться
                        </button>
                    </div>
                </div>
            </div>
        ))}
    </div>);
}