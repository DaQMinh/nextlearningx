"use client"
import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function App() {
    const [ocr, setOcr] = useState("");
    const [selectedImage, setSelectedImage] = useState<null | string>(null);

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0];
        if (!file) {
            return;
        }
        setSelectedImage(URL.createObjectURL(file));

        try {
            if (file) {
                const worker = await createWorker('vie');
                const ret = await worker.recognize(file);
                console.log(ret.data.text);
                setOcr(ret.data.text);
                await worker.terminate();
            }
        } catch (error) {
            console.error('Error during OCR:', error);
        }
    };

    const handleOcrChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setOcr(event.target.value);
    };

    return (
        <div>
            <div className='mb-4'>
                <Label htmlFor="picture">Picture</Label>
                <Input id="picture" type="file" onChange={handleImageUpload} />
            </div>
            {selectedImage && (
                <img
                    src={selectedImage}
                    alt="Uploaded"
                    width={500}
                    height={500}
                    className="mb-4 rounded-md"
                />
            )}
            {ocr && (
                <Textarea
                    className="mb-4"
                    placeholder="Extracted text will appear here..."
                    value={ocr}
                    onChange={handleOcrChange} // Adding onChange handler
                />
            )}
        </div>
    );
}

export default App;
