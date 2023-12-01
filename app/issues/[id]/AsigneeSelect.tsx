"use client";
import { Skeleton } from "@/app/components";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AsigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton />;

  const assignIssue = async (userId: string) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId === "Null" ? null : userId,
      });
    } catch (error) {
      toast.error("Changed could not be saved");
    }
  };

  return (
    <>
      <Select.Root
        onValueChange={assignIssue}
        defaultValue={issue.assignedToUserId || "Null"}
      >
        <Select.Trigger placeholder="Assign..." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="Null">Unassigned</Select.Item>
            {users?.map((u, i) => (
              <Select.Item key={u.id} value={u.id}>
                {u.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000 //60s,
  });

export default AsigneeSelect;
