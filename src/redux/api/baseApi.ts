// Next.js version
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../../src/axios/axiosBaseQuery";

import { tagTypesList } from "./tag-types";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL as string,
  }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});