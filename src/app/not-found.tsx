import Link from "next/link";

const notFound = () => {
    return (
        <section className="flex flex-col items-center justify-center w-full mt-64 gap-10">
            <h1 className="text-4xl font-bold text-red-500">404: Not Found</h1>
            <p className="">
                Page not found. Return to{" "}
                <Link href="/" className="underline underline-offset-4">
                    the homepage
                </Link>
            </p>
        </section>
    );
};

export default notFound;
