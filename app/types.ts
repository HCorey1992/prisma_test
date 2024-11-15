export type GuestbookEntry = {
  id: number;
  message: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  guestbookEntries: GuestbookEntry[];
};
