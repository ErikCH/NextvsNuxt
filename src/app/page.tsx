
import { revalidatePath } from 'next/cache';
import { getRecipes } from '@/utils/getRecipes'
import { formatTextToHTML } from '@/utils/formatToHTML';
import LoggedIn from '../components/LoggedIn';
import { Amplify } from 'aws-amplify';
import awsExports from '@/aws-exports';

Amplify.configure({ ...awsExports, ssr: true });

let answer= ''
let playText = '';

async function grabData(data: FormData){
    "use server"
    const ans = await getRecipes(data);
    console.log('ans', ans.data.choices[0])
    const text = ans.data.choices[0].text!;
    answer = formatTextToHTML(text) 
    playText = text.trim().replace(/-/g, "\n\n");

    revalidatePath("/")
  }

export default function Home() {
  return (
    <main>
      <LoggedIn grabData={grabData} answer={answer} text={playText}></LoggedIn>
    </main>
  )
}
