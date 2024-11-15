import React, { useState } from "react";
import { User } from "../types";

type UserListProps = {
  users: User[];
};

const UserList: React.FC<UserListProps> = ({ users }) => {
  const [userList, setUserList] = useState<User[]>(users);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newEntryMessage, setNewEntryMessage] = useState("");

  const fetchUsers = async () => {
    const response = await fetch("/api/users");
    const users = await response.json();
    setUserList(users);
  };

  const handleAddUser = async () => {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "create", name: newUserName, email: newUserEmail }),
    });
    if (response.ok) fetchUsers();
    setNewUserName("");
    setNewUserEmail("");
  };

  const handleEditUser = async (userId: number) => {
    const name = prompt("New Name") || "";
    const email = prompt("New Email") || "";
    if (!name || !email) return;

    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "edit", userId, name, email }),
    });
    fetchUsers();
  };

  const handleDeleteUser = async (userId: number) => {
    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete", userId }),
    });
    fetchUsers();
  };

  const handleAddGuestbookEntry = async (userId: number) => {
    await fetch("/api/guestbook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "create", userId, message: newEntryMessage }),
    });
    setNewEntryMessage("");
    fetchUsers();
  };

  const handleEditGuestbookEntry = async (userId: number, entryId: number) => {
    const message = prompt("New Message") || "";
    if (!message) return;

    await fetch("/api/guestbook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "edit", entryId, message }),
    });
    fetchUsers();
  };

  const handleDeleteGuestbookEntry = async (userId: number, entryId: number) => {
    await fetch("/api/guestbook", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete", entryId }),
    });
    fetchUsers();
  };

  return (
    <div className="main-container">
      <h2>Users</h2>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Name"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUserEmail}
          onChange={(e) => setNewUserEmail(e.target.value)}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>

      {userList.map((user) => (
        <div key={user.id} className="user-card">
          <div className="user-name">{user.name}</div>
          <div className="user-email">{user.email}</div>
          <button onClick={() => handleEditUser(user.id)}>Edit</button>
          <button onClick={() => handleDeleteUser(user.id)}>Delete</button>

          <h4>Guestbook Entries</h4>
          {user.guestbookEntries.map((entry) => (
            <div key={entry.id} className="guestbook-entry">
              <p>{entry.message}</p>
              <button onClick={() => handleEditGuestbookEntry(user.id, entry.id)}>Edit Entry</button>
              <button onClick={() => handleDeleteGuestbookEntry(user.id, entry.id)}>Delete Entry</button>
            </div>
          ))}

          <div style={{ marginTop: "10px" }}>
            <input
              type="text"
              placeholder="New guestbook entry"
              value={newEntryMessage}
              onChange={(e) => setNewEntryMessage(e.target.value)}
            />
            <button onClick={() => handleAddGuestbookEntry(user.id)}>Add Entry</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
