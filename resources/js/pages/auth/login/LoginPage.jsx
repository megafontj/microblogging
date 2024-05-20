import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import {useForm} from "react-hook-form";
import http from "../../../api/http.js";
import {toast} from "react-toastify";
import {Link, useNavigate} from "react-router-dom";
import {setTokenToStorage} from "../../../utils/token.js";
import {useAuth} from "../../../contexts/auth.context.jsx";
import Logo from "../../../components/svgs/logo.jsx";

const LoginPage = () => {
	const { register, handleSubmit, formState: { errors }} = useForm();
	const navigate = useNavigate();
	const { authorize} = useAuth();

	const onFormSubmit = async (data) => {
		try {
			const response = await http.post('auth/login', data);
			toast.success('Добро пожаловать!');
			setTokenToStorage(response.data.data.access_token);
			authorize();
			navigate('/');
		} catch (error) {
			const data = error.response.data;
			toast.error(data.message);
		}
	};

	return (
		<div className='max-w-screen-xl mx-auto flex items-center gap-5 h-screen'>
            <div className='flex-1 hidden lg:flex items-center justify-center'>
                <Logo />
			</div>
			<div className='flex-1 flex flex-col justify-center items-center'>
				<form className='flex gap-4 flex-col' onSubmit={handleSubmit(onFormSubmit)}>
					<h1 className='text-4xl font-extrabold text-white'>Вход</h1>
					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdOutlineMail />
						<input
							type='text'
							className='grow'
							placeholder='password'
							{...register('email', {required: 'Введите email'})}
						/>
					</label>
					<p className='text-red-500'>{errors?.email?.message}</p>
					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdPassword />
						<input
							type='password'
							className='grow'
							placeholder='Пароль'
							{...register('password', {required: 'Введите пароль'})}
						/>
					</label>
					<p className='text-red-500'>{errors?.password?.message}</p>
					<button className='btn rounded-full btn-primary text-white'>
						Вход
					</button>
				</form>
				<div className='flex flex-col gap-2 mt-4'>
					<p className='text-white text-lg'>У вас нет аккаунта?</p>
					<Link to='/register'>
						<button className='btn rounded-full btn-primary text-white btn-outline w-full'>Регистрация</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default LoginPage;
