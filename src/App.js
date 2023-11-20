import { useState } from 'react';
import './App.css';
import Data from './data.json'

function App() {
  const data = Data;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [quizFinish, setQuizFinish] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);

  const [trueAnsweer, setTrueAnsweer] = useState(0);
  const [falseAnsweer, setFalseAnsweer] = useState(0);

  const handleNext = () => {
    let newValue = currentQuestion + 1
    if (newValue < data.length) {
      setCurrentQuestion(newValue)
      setUserAnswer(null)
    } else {
      setQuizFinish(true)
    }
  }


  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setTotalScore(totalScore + 20)
    }
    if (isCorrect) {
      setTrueAnsweer(trueAnsweer + 1)
    } else {
      setFalseAnsweer(falseAnsweer + 1)
    }
    setUserAnswer(isCorrect)
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setTotalScore(0)
    setQuizFinish(false)
    setUserAnswer(null)
    setTrueAnsweer(0)
    setFalseAnsweer(0)
  }

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='shadow-md bg-white mx-auto container w-[800px] p-4 rounded-lg'>
        <div className='border-b border-1 border-gray-300 pb-2 font-medium flex justify-between text-xl'>
          <p className=''>{currentQuestion + 1} of {data.length} Question</p>
          <span className=''>Skor: {totalScore}</span>
        </div>


        {
          quizFinish ? (
            <div className='flex flex-col justify-center items-center mt-4 font-semibold'>
              <h1 className='text-2xl'>Soru Cevap Bitti</h1>
              <div className='flex justify-center items-center text-center gap-12'>
                <div className='m-4'>
                  <h1 className='text-gray-500'>Doğru Cevap</h1>
                  <p className='text-4xl text-green-500'>{trueAnsweer}</p>
                </div>
                <div className='m-4'>
                  <h1 className='text-gray-500'>Yanlış Cevap</h1>
                  <p className='text-4xl text-red-500'>{falseAnsweer}</p>
                </div>
              </div>
              <div className='flex justify-center'>
              <button className='bg-blue-500 hover:bg-blue-400 px-8 py-2 text-white mt-4 rounded' onClick={handleRestart}>Restart</button>
              </div>
            </div>
          ) : (
            <>
              <div className='cursor-pointer question text-lg font-semibold text-left mt-6 mb-10'>
                <h3>{data[currentQuestion].questionText}</h3>
              </div>
              {data[currentQuestion].answerOptions.map(item => {
                return (
                  <div onClick={() => handleAnswer(item.isCorrect)} className={`cursor-pointer mt-2 border border-gray-300 rounded p-3 ${userAnswer !== null && item.isCorrect
                      ? "correct"
                      : userAnswer !== null && !item.isCorrect
                        ? "incorrect"
                        : ""
                    }`}>
                    <h1 className='font-medium'>{item.answerText}</h1>
                  </div>
                )
              })}
              <div className='flex'>
                <button className='ml-auto bg-blue-500 hover:bg-blue-400 px-8 py-2 text-white mt-4 rounded' onClick={handleNext}>Next</button>
              </div>
            </>
          )
        }








      </div>
    </div>
  );
}

export default App;
