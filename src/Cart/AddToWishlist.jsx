import { useNavigate } from 'react-router-dom';



function addToWishlist () {
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate('/login');
    return;
  };

  setWishlist(prevWishlist => {
    const updatedWishlist = { ...prevWishlist };
    if (updatedWishlist[productId]) {
      updatedWishlist[productId] += 1;
    } else {
      updatedWishlist[productId] = 1;
    }
    localStorage.setItem('Wishlist', JSON.stringify(updatedWishlist));
    return updatedWishlist;
  });
};
export default addToWishlist;