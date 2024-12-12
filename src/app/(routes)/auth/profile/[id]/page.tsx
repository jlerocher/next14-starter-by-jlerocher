import UserDetails from "@/components/auth/UserDetails";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { auth } from "auth";

export default async function Profile({ params }: { params: { id: string } }) {
    const requestId = (await params).id;
    const session = await auth();

    if (!session || !session.user) {
        return (
            <Card>
                <CardHeader>
                    <h2>Error: Unauthorized</h2>
                </CardHeader>
                <CardDescription>
                    Please log in to view this profile.
                </CardDescription>
            </Card>
        );
    }

    return (
        <div className="min-h-screen p-4">
            <UserDetails id={requestId} />
        </div>
    );
}
