import React from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pizzablock from '../components/PizzaBlock/index';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/slices/filter/selectors';
import { selectPizzaData } from '../redux/slices/pizza/selectors';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filter/slice';
import { fetchPizzas } from '../redux/slices/pizza/slice';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categoryId, sort: sortType, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status }: any = useSelector(selectPizzaData);
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      // @ts-ignore
      fetchPizzas({
        category,
        search,
        sortType,
        currentPage,
      }),
    );
  };

  const onChangeCategory  = React.useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, [])
  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType.sortProperty, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      dispatch(
        setFilters({
          ...params,
          sort: sortType,
          searchValue: '',
          categoryId: 0,
          currentPage: 1,
        }),
      );
    }
    isSearch.current = true;
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    getPizzas();

    isSearch.current = false;
  }, [categoryId, sortType.sortProperty, currentPage, searchValue]);

  const skeleton = [...Array(4)].map((_, i) => <Skeleton key={i} />);
  const pizzaItems = items.map((obj: any) => <Pizzablock key={obj.id} {...obj} />);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sortType} />
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
