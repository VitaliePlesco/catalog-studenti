"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [students, setStudents] = useState([]);
  const getStudents = () => {
    fetch("http://localhost:5000/api/students")
      .then((response) => response.json())
      .then((data) => setStudents(data));
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <main className="container mx-auto">
      <h1>Users</h1>
      {/* {students.map((student) => (
        <div key={student.id}>
          <h3>{student.firstName}</h3>
          <h3>{student.lastName}</h3>
        </div>
      ))} */}
    </main>
  );
}
