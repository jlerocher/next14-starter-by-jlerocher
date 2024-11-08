import { OneTapAction } from "@/actions/onetap";
import { SignInOptions, useSession } from "next-auth/react";
import { useState } from "react";

interface OneTapProps {
    googleClientID: string;
}

const useOneTap = (
    options?: OneTapProps & Pick<SignInOptions, "redirect" | "callbackUrl">,
) => {
    const [isLoading, setIsLoading] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            if (!isLoading) {
                const { google } = window;
                if (google) {
                    google.accounts.id.initialize({
                        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                        client_id: options?.googleClientID!,
                        itp_support: true,
                        use_fedcm_for_prompt: true,
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        callback: async (response: any) => {
                            setIsLoading(true);
                            // Here we call our Provider with the token provided by google
                            await OneTapAction({
                                ...options,
                                credential: response.credential,
                            });
                            setIsLoading(false);
                            window.location.reload();
                        },
                    });

                    // Handle Google One Tap
                    google.accounts.id.prompt();
                }
            }
        },
    });

    return { isLoading };
};

export default useOneTap;
