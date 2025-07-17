import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/SHopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/cartTotal';



const Cart = () => {
  const { products, cartItems, currency, updateQuantity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      <div>
        {cartData.length > 0 ? (
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item._id);
            return (
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20' src={productData?.image[0]} alt="" />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData?.name}</p>
                    <p className='text-xs'>Size: {item.size}</p>
                    <p className='text-xs'>Qty: {item.quantity}</p>
                  </div>
                </div>
                <div className='text-right'>
                  <p className='font-medium mr-5'>{currency}{productData?.price}</p>
                </div>
                <div className='flex items-center justify-center gap-10 p-4'>
                  <input 
                    className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' 
                    type="number" 
                    min={1} 
                    value={item.quantity}
                    onChange={(e) => e.target.value === '' || e.target.value === 0 ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                  />
                  <img 
                    onClick={() => updateQuantity(item._id, item.size, 0)} 
                    src={assets.bin_icon} 
                    className='w-4 mr-4 sm:w-5 cursor-pointer' 
                    alt="Delete" 
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p className='py-8 text-gray-500'>Your cart is empty</p>
        )}
      </div> 
    </div>
  );
};

export default Cart;

      //  <div className='flex justify-end my-20'>
      //   <div className='w-full sm:w-[450px]'>
      //     <CartTotal />
      //   </div>
      // </div>