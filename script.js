const quotes = [
    { text: '천 리 길도 한 걸음부터.', author: '속담' },
    { text: '배움에는 왕도가 없다.', author: '유클리드' },
    { text: '오늘 할 수 있는 일을 내일로 미루지 마라.', author: '벤저민 프랭클린' },
    { text: '성공은 매일 반복한 작은 노력들의 합이다.', author: '로버트 콜리어' },
    { text: '시작이 반이다.', author: '아리스토텔레스' },
    { text: '할 수 있다고 믿으면 이미 반은 이룬 것이다.', author: '시어도어 루스벨트' },
    { text: '실패는 성공의 어머니이다.', author: '토머스 에디슨' },
    { text: '미래를 예측하는 가장 좋은 방법은 미래를 만드는 것이다.', author: '피터 드러커' }
];

// 날씨 코드(WMO) → 아이콘과 설명
const weatherCodes = {
    0: ['☀️', '맑음'],
    1: ['🌤️', '대체로 맑음'],
    2: ['⛅', '구름 조금'],
    3: ['☁️', '흐림'],
    45: ['🌫️', '안개'],
    48: ['🌫️', '안개'],
    51: ['🌦️', '이슬비'],
    53: ['🌦️', '이슬비'],
    55: ['🌦️', '이슬비'],
    61: ['🌧️', '비'],
    63: ['🌧️', '비'],
    65: ['🌧️', '강한 비'],
    71: ['🌨️', '눈'],
    73: ['🌨️', '눈'],
    75: ['❄️', '강한 눈'],
    80: ['🌦️', '소나기'],
    81: ['🌦️', '소나기'],
    82: ['⛈️', '강한 소나기'],
    95: ['⛈️', '뇌우']
};

async function fetchWeather(lat, lon, elementId, cityName) {
    const element = document.getElementById(elementId);
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`);
        if (!response.ok) throw new Error('날씨 정보를 가져오는 데 실패했습니다.');
        const data = await response.json();
        const { temperature, weathercode } = data.current_weather;
        const [icon, desc] = weatherCodes[weathercode] || ['🌡️', ''];
        element.textContent = `${cityName} ${icon} ${temperature}°C ${desc}`;
    } catch (error) {
        element.textContent = `${cityName} 날씨 정보 없음`;
    }
}

function displayRandomQuote() {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quote-text').textContent = `“${quote.text}”`;
    document.getElementById('quote-author').textContent = `- ${quote.author}`;
}

function search(lucky) {
    const query = document.getElementById('search-input').value.trim();
    if (!query) return;
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}${lucky ? '&btnI=1' : ''}`;
    window.open(url, '_blank');
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    displayRandomQuote();
    fetchWeather(37.5665, 126.9780, 'weather-seoul', '서울');
    fetchWeather(33.4996, 126.5312, 'weather-jeju', '제주');
    document.getElementById('search-btn').addEventListener('click', () => search(false));
    document.getElementById('lucky-btn').addEventListener('click', () => search(true));
});
