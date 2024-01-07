import React from 'react';
import { Typography, Card, CardContent, CardMedia, Box , CardActionArea } from "@mui/material";
import Link from 'next/link';
import { Course } from '@/app/(site)/getdata';

interface Props {
  snippet: Course;
}

export default function CardCourse({ snippet }: Props) {
  return (
    <Box>
      {snippet.subcourses?.map((item) => (
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
                image={item.data.thumbnail}
                alt={item.data.title}
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
                  {item.data.title}
                </Typography>
              </CardContent>
          </Link>

        </Card>
      ))}
    </Box>
  );
}
