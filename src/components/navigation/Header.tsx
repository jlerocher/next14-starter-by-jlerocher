import Link from "next/link";
import { ModeToggle } from "../ui/mode-toggle";

const Header = () => {
    return (
        <header className="flex items-center justify-between py-4 px-4 border-b border-border">
            <h1 className="text-2xl font-bold">
                <Link href="/">{process.env.NEXT_PUBLIC_APP_TITLE}</Link>
            </h1>
            <ModeToggle />
        </header>
    );
};

export default Header;
