import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import logoPath from "assets/logoPath";

import * as S from "./Header.styled";
import { motion, useAnimation, useScroll } from "framer-motion";

export const navVariants = {
  top: {
    background: "linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
  },
  scroll: {
    background: "linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 1))",
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
    <S.Nav variants={navVariants} animate={navAnimation} initial={"top"}>
      <S.Col>
        <S.Logo
          // navigate 사용한 이유는 리로드했으면해서임
          onClick={() => navigate("/")}
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 1024 276.742"
        >
          <motion.path d={logoPath} fill="#d81f26" />
        </S.Logo>
        <S.Items>
          <S.Item>
            <Link to="/browse">
              Home
              {pathname === "/browse" && <S.Circle layoutId="circle" />}
            </Link>
          </S.Item>
          {/* <Item>
            <Link to="/tv">
              Tv Shows
              {pathname === "/tv" && <Circle layoutId="circle" />}
            </Link>
          </Item> */}
        </S.Items>
      </S.Col>
      <S.Col>
        <S.Search>
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
          <S.Input
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
        </S.Search>
        <S.UserButton
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
          {sidebar && (
            <div>
              <span>▴</span>
              <ul>
                <li onClick={signOut}>넷플릭스에서 로그아웃</li>
              </ul>
            </div>
          )}
        </S.UserButton>
      </S.Col>
    </S.Nav>
  );
};

export default Header;
