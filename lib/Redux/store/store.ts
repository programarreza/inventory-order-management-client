import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "../api/baseApi";
import authReducer from "../features/auth/authSlice";

import cartReducer from "../features/cart/cartSlice";

const authPersistConfig = {
  key: "auth",
  storage,
};

const cartPersistConfig = {
  key: "cart",
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      auth: persistedAuthReducer,
      cart: persistedCartReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(baseApi.middleware),
  });

  const persistor = persistStore(store);

  return { store, persistor };
};

// ✅ Type for the actual Redux store only
export type ReduxStore = ReturnType<typeof makeStore>["store"];
export type RootState = ReturnType<ReduxStore["getState"]>;
export type AppDispatch = ReduxStore["dispatch"];

// ✅ Type for combined store + persistor (use only internally if needed)
export type AppStore = ReturnType<typeof makeStore>;

// ✅ Export the actual store and persistor
const { store, persistor } = makeStore();

export { persistor, store };
