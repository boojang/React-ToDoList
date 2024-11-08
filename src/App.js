// import logo from './logo.svg';
import { useEffect, useState } from 'react';

// 1.추가 버튼 삭제 버튼 -> 게시판
// 버튼을 누르면 게시판 추가

function App_origin() {
  // setInputValue: useState 함수에서 정의된 상태를 업데이트하는 함수
  // useState: 컴포넌트의 상태를 관리하는 함수
  const [components, setComponents] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // useEffect: 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정
  useEffect(()=>{
    console.log('컴포넌트가 화면에 나타남');
  },[]);

  const handleCountPlus = () => {
    
    //React 컴포넌트 배열을 업데이트 하는 역할
    //새로운 NewComponent를 components 배열에 추가
    // setComponents([...components, <NewComponent key={components.length} id={components.length} text={inputValue} onDone={(id)=>handleListDone(id)} />]);
    setComponents([...components, {id: components.length, text: inputValue} ]);
    setInputValue(''); //입력 필드 초기화 -> 안하면 enter text에 계속 텍스트가 남아있음
    console.log('handleCountPlus실행');
    console.log(components);
  };

  const handleListDone = (index) => {
    // setComponents(components.filter((_, item) => item !== index));
    //1.해당 항목 삭제
    const updatedComponents = components.filter((item) => item.id !== index);
    //2.항목 업데이트
    const NewComponent = updatedComponents.map((item,index)=>({
      ...item, //객체의 모든 속성을 새로운 객체에 복사
      id:index //새로운 객체의 id 속성을 인덱스 값으로 설정
    }));
    setComponents(NewComponent);
    console.log(`Item with id ${index} removed`);

  };

  // 입력 필드의 값이 변경될 때 마다 호출
  // target: 입력 필드를 가리킴
  // event.taregt.value: 입력 필드의 값을 가져온다.
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    console.log('handleInputChange실행'+event.target.value);
  };


  // 매개변수가 있는 경우
  const handleCountPlusAmount = (input) => {
  };

  //{} 가 없으면 객체가 아니라 문자열로 전달된다.
  //{} 가 있어야 'text'라는 key를 가진 객체로 전달된다.
  //NewComponent는 컴포넌트이다.
  //text라는 prop를 받아서 렌더링하는 컴포넌트 이다.
  //<NemComponent/>: 새로운 인스턴스 생성
  const NewComponent = ({id,text, onDone}) => {
    return (
      <div>
        {id+1}. {text}
        <button onClick={()=> onDone(id)}>Done</button>
      </div>
    )
  };

  return (
    <>
      <h1>To Do List</h1>
      <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Enter text" />
      {/* onChange: 필드 값이 변경될 때마다 handleInputChange 함수 호출. + 입력 필드 값 업데이트 */}
      {/* type= text,password,email,number 등이 있다.*/}
      <button onClick={handleCountPlus}>추가</button>
      <div>
        {/*NewComponent 생성*/}
        {components.map((item) => (
          <NewComponent key={item.id} id={item.id} text={item.text} onDone={handleListDone} />
        ))}

      </div>
      {/* 아래는 잘못된 예 */}
      {/* <button onClick={handleCountPlusAmount(10)}>10씩 증가</button> */}

      {/* 매개변수가 있는 경우 아래와 같이 사용해야한다!!!!!!!!!!!!!!!!!!!!! */}
      {/* <button onClick={() => handleCountPlusAmount(10)}>10씩 증가</button> */}
    </>
  );
}

export default App_origin;

