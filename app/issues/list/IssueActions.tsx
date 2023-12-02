import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";
import IssueAsigneeFilter from "./IssueAsigneeFilter";
import prisma from "@/prisma/client";

const IssueActions = async () => {
  const users = await prisma.user.findMany();

  return (
    <Flex justify="between">
      <Flex gap="4">
        <IssueStatusFilter />
        <IssueAsigneeFilter users={users} />
      </Flex>
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
