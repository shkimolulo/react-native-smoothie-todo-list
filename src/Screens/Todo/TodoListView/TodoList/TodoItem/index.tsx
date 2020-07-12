import React from 'react';
import Styled from 'styled-components/native';

const Container = Styled.View`
    flex-direction: row;
    background-color: #FFF;
    margin: 4px 16px;
    padding: 8px  16px;
    border-radius: 8px;
    align-items: center;
`;

const Label = Styled.Text`
    flex: 1;
`;

const DeleteButton = Styled.TouchableOpacity``;
const Icon = Styled.Image`
    width: 24px;
    height: 24px;
`;

interface Props {
    text: string;
    onDelete: () => void;
}

/*
- 부모 컴포넌트로부터 할 일 데이터 하나(text: string) 전달받아 화면에 표시
- 해당 할 일 데이터 지우기 위한 삭제 함수( onDelete: () => void ) 전달받아, 삭제 아이콘 선택하였을 시, 데이터 삭제하도록 설정
 */
const TodoItem = ({ text, onDelete }: Props) => {
    return (
        <Container>
            <Label>{text}</Label>
            <DeleteButton onPress={onDelete}>
                <Icon source={require('~/Assets/Images/remove.png')} />
            </DeleteButton>
        </Container>
    );
};

export default TodoItem;
