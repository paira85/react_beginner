
import supabase from '@/lib/supabase';
import { create } from 'zustand'

// const useStore = create((set) => ({
//   bears: 0,
//   tigers :0,
//   increasePopulation: () => set((state) => ({ bears: state.bears + 1  })),
//   removeAllBears: () => set({ bears: 0 }),
//   updateBears: (newBears) => set({ bears: newBears }),
// }))

//persist : 상태(state)를 브라우저의 스토리(local storage나 세션스토리지)
//페이지를 새로 고침 하거나 브라우저를 닫았다가 다시 열어도 상태를 유지할 수 있게 해주는 기능ㄴ입니다.

//zustand는 리액트에서 사용되는 간단한 글로벌 상태 관리 라이브러리입니다.
//persist 미들웨어를 사용하면 zustand store의 데이터를 브러우저 스토리지에 저장할 수 있습니다.
//이를 통해, 상태를 유지 할 수 있어, 로그인 상태, 장바구니, 테마 설정 등 관리가 가능합니다.

import { persist } from 'zustand/middleware'

interface User {
    id:string;
    email:string;
    role:string;
}
interface AuthStore {
    user : User | null;

    // setId : (id:string) => void;
    // setEmail : (email:string) => void;
    // setRole : (role:string) => void;
    setUser : (newUser:User | null) =>void;
    reset : () => Promise<void>;
}

// export const useAuthStore = create<AuthStore>((set) => ({
//     id: '',
//     email: '',
//     role: '',
//     setId : (newId) => set({id : newId}),
//     setEmail : (newEmail) => set({email : newEmail}),
//     setRole : (newRole) => set({role : newRole}),

//     reset : () => set({
//         id:"",
//         email:"",
//         role:"",
//     })
// }))


export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user:null,
            setUser: (newUser : User | null) => set({ user : newUser }),
            //슈퍼베이스 및 일반 로그 아웃
            reset: async () => {
                await supabase.auth.signOut()
                set({user:null}), //Zustand 상태 초기화
                localStorage.removeItem("auth-storage")
            },
        }),
        {name:"auth-storage",partialize: (state)=>({user:state.user})} //user만 저장
    ),
)