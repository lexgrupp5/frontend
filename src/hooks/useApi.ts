import { useLocalStorage } from "usehooks-ts";

import { CustomApiException } from "@/api";
import { useState } from "react";
import { api } from "@/api";
import { Storage } from "@/constants";

export type IApiHook = ReturnType<typeof useApi>;

/**
 * Use to controll pending and error state
 * when making api calls.
 */
export const useApi = <ApiReturnType, ApiArgs extends unknown[]>(
  apiCall: (...args: [...ApiArgs, AbortSignal?]) => Promise<ApiReturnType>,
) => {
  const [data, setData] = useState<ApiReturnType | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<CustomApiException | null>(null);
  const [tokens, setTokens] = useLocalStorage<string | null>(Storage.TOKEN, null);

  /** Api call used when no authorization is needed */
  const fetchData = async (
    ...args: [...ApiArgs, AbortSignal?]
  ) => {
    try {
      setPending(true);
      const result = await api.makeApiRequest<ApiReturnType, ApiArgs>(
        apiCall,
        undefined,
        ...args
      );
      setData(result);
    } catch (err) {
      if (err instanceof CustomApiException) {
        setError(err);
      } else {
        setError(new CustomApiException("Unknown error"));
      }
    } finally {
      setPending(false);
    }
  };

  /** Api call used when authorization is needed */
  const fetchAuthData = async (
    ...args: [...ApiArgs, AbortSignal?]
  ) => {
    try {
      setPending(true);
      if (tokens === null) {
        throw new CustomApiException("Token have not been set");
      }
      const result = await api.makeApiRequest<ApiReturnType, ApiArgs>(
        apiCall,
        tokens,
        ...args
      );
      setData(result);
    } catch (err) {
      if (err instanceof CustomApiException) {
        setError(err);
      } else {
        setError(new CustomApiException("Unknown error"));
      }
    } finally {
      setPending(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return { data, pending, error, fetchData, fetchAuthData, clearError };
};
