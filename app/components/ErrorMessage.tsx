import { Callout } from "@radix-ui/themes";
import React, { PropsWithChildren } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    <Callout.Root color="red" className="mb-5">
      <Callout.Icon>
        <FaExclamationTriangle />
      </Callout.Icon>
      <Callout.Text>{children}</Callout.Text>
    </Callout.Root>
  );
};

export default ErrorMessage;
