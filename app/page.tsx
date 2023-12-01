import Image from "next/image";
import Pagination from "./components/Pagination";

interface Props {
  searchParams: { page: string };
}

export default function Home({ searchParams: { page } }: Props) {
  return (
    <>
      <p>Hello World!</p>
      <Pagination itemCount={100} currentPage={Number(page)} pageSize={10} />
    </>
  );
}
