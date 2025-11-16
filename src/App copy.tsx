import {useRef}  from "react";
import './App.css';
//제10강
//useRef
//useRef 훅은 함수 컴포넌트에서 ref라는 속성을 쉽게 사용할 수 있도록 도와주는 도구입니다.
//변하지 않는 값을 유지하거나 DOM 요소에 직접 접근할 때 사용 하는 훅입니다.
//useRef 값을 지정하거나 DOM에 접근하기 위해 사용하는 객체를 생성
//저장된 값은 컴포넌트가 리 렌더링 되어도 유지되며, 값이 바뀌어도 리 렌더링을 일이키지 않는다.


//ref 속성은, jsx , tsx에서 요소나 컴포넌트에 참조를 연결하는 역할


// 또는 textarea같은곳에서 마지막에 저장시 사용

export default function App() {
  const inputElement = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  const handleClick = () =>{
    inputElement.current?.focus();
    fileInputRef.current?.click();
  }

  return (    
    
    <div>
      <input type="text" ref={inputElement} />
      <input type="file" ref={fileInputRef} />
      <button onClick={handleClick}>등록</button>
    </div>    
  )
}

