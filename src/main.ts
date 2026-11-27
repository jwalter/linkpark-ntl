import { mount } from "svelte";
import "./app.css";
import App from "./App.svelte";

// "Fit" mode lays the whole sign out to fill the screen without scrolling.
// It is used in Tesla's in-car browser, on any low landscape screen, or
// when forced with ?bil in the URL.
const isTesla = /Tesla\/|QtCarBrowser/.test(navigator.userAgent);
const forced = new URLSearchParams(location.search).has("bil");
const lowLandscape = window.matchMedia(
  "(orientation: landscape) and (min-width: 900px) and (max-height: 820px)"
);

function updateFit() {
  document.documentElement.classList.toggle(
    "fit",
    isTesla || forced || lowLandscape.matches
  );
}
updateFit();
lowLandscape.addEventListener("change", updateFit);

const app = mount(App, {
  target: document.getElementById("app")!,
});

export default app;
