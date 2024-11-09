import { googleAuth } from "@/lib/server-actions/auth-actions";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";

type GoogleLoginButtonProps = {
    label?: string;
};
export default function GoogleLoginButton({
    label = "Sign in with Google",
}: GoogleLoginButtonProps) {
    return (
        <form action={googleAuth}>
            <Button
                type="submit"
                variant="outline"
                className="flex items-center gap-2 w-full group/google"
            >
                <FcGoogle className="size-6 group-hover/google:motion-preset-shake" />
                <span>{label}</span>
            </Button>
        </form>
    );
}
