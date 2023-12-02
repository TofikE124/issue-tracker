import Image from "next/image";
import Pagination from "./components/Pagination";
import LatestIssues from "./LatestIssues";
import IssueSummary from "./IssueSummary";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: { page: string };
}

export default async function Home({ searchParams: { page } }: Props) {
  const open = (await prisma?.issue.count({ where: { status: "OPEN" } })) || 0;
  const inProgress =
    (await prisma?.issue.count({ where: { status: "IN_PROGRESS" } })) || 0;
  const closed =
    (await prisma?.issue.count({ where: { status: "CLOSED" } })) || 0;
  const statusesNumber = {
    open: open,
    inProgress: inProgress,
    closed: closed,
  };

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary {...statusesNumber} />
        <IssueChart {...statusesNumber} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of prject issues",
};
