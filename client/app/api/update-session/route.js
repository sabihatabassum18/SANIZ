import { getSession, updateSessionData } from "next-auth/react";
import { NextResponse } from "next/server";


export async function POST(req) {
    try {
        const session = await getSession(req);
        console.log(session);

        if (!session) {
            return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
        }

        const body = await req.json();

        // Example: Update session data (adjust as needed)
        const updatedUser = {
            ...session.user,
            creditToken: body.creditToken,
            subscriptionType: body.subscriptionType,
        };

        // Save the updated session data (implement your persistence logic here)
        // E.g., update it in your database or modify the session token.
        // For now, we'll just mock the response.
        const updatedSession = {
            ...session,
            user: updatedUser,
        };
        await updateSessionData({ req, session, update: updatedSession });

        return NextResponse.json({ session: updatedSession }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to update session", error: error.message },
            { status: 500 }
        );
    }
}
