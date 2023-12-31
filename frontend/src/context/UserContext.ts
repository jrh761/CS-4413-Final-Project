import { createContext } from "react";

export type LoginToken = {
  access_token: string;
  token_type: string;
  isAuthenticated: boolean;
  user: User;
};

export type User = {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  role: string;
};

export type UserContextValue = {
  data: LoginToken | null;
  error: any;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

export const unauthenticatedUser: LoginToken = {
  access_token: "",
  token_type: "",
  isAuthenticated: false,
  user: {
    email: "",
    first_name: "",
    id: 0,
    last_name: "",
    role: "",
  },
};

const UserContext = createContext<UserContextValue>({
  data: null,
  error: null,
  login: async (username: string, password: string) => {},
  logout: () => {},
});

export default UserContext;
