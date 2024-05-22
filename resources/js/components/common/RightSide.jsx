import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import http from "../../api/http.js";
import {API_ROUTES} from "../../api/api_routes.js";
import {useAuth} from "../../contexts/auth.context.jsx";
import {getAccount} from "../../api/requests.js";

export const RightSide = () => {
    const [users, setUsers] = useState([]);
    const {setAccountInfo} = useAuth();
    const getRecommendedUsers = async () => {
        const response = await http.get(API_ROUTES.RECOMMENDATION_ACCOUNTS)
        setUsers(response.data?.data);
    }

    useEffect(() => {
        getRecommendedUsers()
    }, []);


    const subscribeToUser = async (user_id) => {
        await http.post(API_ROUTES.ACCOUNT_FOLLOW, {user_id: user_id}).then(res => {
            getRecommendedUsers();
            getAccount(setAccountInfo);
        });

    }

    return (
        <div className='hidden lg:block my-4 mx-2 text-white'>
            <div className='bg-[#16181C] p-4 rounded-md sticky top-2'>
                <p className='font-bold text-2xl mb-2'>Рекомендация</p>
                {users?.map(item => (
                    <div key={item.id} className='flex flex-col gap-4 mb-3'>
                        <div
                            className='flex items-center justify-between gap-4'
                        >
                            <div className='flex gap-2 items-center'>
                                <div className='avatar'>
                                    <div className='w-8 rounded-full'>
                                        <img src={"/assets/avatar-placeholder.png"} alt={item.full_name} />
                                    </div>
                                </div>
                                <div className='flex flex-col'>
										<span className='font-semibold tracking-tight truncate w-28'>
											{item.full_name}
										</span>
                                    <span className='text-sm text-slate-500'>@{item.username}</span>
                                </div>
                            </div>
                            <div>
                                <button
                                    onClick={() => subscribeToUser(item.id)}
                                    className='btn bg-primary text-black hover:bg-white hover:opacity-90 rounded-full btn-sm'
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
