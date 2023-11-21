import React, { useState, useEffect } from 'react'
import './AllFolder.css'
import { auth, storage } from '../firebase'
// import { ref, listAll } from 'firebase/storage'
import { onAuthStateChanged } from "firebase/auth";
import { v4 } from 'uuid'
import { NavLink } from 'react-router-dom'
import PopForm from './PopForm';
import {productsRef} from '../firebase'
import {
    onValue,
    child,
    remove,
    update
  } from "firebase/database";
  import { MdDeleteOutline } from "react-icons/md";
  import { Bars } from 'react-loading-icons'
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
// import image from './folder.png'

const AllFolder = () => {
    const [loading, setLoading]= useState(false)
    const [isPopupOpen, setPopupOpen] = useState(false);

    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const unsubscribe = onValue(productsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const productList = Object.keys(data).map((productId) => ({
                    id: productId,
                    ...data[productId],
                }));
                setProducts(productList);
            } else {
                setProducts([]);
            }
        });

        return () => {
            setLoading(true);
            unsubscribe();
            setLoading(false);
        };
    }, []); 

    const removeData = async (productId) => {
        try {
            const productToDeleteRef = child(productsRef, productId);
            await remove(productToDeleteRef).then((res) => console.log(res));
        }
        catch (error) {
            console.error(`Error updating product with ID ${productId}:`, error);
        }
    };

    const updateData = async (upDatedData) => {
        try {
            const productToDeleteRef = child(productsRef, upDatedData?.id);
            await update(productToDeleteRef,upDatedData).then((res) => console.log(res)).then((res) => console.log(res));
        }
        catch (error) {
            console.error(`Error updating product with ID ${upDatedData?.id}:`, error);
        }
    };

    const handleCheckboxClick = (object,status) => {
        // console.log("status",object,status);
        object.purchase=status;
        // console.log("status",object,status);
        updateData(object);
    };

    const handleQuantityIncrement = (object) => {
        console.log("hellloooo",object)
        object.quantity+=1;
        updateData(object);
    };

    const handleQuantityDecrement = (object) => {
        console.log("hellloooo",object)
        if (object.quantity > 1) {
            object.quantity-=1;
            updateData(object);
        }
    };

    return (
        <>
            <div className='addButton'>
                <button onClick={openPopup}>Add product</button>
            </div>
            <PopForm isOpen={isPopupOpen} onClose={closePopup} />
            <div className='allFolderGrid'>
                {
                    products?.length ?
                        <div className='cards'>
                            {
                                products.map((val) =>

                                    <div key={v4()} className='card' >
                                        <h2>
                                            {val?.product}
                                        </h2>
                                        <div className='deleteIcon'>
                                            <MdDeleteOutline
                                                onClick={() => {
                                                    removeData(val?.id)
                                                }}
                                                size={20}
                                                color='red'
                                            />
                                        </div>
                                        <div className='wrapper'>
                                            <div className='purchaseStatus'>
                                                {!val?.purchase ?
                                                    <>
                                                        <ImCheckboxUnchecked onClick={() => handleCheckboxClick({ ...val }, true)} />
                                                        <h4>In cart</h4>
                                                    </>
                                                    :
                                                    <>
                                                        <ImCheckboxChecked onClick={() => handleCheckboxClick({ ...val }, false)} />
                                                        <h4>Purchased</h4>
                                                    </>

                                                }
                                            </div>
                                            <div className='quantityControlStyle'>
                                                <button onClick={() => handleQuantityDecrement({ ...val })} >
                                                    -
                                                </button>
                                                <span style={{ margin: '0 8px', fontSize: '16px' }}>{val?.quantity}</span>
                                                <button onClick={() => handleQuantityIncrement({ ...val })}>
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        :
                        null
                }
            </div>
            {loading && <div className='loader'>
                <Bars />
            </div>}
        </>
    )
}




export default AllFolder