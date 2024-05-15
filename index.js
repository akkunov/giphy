const container = document.querySelector('.giph--container');
const screenWidth  = window.innerWidth;
const input = document.getElementById('searchGif');

document.documentElement.style.setProperty('--screen-width', screenWidth + 'px');
const debaunce = (fn, timeout = 500) => {
    let timer
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { fn.apply(this, args); }, timeout);
    }
}
async function saveInput(event){
    const gifs = await searchGif(event)
    displayGifs(gifs)
}

input.onkeypress = debaunce((event) => saveInput(event), 500 )
const API_KEY = 'a2iOkETDVHa5TykDYN3wTeQaG6338lEp'
// async function getGifs() {
//     const apiKey = 'YOUR_API_KEY';
//     const searchTerm = 'cats';
//     const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=10`;
  
//     try {
//       const response = await fetch(apiUrl); 
//       if (!response.ok) {
//         throw new Error('Failed to fetch GIFs'); 
//       }
      
//       const data = await response.json(); 
//       const gifs = data.data;
//       return gifs; 
//     } catch (error) {
//       console.error('Error fetching GIFs:', error);
//       return null; 
//     }
//   }

//   async function searchGif(event) {
//     const searchTerm = event.target.value;
//     const apiUrl = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=7`;
  
//     try {
//       const response = await fetch(apiUrl); 
//       if (!response.ok) {
//         throw new Error('Failed to fetch GIFs'); 
//       }
      
//       const data = await response.json(); 
//       const gifs = data.data;
//       return gifs; 
//     } catch (error) {
//       console.error('Error fetching GIFs:', error);
//       return null; 
//     }
//   }




//    function displayGifs(gifs) {
//     container.innerHTML = ``
//     gifs = gifs.slice(1, 40);
//     gifs.forEach(gif => {
//       const img = document.createElement('img');
//       img.classList.add('gif--image')
//       img.src = gif.images.original.url;
//     //   img.loading='lazy';
//       img.alt= gif.title
//       container.appendChild(img);
//     });
//   }



// async function main() {
//   try {
//     const gifs = await JSON.parse(localStorage.getItem('giph'));
//     if (gifs) {
//       displayGifs(gifs);
//     } else {
//       console.log('No GIFs to display');
//     }
//   } catch (error) {
//     console.error('Error in main function:', error);
//   }
// }

// main();
