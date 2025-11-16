import { AppEditor } from '@/components/common';
import { useAuthStore } from '@/components/stores';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button, Separator } from '@/components/ui';
import supabase from '@/lib/supabase';
import dayjs from 'dayjs';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner';

export default function TopicDetail() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user)
  const [author , setAuthor] = useState();
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [thumbnail, setThumbnail] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [createdAt ,setCreatedAt ] = useState<string>('');
  const {topicId} = useParams()
  console.log('topicId' , topicId)
  const fetchTipic = async () =>{
    try{
        const { data: topic, error } = await supabase
            .from('topic')
            .select('*')
            .eq("id" , topicId)

        if(topic){
            setAuthor(topic[0].author)
            setTitle(topic[0].title)
            setContent(topic[0].content)
            setCategory(topic[0].category)
            setThumbnail(topic[0].thumbnail)
            setCreatedAt(topic[0].created_at)
        }
        if (error){
            toast.error(error.message);
            return;
        }
    }catch(error){
        console.log(error)
        throw error;
    }
  }

  useEffect(()=>{
    fetchTipic()
  },[topicId])
  
  
  const handleDelete = async () =>{
    try{
        const { error } = await supabase
        .from('topic')
        .delete()
        .eq('id', topicId)

        if (error){
            toast.error(error.message);
            return;
        }else{
          toast.success("토픽을 삭제하였습니다.")
          navigate("/")
        }
    }catch(error){
        console.log(error)
        throw error;
    }
  }

  return (
    <main className="w-full h-full min-h-[720px] flex flex-col">
      <div className="relative w-full h-60 md:h-100 bg-cover bg-[50%_35%] bg-accent" style={{backgroundImage:`url(${thumbnail})`}}>
        {/* 뒤로가기 */}
          <div className="absolute top-6 left-6 z-10 flex items-center gap-2" >
          <Button variant="outline" size="icon" onClick={ ()=> {navigate("/")}}>
            <ArrowLeft />
          </Button> 
          {/* 토픽을 작성한 사용자만 버튼 처리 */}
          {user && author === user.id &&
            (
              
              <AlertDialog>
                <AlertDialogTrigger>
                     <Button variant="outline" size="icon" className="!bg-red-800/50">
                      <Trash2 />
                    </Button>
                    
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>정말 해당 토픽을 삭제하시겠습니까?</AlertDialogTitle>
                    <AlertDialogDescription>
                      삭제하시면 해당 토픽의 모든 내용이 영구적으로 삭제되어 복구할 수 없습니다.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>닫기</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-800/50 text-foreground hover:bg-red-900/50" onClick={handleDelete}>삭제</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>


           
            )
          }
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-e from-[#0a0a0a] via-transparent to-transparent"></div>
      </div>

      <section className="relative w-full flex flex-col items-center -mt-40">
        <span className="mb-4">{category}</span>
        <h1 className="scroll-m-20 text-center font-extrabold tracking-tight text-xl sm:text-2xl md:text-4xl">{title}</h1>
        <Separator className="!w-6 my-6 bg-foreground"/>
        <span> {dayjs(createdAt).format("YYYY. MM. DD.")}</span>
      </section>

      {/* 에디터 내용 */}
      <div className="w-full py-6 pb-6">
        {content &&
          <AppEditor props={JSON.parse(content)} readonly={true}/>
        }
      </div>
    </main>
  )
}
