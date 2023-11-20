import React, { useState } from 'react';
import {productsRef} from '../firebase'
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

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    // You can perform any action with the input value here
    console.log('Submitted value:', inputValue);
    createEntries({
      product: inputValue,
    }).then(() => {
      console.log("done");
    });
    // Reset the input value
    setInputValue('');
    // Close the pop-up form
    onClose();
  };

  const createEntries = async (toAdd) => {
      await push(productsRef, toAdd);
      console.log(`new cloth added`);
    console.log("all clothes added!");
  };

  return (
    <div style={{ display: isOpen ? 'block' : 'none', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', background: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
      <h2>Pop-up Form</h2>
      <label>
        Input Field:
        <input type="text" value={inputValue} onChange={handleInputChange} />
      </label>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default PopForm;
