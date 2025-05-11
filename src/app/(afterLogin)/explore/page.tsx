import style from "./explore.module.css";
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";
import { getTrends } from "@/app/(afterLogin)/_lib/getTrends";
import TrendSection from "@/app/(afterLogin)/explore/_component/TrendSection";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Explore() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["trends"],
    queryFn: getTrends,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      <div className={style.formZone}>
        <SearchForm />
      </div>

      <HydrationBoundary state={dehydratedState}>
        <div className={style.trend}>
          <h3>나를 위한 트렌드</h3>
          <TrendSection />
        </div>
      </HydrationBoundary>
    </main>
  );
}
