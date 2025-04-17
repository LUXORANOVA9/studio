'use client'

import { useEffect, useState } from 'react'
 
export default function Home() {
  const [message, setMessage] = useState("Hi there");
  return <h1>{message}</h1>
}
