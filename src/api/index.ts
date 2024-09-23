export * from "@/apiGenerated";
import * as Generated from "@/apiGenerated";

import { getAPI } from "@/config";
import { ITokenContainer } from "@/types";
import { axiosInstance } from "./axiosInstance";

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
 * Used to bind this context to the api wrapper instance 
 * for all generated api methods.
 */
function createApiProxy<ApiTarget extends object>(target: ApiTarget): ApiTarget {
  return new Proxy(target, {
    get: (target: ApiTarget, propertyKey: string, receiver: unknown) => {
      const targetProperty = Reflect.get(target, propertyKey, receiver);
      if (typeof targetProperty === "function") {
        return targetProperty.bind(target);
      }
      return Reflect.get(target, propertyKey, receiver);
    }
  });
};


export const api = new Client();
