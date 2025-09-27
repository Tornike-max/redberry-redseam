// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductsData } from "../api/requests";
import type { ProductQueryParams, ProductsResponse } from "../types/types";
import { useSearchParams } from "react-router-dom";

export const useGetProducts = (params?: ProductQueryParams) => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const priceFrom = searchParams.get("price_from");
  const priceTo = searchParams.get("price_to");
  const sort = searchParams.get("sort");

  const finalParams: ProductQueryParams = {
    ...params,
    filter: {
      ...params?.filter,
      price_from: priceFrom ? Number(priceFrom) : undefined,
      price_to: priceTo ? Number(priceTo) : undefined,
    },
    sort: sort ? String(sort) : undefined,
  };

  const {
    data: productsData,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery<
    ProductsResponse,
    Error,
    ProductsResponse,
    [string, ProductQueryParams]
  >({
    queryKey: ["products", finalParams], 
    queryFn: () => getProductsData(finalParams), 
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
    onSuccess: (data: ProductsResponse) => {
      if (data?.meta?.current_page < data?.meta?.last_page) {
        const nextPage = data.meta.current_page + 1;
        queryClient.prefetchQuery({
          queryKey: ["products", { ...finalParams, page: nextPage }],
          queryFn: () => getProductsData({ ...finalParams, page: nextPage }),
        });
      }
    },
  });

  return { productsData, isPending, isError, error, refetch };
};
