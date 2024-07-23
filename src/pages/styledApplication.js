import styled from "styled-components";
export const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top:24px;
  margin-bottom:24px;
  box-shadow: 15px 15px 10px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    max-width: 100%;
    padding: 10px;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 12px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Button = styled.button`
  width: 60%;
  max-width:400px;
  padding: 10px;
  background-color: #9C3551;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;