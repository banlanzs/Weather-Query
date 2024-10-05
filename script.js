document.getElementById('search-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    const apiUrl = `https://api.lolimi.cn/API/weather/?city=${city}`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.code === 1) {
                displayWeather(data.data);
            } else {
                alert('City not found. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Unable to fetch weather data at the moment.');
        });
});

function displayWeather(data) {
    const weatherInfoDiv = document.getElementById('weather-result');
    weatherInfoDiv.innerHTML = `
        <h2>城市:${data.city} (${data.cityEnglish})</h2>
        <div class="weather-image">
            <img src="${data.current.image}" alt="${data.current.weatherEnglish}">
        </div>
        <div class="weather-detail">温度:${data.current.temp} °C(${data.current.fahrenheit}°F)</div>
        <div class="weather-detail">天气:${data.current.weather}(${data.current.weatherEnglish})</div>
        <div class="weather-detail">能见度:${data.current.visibility}</div>
        <div class="weather-detail">风向风力:${data.current.wind}, ${data.current.windSpeed}</div>
        <div class="weather-detail">湿度: ${data.current.humidity}</div>
        
        <div class="weather-detail">空气质量:${data.current.air}(PM2.5:${data.current.air_pm25})</div>
        <div class="weather-detail">数据最后更新时间:${data.current.date} ${data.current.time}</div>
    `;


    // 创建一个新的 div 用于显示生活指数
    const lifeIndexDiv = document.createElement('div');
    lifeIndexDiv.id = 'life-index';
    lifeIndexDiv.innerHTML = '<h3 style="color: blue;">生活指数</h3>';
    
    // 遍历 data.living 数组，显示生活指数
    data.living.forEach(index => {
        const indexItem = document.createElement('div');
        indexItem.className = 'index-item';
        indexItem.innerHTML = `<strong style="color: blue;">${index.name}:</p>
        </strong> <span style="color: black;">${index.tips}</span>
        `;
        lifeIndexDiv.appendChild(indexItem);
    });
    
    // 将生活指数的内容添加到 weatherInfoDiv
    weatherInfoDiv.appendChild(lifeIndexDiv);

    weatherInfoDiv.style.display = 'block';
}
