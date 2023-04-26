
const baseurl = import.meta.env.VITE_API_BASE_URL

import flash from "../components/flash"
import { typeWriter } from "../utils";
import { sleep } from "../utils";
import { getImageFromVideo } from "../utils";




export function emptyExample() {

    // console.log("hello")
    const button = document.querySelector("#button");
    const video = document.querySelector("video")
    const close = document.querySelector("#close")
    const target = document.querySelector("#target")

    let objects = [];

    const takePhoto = async () => {
    //  console.log("photo")
    flash()
    video.pause()
    button.classList.remove("bg-white");
    button.disabled = true;

    const image = getImageFromVideo(video)

    // await sleep(1000);
    const response = await fetch("https://cameraobscuraapi-production.up.railway.app/gpt", 
    {method: "POST", 
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({image: image, 
        visualQuestion: "You are creating a role-playing game where players analyze images and assign points based on certain characteristics. Each image can have the following characteristics: Smiling people: 3 points, People with raised arms: 3 points, People with a drink or cigarette: 1.5 points, Colorful elements: 1.5 points, Colorful clothing: 0.5 points, People with a phone: 3 points. Calculate a score out of 10 based on the presence of these characteristics in the image. The maximum possible score for an image is 13.5 points, if all characteristics are present. but I would like you to give me only the number of points compared to the number of features in the image",
        systemPrompt:`You are creating a role-playing game where players analyze images and assign points based on certain characteristics. Each image can have the following characteristics: Smiling people: 3 points, People with raised arms: 3 points, People with a drink or cigarette: 1.5 points, Colorful elements: 1.5 points, Colorful clothing: 0.5 points, People with a phone: 3 points. Calculate a score out of 10 based on the presence of these characteristics in the image. The maximum possible score for an image is 13.5 points, if all characteristics are present. but I would like you to give me only the number of points compared to the number of features in the image
    put this message in the JSON structure
    `,
    //     content: "blue",
    }),
    
})

const apiResponse = await  response.json()
// const answer = JSON.parse(apiResponse.output)
console.log(apiResponse)

if(apiResponse)
{
    const output = JSON.parse(apiResponse.output)
    console.log(apiResponse.prediction.output)

    video.style.filter = "brightness(70%)"

    await typeWriter(output.poem, 50, target)
    // target.innerHTML = output.poem

}
    console.log("result API")
    button.classList.add("hidden", "bg-white")
    close.classList.remove("hidden")
    };
    
    button.addEventListener("click", () => takePhoto())
    close.addEventListener("click", () => {

        close.classList.add("hidden")
        button.classList.remove("hidden")
        button.disabled = false
        video.play()
        target.innerHTML = ""
    })

}

