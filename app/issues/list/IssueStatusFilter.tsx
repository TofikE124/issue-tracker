"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter by status" />
      <Select.Content>
        {statuses.map((st) => (
          <Select.Item key={st.value} value={st.value || "All"}>
            {st.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
