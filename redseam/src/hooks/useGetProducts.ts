import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductsData } from "../api/requests";
import type { ProductQueryParams, ProductsResponse } from "../types/types";

export const useGetProducts = (params?: ProductQueryParams) => {
  const queryClient = useQueryClient();

  const {
    data: productsData,
    isPending,
    isError,
    error,
    refetch,
  } = useQuery<ProductsResponse, Error, ProductsResponse, [string, ProductQueryParams | undefined]>({
    queryKey: ["products", params],
    queryFn: () => getProductsData(params),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
    onSuccess: (data: ProductsResponse) => {
      if (data?.meta?.current_page < data?.meta?.last_page) {
        const nextPage = data.meta.current_page + 1;
        queryClient.prefetchQuery({
          queryKey: ["products", { ...params, page: nextPage }],
          queryFn: () => getProductsData({ ...params, page: nextPage }),
        });
      }
    },
  });

  return { productsData, isPending, isError, error, refetch };
};
