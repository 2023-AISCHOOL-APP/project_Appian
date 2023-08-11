import React from 'react';
import PageTitle from '../Components/PageTitle';
import { Link } from 'react-router-dom';

// 더미 컴포넌트 정의
const Container = ({ children }) => <div>{children}</div>;
const Title = ({ children }) => <h1>{children}</h1>;
const UserInfo = ({ children }) => <div>{children}</div>;
const Id = ({ children }) => <span>{children}</span>;
const Value = ({ children }) => <span>{children}</span>;
const Line = () => <hr />;
const Btn = ({ type, value }) => <button type={type}>{value}</button>;

function Mypage() {
  const user = { userId: 'exampleUser' }; // user 객체가 어디서 오는지에 따라 적절히 변경해야 합니다.

  return (
    <Container>
      <Title>마이 페이지</Title>
      <UserInfo>
        <Id>아이디 : </Id>
        <Value>
          {user.userId}
          <Line />
        </Value>
      </UserInfo>
      <Link to="/mypage/modify">
        <Btn type="submit" value="수정" />
      </Link>
    </Container>
  );
}

export default Mypage;
