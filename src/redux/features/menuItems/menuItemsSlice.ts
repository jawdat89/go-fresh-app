import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { fetchMenuItems, updateLikes } from "@/sanity/fetchMenuItems";

interface MenuItemsState {
  items: MenuItem[];
  status: "idle" | "loading" | "failed" | "succeeded";
  isIncremented: Record<string, boolean>;
  likesCount: Record<string, number>;
}

const initialState: MenuItemsState = {
  items: [],
  status: "idle",
  isIncremented: {},
  likesCount: {},
};

export const fetchMenuItemsAsync = createAsyncThunk(
  "menuItems/fetchStatus",
  async (): Promise<MenuItem[]> => {
    const response = await fetchMenuItems();
    return response;
  }
);

export const incrementLikesAsync = createAsyncThunk(
  "menuItems/incrementLikes",
  async (itemId: string, { rejectWithValue }) => {
    try {
      await updateLikes(itemId);
      return itemId; // Return the itemId to identify which item was updated
    } catch (error) {
      // Properly type and check the error before returning it
      if (error instanceof Error) {
        // Handle actual Errors (e.g., network errors, etc.)
        return rejectWithValue({ message: error.message });
      } else if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        // Handle errors which are returned as API responses
        const responseError = error as { response: { data: boolean } };
        return rejectWithValue(responseError.response.data);
      } else {
        // Handle unknown errors
        return rejectWithValue({ message: "An unknown error occurred." });
      }
    }
  }
);

export const menuItemsSlice = createSlice({
  name: "menuItems",
  initialState,
  reducers: {
    incrementLike: (state, action) => {
      const itemId = action.payload;
      if (!state.isIncremented[itemId]) {
        state.likesCount[itemId] = (state.likesCount[itemId] || 0) + 1;
        state.isIncremented[itemId] = true; // Mark as incremented
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuItemsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMenuItemsAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = "succeeded";
        state.items = action.payload;
        action.payload.forEach((item) => {
          state.likesCount[item._id] = item.likes;
        });
      })
      .addCase(fetchMenuItemsAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(incrementLikesAsync.fulfilled, (state, action) => {
        const itemId = action.payload;
        if (!state.isIncremented[itemId]) {
          state.likesCount[itemId] = (state.likesCount[itemId] || 0) + 1;
          state.isIncremented[itemId] = true; // Mark as incremented
        }
      });
  },
});

export default menuItemsSlice.reducer;
export const { incrementLike } = menuItemsSlice.actions;
export const selectMenuItems = (state: RootState) => state.menuItems.items;
export const selectMenuItemsStatus = (state: RootState) =>
  state.menuItems.status;
export const selectLikesCount = (state: RootState) =>
  state.menuItems.likesCount;
export const selectIsIncremented = (state: RootState) =>
  state.menuItems.isIncremented;
