import prisma from "@/lib/prisma/prisma";
import { CalendarDays, MailIcon, PenBoxIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle } from "../ui/card";

interface UserDetailsProps {
    id: string;
}

export default async function UserDetails({ id }: UserDetailsProps) {
    const userInfos = await prisma.user.findUnique({
        where: {
            id: id,
        },
    });
    return (
        <Card className="space-y-4 max-w-xl mx-auto">
            <CardHeader>
                <CardTitle className="flex items-start gap-3">
                    <div className="relative">
                        <Image
                            src={userInfos?.image || ""}
                            alt={userInfos?.name || ""}
                            width={100}
                            height={100}
                            className="rounded-full shadow-md size-20 md:size-40"
                        />
                        <Button
                            variant="outline"
                            className=" absolute bottom-0 right-0 md:bottom-5 md:right-3 p-0 size-6 rounded-full"
                        >
                            <PenBoxIcon className="size-6 md:size-10" />
                        </Button>
                    </div>
                    <div className="flex flex-col">
                        <span className="md:text-2xl font-bold">
                            {userInfos?.name
                                ?.split(" ")
                                .map(
                                    (word) =>
                                        word[0].toUpperCase() + word.slice(1),
                                )
                                .join(" ")}
                        </span>
                        <span className="text-sm text-muted-foreground flex items-center mt-1">
                            <MailIcon className="size-4 mr-2" />
                            {userInfos?.email}
                        </span>
                        <span className="text-sm text-muted-foreground flex items-center mt-1">
                            <CalendarDays className="size-4 mr-2" />
                            {userInfos?.createdAt.toLocaleDateString()}
                        </span>
                    </div>
                </CardTitle>
            </CardHeader>
        </Card>
    );
}
