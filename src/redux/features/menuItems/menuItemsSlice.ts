import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import fetchMenuItems from "@/sanity/fetchMenuItems";

interface MenuItemsState {
  items: MenuItem[];
  status: "idle" | "loading" | "failed" | "succeeded";
}

const initialState: MenuItemsState = {
  items: [],
  status: "idle",
};

export const fetchMenuItemsAsync = createAsyncThunk(
  "menuItems/fetchStatus",
  async (): Promise<MenuItem[]> => {
    const response = await fetchMenuItems();
    return response;
  }
);

export const menuItemsSlice = createSlice({
  name: "menuItems",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuItemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMenuItemsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchMenuItemsAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default menuItemsSlice.reducer;
export const selectMenuItems = (state: RootState) => state.menuItems.items;
export const selectMenuItemsStatus = (state: RootState) =>
  state.menuItems.status;
