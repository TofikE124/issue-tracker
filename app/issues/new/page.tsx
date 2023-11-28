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
import ErrorMessage from "@/app/components/ErrorMessage";

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

  return (
    <div className="max-w-xl">
      <ErrorMessage>{error}</ErrorMessage>
      <form onSubmit={handleSubmit(onSubmit)} className=" space-y-3">
        <TextField.Root>
          <TextField.Input {...register("title")} placeholder="Title" />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE {...field} placeholder="Description" />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button>Submit new issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
