import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import http from "../../api/http.js";
import {API_ROUTES} from "../../api/api_routes.js";

export const RightSide = () => {
    const [users, setUsers] = useState([]);

    const getRecomendedUsers = async () => {
        const response = await http.get(API_ROUTES.ACCOUNT_NOT_FOLLOWERS)
        setUsers(response.data?.data);
    }

    useEffect(() => {
        getRecomendedUsers()
    }, []);


    const subscribeToUser = async (user_id) => {
        await http.post(API_ROUTES.ACCOUNT_FOLLOW, {user_id: user_id});
        getRecomendedUsers()
    }

    return (
        <div className='hidden lg:block my-4 mx-2 text-white'>
            <div className='bg-[#16181C] p-4 rounded-md sticky top-2'>
                <p className='font-bold text-2xl mb-2'>Рекомендация</p>
                {users?.map(item => (
                    <div key={item.id} className='flex flex-col gap-4'>
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
                                    onClick={() => subscribeToUser(item.id)}
                                    className='btn bg-white text-black hover:bg-white hover:opacity-90 rounded-full btn-sm'
                                >
                                    Подписаться
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
};