import styled from "styled-components";

export const Wrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 114rem;

  .questionNr {
    font-size: 1.8rem;
    font-weight: 500;
    margin-top: 1rem;
  }

  /* .question {
     margin-bottom: 1rem; 
  } */

  .answers {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

type ButtonWrapperProps = {
  correct: boolean;
  userClicked: boolean;
};

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  transition: all 0.3s ease;

  :hover {
    opacity: 0.8;
  }

  button {
    cursor: pointer;
    user-select: none;
    font-size: 1.6rem;
    width: 100%;

    background: ${({ correct, userClicked }) =>
      correct
        ? "rgba( 131, 225, 29, 0.5 )"
        : !correct && userClicked
        ? "rgba(255, 0, 0, 0.5)"
        : "linear-gradient(135deg, var(--clr-left) 0%, var(--clr-right) 100%)"};

    border: 2px solid var(--clr-brd);
    border-radius: 10px;
    color: var(--clr-white);

    :focus-visible {
      opacity: 0.8;
      transform: scale(0.99);
    }
  }
`;
