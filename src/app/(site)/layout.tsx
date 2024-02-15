import { Box } from "@mui/material"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
    </Box>
  )
}
