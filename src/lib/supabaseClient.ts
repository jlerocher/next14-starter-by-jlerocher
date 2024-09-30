"use server";

import { createClient } from "@supabase/supabase-js";

const options = {
    db: {
        schema: "public",
    },
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
    },
    global: {
        headers: { "client-info": "nextjs14-client" },
    },
};
export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    options,
);
