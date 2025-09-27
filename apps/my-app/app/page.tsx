"use client"
import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Home } from "./componnets/Home";
import Image from "next/image";

import { Landing } from "./componnets/Landing"

export default function App() {
  return (
    <SessionProvider>
      <RealPage/>
    </SessionProvider>
  );
}

function RealPage(){
  const session = useSession()
  
  if (session.status === "authenticated"){
    console.log(session);
    return(
      <Home/>
    )
  }
  return (
    <Landing/>
  )
}
