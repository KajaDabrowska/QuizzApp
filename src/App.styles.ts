import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
/* --------------------- */
/*          Reset        */
/* --------------------- */

*,
*::before,
*::after {
  box-sizing: border-box;
}

body,
h1,
h2,
h3,
h4,
h5,
p,
figure,
picture {
  margin: 0;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  font-weight: 400;
}

html {
  font-size: 62.5%;
  height: 100%;
}

body {
  font-family: 'Poppins', sans-serif;
  font-size: 1.6rem;
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  line-height: 1.5;
  min-height: 100vh;
  margin: 0;
  padding: 0;
    
  overflow-x: hidden;

  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}


img,
picture {
  max-width: 100%;
  /* display: block; */
}

input,
button,
textarea,
select {
  font: inherit;
  /* color: inherit; */
}

/* remove animations for people who've turned them off */
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}  
    
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > p {
    color: #fff;
  }

  .card {
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);

    padding: 4rem 3rem;

    color: #fff;

    display: flex;
    flex-direction: column;
  }

  .score {
    color: #fff;
    font-size: 2rem;
    margin: 0;
  }

  h1 {
    font-family: "Poppins";
    font-weight: 700;
    font-size: 6rem;
    letter-spacing: 0.4rem;
    text-align: center;
    margin: 0px;
    margin-bottom: 2.5rem;
  }

  .form-opt {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 1.5rem;
  }

  .btn {
    cursor: pointer;
    margin: 10px 0;
    padding: 10px 40px;

    color: #fff;
    background-color: rgb(144, 19, 254);
    background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: 2px solid rgba(144, 19, 254, 0.5);
    border-radius: 10px;
  }

  .start {
    align-self: center;
    margin-top: 2rem;
  }

  .select {
    background-color: #6441a5;
    padding: 0.5rem 1rem;
  }

  .next {
    align-self: center;
    margin-top: 2rem;
    border: 2px solid rgba(144, 19, 254, 0.5);
    border-radius: 10px;
  }
`;
