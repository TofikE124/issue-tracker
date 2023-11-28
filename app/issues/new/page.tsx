"use client";
import React, { useState } from "react";
import { useForm, Controller, FieldValues } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { TextField, Button, Callout, Text } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import { FaExclamationTriangle } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const [error, setError] = useState("");

  async function onSubmit(data: FieldValues) {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setError("An unexpected error occured");
    }
  }

  const RedCallout = ({ message }: { message?: string }) => {
    return (
      <Callout.Root color="red" className="mb-5">
        <Callout.Icon>
          <FaExclamationTriangle />
        </Callout.Icon>
        <Callout.Text>{message}</Callout.Text>
      </Callout.Root>
    );
  };

  return (
    <div className="max-w-xl">
      {error && <RedCallout message={error} />}
      <form onSubmit={handleSubmit(onSubmit)} className=" space-y-3">
        <TextField.Root>
          <TextField.Input {...register("title")} placeholder="Title" />
        </TextField.Root>
        {errors.title && <RedCallout message={errors.title.message} />}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE {...field} placeholder="Description" />
          )}
        />
        {errors.description && (
          <RedCallout message={errors.description.message} />
        )}
        <Button>Submit new issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
