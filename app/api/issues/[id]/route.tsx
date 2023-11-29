import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

interface Props {
  params: { id: string };
}

export async function GET(request: NextRequest, { params: { id } }: Props) {
  const issue = await prisma.issue.findUnique({ where: { id: Number(id) } });
  return NextResponse.json({ issue }, { status: 200 });
}
