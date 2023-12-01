"use client";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import { columns } from "./page";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    sortOrder: "asc" | "desc";
  };
}

const TableHeaders = ({ searchParams }: Props) => {
  const getSortOrder = (value: string) => {
    let sortOrder = searchParams.sortOrder;
    sortOrder =
      searchParams.orderBy === value
        ? sortOrder === "asc"
          ? "desc"
          : "asc"
        : "asc";
    return sortOrder;
  };

  return columns.map((c) => (
    <Table.ColumnHeaderCell key={c.value} className={c.className}>
      <Link
        href={{
          query: {
            ...searchParams,
            sortOrder: getSortOrder(c.value),
            orderBy: c.value,
          },
        }}
      >
        {c.label}
      </Link>
      {c.value === searchParams.orderBy && (
        <ArrowUpIcon
          className={`inline-block ml-3 ${
            searchParams.sortOrder === "desc" && "rotate-180"
          }`}
        />
      )}
    </Table.ColumnHeaderCell>
  ));
};

export default TableHeaders;
