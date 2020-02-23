import styled from 'styled-components';

export const Container = styled.div`
    max-width: 980px;
    margin: 0 auto;
    padding: 50px 0;
    text-align: center;
`;

export const TindevLogo = styled.img``;

export const DevelopersList = styled.ul`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
    margin-top: 50px;
`;

export const DeveloperItem = styled.li`
    display: flex;
    flex-direction: column;
`;

export const DeveloperImage = styled.img`
    max-width: 100%;
    height: 268px;
    border-radius: 5px 5px 0 0;
`;

export const DeveloperFooter = styled.footer`
    flex: 1;
    background-color: #fff;
    border: 1px solid #eee;
    padding: 15px 20px;
    text-align: left;
    border-radius: 0 0 5px 5px;
`;

export const DeveloperName = styled.strong`
    font-size: 1rem;
    color: #333;
`;

export const DeveloperBio = styled.p`
    font-size: 0.875rem;
    line-height: 20px;
    color: #999;
    margin-top: 5px;
`;

export const DeveloperButtons = styled.div`
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
`;

export const MatchBtn = styled.button`
    height: 50px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05);
    border: 0;
    border-radius: 4px;
    background-color: #fff;
    cursor: pointer;
    :hover {
        background-color: #ddd;
    }
`;

export const BtnImage = styled.img`
    :hover {
        transform: translateY(-5px);
        transition: all 0.2s;
    }
`;

export const DefaultMsg = styled.div`
    color: #999;
    font-size: 2rem;
    font-weight: bold;
    margin-top: 200px;
`;