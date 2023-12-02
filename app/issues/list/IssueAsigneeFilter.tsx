"use client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import { User } from "@prisma/client";

interface Props {
  users: User[];
}

const IssueAsigneeFilter = ({ users }: Props) => {
  const searchParams = useSearchParams();
  const asignee = searchParams.get("asignee");
  const router = useRouter();

  const changeFilter = (asignee: string) => {
    const params = new URLSearchParams(searchParams);
    if (asignee === "Null") params.delete("asignee");
    else params.set("asignee", asignee);
    router.push(`/issues/list?${params.toString()}`);
  };

  return (
    <Select.Root
      defaultValue={asignee || "Null"}
      onValueChange={(asignee) => changeFilter(asignee)}
    >
      <Select.Trigger placeholder="Filter by status" />
      <Select.Content>
        <Select.Item value="Null">None</Select.Item>
        {users?.map((user) => (
          <Select.Item key={user.id} value={user.id}>
            {user.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueAsigneeFilter;
