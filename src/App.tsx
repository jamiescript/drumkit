import { Key } from "react";
import Kit from "./kit-data";
import "./App.css";

function App() {
  function removeTransition(e: any) {
    console.log("works");
    if (e.propertyName !== "transform") return; // only trigger on transform property
    e.target.classList.remove("playing"); // remove 'playing' class name
  }

  function playSound(e: any) {
    const audio = document.querySelector(
      `audio[data-key="${e.keyCode}"]`
    ) as HTMLAudioElement;
    if (!audio) return; // if no corresponding audio element, return
    const key = document.querySelector(
      `div[data-key="${e.keyCode}"]`
    ) as HTMLElement;
    if (!key) return; // if no corresponding key element, return

    key.classList.add("playing"); // add 'playing' class name
    audio.currentTime = 0; // allow for rapid keydown
    console.log(audio);
    // audio.play();
  }

  const keys = Array.from(document.querySelectorAll(".key"));
  keys.forEach(
    (key) => key.addEventListener("transitionend", removeTransition) // reset key when transition has ended
  );
  window.addEventListener("keydown", playSound);

  return (
    <div className="App">
      <div className="keys">
        {Kit.map((item: any, key: Key) => {
          return (
            <div
              tabIndex={0}
              onKeyDown={playSound}
              data-key={item.dataKey}
              key={key}
              className="key"
            >
              <kbd>{item.key}</kbd>
              <span className="sound">{item.sound}</span>
              <audio data-key={item.dataKey} src={item.src}></audio>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
