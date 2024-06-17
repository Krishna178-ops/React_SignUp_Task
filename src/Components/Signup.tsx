import React,{useState} from 'react';
import {PostData} from "../types/Signup"
import { Input } from "@salt-ds/core";
import { Dropdown, Option, OptionGroup } from "@salt-ds/core";
import { RadioButton, RadioButtonGroup } from "@salt-ds/core";
import { Button } from "@salt-ds/core";
import {useFetch} from "../hooks/Signup"

import {  Card,  InteractableCard,  InteractableCardGroup,  LinkCard,} from "@salt-ds/core";
const SignUp: React.FC = () => {

  const reset = () =>{
    setData({
      name:"",
      sex:"",
      programmingLanguage:""
     })
   }
 const {mutate,isError,isPending,isSuccess} = useFetch(reset);
    const [data,setData] = useState<PostData>({
        name:"",
        programmingLanguage:"",
        sex:""
    })
    const DropValue:string[] = ["java",'javascript','python'];

    const handleChange = (e:any,key:string) =>{
        console.log(e.target,"value")
        const value = e.target.value || e.target.innerText
        setData((prev)=>({
            ...prev,
            [key]:value
                    }))
                    
    }
   
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      mutate(data);
    };
  return (
    <Card className='shadow-md rounded-lg m-[5rem]'>
       <form  onSubmit={handleSubmit} className='p-[8em] w-[70%] m-auto'>
       <div className='mb-5'>
            <label className='block font-[600] text-[15px] text-left'>Name</label>
            <div><Input  value={data.name}  className='outline-0' onChange={(e:any)=>handleChange(e,"name")}/></div>
        </div>  
        <div className='mb-5'>
            <label className='block font-[600] text-[15px] text-left'>Programming Language</label>
            <div>
                <Dropdown value={data.programmingLanguage} name='programmingLanguage' onSelectionChange={(e:any)=>handleChange(e,"programmingLanguage")}>
      {DropValue.map((value,key) => (
        <Option value={value} key={key} />
      ))}
    </Dropdown>
                </div>
        </div>
        <div className='mb-5'>
            <label className='block font-[600] text-[15px] text-left'>Sex</label>
            <RadioButtonGroup value={data.sex} data-name='sex' className='mt-3'onChange={(e:any)=>handleChange(e,"sex")}>
    <RadioButton label="Male" value="Male" />
    <RadioButton label="Female" value="Female" />
    <RadioButton label="Others" value="Others" />
  </RadioButtonGroup>
        </div>
        <Button type='submit' disabled={isPending} className='shadow-md rounded-lg w-[10em] bg-[blue] text-white hover:bg-[blue] hover:text-white hover:scale-105 hover:transition-all'>{isPending?"Submitting":"Submit"}</Button>

        {isError && <div>An error occurred</div>}
      {isSuccess && <div className='mt-5 text-[green] font-[600]'>Data submitted successfully!</div>}
       </form>
    </Card>
  );
};

export default SignUp       