"use client";
import { Button, Select, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";

import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue, Status } from "@prisma/client";
import { z } from "zod";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  async function onSubmit(data: FieldValues) {
    console.log(data);
    await setSubmitting(true);
    try {
      if (issue) await axios.patch(`/api/issues/${issue.id}`, data);
      else await axios.post(`/api/issues`, data);
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occured");
    }
  }

  return (
    <div className="max-w-xl">
      <ErrorMessage>{error}</ErrorMessage>
      <form onSubmit={handleSubmit(onSubmit)} className=" space-y-3">
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            {...register("title")}
            placeholder="Title"
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="status"
          control={control}
          defaultValue={issue?.status}
          render={({ field }) => (
            <Select.Root
              onValueChange={(value) => field.onChange(value)}
              value={field.value}
            >
              <Select.Trigger placeholder="Status..." />
              <Select.Content>
                {Object.values(Status).map((status) => (
                  <Select.Item key={status} value={status}>
                    {status}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          )}
        />
        <ErrorMessage>{errors.status?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE {...field} placeholder="Description" />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          {issue ? "Update Issue" : "Submit new issue"}{" "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
