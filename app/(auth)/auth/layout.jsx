import Provider from "@components/Provider";
import "@styles/globals.css";

export const metadata = {
  title: "Auth | Promptopia",
  description: "Discover & Share AI Prompts",
};

export default function SigninLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/images/logo.svg" sizes="any" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.0.17/dist/css/splide.min.css"
        ></link>
        <link
          rel="stylesheet"
          href="https://site-assets.fontawesome.com/releases/v6.4.0/css/all.css"
        ></link>
      </head>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
