import React, { useCallback, useEffect, useState ,useRef} from 'react';
import './Generator.css'

function Genrator(){
    const [length,setLength]=useState(8);
    const [numbersAllowed,setNumbersAllowed]=useState(false);
    const [charsAllowed,setCharsAllowed]=useState(false);
    const [password,setPassword]=useState("");
    const [cValue,setCValue]=useState('copy');

    // useRef Hook
    const passwordRef=useRef(null);

    const copyPasswordToClipBoard=useCallback(()=>{
      passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0,100);
        window.navigator.clipboard.writeText(password);
        setCValue('copied');
    },[password])

    const passwordGenerator=useCallback(()=>{
      let pass="";
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

      if(numbersAllowed) str+='0123456789';
      if(charsAllowed) str+='!@#$%&*+?';

      for(let i=0;i<length;i++){
        let char = Math.floor(Math.random()*str.length+1);
        pass+=str.charAt(char);
      }
      setPassword(pass);

    },[length,numbersAllowed,charsAllowed]);
    useEffect(()=>{
      passwordGenerator();
      setCValue("copy");

    },[length,numbersAllowed,charsAllowed,passwordGenerator]);

    return(
        <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <h2 className='text-white text-center my-3'>Password Generator</h2>
      <div className="flex shadow-rounded-lg overflow-hidden mb-4">
        <input 
        type="text"
        value={password}
        className='tt outline-none w-full py-1 px-3'
        placeholder='password'
        readOnly
        ref={passwordRef} />
        <button onClick={copyPasswordToClipBoard} className='gg2 outline-none bg-blue-700 text-white px-3 py-1.5 shrink-0'
        ><i class="fa-regular fa-copy"></i> {cValue}</button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={8}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}} />
          <label>Length : {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox"
          defaultChecked={numbersAllowed}
          id='numberInput'
          onChange={(e)=>{
            setNumbersAllowed((prev)=>!prev);
            console.log(numbersAllowed)
          }} />
          <label>Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox"
          defaultChecked={charsAllowed}
          id='charInput'
          onChange={(e)=>{
            setCharsAllowed((prev)=>!prev);
            console.log(charsAllowed)
          }} />
          <label>Characters</label>
        </div>
      </div>
        </div>
    );
}

export default Genrator;