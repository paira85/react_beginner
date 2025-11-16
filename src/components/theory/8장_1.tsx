import {useState , useEffect}  from "react";
//제8-1강
function Timer(){
  const [count , setCount] = useState<number>(0);

  useEffect( () => {
    const id = setInterval( () => {
      console.log("Interval 실행")
      setCount( (c) => c+1);
    }, 1000)

    return () => {
      console.log("cleanup ")
      clearInterval(id)
    }   
  },[])

      
  return <div>카운트 : {count}</div>
}

export default function App() {
  //제8-1강
  
  const [visible , setVisible] = useState<boolean>(true);
  return (    
    
    <div>
      {visible && <Timer />}
      <button onClick={ () => setVisible(!visible) }> {visible ? "숨기기":"보이기"}</button>

    </div>
    
  )
}

