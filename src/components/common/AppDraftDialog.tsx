import {
    Badge,
    Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui"
import { Separator } from "@radix-ui/react-separator";
import { useAuthStore } from "../stores";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";
import { toast } from "sonner";
import dayjs from "dayjs"; // 올바른 import 방법
import { TOPIC_STATUS, type Topic } from "@/types/topic.type";
import { useNavigate } from "react-router";

interface Props{
    children:React.ReactNode;
}
export function AppDraftDialog({children}:Props) {
    const user = useAuthStore((state) =>state.user);
    const [drafts, setDrafts] = useState<any[]>([]);
    const navigate = useNavigate();
    const fetchDrafts = async() =>{
        if (!user) return;
        try{
            let { data: topics, error } = await supabase
            .from('topic')
            .select("*")
            .eq("author",user.id)
            .eq("status",TOPIC_STATUS.TEMP)

            console.log('topic' , topics)

            if (error) {
                toast.error(error.message)
            }

            if(topics) setDrafts(topics)
        }catch (error){
            console.log(error)
        }
    }
    useEffect(()=>{
        if (!user) return;
        if(user.email) fetchDrafts();
    },[])
  return (
    <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>임시 저장된 토픽</DialogTitle>
            <DialogDescription>
               임시 저장된 토픽 목록입니다. 이어서 작성하거나 삭제할 수 있습니다.
            </DialogDescription>
            </DialogHeader>

            <div className="grid gap-3 py-4">
                <div className="flex items-center gap-2">
                    <p>임시 저장</p>
                    <p className="text-base text-green-600 -mr-[6px]">{drafts.length}</p>
                    <p>건</p>
                </div>
                <Separator />
                {
                    drafts.length > 0 ? (
                        <div className="min-h-60 h-60 flex items-center justify-start flex-col gap-3 overflow-y-scroll">
                        {
                            drafts.map( (draft:Topic, index:number)=>{
                            return (
                                    <div className="w-full flex items-center justify-between py-2 gap-3 px-4 rounded-md bg-card/50 cursor-pointer" onClick={()=>{navigate(`/topics/${draft.id}/create`)}} >
                                        <div className="flex items-start gap-2">
                                            <Badge className="w-5 h-5 mt-[3px] rounded-sm aspect-square text-foreground bg-[#E26F24] hover:bg-[#E26F24]">{index +1 }</Badge>
                                            <div className="flex flex-col">
                                                <p className="line-clamp-1">{draft.title}</p>
                                                <p className="text-xs text-muted-foreground">작성일 : {dayjs(draft.created_at).format("YYYY. MM. DD")}</p>
                                            </div>
                                        </div>
                                        <Badge variant={"outline"}>작성중</Badge>
                                    </div>
                                    
                                );
                            })
                        }
                        </div>                                
                     ) : (
                        <div className="min-h-60 flex items-center justify-center">
                            <p className="text-muted-foreground/50">조회 가능한 정보가 없습니다.</p>
                        </div>     
                    )
                }
               

            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant={"outline"}>닫기</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
