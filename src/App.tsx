import React from 'react';
import Styled from 'styled-components/native';

import { TodoListContextProvider } from '~/Context/TodoListContext';
import Todo from './Screens/Todo';

const Container = Styled.View`
  flex: 1;
  background-color: #EEE;
`;

const App = () => {
/*
# TodoListContextProvider
- 앞에서 만든 Context 에서 프로바이더 컴포넌트를 불러와 최상단 공통 부모 컴포넌트에 사용
- App.tsx 컴포넌트를 부모로 하는 모든 컴포넌트에서 할 일 리스트의 Context 사용 가능
 */
  return (
      <TodoListContextProvider>
        <Container>
          <Todo />
        </Container>
      </TodoListContextProvider>
  );
};

export default App;
