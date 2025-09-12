import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export function Home(){
    const session = useSession()
    if (session.status==="unauthenticated"){
        redirect("/")
    }
    return (
        <>
            <div>Home</div>
            <button onClick={()=> signOut()}>SignOut</button>
        </>
    );
}