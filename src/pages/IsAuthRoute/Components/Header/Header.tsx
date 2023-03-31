import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import logoPath from "assets/logoPath";

import * as S from "./Header.styled";
import { motion, useAnimation, useScroll } from "framer-motion";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface keywordForm {
  keyword: string;
}
const Header = () => {
  const [searchbarOpen, setSearchbarOpen] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { register, setValue, setFocus, getValues } = useForm<keywordForm>();

  // for search Input open close
  const searchbarAnimation = useAnimation();

  // for navbar scoll down backgroud
  const navAnimation = useAnimation();
  const { scrollY } = useScroll();

  // 같은 주소일때, 클릭금지
  const handleCurrentPage = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    currentPage: string
  ) => {
    if (pathname === currentPage) e.preventDefault();
  };

  // clear storage user info
  const signOut = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/");
  };

  // 검색내용이 없을 때 searchInput외 클릭 시 close searchbar
  const handleOnBlur = () => {
    if (pathname === "/browse/search") {
      return null;
    }

    searchbarOpen && toggleSearch();
  };

  // 실시간 검색을 위해
  const handleOnChange = () => {
    const keyword = getValues("keyword");
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

  // react hook form register
  const searchRegister = register("keyword", {
    onBlur: handleOnBlur,
    onChange: () => handleOnChange(),
  });

  // scrollY를 계산해서 navVariants 실행
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);

  // searchbarOpen시 자동 포커스
  // searchbarOpen에 따라 위치 조절 searchVariants실행
  const toggleSearch = () => {
    setSearchbarOpen((prev) => !prev);
    setFocus("keyword");

    if (searchbarOpen) {
      searchbarAnimation.start({
        scaleX: 0,
      });
    } else {
      searchbarAnimation.start({ scaleX: 1 });
      setValue("keyword", "");
    }
  };

  // framer motion code (state styped Components로 넘기는 법 찾아내기)
  const searchVariants = {
    init: {
      scaleX: "0",
    },
    glasses: {
      x: searchbarOpen ? -185 : 0,
    },
    transition: {
      type: "tween",
    },
  };

  return (
    <S.Wrapper animate={navAnimation}>
      <S.FlexBox>
        <S.Logo onClick={() => navigate("/")}>
          <path d={logoPath} />
        </S.Logo>
        <S.Pages>
          <S.Page currentPage={handleCurrentPage}>
            <Link to="/browse" onClick={(e) => handleCurrentPage(e, "/browse")}>
              Home
              {pathname === "/browse" && <S.RedDot layoutId="circle" />}
            </Link>
          </S.Page>
        </S.Pages>
      </S.FlexBox>
      <S.FlexBox>
        <S.Search>
          <motion.span
            onClick={toggleSearch}
            variants={searchVariants}
            animate={"glasses"}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} size="lg" />
          </motion.span>
          <S.SearchInput
            {...searchRegister}
            variants={searchVariants}
            initial={"init"}
            animate={searchbarAnimation}
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
      </S.FlexBox>
    </S.Wrapper>
  );
};

export default Header;

{
  /* <Item>
            <Link to="/tv">
              Tv Shows
              {pathname === "/tv" && <Circle layoutId="circle" />}
            </Link>
          </Item> */
}
