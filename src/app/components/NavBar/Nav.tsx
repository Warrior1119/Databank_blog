import React, { useState, useRef } from 'react';
import styled from 'styled-components/macro';
import { Link as RouterLink } from 'react-router-dom';
import { selectName, selectAvatar } from 'app/slices/selectors';
import { useSelector } from 'react-redux';
import useOutsideClick from './useOutsideClick';

export function Nav() {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const name = useSelector(selectName);
  const avatar = useSelector(selectAvatar);

  const toggle = () => setIsOpen(!isOpen);
  useOutsideClick(ref, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });
  return (
    <Wrapper>
      <Item to="/articles/new">New Post</Item>
      <DropDownContainer>
        <UserInfo onClick={toggle}>
          {avatar ? (
            <Avatar src={avatar} />
          ) : (
            <Noavatar>{(name || '').substr(0, 1).toUpperCase()}</Noavatar>
          )}
          {name}
        </UserInfo>
        {isOpen && (
          <DropDownListContainer ref={ref}>
            <DropDownList>
              <Item to="/profile" onClick={toggle}>
                Profile
              </Item>
              <Item to="/logout" onClick={toggle}>
                Logout
              </Item>
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: flex;
  margin-right: -1rem;
`;

const Item = styled(RouterLink)`
  color: ${p => p.theme.primary};
  cursor: pointer;
  text-decoration: none;
  display: flex;
  padding: 0.25rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }

  .icon {
    margin-right: 0.25rem;
  }
`;

const UserInfo = styled.div`
  color: ${p => p.theme.primary};
  cursor: pointer;
  text-decoration: none;
  display: flex;
  padding: 0.25rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }

  .icon {
    margin-right: 0.25rem;
  }
`;

const Avatar = styled.img`
  border: 1px solid ${p => p.theme.border};
  width: 1.5rem;
  height: 1.5rem;
  padding: 1px;
  border-radius: 50%;
  margin-right: 5px;
`;

const Noavatar = styled.div`
  display: inline-block;
  text-align: center;
  border: 1px solid ${p => p.theme.border};
  color: ${p => p.theme.text};
  width: 1.5rem;
  height: 1.5rem;
  padding: 1px;
  border-radius: 50%;
  margin-right: 5px;
  vertical-align: middle;
`;

const DropDownContainer = styled('div')`
  position: relative;
  display: inline-block;
`;

const DropDownListContainer = styled('div')``;

const DropDownList = styled('ul')`
  position: absolute;
  background-color: ${p => p.theme.background};
  min-width: 120px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
  right: 10px;
  ${Item} {
    padding: 0.8rem 0;
    text-align: center;
    display: block;
  }
`;
