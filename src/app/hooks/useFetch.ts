import { API } from "@/helpers/blogApi.helper";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useReducer } from "react";

// Define el estado inicial y el tipo de estado usando el genérico T
export type Status =
  | "success"
  | "pending"
  | "loading"
  | "rejected"
  | "none"
  | "unauthorized";

export type State<T> =
  | { data: null; status: Status; error: null }
  | { data: T; status: Status; error: null }
  | { data: null; status: Status; error: AxiosError };

export type Action<T> =
  | { type: "loading" }
  | { type: "success"; data: T }
  | { type: "rejected"; error: AxiosError }
  | { type: "unauthorized"; error: AxiosError };

export type Methods = "POST" | "GET" | "DELETE" | "PUT";

export interface FetchParams {
  url: string;
  method: Methods;
  body?: any;
  config?: any;
}

// Define la función reducer con tipos para el estado y las acciones

export const Fetch = async (
  url: string,
  method: Methods,
  body?: any,
  config?: any
): Promise<AxiosResponse> => {
  switch (method) {
    case "GET":
      return await API.get(url, config);
    case "POST":
      return await API.post(url, JSON.stringify(body), config);

    case "DELETE":
      return await API.delete(url, config);
    case "PUT":
      return await API.put(url, body, config);
    default:
      throw new Error("Unknown request method");
  }
};

/**
 * Hook `useFetch` para realizar solicitudes HTTP con Axios
 *
 * @param {FetchParams} params - Parámetros de configuración para la solicitud HTTP.
 *
 * Admite:
 * - `url` (string): La URL del recurso que se desea solicitar.
 * - `method` (Methods): El método HTTP para la solicitud (`GET`, `POST`, `DELETE`, `PUT`).
 * - `body` (any, opcional): El cuerpo de la solicitud, útil para métodos `POST` o `PUT`.
 * - `config` (any, opcional): Configuración adicional para Axios, como encabezados o parámetros de consulta.
 *
 * Devuelve:
 * - Un objeto con los siguientes estados:
 *   - `data`: Los datos devueltos de la respuesta de la API.
 *   - `loading`: Booleano que indica si la solicitud está en progreso.
 *   - `hasError`: Booleano que indica si ocurrió un error en la solicitud.
 *   - `error`: Mensaje de error si la solicitud falla, o `null` si no hubo errores.
 *
 * Funcionamiento:
 * - `useFetch` inicia la solicitud HTTP en cuanto se monta el componente que lo utiliza.
 * - Al comenzar la solicitud, `loading` se establece en `true` y los datos (`data`) en `null`.
 * - Si la solicitud es exitosa, `data` se actualiza con la respuesta y `loading` cambia a `false`.
 * - Si ocurre un error, `hasError` se establece en `true`, `error` contiene el mensaje del error, y `loading` vuelve a `false`.
 * - Actualmente, el hook solo maneja solicitudes `GET`, pero está estructurado para poder soportar otros métodos en el futuro.
 *
 * Ejemplo de uso:
 * ```typescript
 * const { data, loading, hasError, error } = useFetch({
 *   url: "/pokemon/ditto",
 *   method: "GET"
 * });
 *
 * if (loading) return <p>Cargando...</p>;
 * if (hasError) return <p>Error: {error}</p>;
 * return <div>Datos: {JSON.stringify(data)}</div>;
 * ```
 */
export const useFetch = <T>({ url, method, body, config }: FetchParams) => {
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
        return { data: action.data, status: "success", error: null };
      case "rejected":
        return { data: null, status: "rejected", error: action.error };
      case "unauthorized":
        return { data: null, status: "unauthorized", error: action.error };
      default:
        return state;
    }
  }

  useEffect(() => {
    let isCancelled = false;

    const callFetch = async () => {
      dispatch({ type: "loading" });
      try {
        const response = await Fetch(url, method, body, config);
        if (isCancelled) return;
        dispatch({ type: "success", data: response.data });
      } catch (error: any) {
        if (isCancelled) return;
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          dispatch({ type: "unauthorized", error });
        } else {
          dispatch({ type: "rejected", error });
        }
      }
    };

    callFetch();

    return () => {
      isCancelled = true;
    };
  }, [url, method, body, config]);

  return {
    isLoading: state.status === "loading" || state.status === "pending",
    isRejected: state.status === "rejected",
    isUnauthorized: state.status === "unauthorized",
    isSucces: state.status === "success",
    ...state,
  };
};
