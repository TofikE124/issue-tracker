import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import ReactMarkDown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" mt="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="6">
        <ReactMarkDown>{issue.description}</ReactMarkDown>
      </Card>
    </>
  );
};

export default IssueDetails;
