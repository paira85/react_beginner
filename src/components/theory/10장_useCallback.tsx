import {useState , useEffect, useMemo, useCallback}  from "react";
//제9강

//계산되는 데이터를 반복적으로 사용할때는, 최종 결과 값이 변경 되면 렌더링 되도록 사용
//불필요한 렌더링 + 계산에 대한 자원 낭비를 축소?


const getAverage = (numbers:number[]) =>{
  console.log("평균 값을 계산 중입니다.")
  if(numbers.length === 0) return 0;

  // reduce()메서드를 호출하면 배열을 상대로 각 요소인자로 넘어온 콜백 함수를 실행하여 누적된 하나의 결과값을 반환한다.

  // accumulator: 이전 요소를 상대로 콜백 함수를 실행한 결과 (누적자)
  // currentValue: 현재 요소의 값
  // currentIndex: 현재 요소의 인덱스
  // array: reduce() 메서드를 호출하는 배열

  //배열의 키별로 카운터 처리
  const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
  
  //counter => 어떤한 형태의 결과 값이 될 수 있음, 최초 지정한 타입
  const fruitCounts = fruits.reduce((counter, fruit) => {
    counter[fruit] = fruit in counter ? counter[fruit] + 1 : 1;
    // ^? (parameter) counter: {}
    return counter;
  }, {});
  console.log('fruitCounts' , fruitCounts); // { apple: 3, banana: 2, orange: 1 }

  // 중복값 제거 함수 new Set()
  const users = [
    { name: "John", age: 25, country: "US" },
    { name: "Jane", age: 30, country: "KR" },
    { name: "Robin", age: 22, country: "CA" },
    { name: "Doe", age: 13, country: "US" },
    { name: "Smith", age: 20, country: "KR" },
  ];
  const distinctCountries = users.reduce((countries, user) => {
    countries.add(user.country);
    return countries;
  }, new Set());
  console.log('distinctCountries' , distinctCountries)

  const sum = numbers.reduce((acc,cur) => acc + cur);
  return sum / numbers.length;
}


export default function App() {
  //제10강
  //useCallback
  

  const[list , setList] = useState<number[]>([])
  const [number , setNumber] = useState<string>("");

  //ex
  //onChagne처럼 비어 있는 배열을 넣게 되면 컴포넌트가 렌더링 될때, 만들었던 함수를 계속해서 재사용하게 되며
  //onInsert처럼 배열 안에 number, list를 넣게 되면, 인풋 내용이 바뀌거나 새로운 항목이 추가 되었을 때 새로 만들어진 함수를 사용하게 된다.

  // useEffect처럼 최초에 한번만생성하고 사용, 렌더링 될때마다 수행되지 않음
  // const onChange = useCallback( (event:React.ChangeEvent) =>{
  //   console.log('onChange')
  //   setNumber(event.target.value)
  // },[])

  const onChange =  (event:React.ChangeEvent) =>{
    console.log('onChange')
    setNumber(event.target.value)
  }


  const onInsert = useCallback(()=>{
    console.log('onInsert')
    const newList = list.concat(parseInt(number));
    setList(newList);
    setNumber("")
  },[number,list]) 

  // const onInsert = () => {
  //   //concat : array 인스턴스틔 concat 함수는 두 개 이상의 배열을 병합하는 데 사용합니다.
  //   //이 메서드는 기존 배열을 변경하지 않고, 새 배열을 반환합니다.

  //   const newList = list.concat(parseInt(number));
  //   setList(newList);
  //   setNumber("")
  // }

  const average = useMemo( () => getAverage(list),[list] )
  return (    
    
    <div>
      <input type="text" value={number} onChange={
        onChange
        //(event)=>setNumber(event?.target.value)
        } />
      <button onClick={onInsert}>등록</button>

      <ul>
        {list.map( (item : number , index:number)=>{
            return <li key={index}>{item}</li>
        })}

      </ul>

      <div>
        <b>평균 값 : {average}</b>
      </div>
    </div>
    
  )
}

