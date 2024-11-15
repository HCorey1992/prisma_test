import { json } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.json();
  const { action, entryId, userId, message } = formData;

  if (action === "create") {
    const newEntry = await prisma.guestbookEntry.create({
      data: { message, userId },
    });
    return json(newEntry, { status: 201 });
  }

  if (action === "edit") {
    const updatedEntry = await prisma.guestbookEntry.update({
      where: { id: entryId },
      data: { message },
    });
    return json(updatedEntry);
  }

  if (action === "delete") {
    await prisma.guestbookEntry.delete({ where: { id: entryId } });
    return json({ message: "Entry deleted" });
  }

  return json({ error: "Invalid action" }, { status: 400 });
};
