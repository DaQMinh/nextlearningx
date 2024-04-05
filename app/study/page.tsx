"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFront, selectBack, setFlashcard } from '../../redux/currentflashcardSlice';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import Link from '@/components/custom-link';
import { RootState } from '@/redux/store';

const FlashCard: React.FC = () => {
  const dispatch = useDispatch();
  const front = useSelector(selectFront);
  const back = useSelector(selectBack);
  
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFront, setIsFront] = useState(true); // State to track whether front or back is showing

  const flashcards = useSelector((state: RootState) => state.flashcards.flashcards);
  if(flashcards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-2xl font-bold">No flashcards found</p>
        <Link href="/">
          <Button>Back to home</Button>
        </Link>
      </div>
    );
  } else {
    useEffect(() => {
      dispatch(setFlashcard(flashcards[currentCardIndex]));
    }, [dispatch, flashcards, currentCardIndex]);
  
    const handleFlip = () => {
      setIsFront(!isFront); // Toggle between front and back
    };
    
    const handlePrevious = () => {
      setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
    };
    
    const handleNext = () => {
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    };
  
    return (
      <>
      <CardContent className="flex flex-col items-center justify-center h-full border py-10 max-w-screen">
        <div className="max-w-prose">
          <p className="text-2xl">{isFront ? front : back}</p>
        </div>
      </CardContent>

          
        <div className="flex justify-between mt-4">
        <Button variant="outline" onClick={handleFlip}>Flip</Button>
  
          <div className="flex gap-4">

            <Button variant="outline" onClick={handlePrevious}>
              <ArrowLeftIcon className="h-4 w-4" />
            </Button>
  
            <Button onClick={handleNext}>
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </>
    );
  };
  }


export default FlashCard;
