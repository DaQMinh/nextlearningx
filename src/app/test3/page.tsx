'use client'
 
import { Button } from '@mui/material'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
 
export default function SearchBar() {
  const searchParams = useSearchParams()
  const search = searchParams.get('id')
 
  // URL -> `/dashboard?search=my-project`
  // `search` -> 'my-project'
  return <>
  <iframe
  src={`https://www.youtube.com/embed/${search}`}
  title="YouTube video player"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  />
  <Button variant='outlined'>
    <Link href={'/test3?id=-bVgXph2cbA&t=1643s'}>
        Switch
    </Link>
</Button>
  </>
}