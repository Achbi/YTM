"use server";

import "~/styles/globals.css";

import { getServerSession } from "next-auth";
import Link from "next/link";
import Signout from "~/components/signout";
import { Button } from "~/components/ui/button";
import { authOptions } from "~/server/auth";
import { db } from "~/server/db";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const serverSession = await getServerSession(authOptions);
  const user = await db.user.findUnique({
    where: {
      id: serverSession?.user.id,
    },
    select: {
      credits: true,
    },
  });

  return (
    <div className="flex h-screen w-full flex-col items-center overflow-y-scroll px-6 py-6">
      <nav className="flex w-full items-center justify-end pb-6">
        <div className="flex items-center gap-4">
          <p>{user?.credits} credits left</p>
          <Link href="/dashboard/pricing">
            <Button>Buy more</Button>
          </Link>
          <Signout />
        </div>
      </nav>
      {children}
    </div>
  );
}
