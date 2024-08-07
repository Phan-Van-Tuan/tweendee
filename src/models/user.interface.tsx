export interface GetUserDto {
  page: number;
  pageSize: number;
}

export interface User {
  name: {
    title: string;
    first: string;
    last: string;
  };
  picture: {
    thumbnail: string;
  };
  login: {
    username: string;
  };
}

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}
