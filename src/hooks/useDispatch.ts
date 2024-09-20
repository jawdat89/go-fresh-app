// src/hooks/useDispatch.ts
import { useDispatch as useReduxDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store"; // Assuming AppDispatch is correctly typed

export const useDispatch = () => useReduxDispatch<AppDispatch>(); // Ensure the custom hook uses the correct Redux store type
