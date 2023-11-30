import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "@/app/validationSchemas";
import delay from "delay";
import authOptions from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";

interface Props {
  params: { id: string };
}

export async function GET(request: NextRequest, { params: { id } }: Props) {
  const issue = await prisma.issue.findUnique({ where: { id: Number(id) } });
  return NextResponse.json({ issue }, { status: 200 });
}

export async function PATCH(request: NextRequest, { params: { id } }: Props) {
  const session = getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

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
  const session = getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  const issue = prisma.issue.findUnique({ where: { id: Number(id) } });
  await delay(2000);
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
