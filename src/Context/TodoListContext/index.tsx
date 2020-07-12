/*
# createContext, useState, useEffect
- createContext: Context 생성
- useState: 생성한 State 데이터를 Context 안에 저장하고 Context 의 데이터 수정 가능
- useEffect: 라이프 사이클 함수와 같이 AsyncStorage 에 저장된 데이터 가져와 설정하도록 할 예정
 */
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

interface Props {
    children: JSX.Element | Array<JSX.Element>;
}

/*
# createContext
- 초기값 할당하여 Context 생성 가능
- @types/index.d.ts 에 정의한 타입 사용하여 Context 의 데이터 타입 지정
- 문자열 배열인 todoList, todoList 에 데이터 추가위한 addTodoList 함수, 데이터 삭제위한 removeTodoList 함수 할당
- 함수 초기값은 빈 배열, 아무 기능하지 않는 빈 함수를 임시로 대입
- 실제 구현은 Context 의 프로바이더 컴포넌트에서 할 예정
 */
const TodoListContext = createContext<ITodoListContext>({
    todoList: [],
    addTodoList: (todo: string): void => {},
    removeTodoList: (index: number): void => {},
});

/*
# ContextProvider
- Context 사용위해 공통 부모 컴포넌트에서 Context 의 프로바이더 사용
- Context 의 프로바이더 컴포넌트 만들고 공통 부모 컴포넌트의 부모 컴포넌트로서 사용

# TodoListContextProvider
- Context 의 프로바이더 컴포넌트, 공통 부모 컴포넌트의 부모 컴포넌트가 될 예정
- 자식 컴포넌트를 children 매개변수 통해 전달받음
- 전달받은 자식 컴포넌트(공통 부모 컴포넌트)는 createContext 로 생성한 Context 프로바이더인 TodoListContext.Provider의 하위에 위치하도록 설정
 */
const TodoListContextProvider = ({ children }: Props) => {
/*
# useState
- Context 사용위해 만든 프로바이더 컴포넌트도 리액트 네이티브 컴포넌트이므로, 컴포넌트 안에서 수정 가능한 데이터 사용 위해서는 useState 사용해야 함
- 우리가 만들 Context 데이터는 문자열 배열의 할 일 리스트이고, 이 Context 데이터에 데이터를 추가, 삭제
- Context 프로바이더 컴포넌트에서 useState 사용하여 문자열 배열( Array<string> ) 의 할 일 리스트(todoList) 선언하고, 이 데이터를 setTodoList 함수 통해 추가하거나 삭제하여 Context 데이터 다룸
 */
    const [todoList, setTodoList] = useState<Array<string>>([]);

/*
# addTodoList
- 할 일 리스트에 할 일 추가
- useState 로 만든 todoList 는 수정할 수 없는 불변값
- 새로운 list 변수 생성하여 todoList 의 모든 데이터 넣고 (...todoList), 매개변수로 전달받은 새로운 데이터(todo)를 추가했다.
- 이렇게 추가된 데이터를 setTodoList 통해 State 값 변경
- setItem 은 키 값 형태로 데이터 관리하고 키 값은 모두 문자열이어야 함
- 따라서 문자열 배열인 데이터를 JSON.stringfy 함수 사용해 문자열로 변경해 저장
 */
    const addTodoList = (todo: string): void => {
        const list = [...todoList, todo];
        setTodoList(list);
        AsyncStorage.setItem('todoList', JSON.stringify(list));
    };

/*
# removeTodoList
- 할 일 리스트에 할 일 제거
- 삭제하고자 하는 할 일 리스트의 index 전달하여 삭제
- todoList 는 State 값이므로 직접 변경이 불가능
- 따라서 todoList 복사하여 새로운 배열 생성
- 삭제하고자 하는 데이터 제거하고, setTodoList 사용하여 State 에 제거된 데이터 저장
*/
    const removeTodoList = (index: number): void => {
        let list = [...todoList];
        list.splice(index, 1);
        setTodoList(list);
/*
# AsyncStorage
- 물리적으로 저장된 값도 업데이트
 */
        AsyncStorage.setItem('todoList', JSON.stringify(list));
    };

/*
# initData
- 앱이 시작될 때, AsyncStorage 에 저장된 데이터 불러와 Context 값을 초기화하기 위한 함수
- AsyncStorage 의 setItem, getItem 은 모두 Promise 함수
- setItem 을 한 후 특정한 작업을 하지 않아서 비동기로 데이터 처리했지만 여기에서는 값을 바로 초기화하기 위해 async-await 로 동기화 처리
- AsyncStorage 에 저장된 값은 문자열이므로 이 데이터를 JSON.parse 함수 사용해 문자열 배열로 변환
 */
    const initData = async () => {
        try {
            const list = await AsyncStorage.getItem('todoList');
            if (list !== null) {
                setTodoList(JSON.parse(list));
            }
        } catch (e) {
            console.log(e);
        }
    };
/*
# useEffect
- 클래스 컴포넌트의 라이프 사이클 함수와 비슷한 역할
- 첫 번째 매개변수로 함수 전달, 그 함수에서 데이터 초기화하는 함수 호출
- 두 번째 매개변수로 빈 배열 전달, 컴포넌트가 화면에 처음 표시된 후 한 번만 호출되는 componentDidMount 같은 역할 수행
*/
    useEffect(() => {
        initData();
    }, []);

    return (
        <TodoListContext.Provider
            value={{
                todoList,
                addTodoList,
                removeTodoList,
            }}>
            {children}
        </TodoListContext.Provider>
    );
};

/*
Context 제공하기 위해 프로바이더 컴포넌트와 Context 내보냄
 */
export { TodoListContextProvider, TodoListContext };
