import {Navigate, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/auth/login/LoginPage.jsx";
import SignUpPage from "./pages/auth/signup/SignUpPage.jsx";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AuthProvider, useAuth} from "./contexts/auth.context.jsx";
import Sidebar from "./components/common/Sidebar.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import {RightSide} from "./components/common/RightSide.jsx";
import {Home} from "./pages/Home.jsx";
import {MyFollowersPage} from "./pages/profile/MyFollowersPage.jsx";
import {IamFollowingPage} from "./pages/profile/IamFollowingPage.jsx";
import {NotificationPage} from "./pages/notification/NotificationPage.jsx";

function App() {

    const { isAuthorized } = useAuth();

    return (<div className='flex max-w-6xl mx-auto'>
            {isAuthorized && <Sidebar />}
            <Routes>
                <Route path='/'  element={isAuthorized ? <Home /> : <Navigate to='/login' />}/>
                <Route path='/login' element={isAuthorized ?  <Navigate to='/' /> : <LoginPage />} />
                <Route path='/register' element={isAuthorized ?  <Navigate to='/' /> : <SignUpPage />} />
                <Route path='/profile' element={isAuthorized ?  <ProfilePage /> : <LoginPage />} />
                <Route path='/profile/following' element={isAuthorized ?  <IamFollowingPage /> : <LoginPage />} />
                <Route path='/profile/followers' element={isAuthorized ?  <MyFollowersPage /> : <LoginPage />} />
                <Route path='/profile/notifications' element={isAuthorized ?  <NotificationPage /> : <LoginPage />} />
            </Routes>
            {isAuthorized && <RightSide />}
            <ToastContainer />
        </div>
    );
}
const WrappedApp = () => (
    <AuthProvider>
        <App />
    </AuthProvider>
);

export default WrappedApp;
