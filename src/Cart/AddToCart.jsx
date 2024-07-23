
import { useNavigate } from 'react-router-dom';



function addToCart () {
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate('/login');
    return;
  };

  setCart(prevCart => {
    const updatedCart = { ...prevCart };
    if (updatedCart[productId]) {
      updatedCart[productId] += 1;
    } else {
      updatedCart[productId] = 1;
    }
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return updatedCart;
  });
};
export default addToCart;