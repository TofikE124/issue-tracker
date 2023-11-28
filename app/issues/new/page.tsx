"use client";
import React, { useState } from "react";
import { useForm, Controller, FieldValues } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { TextField, Button, Callout } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import { FaExclamationTriangle } from "react-icons/fa";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, handleSubmit, control } = useForm<IssueForm>();

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
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <FaExclamationTriangle />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className=" space-y-3">
        <TextField.Root>
          <TextField.Input {...register("title")} placeholder="Title" />
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE {...field} placeholder="Description" />
          )}
        />
        <Button>Submit new issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
