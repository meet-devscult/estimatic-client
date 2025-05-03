"use client"

import Link from "next/link"

export default function NotFound() {
    return (
        <div className="h-screen relative overflow-hidden">
            <h2 className="text-[500px] font-black absolute top-1/2 -translate-y-1/2 translate-x-[-50%] left-1/2 text-muted dark:opacity-60">404</h2>
            <div className="absolute top-1/2 -translate-y-1/2 translate-x-[-50%] left-1/2 space-y-4">
            <h1 className="text-6xl font-bold">Page not found</h1>
            <div className="flex flex-col items-center justify-center">
                <p className="text-sm text-muted-foreground">Sorry, we can't find the page you're looking for</p>
                <p className="text-sm">Click <Link href="/" className="underline">here</Link> to go back to the home page</p>
            </div>
            </div>
        </div>
    )
}