'use client'

import { Button, Flex, Heading, View, useAuthenticator } from '@aws-amplify/ui-react';
import { Predictions } from 'aws-amplify';
import { FormEvent, ReactNode, useEffect, useTransition } from 'react';

export default function Main({children, grabData, answer, text }: 
  {children?: ReactNode, 
   grabData: (formData: FormData)=>Promise<void>, 
   answer: string
   text: string }) 
  {

 const {  signOut } = useAuthenticator((context) => [context.user]);
 const [isPending, startTransition] = useTransition()

 useEffect(()=> {
  play(text)
 },[text])


  const onSubmit = (event:FormEvent<HTMLFormElement>):void=>{
    event.preventDefault();
    const dataForm = (event.target as HTMLFormElement);
    const data = new FormData(dataForm)
    dataForm.reset()
    startTransition(()=>  grabData(data) )
  }

  async function play(text: string) {
  const res = await Predictions.convert({
    textToSpeech: {
      source: {
        text: text
      },
    }
  });

  const audio = new Audio();
  audio.src = res.speech.url;
  audio.play();
}


  return (
  <Flex as="main" direction={'column'} alignItems={'center'} >
   <Heading level={2}>Recipe Creator</Heading>
   <View as="form"  className="main" onSubmit={onSubmit}>
    <label htmlFor="ingredients">Ingredients</label>
     <input name='ingredients' placeholder="List Ingredients" className="input" id="ingredients"
      disabled={isPending} />
     <Button type="submit" width={'200px'} disabled={isPending} >Create Recipe</Button>
   </View>
   <div dangerouslySetInnerHTML={{__html: answer}} />
   <Button variation={'warning'} onClick={signOut} width={'200px'}>Sign Out?</Button>
  </Flex>
  )
}
