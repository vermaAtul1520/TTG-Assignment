import React, { useState } from 'react'
import { storage } from '../firebase'
import { ref, uploadBytes } from 'firebase/storage'
import { auth } from "../firebase";
import { useNavigate } from 'react-router-dom'
import './UploadProfile.css'

const UploadProfile = () => {

    const navigate = useNavigate();

    const [profileImage, setProfileImage] = useState(null);
    const [baseImage, setBaseImage] = useState("");

    const uploadImage = async () => {
        if (profileImage == null) return;
        const imageRef = ref(storage, auth.currentUser.email + "/profileImage");
        try {
            console.log("first");
            await uploadBytes(imageRef, profileImage);
            navigate('/');
        } catch (error) {
            console.error("Error uploading image:", error);
            navigate('/');
        }
    }
    

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleChange = async (e) => {
        setProfileImage(e.target.files[0])
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setBaseImage(base64);
    }


    return (
        <>
            <div className='parent'>
                <h1>Upload Profile Picture</h1>
                <div className="childUP">
                    <div className='childImg'>
                        <img src={baseImage} height="200px" alt='Profile' />
                    </div>
                    <div>
                        <input type="file" accept='image/*' onChange={handleChange} />
                        <button className='prfbtn' onClick={uploadImage} >Upload</button>
                    </div>
                </div>
                <div className='skipButton'>
                    <button onClick={() => {navigate('/'); }}>Skip</button>
                </div>
            </div>
        </>
    )
}

export default UploadProfile