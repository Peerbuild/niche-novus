"use server";

import { ActionResponse } from "@/lib/ActionResponse";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { sendEmail } from "./sendEmail";

export const fetchContacts = async (page?: number) => {
  const skip = page ? (page - 1) * 10 : 0;
  const take = page ? 10 : undefined;
  const contacts = await prisma.contact.findMany({
    take,
    skip,
    orderBy: {
      createdAt: "desc",
    },
  });

  return contacts;
};

export const saveContact = async (contact: {
  email: string;
  name: string;
  message: string;
}) => {
  try {
    const ip =
      headers().get("x-forwarded-for") ??
      headers().get("x-real-ip") ??
      "0.0.0.0";

    const hasAlreadySubmitted = await prisma.contact.findUnique({
      where: {
        ip,
        updatedAt: {
          gte: new Date(new Date().getTime() - 1000 * 60 * 60 * 24),
        },
      },
    });

    if (hasAlreadySubmitted) {
      console.error("Contact form already submitted from this IP");
      return new ActionResponse(
        "error",
        "You have already submitted a message lately. Please try again later"
      ).json();
    }

    await prisma.contact.upsert({
      where: {
        ip,
      },
      update: {
        updatedAt: new Date(),
      },
      create: {
        ip,
        email: contact.email,
        name: contact.name,
      },
    });

    await sendEmail(contact);

    return new ActionResponse("success").json();
  } catch (error) {
    console.error(error);
    return new ActionResponse("error").json();
  }
};
