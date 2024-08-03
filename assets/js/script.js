document.querySelector('.search').addEventListener('submit',async (event)=>{
    
    event.preventDefault()

    let input = document.querySelector('#searchInput').value


    

    if(input !==''){
        clearInfo()
        showWarning('Carregando...')

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=50b115ac68d1cd2ed9bdddfe28e3111b&units=metric&lang=pt_br`

        let results = await fetch(url)
        let json = await results.json()

        

        if(json.cod ===200){
            showInfo({
                name:json.name,
                country:json.sys.country,
                temp:json.main.temp,
                tempIncon:json.weather[0].icon,
                windSpeed:json.wind.speed,
                windAngle:json.wind.deg,
                description:json.weather[0].description,
                humidity:json.main.humidity
            })
        }else{
            clearInfo()
            showWarning('Nao encontramos esta localizaçao')
            
        }
        
    }else{
        clearInfo()
    }
})


document.querySelector('#city').addEventListener('click',async (event)=>{



    let input2 = document.querySelector('#city').value

    if(input2 !==''){
        clearInfo()
        showWarning('Carregando...')
    
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input2)}&appid=50b115ac68d1cd2ed9bdddfe28e3111b&units=metric&lang=pt_br`
    
        let results = await fetch(url)
        let json = await results.json()
    
        
    
        if(json.cod ===200){
            showInfo({
                name:json.name,
                country:json.sys.country,
                temp:json.main.temp,
                tempIncon:json.weather[0].icon,
                windSpeed:json.wind.speed,
                windAngle:json.wind.deg,
                descriptioni:json.weather[0].description,
                humidity:json.main.humidity
            })
        }else{
            clearInfo()
            showWarning('Nao encontramos esta localizaçao')
            
        }
        
    }

})






function showInfo(json){

    document.querySelector('.desc').style.display='none'



    document.querySelector('.climate').style.display="flex"
    document.querySelector('.climate').innerHTML=`${json.descriptioni}`

    document.querySelector('.title').innerHTML=`${json.name}, ${json.country}`

    document.querySelector('.tempI').innerHTML=`${json.temp.toFixed(1)} <span>ºC</span>`
    document.querySelector('.windI').innerHTML=`${json.windSpeed} <span>km/h</span>`
    document.querySelector('.humiI').innerHTML=`${json.humidity} <span>%</span>`


    document.querySelector('.temp img').setAttribute('src',`http://openweathermap.org/img/wn/${json.tempIncon}@2x.png`)


    document.querySelector('.tempC').style.display='flex'
    document.querySelector('.tempC').setAttribute('src',`http://openweathermap.org/img/wn/${json.tempIncon}@2x.png`)


    document.querySelector('.result').style.display='block'
    
  
    document.querySelector('.aviso').style.display='none'


    document.querySelector("#searchInput").value =""
    document.querySelector('#city').value = "opçao1"


    if(json.description === "nublado" ||  json.description === "nuvens dispersas"){
        document.querySelector('.result').style.backgroundImage = 'url("assets/img/nublado.jpg")'

        

    }else{
        document.querySelector('.result').style.backgroundImage = 'url("assets/img/ceu.jpg")'
        document.querySelector('h1').style.color='#fff'
        
    }
}


function clearInfo(){
    showWarning('')
    document.querySelector('.result').style.display = 'none'
    document.querySelector('.tempC').style.display='none'
    document.querySelector('body').style.backgroundImage = 'url("assets/img/telai.jpg")'
    document.querySelector('.aviso').style.display='flex'
    document.querySelector('.climate').style.display='none'
    document.querySelector('.desc').style.display='flex'


}

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg
}













