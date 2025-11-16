import { useAuthStore } from "@/components/stores";
import supabase from "@/lib/supabase";
import { useEffect } from "react";
import { useNavigate } from "react-router"
import { toast } from "sonner";

export default function AuthCallback() {
    const navigate = useNavigate();
    useEffect(()=>{
        const handleAuthCallBack = async () =>{
            const {
                data:{session},
                error:sessionError
            } = await supabase.auth.getSession();

            if (sessionError || !session){
                console.error("세션 처리 오류, 다시 로그인 페이지로 리디렉션합니다.", sessionError)
                toast.error("로그인 처리 중 오류가 발생했습니다.")
                
                navigate("sign-in")
                return;
            }

            toast.success("로그인을 성공하였습니다.")
            navigate("/")
        }

        handleAuthCallBack()
    }, [navigate])
    // const navigate = useNavigate();
    // const setUser = useAuthStore((state) => state.setUser)

    // useEffect(()=>{
    //     console.log('callback')
    //     const {data:listener} = supabase.auth.onAuthStateChange(async(_event,session)=>{
    //        if(!session?.user) {
    //             console.error('세션에 사용자 정보가 없습니다.')
    //             return;
    //        }

    //        const user = session.user;
    //        if(!user.id){
    //             console.error("유자 ID가 없습니다.");
    //             return;
    //        }

    //        const { data:existing, error:selectError } = await supabase
    //         .from('user')
    //         .select("id")
    //         .eq("id",user.id)
    //         .single()

    //         if(selectError){
    //             return;
    //         }

    //         if(!existing){
    //             const { error:insertError} = await supabase
    //             .from('user')
    //             .insert([
    //             { 
    //                 id:user.id, 
    //                 email:user.email,
    //                 service_agreed: true, 
    //                 privacy_agreed: true,  
    //                 marketing_agreed: false },
    //             ])

    //             if (insertError){
    //                 console.error("USER 테이블 삽입 중 에러가 발생하였습니다.")
    //                 return;
    //             }
    //             setUser(
    //                 {
    //                     id:user.id || "알 수 없는 사용자",
    //                     email:user.email|| "",
    //                     role:user.role || "",
    //                 }
    //             )
    //             navigate("/")
    //         }
            
            
    //     })

    //     //언마운트시 구독 해지
    //     return () =>{
    //         listener.subscription.unsubscribe();
    //     }
    // })
    return (
        <main className="w-full h-full max-h-[720px] items-center justify-center">로그인을 진행 중입니다.</main>
    )
}
