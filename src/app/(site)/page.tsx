import getCourse  from './getCourse'
import TestCardCourse from '@/component/testCardCourse'
async function App() {
  const data = await getCourse()
  return (
    <>
      <TestCardCourse snippet={data}/>
    </>
  )
}

export default App