"use client";
import { Card, Flex } from "@radix-ui/themes";
import { signOut } from "next-auth/react";

const signout = () => {
  return (
    <div className="fixed inset-0 z-10 bg-slate-50">
      <Flex height="100%" justify="center" align="center">
        <Card>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            color="blue"
            className="p-6 cursor-pointer text-5xl bg-teal-600 text-white rounded-md"
          >
            Signout
          </button>
        </Card>
      </Flex>
    </div>
  );
};

export default signout;
