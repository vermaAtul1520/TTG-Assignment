import React, { useState } from 'react'
import { auth } from "../firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider , signInWithPopup} from "firebase/auth";
import { useNavigate, NavLink } from "react-router-dom"
import './Login.css'
// import './Register.css'
import { ToastContainer, toast } from 'react-toastify';
import { Bars } from 'react-loading-icons'

const Login = () => {
    const [loading, setLoading]= useState(false);
    const navigate = useNavigate();

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    
    const login = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            navigate("/")
        } catch (error) {
            toast.error(error.message.slice(15), {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        setLoading(false);
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        console.log("m,", provider)
        try {
            const result = await signInWithPopup(auth, provider);
            const token = result?.credential?.accessToken;
            const user = result?.user;
            navigate("/")
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <>
            <ToastContainer/>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <div className='loginForm'>
                <h3 id='loginhead'>Login Here</h3>

                <label className='lbl' >Email</label>
                <input
                    onChange={(event) => {
                        setLoginEmail(event.target.value);
                    }}
                    className='loginInp' type="text" placeholder="Email" />

                <label className='lbl' >Password</label>
                <input
                    onChange={(event) => {
                        setLoginPassword(event.target.value);
                    }}
                    className='loginInp' type="password" placeholder="Password"  />

                <button className='loginBTN' onClick={login}>SignIn</button>

                <div className='signinContainer'>
                    <button onClick={handleGoogleSignIn}>
                        Sign in with Google
                    </button>

                    <NavLink to='/register' id='createAcc'>Create account?</NavLink>
                </div>
            </div>
            {loading && <div className='loader'>
                <Bars />
            </div>}
        </>
    )
}

export default Login