import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "@/app/validationSchemas";

interface Props {
  params: { id: string };
}

export async function GET(request: NextRequest, { params: { id } }: Props) {
  const issue = await prisma.issue.findUnique({ where: { id: Number(id) } });
  return NextResponse.json({ issue }, { status: 200 });
}

export async function PATCH(request: NextRequest, { params: { id } }: Props) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  const issue = await prisma.issue.findUnique({ where: { id: Number(id) } });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
  const updatedIssue = await prisma.issue.update({
    where: { id: Number(id) },
    data: { title: body.title, description: body.description },
  });
  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  const issue = prisma.issue.findUnique({ where: { id: Number(id) } });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
  await prisma.issue.delete({ where: { id: Number(id) } });
  return NextResponse.json(
    {
      message: `Issue with id of ${id} was deleted sucessfully`,
    },
    { status: 200 }
  );
}
