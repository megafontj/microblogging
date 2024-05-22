import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getAccountByUsername, getMessages, initialChatWithUser} from "../../api/requests.js";
import http from "../../api/http.js";
import {API_ROUTES} from "../../api/api_routes.js";
import moment from "moment";

export const ChatPage = () => {
    const [user, setUser] = useState();
    const [messages, setMessages] = useState([]);
    const [chat, setChat] = useState();
    const [input, setInput] = useState('');
    const {username} = useParams();
    const filter = {
        sort: ['-created_at'] ,
        filter: {chat_id: chat?.id}
    }

    useEffect( () =>  {
        const response = getAccountByUsername(username).then(async res =>  {
            setUser(res?.data?.data);
            initialChatWithUser(res?.data?.data?.id).then(res => {
                setChat(res?.data?.data);
            });
        })
    }, []);

    useEffect(() => {
        if (user && chat) {
            getMessages(filter, setMessages)
        }
    }, [user, chat]);

    const createMessage = async () => {
        if (input.length === 0) return;

        const res = await http.post(API_ROUTES.CHAT_MESSAGES, {
            content: input,
            chat_id: chat.id
        })
        getMessages(filter, setMessages);
        setInput('')
    }
    console.log(messages.reverse())
    return user && chat && (<div className='flex-[1_1_0] text-white'>
        <div className='min-h-screen w-full border border-white text-white relative'>
            <div className='h-20 border sticky top-0 bg-teal-600 border-white flex flex-col justify-center'>
                <h3 className='ml-3 text-3xl'>{user.full_name}</h3>
            </div>
            <div className='flex flex-col-reverse mb-12'>
                {messages && messages?.map(message => (
                    <p key={message.id} className={`flex flex-col bg-green-500 my-2 max-w-max px-3 py-1 rounded-md ${message.sender_id === chat.me ? 'ml-auto mr-1' : 'ml-1'} `}>
                        <span>{message.content}</span>
                        <small className='text-[10px] ml-auto'>{moment(message.created_at).format('DD-MM-Y hh:mm')}</small>
                    </p>
                ))}
            </div>
            <div className='fixed w-[610px] bottom-0  border'>
                <div className='flex w-full'>
                    <input value={input} onChange={(e) => setInput(e.target.value)} className='w-full text-black bg-white p-1' />
                    <button onClick={createMessage} className='btn bg-primary'>Отправить</button>
                </div>
            </div>
        </div>
    </div>)
}
