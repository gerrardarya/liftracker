"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import cookies from "js-cookie";
import { PropsWithChildren, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "sonner";

import { MainErrorFallback } from "@/components/error/main-error-fallback";
import { TooltipProvider } from "@/components/ui/tooltip";

export type ProvidersProps = PropsWithChildren;

export default function Providers({ children }: ProvidersProps) {
  // openai-react-query を使う場合も react-query の設定は必要
  // https://github.com/openapi-ts/openapi-typescript/issues/1947
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 60,
          },
          mutations: {
            retry: false,
          },
        },
      }),
  );

  return (
    <ErrorBoundary FallbackComponent={MainErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider delayDuration={0}>
          <ReactQueryDevtools initialIsOpen={false} />
          {children}
          <Toaster
            expand
            richColors
            closeButton
            theme="light"
            duration={3000}
          />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
