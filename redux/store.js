import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { STORAGEKEY, DEFAULT_JSON } from "../utils/constants";

// Define initial state
const initialState = {
  myJSON: DEFAULT_JSON,
  themeUpdate: [],
  devices: [],
};

// Define reducer slice
const myJSONSlice = createSlice({
  name: "myJSON",
  initialState,
  reducers: {
    updateMyJSON(state, action) {
      state.myJSON = action.payload;
    },
    updateItem(state, action) {
      const { itemId, itemData } = action.payload;
      state.myJSON[itemId] = itemData;
    },
    updateItem(state, action) {
      const { itemId, itemData } = action.payload;
      state.myJSON[itemId] = itemData;
    },
    updateParams(state, action) {
      const { itemId, paramData } = action.payload;
      state.myJSON[itemId].params = paramData;
    },
    updateValue(state, action) {
      const { itemId, paramId, valueId, valueData } = action.payload;
      if (state.myJSON[itemId]) {
        if (state.myJSON[itemId][paramId]) {
          state.myJSON[itemId][paramId][valueId] = valueData;
        }
      }
    },
    updateTheme(state, action) {
      state.themeUpdate = action.payload;
    },
    updateParamsThemes(state, action) {
      const { themeId, itemId, paramData } = action.payload;
      state.themeUpdate[themeId].data[itemId].params = paramData;
    },
    updateDevices(state, action) {
      state.devices = action.payload;
    },
  },
});

// Define persist config
const persistConfig = {
  key: STORAGEKEY.LASTCONFIGUSER,
  storage: AsyncStorage,
};

// Combine slice reducer with persisted reducer
const persistedReducer = persistReducer(persistConfig, myJSONSlice.reducer);

// Create store with persisted reducer
const store = createStore(persistedReducer);

// Persist store
const persistor = persistStore(store);

export const {
  updateMyJSON,
  updateItem,
  updateParams,
  updateValue,
  updateTheme,
  updateParamsThemes,
  updateDevices,
} = myJSONSlice.actions;

export { store, persistor };
