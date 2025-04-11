"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "../theme-provider";

// ==============================

type Props = {
    children: React.ReactNode
}

// ==============================
const queryClient = new QueryClient()

const MainWrapper = ({ children }: Props) => {

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
      </ThemeProvider>
  )
}

export default MainWrapper
