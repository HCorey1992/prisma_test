import { json, LoaderFunction } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const loader = async () => {
  const users = await prisma.user.findMany({
    include: { guestbookEntries: true },
  });
  return json(users);
};

export const sortedByGuestbookEntries = async () => {
  const users = await prisma.user.findMany({
    include: { guestbookEntries: true },
    orderBy: {
      guestbookEntries: {
        _count: "desc", // Sort users by the count of guestbook entries in descending order
      },
    },
  });
  return json(users);
};

export const sortedByGuestbookEntriesRoute: LoaderFunction = async () => {
  return await sortedByGuestbookEntries(); 
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.json();
  const { action, userId, name, email } = formData;

  if (action === "create") {
    const newUser = await prisma.user.create({
      data: { name, email },
    });
    return json(newUser, { status: 201 });
  }

  if (action === "edit") {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, email },
    });
    return json(updatedUser);
  }

  if (action === "delete") {
    await prisma.user.delete({ where: { id: userId } });
    return json({ message: "User deleted" });
  }

  return json({ error: "Invalid action" }, { status: 400 });
};
