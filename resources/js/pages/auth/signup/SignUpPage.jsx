import {Link, useNavigate} from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import {useForm} from "react-hook-form";
import http from "../../../api/http.js";
import {toast} from "react-toastify";
import Logo from "../../../components/svgs/logo.jsx";


const SignUpPage = () => {
	const { register, handleSubmit, formState: { errors }} = useForm()
	const navigate = useNavigate();

	const onFormSubmit = async (data) => {
		await http.post('auth/register', data).then(() =>  {
				toast.success('Вы успешно создали аккаунт!')
				navigate('/login')
		},
			(res) => {
				const data = res.response.data;
				toast.error(data.message)
		})
	}

	return (
		<div className='max-w-screen-xl mx-auto flex h-screen px-10'>
			<div className='flex-1 hidden lg:flex items-center  justify-center'>\
                <Logo />
			</div>
			<div className='flex-1 flex flex-col justify-center items-center'>
				<form className='lg:w-2/3  mx-auto md:mx-20 flex gap-4 flex-col' onSubmit={handleSubmit(onFormSubmit)}>
					<h1 className='text-4xl font-extrabold text-white'>Регистрация</h1>
					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdOutlineMail />
						<input
							type='email'
							className='grow'
							placeholder='Email'
							{...register('email', {required: "Введите  email"})}
						/>
					</label>
					<p className='text-red-500'>{errors?.email?.message}</p>
					<div className='flex gap-4 flex-wrap'>
						<label className='input input-bordered rounded flex items-center gap-2 flex-1'>
							<FaUser />
							<input
								type='text'
								className='grow '
								placeholder='username'
								name='username'
								{...register('username', {required: "Введите  username"})}
							/>
						</label>
						<p className='text-red-500'>{errors?.username?.message}</p>
						<label className='input input-bordered rounded flex items-center gap-2 flex-1'>
							<MdDriveFileRenameOutline />
							<input
								type='text'
								className='grow'
								placeholder='ФИО'
								{...register('full_name', {required: "Введите ФИО"})}
							/>
						</label>
						<p className='text-red-500'>{errors?.name?.message}</p>
					</div>
					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdPassword />
						<input
							type='password'
							className='grow'
							placeholder='Пароль'
							{...register('password', {required: "Введите пароль"})}
						/>
					</label>
					<p className='text-red-500'>{errors?.password?.message}</p>

					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdPassword />
						<input
							type='password'
							className='grow'
							placeholder='Потверждение паролья'
							{...register('password_confirmation', {required: "Введите пароль повторно"})}
						/>
					</label>
					<p className='text-red-500'>{errors?.password_confirmation?.message}</p>
					<button className='btn rounded-full btn-primary text-white'>
						Зарегистрировать
					</button>
					{/*<p className='text-red-500'>ошибка</p>*/}
				</form>
				<div className='flex flex-col lg:w-2/3 gap-2 mt-4'>
					<p className='text-white text-lg'>У вас уже есть аккаунт?</p>
					<Link to='/login'>
						<button className='btn rounded-full btn-primary text-white btn-outline w-full'>Вход</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default SignUpPage;
