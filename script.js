// initial default city name
// المدينة الافتراضية هي لندن
let city = "London";

//the count is for how many images you whant get.
let count = 5;

// let's define our HTML elements here
// تعريف عناصر الصفحة التى نحتاجها هنا
const searchForm = document.querySelector("#search"),
    resultCard = document.querySelector('#result'),
    cityOut_elem = document.querySelector('#cityOut'),
    mainIcon_elem = document.querySelector('#mainIcon'),
    mainTemp_elem = document.querySelector('#mainTemp'),
    mainDescription_elem = document.querySelector('#mainDescription'),
    minTemp_elem = document.querySelector('#minTemp'),
    maxTemp_elem = document.querySelector('#maxTemp'),
    humidity_elem = document.querySelector('#humidity'),
    windSpeed_elem = document.querySelector('#windSpeed'),
    time = document.querySelector('footer > time'),
    submitButton = document.querySelector("#searchButton"),
    inputCityName = document.querySelector('#cityIn');


// When the page is fully loaded, fetch weather data for the default city name
// استدعاء الدالة الأساسية للحصول على معلومات الطقس عندما يتم تحميل جميع عناصر الصفحة
document.addEventListener("DOMContentLoaded", function () {
    // استدهاء الدالة الأساسية مع دالة رد
    loadWeatherData(function () {
        // show results card when finished
        resultCard.style.display = "block";
    });
});


// attach submit event to our search form to get weather data
// استدعاء الدالة الأساسية للحصول على معلومات الطقس عندما يتم الضغط على زر التحديث
searchForm.addEventListener('submit', function (e) {
    // منع السلوك الافتراضي لإرسال النموذج
    e.preventDefault();
    // التأكد أن النموذج صالح
    if (this.checkValidity()) {
        // disable submit button to prevent multi clicks until we get a response
        submitButton.disabled = true;
        submitButton.value = "Loading...";
        city = inputCityName.value;
        // استدعاء الدالة الأساسية مع دالة رد
        loadWeatherData(function () {
            // reset input value
            inputCityName.value = null;
        });
    }
});



// function to fetch weather data from external server by using it's API
// الدالة الأساسية التي تقوم بالاتصال بالواجهة البرمجية للحصول على معلومات الطقس بحسب المدينة
function loadWeatherData(callbackFunction) {

    const request = new XMLHttpRequest();

    // for more info about openWeatherMap API
    // https://openweathermap.org/current

    const key = "eb9ba4d5906d3eecd90f0bb03297ec8b";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric" +
        "&APPID=" + key;

    request.onreadystatechange = function () {
        // to check we've got a valid response
        if (this.readyState === 4 && this.status === 200) {
            const response = JSON.parse(this.responseText);

            //The loadBackgroundImage function is invoked only if the request is success.
            //and we send a city as parameter
             loadBackgroundImage(city);

            // استدعاء الدالة الخاصة بتحديث معلومات الصفحة
            updateWeatherData(response, callbackFunction);
            
           
        }

        // إذا لم يتم الحصول على نتائج. مثلا اسم المدينة غير موجود
        else if (this.readyState === 4 && this.status === 404) {
            alert('No results found for "' + city + '", please check the city name.');
            submitButton.disabled = false;
            submitButton.value = "Update";
            inputCityName.value = null;
        }
    };

    request.open("GET", url, true);
    request.send();
}

// الدالة الخاصة بتحديث معلومات الصفحة
function updateWeatherData(data, callbackFunction = null) {
    // to see what we've got from the API
    // console.log(data);

    // define some variables that we need to show in the card
    const cityName = data.name,
        icon = data.weather[0].icon,
        icon_url = "http://openweathermap.org/img/wn/" + icon + "@2x.png",
        description = data.weather[0].description,
        temp = data.main.temp,
        temp_max = data.main.temp_max,
        temp_min = data.main.temp_min,
        humidity = data.main.humidity,
        windSpeed = data.wind.speed,
        deg = "°",
        percent = "%";

    // set values on the card
    cityOut_elem.innerHTML = cityName;
    mainIcon_elem.setAttribute("src", icon_url);
    mainIcon_elem.setAttribute("alt", description);
    mainTemp_elem.innerHTML = Math.round(temp) + deg;
    mainDescription_elem.innerHTML = description;
    maxTemp_elem.innerHTML = Math.round(temp_max) + deg;
    minTemp_elem.innerHTML = Math.round(temp_min) + deg;
    humidity_elem.innerHTML = humidity + percent;
    windSpeed_elem.innerHTML = windSpeed;

    // الحصول على تاريخ ووقت تسجيل حالة الطقس
    let date = new Date(data.dt * 1000);

    // تعديل نسق التاريخ بحسب المطلوب
    time.innerHTML = date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        hour12: true,
        minute: 'numeric'
    }).replace(",", " ").replace(/ /, "/").replace(/ /, "/");

    submitButton.disabled = false;
    submitButton.value = "Get Weather";

    // التأكد أنه تم تمرير دالة ضمنية
    if (callbackFunction) {
        // استدعاء الدالة التي ستنفذ عند انتهاء تنفيذ الكود
        callbackFunction();
    }
}

// =========================================
// 2nd part to get dynamic background image from external server API
// =========================================

function loadBackgroundImage(city) {
    // type your code here like loadWeatherData() function above but with another API
    // you can use Flickr, GettyImages, Pexels, Unsplash, etc... API's to fetch a dynamic backgroud image

    /*******************************************/
    /*************This is my code***************/
    /***************************************** */
    //I go to declare I function as async
    const key ="038d84f07638e9c5650477dbc27906607501adc4203fc8170171c7d30edaddf5"
    const url =`https://api.unsplash.com/photos/random/?client_id=${key}&query=${city}&count=${count}&orientation=landscape&w=1920`;
    
    GetCityImage(url); 
    //this is one way to use fetch API         
    // fetch(url)
    // .then(response => {
    //     if(response.ok){
    //         return response.json()
    //     }else{
    //         //if not find the city or there is any error we throw an error status.
    //         //but I prefer but i prefer give default image to background.
    //         //I think is the best way. What do you think?
    //         //throw response;
    //         updateBackgroundImage("https://images4.alphacoders.com/386/thumb-1920-38616.jpg");
    //     }
    // })
    // .then(json =>{
    //     updateBackgroundImage(json);
    // })
    // .catch(error =>{
    //     alert("ERROR: "+ error.message);
    // })

}
//This is the different way to use Fetch api, using async/await function
//using async/await I can write less lines of code.
//My Question is: what is the best way?
async function GetCityImage(url){
        try {
            const response = await fetch(url);
            if (response.ok) {
                const json = await response.json();
                updateBackgroundImage(json);
            }
            else{
                //if not find the city or there is any error we throw an error status.
                //but I prefer but i prefer give default image to background.
                //I think is the best way. What do you think?
                //throw response if we what throw an exception error;
                updateBackgroundImage("https://images4.alphacoders.com/386/thumb-1920-38616.jpg");
            }
        } catch (error) {
            //if there is any exption error 
            alert("ERROR: " + error.message);
         
        }
    }
function updateBackgroundImage(images) {
    /*I don't prefer use de next syntax a don't like use style inline, so I try to manipulate
     the css file, I use deleteRule and insertRule.*/
    // the next is to give background inline:
    // document.body.style.background = "url('"+images[0].urls.regular+"')";

    var styleSheetList = document.styleSheets[0];
    var rules = document.styleSheets[0].rules || document.styleSheets[0].cssRules;
    //to use one background image descomment this code and comment the
    // styleSheetList.insertRule(@keyframes).

    //The response.json not always can return 5 object of images.
    // some cities has less then 5 photos, sometimes one.
    // So I have to control the images object.

    //If the response has only un photo yo use one background image.
    //I do a deleteRule and insertRule to replace body style fo new style
    /*When we add a body with an background-image, next time we search for
    a city that has one image, we remove a body style */
    if (images.length <= 1) {
        //for loop to check if there is any body CSSrule, if is exist o remove it
        //and we insert new one.
        for (let i = 0; i < rules.length; i++) {
            if (rules[i].selectorText == "body") {
                styleSheetList.deleteRule(i);
            }
        }
        styleSheetList.insertRule(`body
        {background-color: #999;
        height:100vh;
        background-image: url(${images[0].urls.regular});
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-position:center center;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }`, 2);
    } else {
        //Create a variable to sotre keyframes
        //this is to make multiples images to change it every x time
        //maybe is not the beste way, but i tray something different. you tell me is good o not.
        
        let keyframes =`@keyframes bgfade {`;
        let num = 100/(images.length-1);
        for (let i = 0, j =0; i < images.length && j <=100; i++,j+=num) {
            //keyframes = array[i];
            keyframes +=  `\n${j}% {background-image: url(${images[i].urls.regular});}\n`
        }
        keyframes += `}`;

        styleSheetList.insertRule(keyframes,styleSheetList.cssRules.length);
        for (let i = 0; i < rules.length; i++) {
            if (rules[i].selectorText == "body") {
                styleSheetList.deleteRule(i);
            }
        }
        styleSheetList.insertRule(`body
        {background-color: #999;
            height:100vh;
            animation: bgfade 50s infinite;
            animation-timing-function: ease, step-start, cubic-bezier(0.7, 0.7, 1.0, 0.9);
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;
            background-repeat: no-repeat;
            background-attachment: fixed;
            background-position:center center;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }`, 2);
    }
 }
