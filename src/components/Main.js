import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PostModal from "./PostModal";
import { connect } from "react-redux";
import { getArticleApi } from "../actions";
import ReactPlayer from "react-player";

const Main = (props) => {
  const [showModal, setShowModal] = useState("close");

  useEffect(() => {
    props.getArticles();
  }, []);
  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;

      default:
        setShowModal("close");
        break;
    }
  };
  return (
    <div>
      {props.articles.length === 0 ? (
        <p>There are no articles</p>
      ) : (
        <Container>
          <ShareBox>
            <div>
              {props.user && props.user.photoURL ? (
                <img src={props.user.photoURL} alt="" />
              ) : (
                <img src="/images/user.svg" alt="" />
              )}

              <button
                disabled={props.loading ? true : false}
                onClick={handleClick}
              >
                Start a post
              </button>
            </div>
            <div>
              <button>
                <img src="/images/image.svg" alt="" />
                <span>Photo</span>
              </button>
              <button>
                <img src="/images/video.svg" alt="" />
                <span>Video</span>
              </button>
              <button>
                <img src="/images/event.svg" alt="" />
                <span>Event</span>
              </button>
              <button>
                <img src="/images/article.svg" alt="" />
                <span>Write article</span>
              </button>
            </div>
          </ShareBox>
          <Content>
            {props.loading && <img src="" alt="loader" />}
            {props.articles.length > 0 &&
              props.articles.map((article, key) => (
                <Article key={key}>
                  <SharedActor>
                    <a>
                      <img src={article.actor.image} />
                      <div>
                        <span>{article.actor.title}</span>
                        <span>{article.actor.description}</span>
                        <span>
                          {article.actor.date.toDate().toLocaleDateString()}
                        </span>
                      </div>
                    </a>
                    <aside>
                      <img src="/images/elipses.svg" alt="" />
                    </aside>
                  </SharedActor>
                  <Description>{article.description}</Description>
                  <SharedImg>
                    <a>
                      {!article.sharedImg && article.video ? (
                        <ReactPlayer width="100%" url={article.video} />
                      ) : (
                        article.sharedImg && (
                          <img src={article.sharedImg} alt="" />
                        )
                      )}
                    </a>
                  </SharedImg>
                  <SocialCount>
                    <li>
                      <button>
                        <img
                          src="https://static-exp1.licdn.com/sc/h/8ekq8gho1ruaf8i7f86vd1ftt"
                          alt=""
                        />
                        <img
                          src="https://static-exp1.licdn.com/sc/h/b1dl5jk88euc7e9ri50xy5qo8"
                          alt=""
                        />
                        <span>75</span>
                      </button>
                    </li>
                    <li>
                      <a>{article.comments}</a>
                    </li>
                  </SocialCount>
                  <SocialActions>
                    <button>
                      <img src="/images/like.svg" alt="" />
                      <span>Like</span>
                    </button>
                    <button>
                      <img src="/images/comments.svg" alt="" />
                      <span>Comments</span>
                    </button>
                    <button>
                      <img src="/images/share.svg" alt="" />
                      <span> Share</span>
                    </button>
                    <button>
                      <img src="/images/send.svg" alt="" />
                      <span>Send</span>
                    </button>
                  </SocialActions>
                </Article>
              ))}
          </Content>
          <PostModal showModal={showModal} handleClick={handleClick} />
        </Container>
      )}
    </div>
  );
};

const Container = styled.div`
  grid-area: main;
`;
const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 28%);
`;
const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0px 0px 8px;
  background: white;
  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-weight: 600;
    }
    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px 0px 16px;
      img {
        width: 48px;
        border-radius: 50%;
        margin-right: 8px;
      }
      button {
        margin: 4px 0px;
        flex-grow: 1;
        border: 1px solid rgba(0, 0, 0, 0.15);
        border-radius: 35px;
        padding-left: 16px;
        text-align: left;
        background-color: white;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        img {
          margin: 0px 4px 0px -2px;
          color: red;
        }
        span {
          color: #78b5f9;
        }
      }
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
  overflow: visible;
`;
const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 8px;
  margin-bottom: 8px;
  align-items: center;
  display: flex;
  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
    }
    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;
      span {
        text-align: left;
        &:first:child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }
        &:nth-child(n + 1) {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
  aside {
    position: absolute;
    right: 12px;
    top: 0;
    border: none;
    outline: none;
    cursor: pointer;
  }
`;
const Description = styled.div``;
const SharedImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const SocialCount = styled.ul`
  line-height: 1.3;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;
  list-style: none;
  li {
    margin-right: 5px;
    font-size: 12px;
    button {
      display: flex;
      border: none;
      background-color: white;
    }
  }
`;

const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;
  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: #0a66c2;
    border: none;
    background-color: white;
    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
`;

const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    loading: state.articleState.loading,
    articles: state.articleState.articles,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getArticles: () => dispatch(getArticleApi()),
});

export default connect(mapDispatchToProps, mapStateToProps)(Main);
