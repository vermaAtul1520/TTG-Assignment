import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { NavLink, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import "./NavBar.css";
import  UploadProfile from './UploadProfile';


const NavBar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [profileURL, setProfileURL] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const imagesListRef = ref(storage, `${currentUser?.email}/profileImage`);
        console.log("imagesListRef",imagesListRef)
        getDownloadURL(imagesListRef).then((res) => {
          setProfileURL(res);
        }).catch((err)=>{
          setProfileURL('');
          console.log(err)
        });
      }
    });
  }, []);

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav>
      <div className="navIcon">
        <h2>{user.displayName}</h2>
      </div>
      <div className="userDetail">
        <NavLink to="/about">Developer</NavLink>
        <p onClick={logout}>SignOut</p>
        <NavLink to="/uploadprofile">
          {profileURL?.length ? <img src={profileURL} alt="Profile" /> : <div className="profileImg"><CgProfile size={40} /></div>}
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
