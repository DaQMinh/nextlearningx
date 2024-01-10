import React from 'react'
import { Box } from '@mui/material'
import { getCourse } from './getCourse'
import TestCardCourse from '@/component/testCardCourse'
async function App() {
  const data = await getCourse()
  return (
    <Box>
      <TestCardCourse snippet={data}/>
    </Box>
  )
}

export default App