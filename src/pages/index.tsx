
import { CircleSmall, NotebookPen, PencilLine } from 'lucide-react';
import '../App.css';
import {AppDraftDialog, AppSidebar } from '../components/common';
import { SkeletonHotTopic } from '../components/skeleton/index'

import { Button} from '../components/ui';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuthStore } from '@/components/stores';
import { toast } from 'sonner';
import supabase from '@/lib/supabase';
import { TOPIC_STATUS, type Topic } from '@/types/topic.type';
import { useEffect, useState } from 'react';
import { NewTopicCard } from '@/components/topics';

export default function App() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)

  const [searchParams , setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "";

  const [topics, setTopics ] = useState<Topic[]>([]);
  //나만의 토픽생성
  const handleRoute = async() =>{
    if (!user) return;
    if(!user.id || !user.email || !user.role){
      toast.warning("토픽 작성은 로그인 후 가능합니다.");
      return;
    }
    

    const { data, error } = await supabase
    .from('topic')
    .insert([
      {
        title:'',
        content:'',
        category:'',
        thumbnail:'',
        author :user.id,        
        status:null
      }
    ])
    .select()
    
    console.log(data)

    if(error){
      console.error(error)
      throw error;
    }

    if(data){
      toast.success("토픽을 생성하였습니다.")   
      navigate(`/topics/${data[0].id}/create`)
    }
  }

  const handleCategoryChange = (value:string) =>{
    if (value === category) return;
    if (value === ""){
      setSearchParams({})
    }else{
      setSearchParams({category:value})
    }
  }

  useEffect(()=>{
    fetchTopics()
  },[category])

  const fetchTopics = async() =>{
    try{
      const query =  supabase
          .from('topic')
          .select('*')
          .eq("status" , TOPIC_STATUS.PUBLISH)

      if (category && category.trim() !== ""){
        query.eq("category",category);        
      }

      const { data: topics, error } = await query

      if(topics){
        setTopics(topics)
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
  return (
    <main className="w-full h-hull min-h-[720px] flex p-6 gap-6">

      {/*
        fixed	화면에 고정 위치	position: fixed;
        right-1/2	오른쪽에서 화면의 절반만큼 떨어짐	right: 50%;
        bottom-10	하단에서 2.5rem 떨어짐	bottom: 2.5rem;
        translate-x-1/2	(x축으로 50% 이동)
        z-20	z-index 설정	z-index: 20;
        items-center	flex/grid 컨테이너일 때 중앙 정렬	align-items: center; (단, display: flex 필요) 

        !py-5	상하 패딩 강제 변경 (override)	padding-top: 1.25rem; padding-bottom: 1.25rem;
        !px-6	좌우 패딩 강제 변경	padding-left: 1.5rem; padding-right: 1.5rem;
        rounded-full	완전한 원형 모서리	border-radius: 9999px;
        
        variant="destructive" 는 shadcn/ui나 custom Button 컴포넌트의 prop으로,
        보통 붉은색(위험/삭제) 스타일을 의미합니다.
        예: background-color: #dc2626; color: white;
        */}
      <div className="fixed right-1/2 bottom-10 translate-x-1/2 z-20 items-center flex gap-2">
        <Button variant={"destructive"} className="!py-5 !px-6 rounded-full" onClick={ handleRoute}>
          <PencilLine />
          나만의 토픽 작성
        </Button>
        
        <AppDraftDialog>
          <div className="relative">
            <Button variant={"outline"} className="rounded-full w-10 h-10">
              <NotebookPen />
            </Button>
            <CircleSmall size={14} className="absolute top-0 right-0 text-red-500" fill='#Ef4444'/>
          </div>
        </AppDraftDialog>

      </div>
      {/* 카테고리 사이드바 */}
      <div className="hidden lg:block lg:min-w-60 lg:w-60 lg:h-full ">
        <AppSidebar category={category} setCategory={handleCategoryChange}/>
      </div>
      {/* 토픽 콘텐츠 */}
      <section className="w-full lg:w-[calc(100%-264px)] flex flex-col gap-12">       
        {/* 핫 토픽 */}
        <div className="w-full flex flex-col gap-6">
           
          <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <img src="/assets/gifs/gif-002.gif" alt="@IMG" className="w-7 h-7" />
                <h4 className="scroll-m-20  text-xl font-semibold tracking-tight">HOT 토픽</h4>
              </div>
              <p className="md:text-base text-muted-foreground">지금 가장 주목받는 주제들을 살펴보고, 다양한 관점의 인사이트를 얻어보세요.</p>
          </div>
          <div className="w-full flex items-center gap-6 overflow-auto">
              <SkeletonHotTopic />
              <SkeletonHotTopic />
              <SkeletonHotTopic />
              <SkeletonHotTopic />
          </div>
        </div>
        {/* 뉴 토픽 */}
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <img src="/assets/gifs/gif-001.gif" alt="@IMG" className="w-7 h-7" />
              <h4 className="scroll-m-20  text-xl font-semibold tracking-tight">HOT 토픽</h4>
            </div>
            <p className="md:text-base text-muted-foreground">새로운 시선으로, 새로운 이야기를 시작하세요. 지금 바로 당신만의 토픽을 작성하세요.</p>
        </div>
        
        {
          topics.length > 0?(
            <div>
              <div className="flex flex-col min-h-120 md:grid md:grid-cols-2 gap-6">
                {
                  topics
                    .sort((a,b)=> new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                    .map( (topic:Topic)=>{
                      return (
                        <NewTopicCard key={topic.id} props={topic} />
                      )
                  })
                }
              </div>
            </div>
          ):(
            <div className="w-full min-h-120 flex items-center justify-center">
              <p className="text-muted-foreground/50">조회 가능한 토픽이 없습니다.</p>
            </div>
          )
        }

      
      </section>
    </main>
  )
}