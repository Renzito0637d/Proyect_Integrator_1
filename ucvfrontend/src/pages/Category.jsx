import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CategoryForm from '../components/Category/CategoryForm/CategoryForm';
import CategoryTable from '../components/Category/CategoryTable/CategoryTable';

const Category = () => {
  return (
    <>
      <CategoryForm/>
      <CategoryTable/>
    </>
  );
};

export default Category;
