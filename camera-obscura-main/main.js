import "./style.css";
import { camera } from "./components/camera";
import { appHeight, sleep } from "./utils";

import { emptyExample } from "./projects/emptyExample"

// Lancer la caméra
camera();

// Projet
emptyExample()

// Fix Ios
window.addEventListener("resize", appHeight);
appHeight();
