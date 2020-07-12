import React from 'react';
import Styled from 'styled-components/native';

/*
- 할 일 리스트 앱은 할 일 리스트를 보여줄 TodoListView 컴포넌트와 할 일을 추가할 수 있는 AddTodo 컴포넌트 가지고 있음
- 한 컴포넌트에 종속되는 컴포넌트는 src/Components 폴더에 생성하여 분리하지 않고, 종속된 컴포넌트 하위 폴더에 생성
- 해당 컴포넌트에 종속된 컴포넌트 쉽게 찾을 수 있으며 공통 컴포넌트와 구별되는 장점 있음
*/
import TodoListView from './TodoListView';
import AddTodo from './AddTodo';

const Container = Styled.View`
    flex: 1;
`;

interface Props {}

const Todo = ({ }: Props) => {
    return (
        <Container>
            <TodoListView/>
            <AddTodo/>
        </Container>
    );
};

export default Todo;
