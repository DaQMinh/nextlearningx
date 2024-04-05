"use client"
import React, { useState, useEffect ,useRef } from 'react';
import { Button } from "@/components/ui/button";
import { SelectContent, SelectGroup, SelectItem, SelectTrigger,Select } from '@/components/ui/select';
interface Question {
  post: string;
  questions: string[];
  answer: number;
}

interface School {
  name: string;
  averageScore: number;
}

export default function Component() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [randomQuestion, setRandomQuestion] = useState<Question | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [userSchoolName, setUserSchoolName] = useState('');

  const accuracyPercentage = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 10 : 0;
  const selectedAnswerRef = useRef<boolean>(true);
  useEffect(() => {
    fetchQuestions();
  }, []);
  const schools: School[] = [
    { name: "THPT An Dương", averageScore: (31.75 / 5) },
    { name: "THPT An Lão", averageScore: (24.75 / 5) },
    { name: "THPT Bạch Đằng", averageScore: (26.25 / 5) },
    { name: "THPT Cát Bà", averageScore: (19.25 / 5) },
    { name: "THPT Cát Hải", averageScore: (20.25 / 5) },
    { name: "THPT Cộng Hiến", averageScore: (20.25 / 5) },
    { name: "THPT Đồ Sơn", averageScore: (18.50 / 5) },
    { name: "THPT Đồng Hòa", averageScore: (30.00 / 5) },
    { name: "THPT Hải An", averageScore: (32.75 / 5) },
    { name: "THPT Hồng Bàng", averageScore: (36.75 / 5) },
    { name: "THPT Hùng Thắng", averageScore: (19.00 / 5) },
    { name: "THPT Kiến An", averageScore: (35.25 / 5) },
    { name: "THPT Kiến Thụy", averageScore: (31.00 / 5) },
    { name: "THPT Lê Chân", averageScore: (32.50 / 5) },
    { name: "THPT Lê Hồng Phong", averageScore: (36.50 / 5) },
    { name: "THPT Lê Ích Mộc", averageScore: (22.75 / 5) },
    { name: "THPT Lê Quý Đôn", averageScore: (38.75 / 5) },
    { name: "THPT Lý Thường Kiệt", averageScore: (29.00 / 5) },
    { name: "THPT Mạc Đĩnh Chi", averageScore: (24.75 / 5) },
    { name: "THPT Ngô Quyền", averageScore: (41.50 / 5) },
    { name: "THPT Nguyễn Bỉnh Khiêm", averageScore: (29.25 / 5) },
    { name: "THPT Nguyễn Đức Cảnh", averageScore: (16.50 / 5) },
    { name: "THPT Nguyễn Khuyến", averageScore: (15.50 / 5) },
    { name: "THPT Nguyễn Trãi", averageScore: (26.00 / 5) },
    { name: "THPT Nhữ Văn Lan", averageScore: (20.75 / 5) },
    { name: "THCS - THPT Lý Thánh Tông", averageScore: (10.50 / 5) },
    { name: "THPT Phạm Ngũ Lão", averageScore: (30.00 / 5) },
    { name: "THPT Phan Đăng Lưu", averageScore: (30.25 / 5) },
    { name: "THPT Quốc Tuấn", averageScore: (24.75 / 5) },
    { name: "THPT Thái Phiên", averageScore: (39.50 / 5) },
    { name: "THPT Thụy Hương", averageScore: (24.25 / 5) },
    { name: "THPT Thủy Sơn", averageScore: (25.75 / 5) },
    { name: "THPT Tiên Lãng", averageScore: (29.50 / 5) },
    { name: "THPT Tô Hiệu", averageScore: (21.00 / 5) },
    { name: "THPT Toàn Thắng", averageScore: (16.50 / 5) },
    { name: "THPT Trần Hưng Đạo", averageScore: (26.50 / 5) },
    { name: "THPT Trần Nguyên Hãn", averageScore: (39.75 / 5) },
    { name: "THPT Vĩnh Bảo", averageScore: (30.00 / 5) }
]; 

  useEffect(() => {
    setUserSchoolName(findBestSchool(schools, accuracyPercentage));
  }, [accuracyPercentage]);

  const fetchQuestions = () => {
    fetch("/api/getQuestions")
      .then((response) => response.json())
      .then((data: Question[]) => {
        setQuestions(data);
        selectRandomQuestion(data);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  };

  const selectRandomQuestion = (data: Question[]) => {
    if (data.length > 0) {
      selectedAnswerRef.current = true;
      const inputs = document.querySelectorAll('input[type="radio"]');
      inputs.forEach((value: Element) => {
        value.parentElement?.classList.remove("text-green-500", "text-red-500");
      });
  
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomQuestion = data[randomIndex];
      setRandomQuestion(randomQuestion);
    }
  };
  

    const handleSubmit = () => {
    setTotalQuestions(totalQuestions + 1);
    if (randomQuestion) {
      const selectedIdx = parseInt(selectedAnswer);
      const isCorrect = selectedIdx === randomQuestion.answer - 1;
      setCorrectAnswers(isCorrect ? correctAnswers + 1 : correctAnswers);
      // Update UI to highlight correct and incorrect answers
      const inputs = document.querySelectorAll('input[type="radio"]');
      inputs.forEach((value: Element, idx: number) => {
        if (idx === randomQuestion.answer - 1) {
          value.parentElement?.classList.add("text-green-500");
        } else if (idx === selectedIdx) {
          value.parentElement?.classList.add("text-red-500");
        }
      });
    }
  };
  const lowScoreSchools = [
    "Chuyên Giáo Dục Thường Xuyên",
    "Trung Tâm Tình dục",
    "THPT EggMan",
    "Đại học Stanfuck",
    "Đại học Thâm Dái",
    "Đại học McDonald",
    "Đại học Harvest ( Mùa Màng )",
    "Đại học Xây Dựng - Chương trình vừa làm vừa (Không) học",
    "Đại học Công nghệ Cao - Cao Đẳng",
  ];
  function findBestSchool(schools: School[], target: number): string {
    if (target < 2) {
      return lowScoreSchools[
        Math.floor(Math.random() * lowScoreSchools.length)
      ];
    } else {
      let bestSchool: School | undefined;
      let minDifference = Number.MAX_VALUE;

      for (const school of schools) {
        const difference = Math.abs(school.averageScore - target);
        if (difference < minDifference) {
          minDifference = difference;
          bestSchool = school;
        }
      }

      if (bestSchool) {
        return bestSchool.name;
      } else {
        return "Không tìm thấy trường phù hợp";
      }
    }
  }





    return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl px-4">
        <header className="pb-6 space-y-1 text-center">
          {randomQuestion && (
            <h1 className="text-3xl font-bold tracking-tight">
              {randomQuestion.post}
            </h1>
          )}
          <p className="text-gray-500 dark:text-gray-400">
            Pick the correct answer below.
          </p>
        </header>
        <main className="space-y-4">
          <fieldset className="space-y-2 text-center">
            <div className="space-y-2">
              {randomQuestion &&
                randomQuestion.questions.map((q, idx) => (
                  <label key={idx} className="flex items-center space-x-2">
                    <input
                      className="form-tick"
                      name="answer"
                      type="radio"
                      value={idx}
                      onChange={(e) => {
                        if (selectedAnswerRef.current) {
                          selectedAnswerRef.current = false
                          setSelectedAnswer(e.target.value);
                        }
                      }}
                    />{" "}
                    <span className="font-medium">{q}</span>
                  </label>
                ))}
            </div>
          </fieldset>
          <div className="mt-6">
            <Button className="w-full" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
          <div className="mt-4 text-center text-gray-500 dark:text-gray-400">
            Accuracy: {(accuracyPercentage * 10).toFixed(2)}% - {userSchoolName}
          </div>
          <div className="mt-8 flex justify-end">
            <Button
              variant="secondary"
              onClick={() => selectRandomQuestion(questions)}
            >
              Next Question
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}