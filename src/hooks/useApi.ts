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
  const [token, setToken] = useLocalStorage<string | null>(Storage.TOKEN, null);

  /** Api call used when no authorization is needed */
  const makeRequest = async (
    ...args: [...ApiArgs, AbortSignal?]
  ) => {
    try {
      setError(null);
      setPending(true);
      const result = await api.makeApiRequest<ApiReturnType, ApiArgs>(
        apiCall,
        null,
        ...args
      );
      setData(result);
      return result;
    } catch (err) {
      if (err instanceof CustomApiException) {
        setError(err);
      } else {
        setError(new CustomApiException("Unknown error"));
      }
      return null;
    } finally {
      setPending(false);
    }
  };

  /** Api call used when authorization is needed */
  const makeAuthRequest = async (
    ...args: [...ApiArgs, AbortSignal?]
  ) => {
    try {
      setError(null);
      setPending(true);
      if (token === null) {
        throw new CustomApiException("Token have not been set");
      }
      const result = await api.makeApiRequest<ApiReturnType, ApiArgs>(
        apiCall,
        token,
        ...args
      );
      setData(result);
      return result;
    } catch (err) {
      if (err instanceof CustomApiException) {
        setError(err);
      } else {
        setError(new CustomApiException("Unknown error"));
      }
      return null;
    } finally {
      setPending(false);
    }
  };

  /** Api call used when authorization is needed with error and data
   * both returned
  */
  const makeAuthRequestWithErrorResponse = async (
    ...args: [...ApiArgs, AbortSignal?]
  ): Promise<[CustomApiException | null, ApiReturnType | null]> => {
    try {
      setError(null);
      setPending(true);
      if (token === null) {
        throw new CustomApiException("Token have not been set");
      }
      const result = await api.makeApiRequest<ApiReturnType, ApiArgs>(
        apiCall,
        token,
        ...args
      );
      setData(result);
      return [null, result];
    } catch (err) {
      let customErr = new CustomApiException("Unknown error");
      if (err instanceof CustomApiException) {
        customErr = err;
      }
      setError(customErr);
      return [customErr, null];
    } finally {
      setPending(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const clearData = () => {
    setData(null);
  };

  return {
    data,
    pending,
    error,
    makeRequest,
    makeAuthRequest,
    makeAuthRequestWithErrorResponse,
    clearError,
    clearData,
  };
};
