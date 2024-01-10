'use client'
import {
  Box,
  Card,
  CardActionArea,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from '@mui/material';
import Link from 'next/link';

export default function TestCardCourse({ snippet }: any){

  return (
    <>
      {snippet.map((item :any) => (
        <Box key={`courseBox${item.id}`}>
          <Typography>
            {item.title}
          </Typography>
          <ImageList
            gap={10}
            sx={{
              gridTemplateColumns:
                'repeat(auto-fill, minmax(250px, 1fr))!important',
            }}
          >
            {item.subcourses?.map((subItem : any) => (
              <Card key={`subcourse${subItem.id}`}>
                <CardActionArea>
                <Link href={`learning/${subItem.id}`}>
                  <ImageListItem sx={{ height: '100% !important' }}>
                    <img
                      src={subItem.thumbnail}
                      alt={subItem.title}
                      loading="lazy"
                      style={{ cursor: 'pointer' }}
                    />
                    <ImageListItemBar subtitle={subItem.title} />
                  </ImageListItem>
                </Link>
                </CardActionArea>
              </Card>
            ))}
          </ImageList>
          </Box>
      ))}
      </>
  );
}