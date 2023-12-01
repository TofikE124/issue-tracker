import Image from "next/image";
import Pagination from "./components/Pagination";
import LatestIssues from "./LatestIssues";

interface Props {
  searchParams: { page: string };
}

export default function Home({ searchParams: { page } }: Props) {
  return <LatestIssues />;
}
