import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import {useAuth} from "../../contexts/auth.context.jsx";
import {useEffect} from "react";
import http from "../../api/http.js";
import {API_ROUTES} from "../../api/api_routes.js";
import {removeTokenFromStorage} from "../../utils/token.js";
import {toast} from "react-toastify";


const Sidebar = () => {
	const {account, setAccountInfo, unAuthorize} = useAuth();

	useEffect(() => {
		const getAccount = async () => {
			const response = await http.post(API_ROUTES.GET_ACCOUNT);
			setAccountInfo(response.data.data);
		}
		getAccount();
	}, []);

	const handleLogout = async () => {
		const response = await http.post(API_ROUTES.LOGOUT)
		if (response.status === 200) {
			unAuthorize();
			removeTokenFromStorage();
			return;
		}
		toast('Что-то пошел не так!');
	}

	return (
		<div className='md:flex-[2_2_0] w-18 max-w-52'>
			<div className='sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 text-white w-20 md:w-full'>
				<Link to='/' className='flex justify-center items-center md:justify-start'>
					{/*<XSvg className='px-2 w-12 h-12 rounded-full fill-white hover:bg-stone-900' />*/}
					<div className='font-bold flex flex-col'>
						<span className='text-lg'>{account?.full_name}</span>
						<span className='text-xs text-gray-400'>@{account?.username}</span>
					</div>
				</Link>
				<ul className='flex flex-col gap-3 mt-4'>
					<li className='flex justify-center md:justify-start'>
						<Link
							to='/'
							className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<MdHomeFilled className='w-8 h-8' />
							<span className='text-lg hidden md:block'>Главная</span>
						</Link>
					</li>
					<li className='flex justify-center md:justify-start'>
						<Link
							to='/profile/notifications'
							className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<IoNotifications className='w-6 h-6' />
							<span className='text-lg hidden md:block'>Увидомления</span>
						</Link>
					</li>

					<li className='flex justify-center md:justify-start'>
						<Link
							to={`/profile`}
							className='flex gap-3 items-center hover:bg-stone-900 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<FaUser className='w-6 h-6' />
							<span className='text-lg hidden md:block'>Профиль</span>
						</Link>
					</li>

				</ul>
				{account && (
					<button
						className='mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-[#181818] py-2 px-4 rounded-full'
					>
						<span
							onClick={handleLogout}
							className='flex ml-1 gap-3 justify-center md:justify-start cursor-pointer'>
							<BiLogOut className='w-6 h-6' />
							<span className='text-lg hidden md:block'>Выход</span>
						</span>
					</button>
				)}
			</div>
		</div>
	);
};
export default Sidebar;
