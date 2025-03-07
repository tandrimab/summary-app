import { useState } from 'react'

import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isManualUpdateLoading, setIsManualUpdateLoading] = useState<boolean>(false)
  const [generatedSummary, setGeneratedSummary] =useState<string>();
  const [summary, setSummary] =useState<string>();

  
  const fetchUpdates = async () => {
    setIsLoading(true)
    const response = await fetch('http://localhost:3001/summarise');
    const updatesData = await response.json();
    if (updatesData.success && updatesData.data) {
      setIsLoading(false)
      setGeneratedSummary(updatesData.data)

    } else {
      setIsLoading(false)
      setGeneratedSummary("Something went wrong")
    }
  }

  const generateUpdates = async () => {
    setIsManualUpdateLoading(true);
    const response = await fetch('http://localhost:3001/updateSummary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ summary })
    });
    const updatesData = await response.json();
    if (updatesData.success && updatesData.data) {
      setIsManualUpdateLoading(false);
      setGeneratedSummary(updatesData.data)

    } else {
      setIsManualUpdateLoading(false);
      setGeneratedSummary("Something went wrong")
    }
  }
  
  return (
    <div className="flex items-center justify-between min-h-svh w-full">
      <div className='w-1/2 h-full flex flex-col'>
        <label className='font-medium text-lg align-left'>Update Summary</label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className='p-2 h-[200px] m-8 border-blue-200 border-2'
          placeholder='Enter your updates here'
        />
        <div className='flex justify-around align-center'>
          <button onClick={generateUpdates} className='flex align-center justify-around'>
          {isManualUpdateLoading && <div className="h-6 w-6 border-b-2 border-current rounded-full animate-spin mr-2"></div>}
            Generate Summary</button>
          <button onClick={fetchUpdates} className='flex align-center justify-around'>
            {isLoading && <div className="h-6 w-6 border-b-2 border-current rounded-full animate-spin mr-2"></div>}
            Show Already updated Summary</button>
        </div>
      </div>
      <div className='w-1/2 flex flex-col h-full justify-start align-start text-left'>
       <h1 className='font-bold mb-4'> Summary Section</h1>
       <div dangerouslySetInnerHTML={{__html: generatedSummary || ''}} />
        
      </div>
    </div>
  )
}

export default App
