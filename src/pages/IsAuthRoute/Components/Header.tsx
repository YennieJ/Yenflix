import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion, useAnimation, useScroll } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import logoPath from "assets/logoPath";
const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  background-color: black;
  font-size: 14px;
  padding: 10px;
  color: white;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 6px;
    stroke: white;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

const Search = styled.div`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  margin-right: 10px;
  cursor: pointer;
  svg {
    height: 25px;
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 5px 10px 5px 40px;
  z-index: -1;
  color: white;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.lighter};
`;

const UserButton = styled(motion.button)`
  padding: 0;
  border: none;
  background: none;
  position: relative;

  img {
    border-radius: 5px;
  }

  div {
    position: absolute;
    right: 0;
    color: white;

    padding-top: 3px;
    span {
      display: block;
      text-align: end;
      font-size: 18px;
      padding-right: 7px;
    }
    ul {
      width: 200px;
      padding: 20px 0;
      border: 1px solid rgb(100, 100, 100);
      background-color: rgba(0, 0, 0, 0.9);

      li {
        font-size: 15px;
        /* :hover { */
        text-decoration: underline;
        text-underline-offset: 5px;
        /* } */
      }
    }
  }
`;

const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1, 0],
    transition: {
      repeat: Infinity,
    },
  },
};
const navVariants = {
  top: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  scroll: {
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
};

interface IForm {
  keyword: string;
}
const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  const navigate = useNavigate();

  const { pathname } = useLocation();
  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();
  const { scrollY } = useScroll();

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
    setFocus("keyword");

    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({ scaleX: 1 });
      setValue("keyword", "");
    }
  };

  const handleOnBlur = () => {
    if (pathname === "/browse/search") {
      return null;
    }
    searchOpen && toggleSearch();
  };

  const { register, setValue, setFocus } = useForm<IForm>();

  // const onValid = (data: IForm) => {
  //   navigate(`/browse/search?keyword=${data.keyword}`, {
  //     state: {
  //       keyword: `${data.keyword}`,
  //     },
  //   });
  // };

  const handleOnChange = (e: any) => {
    const keyword = e.target.value;
    if (keyword === "") {
      navigate("/browse");
    } else {
      navigate(`/browse/search?keyword=${keyword}`, {
        replace: true,
        state: {
          keyword: `${keyword}`,
        },
      });
    }
  };

  const signOut = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");
  };

  return (
    <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
      <Col>
        <Logo
          variants={logoVariants}
          whileHover="active"
          initial="normal"
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 1024 276.742"
        >
          <motion.path d={logoPath} fill="#d81f26" />
        </Logo>
        <Items>
          <Item>
            <Link to="/">
              Home
              {pathname === "/browse" && <Circle layoutId="circle" />}
            </Link>
          </Item>
          {/* <Item>
            <Link to="/tv">
              Tv Shows
              {pathname === "/tv" && <Circle layoutId="circle" />}
            </Link>
          </Item> */}
        </Items>
      </Col>
      <Col>
        <Search>
          <motion.svg
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -185 : 0 }}
            transition={{ type: "tween" }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <Input
            {...register("keyword", {
              onBlur: handleOnBlur,
              onChange: (e) => handleOnChange(e),
              required: true,
              minLength: 2,
            })}
            transition={{ type: "tween" }}
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
            placeholder="Search for movie or tv show..."
          />
        </Search>
        <UserButton
          onHoverStart={() => {
            setSidebar(true);
          }}
          onHoverEnd={() => {
            setSidebar(false);
          }}
        >
          <img
            src="http://occ-0-325-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABY20DrC9-11ewwAs6nfEgb1vrORxRPP9IGmlW1WtKuaLIz8VxCx5NryzDK3_ez064IsBGdXjVUT59G5IRuFdqZlCJCneepU.png?r=229"
            alt=""
          />
          {sidebar ? (
            <div>
              <span>▴</span>
              <ul>
                <li onClick={signOut}>넷플릭스에서 로그아웃</li>
              </ul>
            </div>
          ) : (
            ""
          )}
        </UserButton>
      </Col>
    </Nav>
  );
};

export default Header;
