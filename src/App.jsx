import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [isHead, setIsHead] = useState(false);
  const [isMain, setIsMain] = useState(false);
  const [isFoot, setIsFoot] = useState(false);
  const mainRef = useRef();
  const headRef = useRef();
  const footRef = useRef();

  useEffect(() => {
    const mainObserver = new IntersectionObserver(
      ([mainEntry]) => {
        setIsMain(mainEntry.isIntersecting);
      },
      { rootMargin: "-300px" }
    );

    const headObserver = new IntersectionObserver(
      ([headEntry]) => {
        setIsHead(headEntry.isIntersecting);
      },
      { rootMargin: "-300px" }
    );

    const footObserver = new IntersectionObserver(
      ([headEntry]) => {
        setIsFoot(headEntry.isIntersecting);
      },
      { rootMargin: "-300px" }
    );

    mainObserver.observe(mainRef.current);
    headObserver.observe(headRef.current);
    footObserver.observe(footRef.current);

    return () => {
      mainObserver.disconnect();
      headObserver.disconnect();
      footObserver.disconnect();
    };
  }, [isMain, isHead, isFoot]);

  useEffect(() => {
    if (isHead) {
      headRef.current.classList.add("bounce");
    } else {
      headRef.current.classList.remove("bounce");
    }
    if (isMain) {
      mainRef.current.querySelectorAll("div").forEach((el) => {
        el.classList.add("slide-in");
      });
    } else {
      mainRef.current.querySelectorAll("div").forEach((el) => {
        el.classList.remove("slide-in");
      });
    }
    if (isFoot) {
      footRef.current.classList.add("bounce");
    } else {
      footRef.current.classList.remove("bounce");
    }
  }, [isMain, isHead, isFoot]);

  return (
    <>
      <div className='app'>
        <header ref={headRef}>This is The header</header>
        <main ref={mainRef}>
          <div className='child-one'>Child One</div>
          <div className='child-two'>Child Two</div>
        </main>
        <footer ref={footRef}>This is The Footer</footer>
      </div>
    </>
  );
}

export default App;
