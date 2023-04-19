import styled from "styled-components";

const Spinner = () => {
  return (
    <Container>
      <Loader />
      <ReaderText>Results are loading</ReaderText>
    </Container>
  );
};

export default Spinner;

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 2rem 0;
`;

const Loader = styled.span`
  border: 16px solid var(--white);
  border-radius: 50%;
  border-top: 16px solid var(--black);
  display: block;
  width: 120px;
  height: 120px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ReaderText = styled.p`
  opacity: 0;
  width: 0;
  height: 0;
`;
