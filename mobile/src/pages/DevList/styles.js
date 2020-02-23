import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #f5f5f5;
    align-items: center;
    justify-content: space-between;
`;

export const TindevLink = styled.TouchableOpacity`
`;

export const TindevLogo = styled.Image`
    margin-top: 30px;
`;

export const CardsContainer = styled.View`
    flex: 1;
    align-self: stretch;
    justify-content: center;
    max-height: 500px;
`;

export const Card = styled.View`
    border-width: 1px;
    border-color: #ddd;
    border-radius: 8px;
    margin: 30px;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

export const CardImage = styled.Image`
    flex: 1;
    height: 300px;
`;

export const CardFooter = styled.View`
    background-color: #fff;
    padding: 15px 20px;
`;

export const CardName = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #333;
`;

export const CardBio = styled.Text`
    font-size: 14px;
    color: #999;
    line-height: 18px;
    margin-top: 5px;
`;

export const CardActions = styled.View`
    flex-direction: row;
    margin-bottom: 30px;
`;

export const MatchBtn = styled.TouchableOpacity`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-color: #fff;
    justify-content: center;
    align-items: center;
    margin: 0 20px;
`;

export const BtnImage = styled.Image`   
`;

export const DefaultMsg = styled.Text`
    color: #999;
    font-size: 32px;
    font-weight: bold;
`;