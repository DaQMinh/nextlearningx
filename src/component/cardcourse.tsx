'use client'
import React from 'react';
import { Typography, Card, CardContent, CardMedia, Box , CardActionArea } from "@mui/material";
import Link from 'next/link';

export default function CardCourse({ snippet }: any) {
  return (
    
    <Box>
      {snippet.map((i : any) => (
        <Box>
          <Typography variant="h5" gutterBottom  fontWeight="bold">
          {i.title}
        </Typography>
      {i.subcourses.map((item : any) => (
        <Card
          key={item.id} // Moved the key prop to the Card element
          sx={{
            width: { xs: '100%', sm: '358px', md: '320px' },
            boxShadow: 'none',
          }}
        >
        
          <Link href={`/learning/${item.id}`}>
            <CardActionArea>
              <CardMedia
                component="img"
                image={item.thumbnail}
                alt={item.title}
              />
            </CardActionArea>
              <CardContent sx={{ backgroundColor: 'background.default' }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    textTransform: 'capitalize',
                    borderRadius: 1
                  }}
                >
                  {item.title}
                </Typography>
              </CardContent>
          </Link>

        </Card>
      ))}
      </Box>
      ))}
    </Box>
  );
}
