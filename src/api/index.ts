export * from "@/apiGenerated";
export * from "./CustomApiException";

import { CustomApiException } from "./CustomApiException";

import * as Generated from "@/apiGenerated";

import { getAPI } from "@/config";
import { ITokenContainer } from "@/types";
import { axiosInstance } from "./axiosInstance";
import { ApiException } from "@/apiGenerated";

/**
 * Used to wrap generated api calls
 * and to handle different configurations
 * for different calls.
 */
class Client extends Generated.Client {
  constructor() {
    super(getAPI(), axiosInstance);
    return createApiProxy(this);
  }

  public async makeApiRequest<ApiReturnType, ApiArgs extends unknown[]>(
    apiCall: (...args: [...ApiArgs, AbortSignal?]) => Promise<ApiReturnType>,
    tokenContainer?: ITokenContainer,
    ...args: [...ApiArgs, AbortSignal?]
  ): Promise<ApiReturnType> {
    if (tokenContainer) {
      this.instance.defaults.headers["Authorization"] = `Bearer ${tokenContainer.accessToken}`;
    } else {
      delete this.instance.defaults.headers["Authorization"];
    }

    return await apiCall(...args);
  }
}

/**
 * Used to bind this context to the api wrapper instance and
 * rethrowing errors with CustomApiException  
 * for all generated api methods.
 */
function createApiProxy<ApiTarget extends object>(target: ApiTarget): ApiTarget {
  return new Proxy(target, {
    get: (target: ApiTarget, propertyKey: string, receiver: unknown) => {
      const targetProperty = Reflect.get(target, propertyKey, receiver);
      if (typeof targetProperty !== "function") {
        return targetProperty;
      }

      return async function (...args: unknown[]): Promise<unknown> {
        try {
          const boundTargetFunction = targetProperty.bind(target);
          return await boundTargetFunction(...args);  
        } catch (err) {
          if (err instanceof ApiException) {
            throw new CustomApiException(err.message);
          } else {
            throw new CustomApiException("Unknown error");
          }
        }
      };
    }
  });
};


export const api = new Client();
