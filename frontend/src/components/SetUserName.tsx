import { Dispatch, SetStateAction, useState } from "react"


interface SetUserNameProps {
    setUserName: Dispatch<SetStateAction<string>>;
}

const SetUserName: React.FC<SetUserNameProps>= ({setUserName}) => {
    const [inputValue, setInputValue] = useState('');

    const handleConfirmClick = () => {
      
        setUserName(inputValue);
       
    };
  return (
    <div className='flex items-center justify-center bg-slate-100 h-screen '>
               <div className='bg-white p-10 flex flex-col rounded-2xl'>
                <label htmlFor="username" className='font-medium'>Username</label>
                    <input type="text" name = 'username' value = {inputValue}  onChange={(e) => setInputValue(e.target.value.trim())} className='p-2 my-2 bg-green-100 rounded-lg border-2 border-green-900' />
                    <button className='mt-3 border bg-green-600 text-white p-2' onClick={handleConfirmClick}>Confirm</button>
               </div>
    </div>
  )
}

export default SetUserName