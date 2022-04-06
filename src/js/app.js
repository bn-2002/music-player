//slider

const slider1 = document.querySelector('.playlist-wrapper1');
const slides1 = slider1.children;
const maxScrollLeft1 = slider1.scrollWidth - slider1.clientWidth;
const slider2 = document.querySelector('.playlist-wrapper2');
const slides2 = slider2.children;
const maxScrollLeft2 = slider2.scrollWidth - slider2.clientWidth;


function autoPlay(slider,maxScrollLeft) {
    if (slider.scrollLeft > (maxScrollLeft - 1)) {
        slider.scrollLeft -= maxScrollLeft;
    } else {
        slider.scrollLeft += 1;
    }    
}

// //pause slider on hover
const pauseSlider = function(slider,slides,maxScrollLeft) {
    for (let slide of slides) {
        slide.addEventListener('mouseover',()=> {
            if (slider === slider1) {
                clearInterval(play1);
            } else if (slider === slider2) {
                clearInterval(play2);
            }
        });
        slide.addEventListener('mouseout',()=> {
            if (slider === slider1) {
                play1 = setInterval(function() {
                    autoPlay(slider,maxScrollLeft);
                },50);
                return play1;
            } else if (slider === slider2) { 
                play2 = setInterval(function() {
                    autoPlay(slider,maxScrollLeft);
                },50);
            }
        })
    }    
}

let play1 = setInterval(function() {
    autoPlay(slider1,maxScrollLeft1);
},50);

let play2 = setInterval(function() {
    autoPlay(slider2,maxScrollLeft2);
},50);

pauseSlider(slider1,slides1,maxScrollLeft1);

pauseSlider(slider2,slides2,maxScrollLeft2);

//carousel
const carousel = document.querySelector('.carousel');
const images = carousel.children;

let carouselImageIndex = 0;

const changeCarousel = function () {
    images[carouselImageIndex].classList.toggle('active');

    if (carouselImageIndex >= images.length - 1) {
        carouselImageIndex = 0;
    } else {
        carouselImageIndex += 1;
    }

    images[carouselImageIndex].classList.toggle('active');
}

setInterval(() => {
    changeCarousel();
}, 3000);

//music-seek-bar
const musicSeekBarRange = document.querySelector('.music-seek-bar')
const musicSeekCompletionBar = document.querySelector('.completionBar');

musicSeekBarRange.oninput = function() {
    musicSeekCompletionBar.style.width = this.value+'%';
}

musicSeekCompletionBar.addEventListener('click',function(e) {
    const w = Math.trunc((e.clientX) /(screen.width * 0.9) * 10);
    musicSeekBarRange.value = (w * 10);
    musicSeekCompletionBar.style.width = (w * 10) +'%';
})

//volume controller bar
const musicVolumeBarRange = document.querySelector('.volume-controller');
const musicVolumeCompletionBar = document.querySelector('.completionBar-volume');

musicVolumeBarRange.oninput = function() {
  musicVolumeCompletionBar.style.width =( this.value * 4.5)+'rem';
}

//playlist queue
const playlist = document.querySelector('.playlist-section');

const generateMarkup = function(song) {
    return `<div class="queue">
    <div class="queue-cover">
        <i class="fa fa-play" aria-hidden="true"></i>  
        <img alt="" src="${song.cover}">
    </div>
    <div class="queue-details">
        <p class="music-song-name">${song.name}</p>
        <p class="music-song-artist">${song.artist}</p>
    </div>
</div>
`
}

const renderPlaylist = function() {
    songs.forEach(song => {
        const m =  generateMarkup(song);
        playlist.insertAdjacentHTML("beforeend", m);
    })
}

renderPlaylist();


//maximize player section
const musicPlayer = document.querySelector('.music-player-section');

musicPlayer.addEventListener('dblclick',function() {
    musicPlayer.classList.add('active');
});

musicPlayer.addEventListener('click',function() {
    musicPlayer.classList.add('active');
})


const backToHomeBtn = document.querySelector('.back-to-home-btn');
backToHomeBtn.addEventListener('click',function() {
    musicPlayer.classList.remove('active');
})


const goToPlaylistBtn = document.querySelector('.go-to-playlist-btn');
goToPlaylistBtn.addEventListener('click',function() {
    playlist.classList.add('active');
})

const backToPlayerBtn = document.querySelector('.back-to-player-btn');
backToPlayerBtn.addEventListener('click',function() {
    playlist.classList.remove('active');
})
