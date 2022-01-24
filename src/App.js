import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Arrived from './components/Arrived';
import AsideMenu from './components/AsideMenu';
import Browse from './components/Browse';
import Clients from './components/Clients';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import Offline from './components/Offline';
import Cart from './pages/Cart';
import Details from './pages/Details';
import Profile from './pages/Profile';
import Splash from './pages/Splash';

function App({cart}) {
  const [items, setItems] = useState([]);
  const [offlineStatus, setOfflineStatus] = useState(!navigator.onLine);
  const [isLoading, setIsLoading] = useState(true);

  function handleOfflineStatus() {
    setOfflineStatus(!navigator.onLine);
  }

  useEffect(()=> {
    (async function() {
      const res = await fetch('https://prod-qore-app.qorebase.io/8ySrll0jkMkSJVk/allItems/rows?limit=7&offset=0&$order=asc',
                              {headers: {
                                "Content-Type": "application/json",
                                "accept": "application/json",
                                "x-api-key": process.env.REACT_APP_APIKEY
                              }});
      const {nodes} = await res.json();
      setItems(nodes);

      const script = document.createElement("script");
      script.src = "/carousel.js";
      script.async = false;
      document.body.appendChild(script);
    }());

    handleOfflineStatus();
    window.addEventListener('online', handleOfflineStatus);
    window.addEventListener('offline', handleOfflineStatus);

    setTimeout(()=> {
      setIsLoading(false);
    }, 2000);
    
    return function() {
      window.removeEventListener('online', handleOfflineStatus);
      window.removeEventListener('offline', handleOfflineStatus);
    }
  }, [offlineStatus]);
  return (
    <>
    {isLoading === true ? <Splash /> :
    (
      <>
      {offlineStatus && <Offline />}
      <Header mode="light" cart={cart} />
      <Hero />
      <Browse />
      <Arrived items={items} />
      <Clients />
      <AsideMenu />
      <Footer />
      </>
      )}
    </>
  );
}

export default function Routers() {
  const cachedCart = window.localStorage.getItem("cart");
  const [cart, setCart] = useState([]);

  function handleAddToCart(item) {
    const currentIndex = cart.length;
    const newCart = [...cart, {id: currentIndex +1, item}];
    setCart(newCart);
    window.localStorage.setItem("cart", JSON.stringify(newCart));
  }

  function handleRemoveCartItem(event, id) {
    const revisedCart = cart.filter(function(item) {
      return item.id !== id;
    });
    setCart(revisedCart);
    window.localStorage.setItem("cart", JSON.stringify(revisedCart));
  }

  useEffect(()=> {
    console.info("useEffect for localStorage");
    if (cachedCart !== null) {
      setCart(JSON.parse(cachedCart));
    }
  }, [cachedCart]);
  
  return (
    <Router>
        <Routes>
            <Route path="/" exact element={<App cart={cart} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/details/:id" element={<Details handleAddToCart={handleAddToCart} cart={cart} />} />
            <Route path="/cart" element={<Cart cart={cart} handleRemoveCartItem={handleRemoveCartItem} />} />
        </Routes>
    </Router>
  )
};
