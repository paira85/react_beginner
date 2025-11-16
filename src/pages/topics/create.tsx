import { AppEditor, AppFileUpload } from "@/components/common";
import { useAuthStore } from "@/components/stores";
import { Button, Input, Label } from "@/components/ui";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TOPIC_CATEGORY } from "@/constants/category.constant";
import supabase from "@/lib/supabase";
import type { Block } from "@blocknote/core";
import { ArrowLeft, Asterisk, BookOpenCheck, ImageOff, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { nanoid } from "nanoid";
import { TOPIC_STATUS } from "@/types/topic.type";

export default function CreateTopic() {
    
  const {topicId} = useParams()
  console.log(topicId)
  const user = useAuthStore((state) => state.user);

  const [title,setTitle] = useState<string>("");
  const [category,setCategory] = useState<string>("");
  const [content,setContent] = useState<Block[]>([]);
  const [thumbnail,setThumbnail] = useState<File | string | null>(null);

  const navigate = useNavigate();
  useEffect(()=>{
    fetchTipic()
  },[])
  const fetchTipic = async () =>{
    try{
        const { data: topic, error } = await supabase
            .from('topic')
            .select('*')
            .eq("id" , topicId)

        if(topic){
            setTitle(topic[0].title)
            setContent(JSON.parse(topic[0].content))
            setCategory(topic[0].category)
            setThumbnail(topic[0].thumbnail)
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
  const handleSave = async() =>{
    if(!title &&  !category && !content && !thumbnail){
        toast.warning("제목, 본문, 카테고리, 썸네일을 기입하세요.");
        return;
    }

    let thumbnailUrl = null
    if(thumbnail && thumbnail instanceof File){
        const fileExt = thumbnail.name.split(".").pop();
        const fileName = `${nanoid()}.${fileExt}`;
        const filePath = `topics/${fileName}`;

        const {error:uploadError}  = await supabase.storage.from('files')
        .upload(filePath , thumbnail)
        if (uploadError) {
            throw uploadError;
        }

        const {data} = await supabase.storage.from("files").getPublicUrl(filePath);
        if(!data) throw new Error("썸네일 Public URL 조회를 실패하였습니다.");
        thumbnailUrl = data.publicUrl;
    }else if (typeof thumbnail === "string"){
        thumbnailUrl = thumbnail
    } 

    // console.log('title : ' , title)
    // console.log('category : ' , category)
    // console.log('content : ' , content)
    // console.log('topicId : ' , topicId)
    // console.log('thumbnail : ' , thumbnail)
    // console.log('thumbnailUrl : ' , thumbnailUrl)
    
    const { data, error } = await supabase
    .from('topic')
    .update(
      {
        title: title,
        content:JSON.stringify(content),
        category:category,
        thumbnail:thumbnailUrl,
        author :user?.id,        
        status:'temp'
      }
    )
    .eq("id",topicId)
    .select()

    if(error){
        toast.error(error.message);
        return;
    }
    
    if(data){
        toast.success("작성 중인 토픽을 저장하였습니다.");
        return;
    }
  }

  const handlePublish = async() =>{
    if(!title &&  !category && !content && !thumbnail){
        toast.warning("제목, 본문, 카테고리, 썸네일은 필수값입니다.");
        return;
    }

    let thumbnailUrl = null
    if(thumbnail && thumbnail instanceof File){
        const fileExt = thumbnail.name.split(".").pop();
        const fileName = `${nanoid()}.${fileExt}`;
        const filePath = `topics/${fileName}`;

        const {error:uploadError}  = await supabase.storage.from('files')
        .upload(filePath , thumbnail)
        if (uploadError) {
            throw uploadError;
        }

        const {data} = await supabase.storage.from("files").getPublicUrl(filePath);
        if(!data) throw new Error("썸네일 Public URL 조회를 실패하였습니다.");
        thumbnailUrl = data.publicUrl;
    }else if (typeof thumbnail === "string"){
        thumbnailUrl = thumbnail
    } 

    
    const { data, error } = await supabase
    .from('topic')
    .update(
      {
        title: title,
        content:JSON.stringify(content),
        category:category,
        thumbnail:thumbnailUrl,
        author :user?.id,        
        status:TOPIC_STATUS.PUBLISH
      }
    )
    .eq("id",topicId)
    .select()

    if(error){
        toast.error(error.message);
        return;
    }
    
    if(data){
        toast.success("토픽을 발행하였습니다.");
        navigate("/")
        return;
    }
  }
  return (              
    <main className="w-full h-full max-h-[1024px] flex gap-6 p-6 ">
        <div className="fixed right-1/2 bottom-10 translate-x-1/2 z-20 flex items-center gap-2">
            <Button variant={"outline"} size={"icon"}>
                <ArrowLeft />
            </Button>
            <Button type="button" onClick={handleSave} variant={"outline"}  className="w-22 !bg-yellow-800/50">
                <Save />
                저장
            </Button>

            <Button type="button" onClick={handlePublish} variant={"outline"} className="w-22 !bg-emerald-800/50">
                <BookOpenCheck />
                발행
            </Button>
        </div>
        {/* 토픽작성하기 */}
        <section className="w-3/4 h-full flex flex-col gap-6">
            <div className="flex flex-col pb-6 border-b">
                <span className="text-[#F96589] font-semibold">Step1</span>    
                <span className="text-base font-semibold">토픽 작성하기</span>    
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1"> 
                    <Asterisk size={14} className="text-[#F96859]" />   
                    <Label className="text-muted-foreground">제목</Label>
                </div>    
                <Input placeholder="토픽 제목을 입력하세요." value={title} onChange={(e)=>{setTitle(e.target.value)}} className="h-16 pl-6 !text-lg placeholder:text-lg placeholder:font-semibold border-0"/>
            </div>

             <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1"> 
                    <Asterisk size={14} className="text-[#F96859]" />   
                    <Label className="text-muted-foreground">본문</Label>
                </div>    
                {/* <Skeleton  className="w-full h-100"/> */}
                {/* BlockNote Text Editor */}
                <AppEditor props={content} setContent={setContent} />
            </div>
        </section>
        {/* 카테고리 및 썸네일 등록 */}
        <section className="w-1/4 h-full flex flex-col gap-6">
            <div className="flex flex-col pb-6 border-b">
                <span className="text-[#F96589] font-semibold">Step2</span>    
                <span className="text-base font-semibold">카테고리 및 썸네일 등록</span>    
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1"> 
                    <Asterisk size={14} className="text-[#F96859]" />   
                    <Label className="text-muted-foreground">카테고리</Label>
                </div> 
                <Select value={category} onValueChange={(value) =>{setCategory(value)}}>
                    <SelectTrigger className="w-[180px] w-full">
                        <SelectValue placeholder="토픽(주제)선택" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>카테고리(주제)</SelectLabel>
                            {TOPIC_CATEGORY.map((item)=>{
                                return (<SelectItem key={item.id} value={item.category}>{item.label}</SelectItem> )                            })}

                        </SelectGroup>
                    </SelectContent>
                </Select>   
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1"> 
                    <Asterisk size={14} className="text-[#F96859]" />   
                    <Label className="text-muted-foreground">썸네일</Label>
                </div>    
                {/* 썸네일 UI */}
                {/* <Skeleton  className="w-full aspect-video"/> */}
                <AppFileUpload file={thumbnail} onChange={setThumbnail}/>
                <Button variant={"outline"} className="border-0" onClick={()=>setThumbnail(null)}>
                    <ImageOff />
                    썸네일 제거
                </Button>
            </div>


        </section>
    </main>
  )
}
