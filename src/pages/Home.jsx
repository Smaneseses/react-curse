import React from 'react';
import qs from 'qs';
import { SearchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { setItems, fetchPizzas } from '../redux/slices/pizzaSlice';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pizzablock from '../components/PizzaBlock/index';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home = () => {
  const dispatch = useDispatch();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const { items, status } = useSelector((state) => state.pizza);
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { searchValue } = React.useContext(SearchContext);
  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        category,
        search,
        sortType,
        currentPage,
      }),
    );
  };

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      dispatch(
        setFilters({
          ...params,
        }),
      );
    }
    isSearch.current = true;
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    getPizzas();

    isSearch.current = false;
  }, []);

  const skeleton = [...Array(4)].map((_, i) => <Skeleton key={i} />);
  const pizzaItems = items.map((obj, id) => <Pizzablock key={id} {...obj} />);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onClickCategory} />
        <Sort
          value={sortType}
          onChangeSort={(value) => {
            sortType(value);
          }}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка</h2>
          <p>Не удалось подключиться к сети</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeleton : pizzaItems}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
