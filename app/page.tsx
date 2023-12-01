import Image from "next/image";
import Pagination from "./components/Pagination";

export default function Home() {
  return (
    <>
      <p>Hello World!</p>
      <Pagination itemCount={100} currentPage={1} pageSize={10} />
    </>
  );
}
