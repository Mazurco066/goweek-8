import styled from 'styled-components';

export const Container = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const TindevLogo = styled.img`
`;

export const SignInForm = styled.form`
    width: 100%;
    max-width: 300px;
    display: flex;
    flex-direction: column;
`;

export const SignInInput = styled.input`
    margin-top: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    height: 48px;
    padding: 0 20px;
    font-size: 1rem;
    color: #666;
    ::placeholder {
        color: #999;
    }
`;

export const SignInButton = styled.button`
    margin-top: 10px;
    border: 0;
    border-radius: 4px;
    height: 48px;
    font-size: 1rem;
    background-color: #DF4723;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
    :hover {
        background-color: #ddd;
        color: #DF4723;
    }
`;
