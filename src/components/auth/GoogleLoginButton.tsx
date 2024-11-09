import { FcGoogle } from "react-icons/fc";
import { googleAuth } from "../../lib/server-actions/auth-actions";
import { Button } from "../ui/button";

export default function GoogleLoginButton() {
    return (
        <form action={googleAuth}>
            <Button
                type="submit"
                variant="outline"
                className="flex items-center gap-2 w-full group/google"
            >
                <FcGoogle className="size-6 group-hover/google:motion-preset-shake" />
                <span>Log in with Google</span>
            </Button>
        </form>
    );
}
