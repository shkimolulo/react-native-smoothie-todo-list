import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import Styled from 'styled-components/native';

import { TodoListContext } from '~/Context/TodoListContext';

import EmptyItem from './EmptyItem';
import TodoItem from './TodoItem';

const Container = Styled(FlatList)`
`;
interface Props {}

/*
# TodoListContext
- useContext 의 초기값으로 설정
- TodoListContext 안에서 사용하고자 하는 todoList 변수와 removeTodoList 함수 불러옴
 */
const TodoList = ({ }: Props) => {
    const { todoList, removeTodoList } = useContext<ITodoListContext>(
        TodoListContext
    );

    return (
/*
# FlatList
- TodoList 컴포넌트는 리액트 네이티브의 리스트 뷰 중 하나인 FlatList 컴포넌트 사용해 만듦
- FlatList 는 아래와 같이 Props 전달하여 사용 가능
    - data: 리스트 뷰에 표시할 데이터 배열
    - keyExtractor
        - 리액트 반복적으로 동일한 컴포넌트 표시위해 컴포넌트에 키 값 설정
        - 리액트는 이 키 값을 보고 컴포넌트 구별하는데 이 키 값을 설정하지 않으면 어떤 컴포넌트 업데이트 해야할 지 구별할 수 없음
        - FlatList 에서 반복적으로 표시하는 Item 에 키 값 설정
    - ListEmptyComponent: 주어진 배열에 데이터 사용해 반복적으로 표시될 컴포넌트
    - renderItem: 주어진 배열에 데이터 사용하여 반복적으로 표시될 아이템
    - contentContainerStyle={todoList.length === 0 && { flex: 1 }}
        - 표시할 데이터가 없는 경우, ListEmptyComponent 의 컴포넌트가 화면에 표시
        - 이 컴포넌트도 하나의 리스트 아이템으로 표시되기 때문에, 전체 화면으로 표시되지 않음
        - 전체 화면으로 표시하기 위해 contentContainerStyle 에 flex: 1 설정
    - https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Flexible_Box_Layout/Flexbox%EC%9D%98_%EA%B8%B0%EB%B3%B8_%EA%B0%9C%EB%85%90
 */
        <Container
            data={todoList}
            keyExtractor={(item, index) => {
                return `todo-${index}`;
            }}
            ListEmptyComponent={<EmptyItem />}
            renderItem={({ item, index }) => (
                <TodoItem
                    text={item as string}
                    onDelete={() => removeTodoList(index)}
                />
            )}
            contentContainerStyle={todoList.length === 0 && { flex: 1 }}
        />
    );
};

export default TodoList;
