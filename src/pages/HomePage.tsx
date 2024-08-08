import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserTable from "../components/UserTable";
import Pagination from "../components/Pagination";
import { GetUserDto } from "../models/user.interface";
import { AppDispatch, RootState } from "../data-access/store/store";
import { loadUsers } from "../data-access/user/userSlice";

const HomePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);
  const loading = useSelector((state: RootState) => state.users.loading);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

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

  const handleClickPrev = () => {
    setPage((next) => next - 1);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="w-full flex justify-center items-center text-2xl font-bold m-4 text-red-500">
        Random Users
      </h1>
      <UserTable users={users} loading={loading}></UserTable>
      <Pagination
        page={page}
        onClickNext={handleClickNext}
        onClickPrev={handleClickPrev}
      />
    </div>
  );
};

export default HomePage;
