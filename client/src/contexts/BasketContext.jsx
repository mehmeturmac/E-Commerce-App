import { useState, useEffect, createContext, useContext } from 'react';

const BasketContext = createContext();

const defaultBasket = JSON.parse(localStorage.getItem('basket')) || [];

export const BasketProvider = ({ children }) => {
  const [items, setItems] = useState(defaultBasket);

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(items));
  }, [items]);

  const addToBasket = (data, findBasketItem) => {
    if (!findBasketItem) {
      setItems((prev) => [data, ...prev]);
    } else {
      const filtered = items.filter((item) => item._id !== findBasketItem._id);
      setItems(filtered);
    }
  };

  const removeFromBasket = (item_id) => {
    const filtered = items.filter((item) => item._id !== item_id);
    setItems(filtered);
  };

  const emptyBasket = () => setItems([]);

  const values = {
    items,
    setItems,
    addToBasket,
    removeFromBasket,
    emptyBasket,
  };

  return <BasketContext.Provider value={values}>{children}</BasketContext.Provider>;
};

export const useBasket = () => useContext(BasketContext);
