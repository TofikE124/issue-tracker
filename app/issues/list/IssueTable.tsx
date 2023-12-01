import { IssueStatusBadge } from "@/app/components";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import TableHeaders from "./TableHeaders";
import { Issue, Status } from "@prisma/client";

export interface issueQuery {
  status: Status;
  orderBy: keyof Issue;
  sortOrder: "asc" | "desc";
  page: string;
}

interface Props {
  searchParams: issueQuery;
  issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <TableHeaders searchParams={searchParams} />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues?.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default IssueTable;
