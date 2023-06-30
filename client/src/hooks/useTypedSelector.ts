import { RootState } from "@/store/reducers";
import { TypedUseSelectorHook, useSelector } from "react-redux";
// import { UseSelector } from "react-redux/es/hooks/useSelector";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector