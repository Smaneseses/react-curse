export type SortType = {
  sortProperty: string;
};

export interface FetchPizzasParams {
  category: string;
  search: string;
  currentPage: number;
  sortType: SortType;
}

export type Pizza = {
  id: string;
  title: string;
  price: number;
  types: number[];
  imageUrl: string;
  sizes: number[];
};

export enum Status {
  LOADING = 'loading',
  SUCCSES = 'succes',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}