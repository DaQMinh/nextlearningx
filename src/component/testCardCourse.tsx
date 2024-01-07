'use client'
import {
  Card,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';
import { Course } from '../app/(site)/getdata';
import Link from 'next/link';

interface Props {
  snippet: Course;
}

export default function TestCardCourse({ snippet }: Props){

  return (
    <Container>
      {snippet.subcourses && <ImageList
        gap={10}
        sx={{
          gridTemplateColumns:
            'repeat(auto-fill, minmax(250px, 1fr))!important',
        }}
      >
        {snippet.subcourses?.map((item) => (
          <Card key={item.id}>
            <Link href={`learning/${item.id}`}>
            <ImageListItem sx={{ height: '100% !important' }}>
              <img
                src={item.data.thumbnail}
                alt={item.data.title}
                loading="lazy"
                style={{ cursor: 'pointer' }}
              />
              <ImageListItemBar 
                subtitle={item.data.title}
              />
            </ImageListItem>
            </Link>
          </Card>
        ))}
      </ImageList>}
    </Container>
  );
};