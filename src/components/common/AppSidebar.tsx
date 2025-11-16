import { ChevronDown } from "lucide-react"
import { CLASS_CATEGORY } from "../../constants/category.constant"
import { Button } from "../ui"

interface Props{
    category :string | null;
    setCategory : (value:string) => void;
}
function AppSidebar({category,setCategory} : Props) {
{/*카테고리 사이드 바  */}
    return (
        <aside className="min-w-60 w-60 flex flex-col gap-6">
            <div className="flex items-center gap-2">
            {/* shadcn ui의 typography h4 컴포넌트 그대롤 사용 */}
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">카테고리 </h4>
            <ChevronDown className='mt-1' />
            </div>
            <div className="w-full flex flex-col gap-2">
                {CLASS_CATEGORY.map((item)=>{
                return (
                    // variant={"ghost"}콤보박스의 배경 스타일
                    // { justify-start : 정렬 관련 (Flexbox) justify-content: flex-start; → flex 아이템들을 왼쪽 정렬 }
                    // { text-muted-foreground 글자색 설정 보통 테마에서 “흐릿한 전경색”(회색톤 텍스트)으로 지정됨 }
                    // { hover:text-white	호버 시 글자색 변경	마우스를 올리면 글자색이 하얗게 바뀜}
                    // { hover:pl-6	호버 시 왼쪽 여백 변경	마우스를 올리면 padding-left: 1.5rem; (기본 6단계) 적용됨 }
                    // { transition-all	전환 효과 적용	모든 속성(색상, 여백 등)에 트랜지션(부드럽게 변화) 효과를 줌}
                    // { duration-500	전환 시간 설정	트랜지션 효과가 0.5초(500ms) 동안 실행됨
                    <Button key={item.id} variant={"ghost"} className={`justify-start text-muted-foreground hover:Text-white hover:pl-6 transition-all duration-500 ${category === item.category && "text-foreground !pl-6 bg-accent/50"}`}
                        onClick={()=>{setCategory(item.category)}}>
                    {item.icon}
                    {item.label}
                    </Button>
                )
                })}

            </div>
        </aside>
    )
}

export {AppSidebar}
