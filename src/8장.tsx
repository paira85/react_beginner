import {useState , useEffect}  from "react";
//제7강
function App() {
  //제7강
  const [value , setValue] = useState<number>(0);
  const [name , setName] = useState<String>("빈 문자열");
  const [nickName , setNickName] = useState<String>("빈 문자열");

  const increment = () => setValue(value+1)
  const decrement = () => setValue(value-1)

  const onChaneName = (event:React.ChangeEvent<HTMLInputElement>) => setName(event?.target.value)
  const onChaneNickName = (event:React.ChangeEvent<HTMLInputElement>) => setNickName(event?.target.value)

  useEffect( () => {
    console.log("name이 변경 될때만 수행")
    console.log("name ", name)
    console.log("nickName ", nickName)

  },[])
  
  useEffect( () => {
    console.log("nickName 변경 될때만 수행")
    console.log("name ", name)
    console.log("nickName ", nickName)
  },[nickName])

  return (    
    //useEffect
    // useEffect는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정할 수 있는 훅입니다.
    // 마운트가 될 때, 실행하고 싶을 때
    // 마운트란, 리액트 Dom에 우리가 return 키워드의 하단에 작성한 html, css 영역
    // 즉 UI가 붙었을 때 => html을 자바스크립트로 통제 가능할 때
    // useEffect에서 설정한 함수를 컴포넌트,가 화면에 맨 처음 렌더링 될 때만 실행하고,
    // 업데이트 될 때는 실행하지 않으려면, 함수에 두 번째 파라미터로 빈 배열을 넣어주면 된다.


    //EX1 : useState가 변경되면 useEffect 는 계속 수행
    //EX2 : 1회만 수행하고 싶다면, useState가 변경되면 useEffect ,[] 배열 값 추가
    //ex3 : 특정값이 업데이트 될때 수행하고 싶다면, useEffect ,[name]
    <div>
      <div>
        <input type="text" value={name} onChange={onChaneName} />
        <br></br>
        <input type="text" value={nickName}  onChange={onChaneNickName} />
      </div>

      <div>
        <b>이름 : {name}</b>
        <b>닉네임 : {nickName}</b>
      </div>

    </div>
    
  )
}

export default App
