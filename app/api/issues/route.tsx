import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "../../validationSchemas";

export async function GET(request: NextRequest) {
  const issues = await prisma?.issue.findMany();
  return NextResponse.json(issues);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      {
        error: validation.error.errors.map((er) => ({
          [er.path.toString()]: er.message,
        })),
      },
      { status: 400 }
    );

  const newIssue = await prisma?.issue.create({
    data: { title: body.title, description: body.description },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
