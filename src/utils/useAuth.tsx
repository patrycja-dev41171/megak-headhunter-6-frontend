import { useSelector } from "react-redux";
import { StoreState } from "../redux-toolkit/store"

export const useAuth = (): string => {
  const { role } = useSelector((store: StoreState) => store.user);
  return role;
};