import Image from "next/image";
import Pagination from "./components/Pagination";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import IssueChart from "./IssueChart";

interface Props {
  searchParams: { page: string };
}

export default async function Home({ searchParams: { page } }: Props) {
  const open = (await prisma?.issue.count({ where: { status: "OPEN" } })) || 0;
  const inProgress =
    (await prisma?.issue.count({ where: { status: "IN_PROGRESS" } })) || 0;
  const closed =
    (await prisma?.issue.count({ where: { status: "CLOSED" } })) || 0;

  return (
    <>
      <IssueSummary open={open} inProgress={inProgress} closed={closed} />
      <IssueChart open={open} inProgress={inProgress} closed={closed} />
    </>
  );
}
