import Image from "next/image";
import Link from "next/link";


export default function Footer() {
    return (
        <footer className="w-full h-100 bg-[#1B1B1B] px-10 py-10 flex items-center justify-between">
            <Link href="/">
                <Image src="/logo.png" alt="logo" width={400} height={400} />
            </Link>
            <ul className="flex gap-14">
                <h2 className="text-2xl font-bold text-white">
                    About
                    <h2 className="font-medium">About Us</h2>
                    <h2 className="font-medium">Features</h2>
                    <h2 className="font-medium">News & Blogs</h2>
                </h2>
                <h2 className="text-2xl font-bold text-white">
                    Contact
                    <h2 className="font-medium">Instagram</h2>
                    <h2 className="font-medium">Twitter</h2>
                    <h2 className="font-medium">Facebook</h2>
                </h2>
                <h2 className="text-2xl font-bold text-white">
                    Support
                    <h2 className="font-medium">FAQs</h2>
                    <h2 className="font-medium">Support Center</h2>
                    <h2 className="font-medium">Feedback</h2>
                </h2>
            </ul>

        </footer>
    )
}