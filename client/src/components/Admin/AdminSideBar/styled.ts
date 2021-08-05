import styled from "styled-components";

export const SideBarSection = styled.div`
  width: 250px;
  height: 100%;
  color: #1F2123;
  background-color: #1F2123;
  margin-top: 72px;
  position: fixed;
`;

export const SideBarUl = styled.ul`
  width: 250px;
  padding-top: 140px;
  padding-left: 0px;
`;

export const SideBarLi = styled.li`
  :hover {
    opacity: 1 !important;
  }
  height: 49px;
  font-family: 'Avenir-Kefa';
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  color: #FFFFFF;
  list-style-type: none;
  opacity: 0.3;
  display: flex;
  align-items: center;
`;

export const SideBarActive = styled.div`
  width: 4px;
  background-color: white;
  height: 100%;
`;

export const SideBarHref = styled.a`
  color: #ffffff;
  height: 100%;
  width: 100%;
  padding-top: 16px;
  padding-left: 40px;
  :hover {
    color: #ffffff !important;
    opacity: 1 !important;
  }
`;

export const LogoutModalTitle = styled.div`
  margin: 15px auto 0 auto;
  width: 390px;
  font-family: 'Avenir-SFProDisplay';
  font-weight: 700;
  font-size: 34px;
  line-height: 32px;
  text-align: center;
  color: #0A0F2D;
`;

export const LogoutModalFooter = styled.div`
  display: flex;
  margin: 19px 0 30px 0;
  justify-content: center;
`;

export const LogoutModalButton = styled.button`
  width: 250px;
  height: 50px;
  border: 4px;
  color: #ffffff;
  background: #0A0F2D;
  box-shadow: 0px 16px 18px rgba(0, 0, 0, 0.129416), 0px 4px 6px rgba(0, 0, 0, 0.159986);
  border-radius: 4px;
  font-family: 'Avenir-SFProDisplay';
  font-size: 16px;
  line-height: 24px;
  margin: 0 15px !important;
  cursor: pointer;
`;
