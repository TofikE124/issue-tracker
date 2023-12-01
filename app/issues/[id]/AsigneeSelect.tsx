"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/app/components";
const AsigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
  });

  if (isLoading) return <Skeleton />;

  return (
    <Select.Root
      onValueChange={(userId) => {
        axios.patch(`/api/issues/${issue.id}`, {
          assignedToUserId: userId === "Null" ? null : userId,
        });
      }}
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
  );
};

export default AsigneeSelect;
