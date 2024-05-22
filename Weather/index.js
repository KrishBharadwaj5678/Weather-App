// apikey= JizMA0YEOMJgAtaGTGGj83U6JncwWRrG

// Adding GSAP on logo,search bar,submit button

tl=gsap.timeline();

tl.from('div.logo,div.btn-group',{
    duration: 1,
    opacity: 0,
    delay: 0.3,
    stagger: 0.5

})

tl.from("div.container-fla",{
    opacity: 0,
    duration: 0.4

})


let video=document.querySelector('video');

// All Video URL's

let video_url=['https://player.vimeo.com/progressive_redirect/playback/486873694/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=1ed4078f588dbb00081ca532582a75e78aebf75a9fc5a4b9272c9346ed9286ac','https://player.vimeo.com/progressive_redirect/playback/216445847/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=3d552ac6effe0047f7afbd57dd827dcf4b3009f778ab1f37696af43ad642fcb7','https://player.vimeo.com/progressive_redirect/playback/417247063/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=0a7be35ec6d85aad745ac35b00f664db78d380a9624249ea8cb851264e55fcb5','https://player.vimeo.com/progressive_redirect/playback/369614525/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=5fae209db5d74b5e718d876a9b226591035754d56052396ef2daaff72c2a7a4a','https://player.vimeo.com/progressive_redirect/playback/308153460/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=e26a1765bbf5d294eaa0e727647ba6d5a5889a4cd0cf43336d03bdc61a8a627a','https://player.vimeo.com/progressive_redirect/playback/206536369/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=40e782feda5979baf21337936ae26296eedd73dc4b028534bea00b32fc110e81','https://player.vimeo.com/progressive_redirect/playback/293913779/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=641dcae78853bb68f8e13d4f66233da6a107563257c6e63b236c3423eba76aaf','https://player.vimeo.com/progressive_redirect/playback/226685088/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=f865195d21515dedbaedb72136bd51033e8352a687ee76e8941a66f3aa13811f','https://player.vimeo.com/progressive_redirect/playback/259711072/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=bd4c4cb618a76c72b92eee05ddfd22b3f526bfe2b7c93c8136bf29ddeff65919','https://player.vimeo.com/progressive_redirect/playback/893988062/rendition/360p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=8b3720ab6e78e6a0de3ed2483183741b603f2b0201ed069a72af78387d203550'];

let length=video_url.length;

let rand_number=Math.floor(Math.random()*length);

// Refreshing Video Background On Load

window.addEventListener('load',()=>{
   
    video.src=video_url[rand_number];

})


let search=document.querySelector('input.search');

let submit=document.querySelector('input.submit');

let show_city=document.querySelector('span.city');

let show_temperature=document.querySelector('span.show_temperature');

let show_weather_text=document.querySelector('span.show_weather_text');

let humidity=document.querySelector('span.humidity');

let speed=document.querySelector('span.speed');

let degree=document.querySelector('span.degree');

let longitude=document.querySelector('span.longitude');

let latitude=document.querySelector('span.latitude');

let icon_weather=document.querySelector('img.symbol_weather');

let main_parent=document.querySelector('div.weather_main_parent');

let iframe=document.querySelector("iframe.city_information");

  // Voice Effect

function speak(text){
        let text_speak=new SpeechSynthesisUtterance(text); //Speech Request
        text_speak.volume=1;
        text_speak.rate=1;
        text_speak.pitch=1;
        window.speechSynthesis.speak(text_speak);  //Human Speech
}


submit.addEventListener('click',(e)=>{
    e.preventDefault();

    let city=search.value;

let open_weather=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4d40a0735c2b47b69146db86045844d5`;

async function get_temp(){
    let open_weat=await fetch(open_weather);
    let open_json=await open_weat.json();

    main_parent.style.display='block';

    // Adding Some GSAP Effect

    tl.from('div.weather_main_parent',{
        opacity: 0,
        duration: 0.4,
        scale: 0
    })

    tl.from("div.city,div.weather_symbol,div.real_feel_shade,div.weather_text,div.humd,div.speed,div.degree,div.longitude,div.latitude",{
        opacity: 0,
        duration: 0.2,
        stagger: 0.1
    })

    // Iframe Information

    iframe.style.display='block';
    iframe.src=`https://en.wikipedia.org/wiki/${city}`;

  
    // Weather Data Retrieve

    if(open_weat.status!=200){
        speak("Please Enter a Valid City Name");
        show_city.textContent="N/A";
        show_temperature.innerText="N/A";
        show_weather_text.innerText="N/A";
        humidity.innerText="N/A";
        speed.innerText="N/A";
        degree.innerText="N/A";
        longitude.innerText="N/A";
        latitude.innerText="N/A";
        icon_weather.src="notFound.png";
    }

    else if(open_weat.status==200){

        show_city.textContent=open_json.name;
        
        let imgs_fetch=open_json.weather[0].icon;

        // Icons Conditions

        if(imgs_fetch=="01n"){
            icon_weather.src="01n.png";
        }

        else if(imgs_fetch=="01d"){
            icon_weather.src="01d.png";
        }

        else if(imgs_fetch=="02d"){
            icon_weather.src="02d.png";
        }

        else if(imgs_fetch=="02n"){
            icon_weather.src="02n.png";
        }

        else if(imgs_fetch=="03d" || imgs_fetch=="03n"){
            icon_weather.src="03d.png";
        }

        else if(imgs_fetch=="04d" || imgs_fetch=="04n"){
            icon_weather.src="04d.png";
        }

        else if(imgs_fetch=="09d" || imgs_fetch=="09n"){
            icon_weather.src="09n.png";
        }

        else if(imgs_fetch=="10d"){
            icon_weather.src="10d.png";
        }

        else if(imgs_fetch=="10n"){
            icon_weather.src="10n.png";
        }

        else if(imgs_fetch=="11d" || imgs_fetch=="11n"){
            icon_weather.src="11d.png";
        }

        else if(imgs_fetch=="13d" || imgs_fetch=="13n"){
            icon_weather.src="13d.png";
        }

        else if(imgs_fetch=="50d" || imgs_fetch=="50n"){
            icon_weather.src="50n.png";
        }

        let kelvin_to_celcius=open_json.main.feels_like-273.15;
        show_temperature.innerText=Math.ceil(kelvin_to_celcius)+"°C";

        speak(`Current Temperature of ${open_json.name} is:${Math.ceil(kelvin_to_celcius)} Degree Celsius`);

        show_weather_text.innerText=open_json.weather[0].description;
        
        humidity.innerText=open_json.main.humidity+"%";

        speed.innerText=open_json.wind.speed+" km/hr";

        degree.innerText=open_json.wind.deg+"°";

        longitude.innerText=open_json.coord.lon.toFixed(2);

        latitude.innerText=open_json.coord.lat.toFixed(2);

        console.log(open_json);

    }

}   //closing get_temp()

get_temp();


}) //closing submit listener









