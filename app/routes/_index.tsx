import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import UserList from "../components/UserList";
import "../styles/global.css";
import { User } from "../types";

export const loader: LoaderFunction = async () => {
  const response = await fetch("/api/users/sorted-by-guestbook-entries");
  const users = await response.json();
  return users;
};

export default function Index() {
  const users: User[] = useLoaderData();

  return (
    <div>
      <h1>User Directory Sorted by Guestbook Entries</h1>
      <UserList users={users} />
    </div>
  );
}
