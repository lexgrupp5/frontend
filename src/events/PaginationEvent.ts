import { isType } from "@/utils";

export class PaginationEvent extends CustomEvent<IPaginationMeta> {
  static readonly eventName = "on-pagination";
  
  constructor (detail: IPaginationMeta) {
    super(PaginationEvent.eventName, {
      detail
    });
  }
}

export interface IPaginationMeta {
  PageSize: number;
  TotalItemCount: number;
  TotalPageCount: number;
}

export function isPaginationMeta (obj: unknown) {
  return isType<IPaginationMeta>(obj, (obj) => {
    return (
      typeof obj.PageSize === "number" &&
      typeof obj.TotalItemCount === "number" &&
      typeof obj.TotalPageCount === "number" 
    );
  });
}