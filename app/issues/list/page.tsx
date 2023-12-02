import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Issue, Status, User } from "@prisma/client";
import IssueActions from "./IssueActions";
import IssueTable, { issueQuery } from "./IssueTable";
import { Card, Flex } from "@radix-ui/themes";
import { columnNames } from "./TableHeaders";
import { Metadata } from "next";
import { Text } from "@radix-ui/themes";
import { ErrorMessage } from "@/app/components";

interface Props {
  searchParams: issueQuery;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status, assignedToUserId: searchParams.asignee };
  const sortOrder = ["asc", "desc"].includes(searchParams.sortOrder)
    ? searchParams.sortOrder
    : "asc";
  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: sortOrder }
    : undefined;

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues: ({ assignedToUser: User | null } & Issue)[] =
    await prisma?.issue.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: { assignedToUser: true },
    });

  const issueCount = await prisma.issue.count({ where });


  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable issues={issues} searchParams={searchParams} />
      <Pagination
        pageSize={pageSize}
        currentPage={page}
        itemCount={issueCount}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default IssuesPage;

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};
