import {BiEdit, BiTrash} from "react-icons/bi";
import http from "../../api/http.js";
import {API_ROUTES} from "../../api/api_routes.js";
import {useAuth} from "../../contexts/auth.context.jsx";
import {useState} from "react";
import {toast} from "react-toastify";

export const Tweet = ({item, getTweets, showOwner}) => {
    const [isEditMode, setEditMode]  = useState(false);
    const [tweetContent, setTweetContent] = useState('');
    const {account} = useAuth();

    const deleteTweet = async (item) => {
        const response = await http.delete(`${API_ROUTES.TWEETS}/${item.id}`);
        getTweets();
    }

    const editTweet = async (item) => {
        const response = await http.patch(`${API_ROUTES.TWEETS}/${item.id}`, {content: tweetContent});
        if (response.status === 200) {
            toast('Вы успешно редатировали');
            setEditMode(false);
            getTweets();
            return;
        }
        toast(response.data?.errors.message)
    }

    return (
        <div>
            {showOwner && (
                <div className='flex flex-col'>
                    <span>{item.owner?.full_name}</span>
                    <span className='text-xs'>@{item.owner?.username}</span>
                </div>
            )}
            <div className='border mb-4  border-white rounded-lg'>
                {!isEditMode ? (
                    <div className='flex justify-between p-4  relative'>
                        <p>{item.content}</p>
                        {item?.owner?.id === account.id && (
                            <div className='flex gap-2 items-center'>
                                <BiTrash onClick={() => deleteTweet(item)} className='text-lg text-primary cursor-pointer' />
                                <BiEdit onClick={() => setEditMode(true)}  className='text-lg text-primary cursor-pointer'/>
                            </div>
                        )}
                    </div>
                ): (
                    <div className='text-black'>
                    <textarea  className='textarea textarea-primary text-white overflow-hidden w-full'
                               rows={6}
                               onChange={(e) => setTweetContent(e.target.value)}
                               defaultValue={item.content}/>
                        <div className='flex gap-2'>
                            <button
                                onClick={ () => editTweet(item) }
                                className='btn rounded-full btn-primary text-white'>
                                Сохранить
                            </button>
                            <button
                                onClick={ () => setEditMode(false) }
                                className='btn rounded-full btn-cancel text-black'>
                                Отменить
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
