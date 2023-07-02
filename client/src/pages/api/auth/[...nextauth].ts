import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: "850821442064-tsvpo76mj7069furt8dc9f4k45mpma97.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
    // ******** !!!! ADD BELOW LINE !!!! **********
    // secret: "PLACE-HERE-ANY-STRING",
});

export { handler as GET, handler as POST };
export default handler;