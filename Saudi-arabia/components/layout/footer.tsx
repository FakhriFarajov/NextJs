import Image from "next/image";
import Link from "next/link";


export default function Footer() {
    return (
        <footer className="w-full h-100 bg-[#1B1B1B] px-10 py-10 flex items-center justify-between">
            <Link href="/">
                <Image src="/logo.png" alt="logo" width={400} height={400} />
            </Link>
            <ul className="flex gap-14">
                <div className="text-2xl font-bold text-white">
                    About
                    <h2 className="font-thin">About Us</h2>
                    <h2 className="font-thin">Features</h2>
                    <h2 className="font-thin">News & Blogs</h2>
                </div>
                <div className="text-2xl font-bold text-white">
                    Contact
                    <h2 className="font-thin">Instagram</h2>
                    <h2 className="font-thin">Twitter</h2>
                    <h2 className="font-thin">Facebook</h2>
                </div>
                <div className="text-2xl font-bold text-white">
                    Support
                    <h2 className="font-thin">FAQs</h2>
                    <h2 className="font-thin">Support Center</h2>
                    <h2 className="font-thin">Feedback</h2>
                </div>
            </ul>

        </footer>
    )
}