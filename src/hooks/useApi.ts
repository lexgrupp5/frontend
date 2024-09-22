import { ApiException } from "@/api";
import { useState } from "react";
import { api } from "@/api";

export type IApiHook = ReturnType<typeof useApi>;

/**
 * Use to controll pending and error state
 * when making api calls.
 */
export const useApi = <ApiReturnType, ApiArgs extends unknown[]>(
  apiCall: (...args: [...ApiArgs, AbortSignal?]) => Promise<ApiReturnType>,
) => {
  const [data, setData] = useState<ApiReturnType | null>(null);
  const [pending, setPending] = useState<boolean>(true);
  const [error, setError] = useState<ApiException | null>(null);

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
      if (err instanceof ApiException) {
        setError(err);
      } else {
        setError(new ApiException("Unknown error", 0, "", [], null));
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
      const tokenContainer = { accessToken: "accessToen", refreshToken: "refreshToken" };

      const result = await api.makeApiRequest<ApiReturnType, ApiArgs>(
        apiCall,
        tokenContainer,
        ...args
      );
      setData(result);
    } catch (err) {
      if (err instanceof ApiException) {
        setError(err);
      } else {
        setError(new ApiException("Unknown error", 0, "", [], null));
      }
    } finally {
      setPending(false);
    }
  };

  return { data, pending, error, fetchData, fetchAuthData };
};
