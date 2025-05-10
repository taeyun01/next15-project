"use client";

import React, { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type Props = {
  children: React.ReactNode;
};

const RQProvider = ({ children }: Props) => {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        // react-query 전역 설정 (useQuery에서 덮어쓰기 가능 즉, 개별 쿼리에서 설정 가능)
        queries: {
          refetchOnWindowFocus: false, // 탭 전환 시 데이터를 새로 불러올건지 여부
          retryOnMount: true, // 컴포넌트가 마운트 될 때 데이터를 다시 불러올건지 여부 (페이지를 이동했던지, 컴포넌트가 state떄문에 언마운트 됐다가 마운트 됐던지)
          refetchOnReconnect: false, // 인터넷 연결이 끊어졌다가 다시 연결될 때 데이터를 새로 불러올건지 여부
          retry: false, // 데이터를 불러오는데 실패했을 때 몇 번 재시도할지 여부 (false일 경우 재시도 안하고 그냥 에러페이지 보여주는걸로 해도됨)
        },
      },
    })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      {/* devtools는 개발 모드에서만 노출 */}
      <ReactQueryDevtools
        initialIsOpen={process.env.NEXT_PUBLIC_MODE === "local"}
      />
    </QueryClientProvider>
  );
};

export default RQProvider;
