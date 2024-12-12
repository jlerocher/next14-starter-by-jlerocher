import { AppMetadata } from "AppMetadata";
import { Brain } from "lucide-react";
import Link from "next/link";

const SiteTitle = () => {
    return (
        <h1 className="text-base font-bold flex items-center gap-1 md:text-2xl md:gap-2">
            <Brain className="size-6 md:size-8" />
            <Link href="/">{AppMetadata.title}</Link>
        </h1>
    );
};

export default SiteTitle;
