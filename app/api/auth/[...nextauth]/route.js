import { connectToDB } from "@utils/database";
import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@models/user";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            id: "login",
            name: "PromptGuru",
            async authorize(credentials, req) {
                const user = await User.findOne({
                    email: credentials.email
                })

                if (user) {
                    if (user.password) {
                        if (user.password === credentials.password) {
                            return user
                        }
                        else {
                            throw new Error("Wrong Password");
                        }
                    }
                    else {
                        throw new Error("You are not registered with password");
                    }
                }
                else {
                    throw new Error("You are not registered");
                }
            },
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email ID" },
                password: { label: "Password", type: "password" },
            },

        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            secret: process.env.NEXTAUTH_SECRET,
        })
    ],
    pages: {
        error: '/api/auth/signin', // Error code passed in query string as ?error=
        newUser: '/login' // If set, new users will be directed here on first sign in
    },
    callbacks: {
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        async session({ session, token }) {
            console.log("session hitting");
            const sessionUser = await User.findOne({

                email: session.user.email
            })
            session.accessToken = token.accessToken
            session.user.id = sessionUser._id.toString();

            return session;
        },
        async signIn({ account, profile, user }) {
            if (account.provider === "google") {
                try {
                    await connectToDB();

                    // User exists
                    const UserExists = await User.findOne({ email: profile.email });



                    // create New User
                    if (!UserExists) {
                        await User.create({
                            email: profile.email,
                            username: profile.name.replace(" ", "").toLowerCase(),
                            image: profile.picture
                        })
                    }



                    return true;

                } catch (error) {
                    return false;
                }
            }
            else {
                return true;
            }

        }

    },


})


export { handler as GET, handler as POST }