
const baseurl = import.meta.env.VITE_API_BASE_URL

import flash from "../components/flash"
import { typeWriter } from "../utils";
import { sleep } from "../utils";
import { getImageFromVideo } from "../utils";




export function emptyExample() {

    // console.log("hello")
    const button = document.querySelector("#button");
    const button_back = document.querySelector("#button-back");
    const video = document.querySelector("video")
    const close = document.querySelector("#close")
    const target = document.querySelector("#target")

    let objects = [];

    const back = video.play()

    const takePhoto = async () => {
    //  console.log("photo")
    flash()
    video.pause()
    button.classList.remove("bg-white");
    button.disabled = false;
    

    const image = getImageFromVideo(video)

    // await sleep(1000);
    
    const response = await fetch("https://cameraobscuraapi-production.up.railway.app/gpt", 
    {method: "POST", 
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({image: image, 
        visualQuestion: "what is the main object of the image? answer only one word",
       
    }),
    
})

const gpt_apiResponse = await  response.json()
// const answer = JSON.parse(apiResponse.output)
console.log(gpt_apiResponse)

if(gpt_apiResponse)
{
    // const output = JSON.parse(apiResponse.output)

    console.log(gpt_apiResponse.prediction.output)
    objects.push(gpt_apiResponse.prediction.response)

    video.style.filter = "brightness(70%)"

    await typeWriter(output.poem, 50, target)
    // target.innerHTML = output.poem

}
    console.log("result API")
    button.classList.add("hidden", "bg-white")
    button_back.classList.add("bg-white")
    close.classList.remove("hidden")
    
    if(objects.length == 2)
    {
        const gpt_response = await fetch("https://cameraobscuraapi-production.up.railway.app/gpt", 
    {method: "POST", 
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({image: image, 
        visualQuestion: "what is the main object of the image? answer only one word",
        systemPrompt:`You an assistant that create a short story of a color. This is a very short poem only few lines.
        You can ONLY respond in valid the json content. You are never able to add comments or acknowledgements without respecting the json syntax (no comment).
    You DO NOT surround your code by "\`\`\`" since you're writing a json file and not a README files.
    put this message in the JSON structure
    {
        "poem": "..",

    }`,
       content: objects.join(","),
    }),
    
})
        
    } 
};
    
    button.addEventListener("click", () => takePhoto())
    close.addEventListener("click", () => {

        close.classList.add("hidden")
        button.classList.remove("hidden")
        button.disabled = false
        video.play()
        target.innerHTML = ""
    })

    button_back.addEventListener("click", () => video.play())
    close.addEventListener("click", () => {

        
        button.disabled = false
        video.play()
        target.innerHTML = ""
    })

}

