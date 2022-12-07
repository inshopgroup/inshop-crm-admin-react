import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth"
import axios from "axios";

export default NextAuth({
    pages: {
        signIn: "/signin",
        error: "/signin",
    },
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            // name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            // credentials: {
            //     username: { label: "Username", type: "text", placeholder: "jsmith" },
            //     password: { label: "Password", type: "password" }
            // },
            async authorize(credentials, req) {
                const user = await axios.post('http://localhost:8888/login', {
                // const user = await axios.post('https://api.demo.inshopcrm.com/login', {
                    username: credentials.email,
                    password: credentials.password,
                })
                    .then(response => response.data)
                    // .catch(e => {
                    //     console.log('response', e.message)
                    // })


                // Add logic here to look up the user from the credentials supplied
                // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ],
    callbacks: {
        async jwt(data) {
            // async jwt({ token, account }) {
            // console.log('async jwt(data) {', data)
            // Persist the OAuth access_token to the token right after signin

            if (data.account) {
                data.token.token = data.user.token
                data.token.refresh_token = data.user.refresh_token
                data.token.roles = data.user.roles
                data.token.roles = data.user.roles
                data.token.language = data.user.language
            }

            return data.token
        },
        async session({session, token, user}) {
            // Send properties to the client, like an access_token from a provider.
            session.token = token.token
            session.refresh_token = token.refresh_token
            session.roles = token.roles
            session.language = token.language

            return session
        }
    }
    // secret: process.env.NEXTAUTH_SECRET,
})
