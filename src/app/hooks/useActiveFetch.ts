import { useCallback, useReducer } from "react";
import { Action, Fetch, FetchParams, State } from "./useFetch";
import axios from "axios";

export const useActiveFetch = <T>({ url, method, config }: FetchParams) => {
  const initialState: State<T> = {
    data: null,
    status: "none",
    error: null,
  };

  const [state, dispatch] = useReducer(reducer, {
    data: null,
    status: "none",
    error: null,
  });

  function reducer(state: State<T>, action: Action<T>): State<T> {
    switch (action.type) {
      case "loading":
        return { ...state, status: "loading", error: null };
      case "success":
        console.log("Reducer setting success state", action.data); // Añadir log para verificar
        return { data: action.data, status: "success", error: null };
      case "rejected":
        return { data: null, status: "rejected", error: action.error };
      case "unauthorized":
        return { data: null, status: "unauthorized", error: action.error };
      default:
        return state;
    }
  }

  const fetchData = useCallback(
    async (data: Record<string, any> | string) => {
      console.log("Starting fetchData with data:", data); // Depuración inicial
      dispatch({ type: "loading" });
      try {
        const response = await Fetch(url, method, data, config);
        console.log("Fetch response data:", response.data); // Depura la respuesta
        dispatch({ type: "success", data: response.data });
      } catch (error: any) {
        console.error("Fetch error:", error); // Muestra el error
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          dispatch({ type: "unauthorized", error });
        } else {
          dispatch({ type: "rejected", error });
        }
      }
    },
    [url, method, config]
  );

  return {
    isLoading: state.status === "loading" || state.status === "pending",
    isRejected: state.status === "rejected",
    isUnauthorized: state.status === "unauthorized",
    isSucces: state.status === "success",
    ...state,
    fetchData,
  };
};
