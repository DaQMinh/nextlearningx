"use client"
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import React, { useState, useEffect } from 'react';

const SpeechRecognitionComponent: React.FC = () => {
  const [result, setResult] = useState<string>('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [startDisabled, setStartDisabled] = useState<boolean>(false);
  const [stopDisabled, setStopDisabled] = useState<boolean>(true);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>([]);
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition){
      const recognition = new SpeechRecognition();
      recognition.lang = 'vi-VN';
      recognition.continuous = true;
      recognition.interimResults = true;


      recognition.onstart = () => {
        setStartDisabled(true);
        setStopDisabled(false);
        setIsRecording(true);
        console.log('Recording started');
      };

      recognition.onresult = function (event: SpeechRecognitionEvent) {
        const newResults: string[] = [];
      
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            newResults.push(event.results[i][0].transcript);
          }
        }
      
        setHistory((prevHistory) => [...prevHistory, ...newResults]);
      
        const combinedResult = history.concat(newResults).join(' ');
        setResult(combinedResult);
      
        if (combinedResult.toLowerCase().includes('stop recording')) {
          setResult(combinedResult.replace(/stop recording/gi, ''));
          stopRecording();
        }
      };

      recognition.onerror = function (event: SpeechRecognitionErrorEvent) {
        setStartDisabled(false);
        setStopDisabled(true);
        console.error('Speech recognition error:', event.error);
      };

      recognition.onend = function () {
        setStartDisabled(false);
        setStopDisabled(true);
        setIsRecording(false);
        console.log('Speech recognition ended');
      };

      setRecognition(recognition);
    } else {
      console.error('Speech recognition not supported');
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const startRecording = () => {
    setResult('');
    if (recognition) {
      recognition.start();
    }
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center p-6">
        <div className="flex flex-col gap-4 w-full max-w-3xl">
          <div className="flex items-start gap-4">
            <div className="flex items-center gap-2">
              {!isRecording ? (
                <Button variant="outline" onClick={startRecording} disabled={startDisabled}>
                  Start voice input
                </Button>
              ) : (
                <Button variant="outline" onClick={stopRecording} disabled={stopDisabled}>
                  Stop voice input
                </Button>
              )}
            </div>
          </div>
          <div className="grid gap-2">
            <Textarea
              placeholder="Type your message here."
              value={history.join(' ')}
              onChange={(e) => setHistory(e.target.value.split(' '))}
            />
          </div>
        </div>
      </div>
    </div>

  );
}

export default SpeechRecognitionComponent;
