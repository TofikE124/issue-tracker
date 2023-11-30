import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Link href={`/issues/${issueId}/edit`}>
      <Button className="w-full hover:cursor-pointer">
        <Pencil2Icon />
        Edit issue
      </Button>
    </Link>
  );
};

export default EditIssueButton;
