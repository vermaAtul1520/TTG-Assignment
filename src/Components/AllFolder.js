import React, { useState, useEffect } from 'react'
import './AllFolder.css'
import { auth, storage } from '../firebase'
import { ref, listAll } from 'firebase/storage'
import { onAuthStateChanged } from "firebase/auth";
import { v4 } from 'uuid'
import { NavLink } from 'react-router-dom'
import PopForm from './PopForm';
import UploadComponent from './UploadComponent';
import {productsRef} from '../firebase'
import {
    onValue
  } from "firebase/database";
// import image from './folder.png'

const AllFolder = () => {

    const [isPopupOpen, setPopupOpen] = useState(false);

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };

    const [products, setProducts] = useState([]);

    useEffect(() => {
        
        // Set up a real-time listener to fetch and update the products
        const unsubscribe = onValue(productsRef, (snapshot) => {
            console.log("effect calledddd")
            const data = snapshot.val();
            if (data) {
                // Convert the data object into an array of products
                const productList = Object.keys(data).map((productId) => ({
                    id: productId,
                    ...data[productId],
                }));
                console.log("productList",productList)
                setProducts(productList);
            } else {
                setProducts([]);
            }
        });

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
    }, []); // Empty dependency array to run the effect only once

    useEffect(()=>{
     console.log("products",products)
    },[products])

    return (
        <>
            {/* <UploadComponent folderdetail={folder} user={user.email} addFolder={setFolder} /> */}
            <button onClick={openPopup}>Add product</button>
            <PopForm isOpen={isPopupOpen} onClose={closePopup} />
            {/* <UploadComponent folderdetail={folder} user={user.email} addFolder={setFolder} /> */}
            <div className='allFolderGrid'>
                {
                    products.length ?
                        <div className='cards'>
                            {
                                products.map((val) =>

                                    <div key={v4()} className='card' >
                                        <h1>
                                          {val?.product}
                                        </h1>
                                    </div>
                                )
                            }
                        </div>
                        :
                        null
                }
            </div>
        </>
    )
}

export default AllFolder