import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    signIn: async ({ profile }) => {
      if (!profile) {
        return false;
      }
      return (
        process.env.ADMIN_EMAILS!.split(",").includes(profile.email!) || "/"
      );
    },
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
});
