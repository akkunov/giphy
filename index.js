const container = document.querySelector('.gif--container');
const clearAllGifs  = document.getElementById('clearAllGifs')
const input = document.getElementById('searchGif');
const screenHeight = window.innerHeight;
let limit = Math.ceil(screenHeight / 200) * 4; // Dynamic limit based on screen height
console.log(limit)
let searchTerm = '';
let offset = 0;
let isLoading = false;

const debaunce = (fn, timeout = 500) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { fn.apply(this, args); }, timeout);
    };
};

async function saveInput(event) {
    searchTerm = event.target.value;
    offset = 0;
    const gifs = await searchGif(searchTerm, offset, limit);
    displayGifs(gifs);
}

input.addEventListener('keypress', debaunce(saveInput, 500));

const API_KEY = 'a2iOkETDVHa5TykDYN3wTeQaG6338lEp';

async function getGifs(offset, limit) {
    const apiUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&offset=${offset}&limit=${limit}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch GIFs');
        }
        const data = await response.json();
        const gifs = data.data;
        return gifs;
    } catch (error) {
        console.error('Error fetching GIFs:', error);
        return null;
    }
}

async function searchGif(query, offset, limit) {
    if (!query || query.trim() === '') return [];
    const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}&offset=${offset}&limit=${limit}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch GIFs');
        }
        const data = await response.json();
        const gifs = data.data;
        return gifs;
    } catch (error) {
        console.error('Error fetching GIFs:', error);
        return null;
    }
}

function displayGifs(gifs) {
    container.innerHTML = '';
    addGifsToContainer(gifs);
}

function addGifsToContainer(gifs) {
    gifs.forEach(gif => {
        const img = document.createElement('img');
        img.classList.add('gif--image');
        img.src = gif.images.fixed_width_small.url;
        img.alt = gif.alt_text;
        container.appendChild(img);
    });
}

async function loadMoreGifs() {
    if (isLoading) return;
    isLoading = true;
    offset += limit;
    let gifs;
    if (searchTerm) {
        gifs = await searchGif(searchTerm, offset, limit);
    } else {
        gifs = await getGifs(offset, limit);
    }
    addGifsToContainer(gifs);
    isLoading = false;
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        loadMoreGifs();
    }
});

clearAllGifs.addEventListener('click',function (){
    container.innerHTML = ''
})
async function main() {
    const gifs = await getGifs(0, limit);
    displayGifs(gifs);
}



main();