import { PRODUCTS_PER_PAGE } from "./constants";

export function getTotalPages(
  totalItems: number,
  pageSize: number = PRODUCTS_PER_PAGE,
): number {
  if (totalItems <= 0) {
    return 1;
  }

  return Math.ceil(totalItems / pageSize);
}

export function clampPage(page: number, totalPages: number): number {
  if (!Number.isFinite(page) || page < 1) {
    return 1;
  }

  return Math.min(Math.max(page, 1), Math.max(totalPages, 1));
}

export function paginateItems<T>(
  items: T[],
  page: number,
  pageSize: number = PRODUCTS_PER_PAGE,
): T[] {
  const totalPages = getTotalPages(items.length, pageSize);
  const currentPage = clampPage(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;

  return items.slice(startIndex, startIndex + pageSize);
}
