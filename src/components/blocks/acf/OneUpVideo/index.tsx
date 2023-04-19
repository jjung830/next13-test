import { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import Player from "@vimeo/player";

const OneUpVideo = ({ attrs }: {
  attrs: {
    vimeo_id: string,
    thumbnail: string,
    copy: string,
    autoplay: boolean,
    textColor: string,
    bgColor: string,
  }
}) => {
  const { vimeo_id, thumbnail, copy, autoplay, textColor, bgColor } = attrs;

  const videoFrameRef = useRef<any>(null);
  const playBtnRef = useRef<HTMLButtonElement>(null);
  const pauseBtnRef = useRef<HTMLButtonElement>(null);
  const [player, setPlayer] = useState<any>(null);

  const showPlayBtn = () => {
    pauseBtnRef?.current?.classList.remove("show");
    pauseBtnRef?.current?.classList.remove("transparent");
    pauseBtnRef?.current?.classList.add("hidden");
    playBtnRef?.current?.classList.add("show");
    playBtnRef?.current?.classList.remove("hidden");
  };
  const showPauseBtn = () => {
    playBtnRef?.current?.classList.remove("show");
    playBtnRef?.current?.classList.add("hidden");
    pauseBtnRef?.current?.classList.add("show");
    pauseBtnRef?.current?.classList.remove("hidden");
    setTimeout(() => {
      pauseBtnRef?.current?.classList.add("transparent");
    }, 1000);
  };

  const handlePlayBtnClick = () => {
    player.play().then(() => {
      showPauseBtn();
    });
  };
  const handlePauseBtnClick = () => {
    player.pause().then(() => {
      showPlayBtn();
    });
  };

  useEffect(() => {
    setPlayer(new Player(videoFrameRef.current));
    if (player) {
      player.on("ended", () => {
        showPlayBtn();
      });
    }
  }, [player]);

  return (
    <Container id={vimeo_id} bgColor={bgColor} className="one-up-video">
      <InnerContainer>
        <VideoWrapper className="video-wrapper">
          <VimeoPlayer
            ref={videoFrameRef}
            id={`_${vimeo_id}`}
            src={`https://player.vimeo.com/video/${vimeo_id}?title=0&byline=0&portrait=0&sidedock=0&controls=0&muted=0${
              autoplay ? "&autoplay=1" : ""
            }`}
            frameBorder="0"
            allow="autoplay"
          ></VimeoPlayer>
          <PlayBtn
            ref={playBtnRef}
            id={`play-button-${vimeo_id}`}
            className="show"
            onClick={handlePlayBtnClick}
          >
            <BtnCopy>
              Play <span>Video</span>
            </BtnCopy>
          </PlayBtn>
          <PauseBtn
            ref={pauseBtnRef}
            id={`pause-button-${vimeo_id}`}
            className="hidden"
            onClick={handlePauseBtnClick}
          >
            <BtnCopy>Pause</BtnCopy>
          </PauseBtn>
        </VideoWrapper>
        <Copy className="oneUpImageCopy" textColor={textColor}>
          {copy}
        </Copy>
      </InnerContainer>
    </Container>
  );
};

export default OneUpVideo;

const Container = styled.section`
  background-color: ${(props: {
    bgColor: string;
  }) =>
    props.bgColor ? props.bgColor : "var(--black)"};
  display: flex;
  justify-content: center;
`;

const InnerContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 56px var(--side-padding);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 600px) {
    padding: 32px 24px;
  }
`;

const VideoWrapper = styled.div`
  width: 100%;
  max-width: 1116px;
  position: relative;
  height: 627.75px; // 1920 : 1080 = 1116 : [ 627.75 ]

  @media screen and (max-width: 1212px) {
    // 1212 = 48 + 1116 + 48
    height: 0;
    padding-bottom: 56.25%; // ratio of "1920 x 1080"
  }
`;

const VimeoPlayer = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const sharedBtnStyle = css`
  width: 128px;
  height: 128px;
  color: var(--white);
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  border: none;

  &.show {
    visibility: visible;
    opacity: 1;
    transition: all 0.5s ease-in-out;
  }
  &.hidden {
    visibility: hidden;
    opacity: 0;
    transition: all 0.5s ease-in-out;
  }

  @media screen and (max-width: 600px) {
    width: 88px;
    height: 88px;
  }
`;

const PlayBtn = styled.button`
  ${sharedBtnStyle}
  background-color: var(--black);
`;

const PauseBtn = styled.button`
  ${sharedBtnStyle}
  background-color: rgba(2, 15, 7, 0.75);
  &.transparent {
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }
  &:hover {
    opacity: 1;
  }
`;

const BtnCopy = styled.span`
  width: 100%;
  font-size: 18px;
  line-height: 24px;
  font-weight: 400;
  text-transform: uppercase;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  @media screen and (max-width: 600px) {
    span {
      display: none;
    }
  }
`;

const Copy = styled.p`
  width: 100%;
  max-width: 1116px;

  &.oneUpImageCopy {
    color: ${(props: {
      textColor: string;
    }) => (props.textColor ? props.textColor : "var(--white)")};
    font-size: 14px;
    line-height: 16px;
    font-style: italic;
    align-self: center;
    margin-block: 16px 0;
  }
`;
