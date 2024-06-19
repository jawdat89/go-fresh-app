// src/redux/features/general/generalSlice.ts
import storage from "redux-persist/lib/storage";

// Function to clear the persisted Redux state
const clearPersistedState = async () => {
  await storage.removeItem("persist:root"); // Clears the entire persisted state
};

export { clearPersistedState };
