"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const statuses: { label: string; value?: Status }[] = [
    { label: "All" },
    { label: "open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "closed", value: "CLOSED" },
  ];
  const changeFilter = (status: string) => {
    const params = new URLSearchParams(searchParams);
    status !== "All" ? params.set("status", status) : params.delete("status");
    router.push(`/issues/list?${params.toString()}`);
  };
  return (
    <Select.Root
      defaultValue={searchParams.get("status") || "All"}
      onValueChange={(status) => changeFilter(status)}
    >
      <Select.Trigger placeholder="Filter by status" />
      <Select.Content>
        {statuses.map((st) => (
          <Select.Item key={st.value || "All"} value={st.value || "All"}>
            {st.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
