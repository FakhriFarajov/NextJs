"use client"
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function Dashboard() {
    const handleLogout = async () => {
        await signOut({ redirect: true, callbackUrl: "/" });
    }
    return (
        <div>
            <h1>Dashboard</h1>
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    )
}