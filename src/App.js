import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  setFirstItem,
  setSecondItem,
  addNumbers,
  subtractNumbers,
} from './redux/slices/calculateSlice';

import Header from './components/Header';

import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

import './scss/app.scss';

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState('');
  const { firstItem, secondItem, result } = useSelector((state) => state.calculate);
  const dispatch = useDispatch();
  console.log(firstItem, secondItem);
  return (
    <div>
      <input
        type="number"
        value={firstItem}
        onChange={(event) => dispatch(setFirstItem(Number(event.target.value)))}
      />
      <input
        type="number"
        value={secondItem}
        onChange={(event) => dispatch(setSecondItem(Number(event.target.value)))}
      />

      <button onClick={() => dispatch(addNumbers())}>+</button>
      <button onClick={() => dispatch(subtractNumbers())}>-</button>

      <div>Результат: {result}</div>
    </div>
    // <SearchContext.Provider value={{ searchValue, setSearchValue }}>
    //   <div className="wrapper">
    //     <Header />
    //     <div className="content">
    //       <Routes>
    //         <Route path="/" element={<Home />} />
    //         <Route path="/Cart" element={<Cart />} />
    //         <Route path="*" element={<NotFound />} />
    //       </Routes>
    //     </div>
    //   </div>
    // </SearchContext.Provider>
  );
}

export default App;
