import React, { useState } from 'react';
import {productsRef} from '../firebase'
import { RxCrossCircled } from "react-icons/rx";
import './PopForm.css' 
import {
  // get,
  push,
  // set,
  // orderByChild,
  // equalTo,
  // query,
  // update,
  // remove,
} from "firebase/database";

const PopForm = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState('');
  const [isPurchased, setIsPurchased] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCheckboxChange = () => {
    setIsPurchased((prevIsPurchased) => !prevIsPurchased);
  };

  const handleSubmit = () => {
    if(inputValue?.length){
      createEntries({
        product: inputValue,
        purchase: isPurchased,
        quantity: 1
      }).then(() => {
        console.log("done");
      });
    }
   
    setInputValue('');
    setIsPurchased(false);
    onClose();
  };

  const createEntries = async (toAdd) => {
      await push(productsRef, toAdd);
      console.log(`new cloth added`);
    console.log("all clothes added!");
  };

  return (
    <div className='parentModal'style={{ display: isOpen ? 'block' : 'none', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', background: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',borderRadius:'10px' }}>
      <h2>Add Product</h2>
      <div className='productName'>
        <label>
          Product Name
          <input type="text" value={inputValue} onChange={handleInputChange} />
        </label>
      </div>
      <div className='status'>
        <label>
          <input type="checkbox" checked={isPurchased} onChange={handleCheckboxChange} />
          Is Purchased
        </label>
      </div>
      <div className='buttonContainer'>
        <button className='submit' onClick={handleSubmit}>Submit</button>
      </div>
      <div className='closeBtn'>
        <RxCrossCircled
          onClick={onClose}
          size={25}
        />
      </div>
    </div>
  );
};

export default PopForm;
