import { Status } from "@prisma/client";
import { z } from "zod";

const statusArr = Object.values(Status);
const statuses: [string, ...string[]] = [
  statusArr[0],
  ...statusArr.slice(0, statusArr.length - 1),
];

export const issueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title can't have more than 255 charachters"),
  description: z.string().min(1, "Description is required").max(65535),
  status: z.enum(statuses),
});

export const patchIssueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title can't have more than 255 charachters")
    .optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(65535)
    .optional(),
  status: z.enum(statuses).optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required")
    .max(255)
    .nullable()
    .optional(),
});
