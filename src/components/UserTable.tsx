// src/components/UserTable.tsx
import React from "react";
import { User } from "../models/user.interface";
const LABEL = ["Full Name", "Username", "Thumbnail"];

export interface Props {
  users: User[];
  loading: boolean;
}
export default function UserTable({ users, loading }: Props) {
  const getNameOfUser = (title: string, first: string, last: string) => {
    return `${title} ${first} ${last}`;
  };
  // Lấy danh sách người dùng từ Redux store
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {LABEL.map((lb) => {
              return (
                <th scope="col" className="px-6 py-3">
                  {lb}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            <>
              {users.map((user) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {getNameOfUser(
                        user.name.title,
                        user.name.first,
                        user.name.last
                      )}
                    </td>
                    <td className="px-6 py-4">{user.login.username}</td>
                    <td className="px-6 py-4">
                      <img src={user.picture.thumbnail} />
                    </td>
                  </tr>
                );
              })}
            </>
          ) : (
            <div className="w-40 h-40 bg-gray-900 rounded-sm animate-spin"></div>
          )}
        </tbody>
      </table>
    </div>
  );
}
