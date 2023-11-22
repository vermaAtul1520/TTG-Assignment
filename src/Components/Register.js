import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import './Register.css'
import { ToastContainer, toast } from 'react-toastify';
import { Bars } from 'react-loading-icons'
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [passtype, setPasstype] = useState('password');
    const [loading, setLoading]= useState(false);

    function showPassword() {
        setPasstype('text')
    }

    function hidePassword() {
        setPasstype('password')
    }

    const register = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );

            await updateProfile(auth.currentUser, { displayName: name })

            navigate('/uploadprofile')
        } catch (error) {
            toast.error(error.message, {
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
        try {
            const result = await signInWithPopup(auth, provider);
            console.log("sdfgh", result)
            const token = result?.credential?.accessToken;
            const user = result?.user;
            navigate("/")
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <ToastContainer />
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <div className='loginForm'>
                <h3 id='loginhead'>Register Here</h3>

                <label className='lbl' >Name</label>
                <input
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                    className='loginInp' type="text" placeholder="Name" id="username" />

                <label className='lbl' >Email</label>
                <input
                    onChange={(event) => {
                        setRegisterEmail(event.target.value);
                    }}
                    className='loginInp' type="text" placeholder="Email" id="username" />

                <label className='lbl' >Password</label>
                <input
                    onChange={(event) => {
                        setRegisterPassword(event.target.value);
                    }}
                    className='loginInp' type={passtype} placeholder="Password" id="password" />
                <div>
                    <span onClick={showPassword} style={{ cursor: 'pointer', color:"blue" }} >Show Password</span>
                    <span onClick={hidePassword} style={{ cursor: 'pointer', marginLeft:"30px", color:"blue" }}>Hide Password</span>
                </div>

                <button className='loginBTN' onClick={register}>SignUp</button>
                <div className='signinContainer'>
                    <button onClick={handleGoogleSignIn}>
                        Sign up with Google
                    </button>
                    <NavLink to='/login'>Have account?</NavLink>
                </div>
            </div>
            {loading && <div className='loader'>
                <Bars />
            </div>}
        </>

    )
}

export default Register