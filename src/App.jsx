import { useState,useCallback,useEffect,useRef} from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("");

    //useRef hook
    const passwordRef = useRef(null)
    
  const passwordGenerator= useCallback(()=>{
    let pass="";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"
    
    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  },[length,numberAllowed,charAllowed,setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])
  
  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <div className='max-w-screen-md mx-auto shadow-md rounded-md px-4 py-3 my-3 bg-gray-800 text-xl'>
    <h1 className='text-white text-4xl text-center my-3'>Random Password generator</h1>
    
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>
    <input type="text"
    value={password}
    className='outline-none w-full py-3 px-3'
    placeholder='password'
    readOnly
    ref={ passwordRef}
    />
    
    <button 
    onClick={copyPasswordToClipboard}
    className='outline-none bg-blue-400  text-white px-3 py-0.5 shrink-0'>
      Copy
    </button>
    </div>

    <div className='flex flex-col  gap-x-2 text-white text-xl'>
      <div className='flex items-center text-lg py-1 rounded-sm gap-x-2'>
        <label>length: {length}</label>
        <input type="range"
        min={8}
        max={20} 
        value={length}
        className='cursor-pointer w-9/12'
        onChange={(e)=>{setlength(e.target.value)}}
        />
        </div>
        <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
              setNumberAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>

      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>

    <button
        onClick={passwordGenerator}
        className='bg-green-500 text-white py-2 rounded-md mb-4 px-2'
      >
        Regenerate Password
      </button>
  </div>
  )
}

export default App
