
import { useAuthStore } from "@/components/stores";
import { Button, Input } from "@/components/ui";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import supabase from "@/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { NavLink, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod"

 
const formSchema = z.object({
  email: z.email({
    message: "올바른 형식의 이메일 주소를 입력해주세요.",
  }),
  password: z.string().min(8, {
    message: "비밀번호는 최소 8글자 이상이어야 합니다..",
  }),
})

export default function SignUp() {
  
     // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    })
  
    const navigate = useNavigate()

    // const setId = useAuthStore((state) => state.setId);
    // const setEmail = useAuthStore((state) => state.setEmail);
    // const setRole = useAuthStore((state) => state.setRole);
    const setUser = useAuthStore((state) => state.setUser);


    //소셜 로그인(구글)
    const handleGoogleSignIn = async () =>{
      const {error} = await supabase.auth.signInWithOAuth({
        provider:"google",
        options:{
          queryParams :{access_type:"offline" , prompt:"consent" }, 
          // redirectTo : window.location.origin // 로그인 후 돌아올 URL
          redirectTo : `${import.meta.env.VITE_SUPABASE_BASE_URL}/auth/callback` // 로그인 후 돌아올 URL
        }
      })

      if(error) toast.error(error.message)
    }

    //일반 로그인
    const onSubmit = async(values : z.infer<typeof formSchema>) =>{
      
      console.log('로그인 버튼 ')
      try{
        //간편 회원가입..
        const {data :{user,session},error} = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        })

        if(error){
          toast.error(error.message);
          return;
        }

        if(user && session){
            //data.session
            //data.user
            // zustand 전역 상태 관리
            setUser({
              id:user.id,
              email:user.email as string,
              role:user.role as string,
            })
            // setId(user.id as string)
            // setEmail(user.email as string)
            // setRole(user.role as string)
            toast.success("로그인을 성공하였습니다.");
            navigate("/")
            // 로그인 페이지 이동
        }
        
      }catch(error){
        console.log(error)
        throw new Error(`${error}`)
      }

    }
    
  return (

      <main className="w-full h-full max-h-[720px] items-center justify-center flex gap-6 p-6 ">
        <div className="w-100 max-w-100 flex flex-col px-6 gap-6">
          <div className="flex flex-col">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">로그인</h4>
            <p className="text-muted-foreground">로그인을 위한 정보를 입력해주세요.</p>
          </div>
          <div className="grid gap-3">
            {/* 소셜 로그인 */}
            <Button type="button" variant={"secondary"} onClick={handleGoogleSignIn}>
              <img src="/assets/social/google.svg" alt="@GOOGLE_LOG" className="w-[18px] h-[18px] mr-1" />
              구글 로그인
            </Button>
             {/* 경계선 */}

            <div className="relative">
              {/* inset 각각의 탑 레프트 바튼 영역이 0이됨 */}
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px2 text-muted-foreground bg-black uppercase">OR CONTINUE WITH</span>
              </div>
            </div>
            {/* 회원가입 폼 */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이메일</FormLabel>
                      <FormControl>
                        <Input placeholder="이메일을 입력하세요."   {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>비밀번호</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="비밀번호를 입력하세요."  {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <div className="w-full flex flex-col gap-3">
                  <Button type="submit" variant={"outline"} className="flex-1 !bg-sky-800/50">로그인</Button>
                  <div className="text-center">
                    계정이 없으신가요?
                    <NavLink to={"/sign-up"} className="underline ml-1" >회원가입</NavLink>

                  </div>
                </div>
              </form>
            </Form>          
          </div>
        </div>
    </main>
  );
}
