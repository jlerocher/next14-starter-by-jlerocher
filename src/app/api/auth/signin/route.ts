import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { email, password } = await request.json();
    console.log(email, password);

    /*  const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }*/
    return NextResponse.json({ message: "ok" }, { status: 200 });
}
