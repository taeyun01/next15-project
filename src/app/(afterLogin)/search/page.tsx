import style from "./search.module.css";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";
import Tab from "@/app/(afterLogin)/search/_component/Tab";
import SearchResult from "@/app/(afterLogin)/search/_component/SearchResult";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getSearchResult } from "@/app/(afterLogin)/search/_lib/getSearchResult";

type Props = {
  searchParams: Promise<{ q: string; f?: string; pf?: string }>;
};
export default async function Search({ searchParams }: Props) {
  const query = await searchParams; // next15부터 비동기로 바뀜
  const queryClient = new QueryClient();

  // TODO: 추후 수정 ["posts", "followings"]은 프리팽칭 x
  await queryClient.prefetchQuery({
    queryKey: ["posts", "search", query],
    queryFn: getSearchResult,
  });

  const dehydratedState = dehydrate(queryClient);

  console.log("searchParams: ", query.q);

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <div className={style.searchTop}>
          <div className={style.searchZone}>
            <div className={style.buttonZone}>
              <BackButton />
            </div>
            <div className={style.formZone}>
              <SearchForm q={query.q} f={query.f} pf={query.pf} />
            </div>
          </div>
          <Tab />
        </div>
        <div className={style.list}>
          <SearchResult searchParams={query} />
        </div>
      </HydrationBoundary>
    </main>
  );
}
