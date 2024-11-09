import { ModeToggle } from "@/components/ui/ModeToggle";
import Link from "next/link";

const Header = () => {
    // TODO: Add conditionally rendered user avatar
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
