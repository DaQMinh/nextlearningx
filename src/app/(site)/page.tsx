import { Box , Typography } from "@mui/material";
import { getVideoData } from "./getdata";
import TestCardCourse from "@/component/testCardCourse";
import React, { lazy } from 'react';

export default async function App(){
  const data = await getVideoData();
  return (
    <Box>
      {data.map((item) => 
      <Box key={item.id}>
        <Typography variant="h5" gutterBottom  fontWeight="bold">
        {item.data.title}
       </Typography>
       <TestCardCourse snippet={item} />
      </Box>)}
      </Box>
  )
}