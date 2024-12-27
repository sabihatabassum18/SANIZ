import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    // Replace with your Node.js authentication API URL
                    const response = await axios.post("http://localhost:8000/api/users/login", {
                        email: credentials.email,
                        password: credentials.password,
                    });

                    const { data } = response.data;
                    const { name, token, creditToken, subscriptionType, _id } = data;
                    console.log(data);

                    if (name && token) {
                        return { name, token, creditToken, subscriptionType, _id }; // Return authenticated user object
                    }

                    return null; // Return null if authentication fails
                } catch (error) {
                    throw new Error(error.response?.data?.message || "Authentication failed");
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // Add user token to the JWT token
            if (user) {
                token.accessToken = user.token;
                token.name = user.name;
                token.creditToken = user.creditToken;
                token.subscriptionType = user.subscriptionType;
                token.id = user._id;
            }
            return token;
        },
        async session({ session, token }) {
            // Include token and user data in the session object
            session.user = {
                name: token.name,
                creditToken: token.creditToken,
                accessToken: token.accessToken,
                subscriptionType: token.subscriptionType,
                id: token.id,
            };
            console.log(session);
            return session;
        },
    },
    secret: 'secret', // Use environment variable for the secret
    pages: {
        signIn: "/login", // Custom login page
        signOut: "/login", // Custom signout page
    },
});

export { handler as GET, handler as POST };
