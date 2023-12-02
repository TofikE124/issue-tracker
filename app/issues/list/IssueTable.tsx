import { ErrorMessage, IssueStatusBadge } from "@/app/components";
import { Avatar, Card, Flex, Table, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import TableHeaders from "./TableHeaders";
import { Issue, Status, User } from "@prisma/client";
import prisma from "@/prisma/client";

export interface issueQuery {
  status: Status;
  asignee: string;
  orderBy: keyof Issue;
  sortOrder: "asc" | "desc";
  page: string;
}

interface Props {
  searchParams: issueQuery;
  issues: ({ assignedToUser: User | null } & Issue)[];
}

const IssueTable = async ({ searchParams, issues }: Props) => {
  if (!issues.length) {
    let assignedUser = null;
    if (searchParams.asignee)
      assignedUser = await prisma.user.findUnique({
        where: { id: searchParams.asignee },
      });
    let NotFoundMessage =
      searchParams.status || searchParams.asignee
        ? `No ${searchParams.status || ""} issues were found ${
            searchParams.asignee
              ? `that are assigned to ${assignedUser?.name}`
              : ""
          }`
        : "No Issues Created Yet";
    return (
      <Card className="p-5">
        <Text size="3" weight="bold">
          {NotFoundMessage}
        </Text>
      </Card>
    );
  }

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
            <Table.Cell className="hidden md:table-cell">
              {issue.assignedToUser ? (
                <Card className="w-fit">
                  <Flex gap="2" align="center">
                    <Avatar
                      radius="full"
                      src={
                        issue.assignedToUser?.image ||
                        "https://i.stack.imgur.com/34AD2.jpg"
                      }
                      fallback="?"
                    />
                    <Text>{issue.assignedToUser.name}</Text>
                  </Flex>
                </Card>
              ) : (
                <Text align="center">None</Text>
              )}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default IssueTable;
