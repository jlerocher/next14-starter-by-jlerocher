import Link from "next/link";
import { ModeToggle } from "../ui/mode-toggle";

const Header = () => {
    return (
        <header className="flex items-center justify-between py-4 px-4">
            <h1>
                <Link href="/">Next.js 14 Starter</Link>
            </h1>
            <ModeToggle />
        </header>
    );
};

export default Header;
