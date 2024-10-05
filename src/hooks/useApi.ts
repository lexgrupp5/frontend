import { useRef } from "react";
import { useLocalStorage } from "usehooks-ts";

import { CustomApiException, RefreshTokenExpiredException, TokenDto } from "@/api";
import { useState } from "react";
import { api } from "@/api";
import { Storage } from "@/constants";
import { isExpiredToken } from "@/services";
import { useMessageContext } from "./useMessageContext";

export type IApiHook = ReturnType<typeof useApi>;

/**
 * Used to controll pending and error state
 * when making api calls.
 */
export const useApi = <ApiReturnType, ApiArgs extends unknown[]>(
  apiCall: (...args: [...ApiArgs, AbortSignal?]) => Promise<ApiReturnType>,
) => {
  const [data, setData] = useState<ApiReturnType | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<CustomApiException | null>(null);
  const [token, setToken, clearToken] = useLocalStorage<string | null>(Storage.TOKEN, null);
  const messageContext = useMessageContext();
  const refreshTokenPromise = useRef<Promise<string> | null>(null);

  /** Api call used when no authorization is needed */
  const makeRequest = async (
    ...args: [...ApiArgs, AbortSignal?]
  ) => {
    const resultWithError = await makeAuthRequestBase(false, ...args);
    return resultWithError[1];
  };

  /** Api call used when authorization is needed */
  const makeAuthRequest = async (
    ...args: [...ApiArgs, AbortSignal?]
  ) => {
    const resultWithError = await makeAuthRequestBase(true, ...args);
    return resultWithError[1];
  };

  /** Api call used when authorization is needed with error and data
   * both returned
  */
  const makeAuthRequestWithErrorResponse = async (
    ...args: [...ApiArgs, AbortSignal?]
  ): Promise<[CustomApiException | null, ApiReturnType | null]> => {
    return await makeAuthRequestBase(true, ...args);
  };

  const makeAuthRequestBase = async (
    useAuth: boolean,
    ...args: [...ApiArgs, AbortSignal?]
  ): Promise<[CustomApiException | null, ApiReturnType | null]> => {
    let result: ApiReturnType | null = null;
    let resultErr: CustomApiException | null = null;

    try {
      setError(null);
      setPending(true);

      const token = useAuth ? await getToken() : null;
      if (useAuth && token === null) {
        throw new CustomApiException("Token have not been set");
      }

      result = await api.makeApiRequest<ApiReturnType, ApiArgs>(
        apiCall,
        useAuth ? token : null,
        ...args
      );

      setData(result);
    } catch (err) {
      resultErr = handleError(err);
    } finally {
      setPending(false);
    }
    return [resultErr, result];
  };

  const getToken = (): Promise<string | null> => {
    if (token == null || !isExpiredToken(token)) {
      return Promise.resolve(token);
    }
  
    if (refreshTokenPromise.current) {
      return refreshTokenPromise.current;
    }
  
    refreshTokenPromise.current = api.refresh(new TokenDto({ accessToken: token }))
      .then(result => {
        setToken(result);
        return result;
      })
      .catch(() => {
        refreshTokenPromise.current = null;
        clearToken();
        throw new RefreshTokenExpiredException();
      })
      .finally(() => {
        refreshTokenPromise.current = null;
      });
  
    return refreshTokenPromise.current;
  };
  

  const handleError = (err: unknown) => {
    let resultErr: CustomApiException | null = null;
    if (err instanceof RefreshTokenExpiredException) {
      clearToken();
      messageContext.clearMessages();
      messageContext.updateErrorMessage(err.message);
      resultErr = err;
    } else if (err instanceof CustomApiException) {
      setError(err);
      resultErr = err;
    } else {
      const unknownErr = new CustomApiException("Unknown error");
      setError(unknownErr);
      resultErr = unknownErr;
    }
    return resultErr;
  };

  const clearError = () => {
    setError(null);
  };

  const clearData = () => {
    setData(null);
  };

  const clearResult = () => {
    clearError();
    clearData();
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
    clearResult
  };
};
