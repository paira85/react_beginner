import {useState} from "react";
//제7강
function App() {
  //제7강
  const [value , setValue] = useState<number>(0);
  const [name , setName] = useState<string>("빈 문자열로 할당하지 않은 name 상태 값입니다.");
  const [nickName , setNickName] = useState<string>("빈 문자열로 할당하지 않은 nickname 상태 값입니다.");

  const increment = () => setValue(value+1)
  const decrement = () => setValue(value-1)

  const onChaneName = (event:React.ChangeEvent<HTMLInputElement>) => setName(event?.target.value)
  const onChaneNickName = (event:React.ChangeEvent<HTMLInputElement>) => setNickName(event?.target.value)

  return (    
    //UseState는 리액트에서 가장 기본적인 훅이며, 함수 컴포넌트에서 기본적인 상태를 지닐 수 있게 해준다.
    // => 이 함수가 호출되면 배열을 반환한다.
    // => 반환된 배열의 첫 번째 요소는 상태 값, 두 번째 요소는 상태 값을 설정하는 함수
    // => 기본값, 초기값으로 설정
    <div>
      <p>
          현재 카운터 값은 : <b>{value}</b>
      </p>
      <button onClick={increment}>1증가</button>
      <button onClick={decrement}>1감소</button>

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
