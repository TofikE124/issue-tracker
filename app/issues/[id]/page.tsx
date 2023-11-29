import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkDown from "react-markdown";
interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({ where: { id: Number(id) } });
  if (!issue) notFound();
  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" mt="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="6">
        <ReactMarkDown>{issue.description}</ReactMarkDown>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
