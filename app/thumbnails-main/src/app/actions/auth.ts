"use server";

import { signInSchema } from "~/schemas/auth";
import { db } from "~/server/db";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export const signup = async (email: string, password: string) => {
  // Validation
  console.log("SECRET:", process.env.NEXTAUTH_SECRET);

  const isValid = signInSchema.safeParse({ email, password });

  if (isValid.error) {
    return "Error";
  }

  // See if user exists
  const user = await db.user.findUnique({
    where: {
      email: isValid.data.email,
    },
  });

  if (user) {
    return "User already exists";
  }

  // Encrypt password
  const hash = await bcrypt.hash(isValid.data.password, 10);

  // Create the user (without Stripe)
  await db.user.create({
    data: {
      email: isValid.data.email,
      password: hash,
      // stripeCustomerId: null (optional, if your schema requires it)
    },
  });

  redirect("/signin");
};
