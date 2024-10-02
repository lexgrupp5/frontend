import { useLocalStorage } from "usehooks-ts";

import { CustomApiException, TokenDto } from "@/api";
import { useState } from "react";
import { api } from "@/api";
import { Storage } from "@/constants";
import { isExpiredToken } from "@/services";

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

  const getToken = async () => {
    if (token == null || !isExpiredToken(token)) {
      return token;
    }
    const result = await api.refresh(new TokenDto({ accessToken: token }));
    setToken(result);
    return result;
  };

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
      console.log(result)
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
    const token = await getToken();
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
    const token = await getToken();
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
