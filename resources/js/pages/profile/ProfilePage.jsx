import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { MdEdit } from "react-icons/md";
import {useAuth} from "../../contexts/auth.context.jsx";
import {BiCalendar} from "react-icons/bi";
import moment from "moment";
import http from "../../api/http.js";
import {API_ROUTES} from "../../api/api_routes.js";
import {Tweet} from "../../components/common/Tweet.jsx";

const ProfilePage = () => {
	const {account} = useAuth();
	const [tweets, setTweets] = useState([]);

	const getTweets = async () => {
		const response = await http.post(API_ROUTES.TWEET_SEARCH, {
			filter: {user_id: account?.id},
            include: ['owner']
		});
		setTweets(response.data?.data)
	}

	useEffect(() => {
		getTweets();
	}, []);

	return (
		<div className='flex-[3_3_0] text-white border-r border-gray-700'>
			{/* HEADER */}
			<div className='flex justify-between  my-5 p-4 border-b border-white'>
				<div>
					<h2 className='text-2xl font-bold'>{account?.full_name}</h2>
					<span className='text-xs'>@{account?.username}</span>
					<div className='flex flex-col mt-5'>
						<span className='flex items-center gap-1'><BiCalendar /> Создан в {moment(account?.created_at).format('D-MM-Y')}</span>
					</div>
					<br/>
					<div className='flex gap-5'>
						<Link to='/profile/followers' className='text-xs btn btn-sm bg-primary'>Подписчики {account?.followers_count}</Link>
						<Link to='/profile/following' className='text-xs btn btn-sm bg-primary'>Подписан {account?.following_count}</Link>
					</div>
				</div>
				<div>
					<button className='flex items-center gap-2 text-primary'>
						<MdEdit />
						Редактировать
					</button>
				</div>
			</div>
			<div className='py-1 px-4'>
				<h2 className='text-2xl font-bold'>Ваши посты</h2>
				{tweets.length > 0 && tweets.map(item => (<Tweet key={item.id} item={item} getTweets={getTweets}/>))}
			</div>
		</div>
	);
};

export default ProfilePage;
