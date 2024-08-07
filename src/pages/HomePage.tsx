// src/pages/HomePage.tsx
// src/pages/HomePage.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserTable from "../components/UserTable";
import Pagination from "../components/Pagination";
import { GetUserDto } from "../models/user.interface";
import { AppDispatch, RootState } from "../data-access/store/store";
import { loadUsers } from "../data-access/user/userSlice";

const HomePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentPage = useSelector(
    (state: RootState) => state.users.currentPage
  );
  const totalPages = useSelector((state: RootState) => state.users.totalPages);
  const users = useSelector((state: RootState) => state.users.users);
  const loading = useSelector((state: RootState) => state.users.loading);
  console.log(loading);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSiza] = useState(10);

  useEffect(() => {
    handleGetUser();
  }, [page]);

  const handleGetUser = () => {
    const defaultPagination: GetUserDto = {
      page,
      pageSize,
    };
    dispatch(loadUsers(defaultPagination));
  };
  const handleClickNext = () => {
    setPage((prev) => prev + 1);
  };
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4 text-red-500">Random Users</h1>
      <UserTable users={users} loading={loading}></UserTable>
      <Pagination onClickNext={handleClickNext} />
    </div>
  );
};

export default HomePage;
