// import { useState } from 'react';
// import './AddProduct.css';
// import upload_area from '../../assets/upload_image.png';

// const AddProduct = () => {
//   const [image, setImage] = useState(null);
//   const [productDetails, setProductDetails] = useState({
//     name: "",
//     category: "women",
//     new_price: "",
//     old_price: ""
//   });

//   const imageHandler = (e) => {
//     const file = e.target.files[0];
//     setImage(file);
//   };

//   const changeHandler = (e) => {
//     setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
//   };

//   const Add_Product = async () => {
//     try {
//       if (!image) {
//         alert('Please upload an image.');
//         return;
//       }

//       let formData = new FormData();
//       formData.append('image', image);
//       formData.append('name', productDetails.name);
//       formData.append('category', productDetails.category);
//       formData.append('new_price', productDetails.new_price);
//       formData.append('old_price', productDetails.old_price);

//       // Upload the image
//       let response = await fetch('http://localhost:4000/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       let responseData = await response.json();

//       if (!response.ok) {
//         throw new Error(responseData.message || 'Image upload failed');
//       }

//       if (responseData.success) {
//         // Add the product
//         response = await fetch('http://localhost:4000/addproduct', {
//           method: 'POST',
//           headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             ...productDetails,
//             image: responseData.image_url
//           }),
//         });

//         responseData = await response.json();

//         if (!response.ok) {
//           throw new Error(responseData.message || 'Failed to add product');
//         }

//         responseData.success ? alert('Product Added') : alert('Failed to add product');
//       } else {
//         alert('Failed to upload image');
//       }
//     } catch (error) {
//       //console.error('Error:', error);
//       alert('An error occurred. Check console for details.');
//     }
//   };

//   return (
//     <div className="addproduct">
//       <div className="addproduct-itemfield">
//         <p>Product title</p>
//         <input 
//           value={productDetails.name} 
//           onChange={changeHandler} 
//           type="text" 
//           name='name' 
//           placeholder='Type Here' 
//         />
//       </div>
//       <div className="addproduct-price">
//         <div className="addproduct-itemfield">
//           <p>Price</p>
//           <input 
//             value={productDetails.old_price} 
//             onChange={changeHandler} 
//             type="text" 
//             name="old_price" 
//             placeholder='Type Here' 
//           />
//         </div>
//         <div className="addproduct-itemfield">
//           <p>Offer Price</p>
//           <input 
//             value={productDetails.new_price} 
//             onChange={changeHandler} 
//             type="text" 
//             name="new_price" 
//             placeholder='Type Here' 
//           />
//         </div>
//       </div>
//       <div className="addproduct-itemfield">
//         <p>Product Category</p>
//         <select 
//           value={productDetails.category} 
//           onChange={changeHandler} 
//           name='category' 
//           className='add-product-selector'
//         >
//           <option value="women">Women</option>
//           <option value="men">Men</option>
//           <option value="kid">Kid</option>
//         </select>
//       </div>
//       <div className="addproduct-itemfield">
//         <label htmlFor="file-input">
//           <img 
//             src={image ? URL.createObjectURL(image) : upload_area} 
//             className='addproduct-thumnail' 
//             alt="Upload Area" 
//           />
//         </label>
//         <input 
//           onChange={imageHandler} 
//           type="file" 
//           name='image' 
//           id='file-input' 
//           hidden 
//         />
//       </div>
//       <button 
//         onClick={Add_Product} 
//         className='addproduct-btn'
//       >
//         ADD
//       </button>
//     </div>
//   );
// };

// export default AddProduct;



import { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_image.png';

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: "",
    category: "women",
    new_price: "",
    old_price: ""
  });

  const imageHandler = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    try {
      if (!image) {
        alert('Please upload an image.');
        return;
      }

      let formData = new FormData();
      formData.append('image', image); // Ensure this matches the field name on the server
      formData.append('name', productDetails.name);
      formData.append('category', productDetails.category);
      formData.append('new_price', productDetails.new_price);
      formData.append('old_price', productDetails.old_price);

      let response = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData,
      });

      let responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Image upload failed');
      }

      if (responseData.success) {
        response = await fetch('http://localhost:4000/addproduct', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...productDetails,
            image: responseData.image_url
          }),
        });

        responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message || 'Failed to add product');
        }

        responseData.success ? alert('Product Added') : alert('Failed to add product');
      } else {
        alert('Failed to upload image');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Check console for details.');
    }
  };

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input 
          value={productDetails.name} 
          onChange={changeHandler} 
          type="text" 
          name='name' 
          placeholder='Type Here' 
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input 
            value={productDetails.old_price} 
            onChange={changeHandler} 
            type="text" 
            name="old_price" 
            placeholder='Type Here' 
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input 
            value={productDetails.new_price} 
            onChange={changeHandler} 
            type="text" 
            name="new_price" 
            placeholder='Type Here' 
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select 
          value={productDetails.category} 
          onChange={changeHandler} 
          name='category' 
          className='add-product-selector'
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img 
            src={image ? URL.createObjectURL(image) : upload_area} 
            className='addproduct-thumbnail' 
            alt="Upload Area" 
          />
        </label>
        <input 
          onChange={imageHandler} 
          type="file" 
          name='image' 
          id='file-input' 
          hidden 
        />
      </div>
      <button 
        onClick={Add_Product} 
        className='addproduct-btn'
      >
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
