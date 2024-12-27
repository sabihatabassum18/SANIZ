import { withAuth } from "next-auth/middleware";
import { getSession } from "next-auth/react";


export default withAuth({
    pages: {
        signIn: "/login",
        signOut: "/login",
    },
    async onBeforeRequest(req, res) {
        // Refetch the session data on each request
        const session = await getSession({ req });

        // If the session is valid, update or pass the session data in the response
        if (session) {
            req.session = session;
        }

        // You can also check if the session has expired or needs a refresh and perform custom actions here
        if (!session) {
            res.redirect("/login"); // If no session exists, redirect to login
        }
    },
});

export const config = {
    matcher: ["/dashboard", "/pricing"], // Protect all routes under /dashboard
};
