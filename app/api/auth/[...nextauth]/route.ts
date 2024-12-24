import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "email@example.com" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         try {
//           const response = await axios.post(`${process.env.BACKEND_URL}/api/login`, {
//             email: credentials?.email,
//             password: credentials?.password,
//           });

//           const user = response.data;
//           if (user) {
//             return user;
//           }
//           return null;
//         } catch (error) {
//           throw new Error("Invalid credentials");
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.accessToken = user.token;
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.accessToken = token.accessToken;
//       session.user.role = token.role;
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/login",
//   },
// });

// export { handler as GET, handler as POST };

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "contoh@email.com",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				try {
					const response = await axios.post(
						`${process.env.NEXTAUTH_URL}/api/...`,
						{
							email: credentials?.email,
							password: credentials?.password,
						}
					);

					const user = response.data;
					if (user) {
						return user;
					}
					return null;
				} catch (error) {
					throw new Error("Invalid credentials: " + error);
				}
			},
		}),
	],
	// callbacks: {
	// 	async jwt({ token, user }) {
	// 		if (user) {
	// 			token.accessToken = user.token;
	// 			token.role = user.role;
	// 		}
	// 		return token;
	// 	},
	// 	async session({ session, token }) {
	// 		session.accessToken = token.accessToken;
	// 		session.user.role = token.role;
	// 		return session;
	// 	},
	// },
	secret: process.env.NEXTAUTH_SECRET,
	pages: {
		signIn: "/login",
	},
});

export { handler as GET, handler as POST };
