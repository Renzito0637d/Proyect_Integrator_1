import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CategoryForm from '../components/Category/CategoryForm/CategoryForm';
import CategoryTable from '../components/Category/CategoryTable/CategoryTable';
import axios from 'axios';
import { getAuthHeader } from '../Utils/Auth';

const Category = () => {
  const [categoryList, setCategoryList] = useState([]);

  const fetchCategoryList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/ucv/categoryList",
        {
          headers: getAuthHeader(),
        }
      );
      setCategoryList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  const handleCategoryChanged = () => {
    fetchCategoryList();
  };

  return (
    <>
      <CategoryForm onCategoryChanged={handleCategoryChanged}/>
      <CategoryTable categoryList={categoryList}/>
    </>
  );
};

export default Category;
