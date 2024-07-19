"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const getUsers = () => {
    fetch("http://localhost:5000")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <main>
      <h1>Users</h1>
      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <h5>{user.email}</h5>
        </div>
      ))}
    </main>
  );
}
