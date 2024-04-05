import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
const inter = Inter({ subsets: ["latin"] })
import ReduxProvider from "@/redux/provider"
import NavigationBar from "@/components/navbar"
export const metadata: Metadata = {
  title: "NextAuth.js Example",
  description:
    "This is an example site to demonstrate how to use NextAuth.js for authentication",
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      
      <ReduxProvider>

      <body className={inter.className}>
      <NavigationBar>
        <div className="flex flex-col justify-between w-full h-full min-h-screen">
          <main className="flex-auto w-full">
            {children}
          </main>
        </div>
        </NavigationBar>
      </body>
      </ReduxProvider>

    </html>
  )
}
