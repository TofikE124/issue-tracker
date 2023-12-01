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
    const urlSearchParams = new URLSearchParams(searchParams);
    status !== "All"
      ? urlSearchParams.set("status", status)
      : urlSearchParams.delete("status");
    router.push(`/issues/list?${urlSearchParams.toString()}`);
  };
  return (
    <Select.Root onValueChange={(status) => changeFilter(status)}>
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
