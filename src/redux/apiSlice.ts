// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env["VITE_APP_API_URL"] }),
  endpoints: () => ({}),
  tagTypes: ["Todos"],
});
