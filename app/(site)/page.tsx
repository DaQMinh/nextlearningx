"use client"
import React from "react";
import { Flashcard, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData() {
  try {
    const response = await fetch('api/article');

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; // Trả về một mảng trống nếu có lỗi
  }
}

export default function DemoPage() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      const newData = await getData();
      setData(newData);
    }

    fetchData();
  }, []); // Chỉ gọi fetchData một lần khi component được mount

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} isFetchingData={false} />
    </div>
  );
}
