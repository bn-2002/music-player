import { songs } from "./data.js";
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

// musicSeekBarRange.oninput = function() {
//     musicSeekCompletionBar.style.width = this.value+'%';
// }

// musicSeekCompletionBar.addEventListener('click',function(e) {
//     const w = Math.trunc((e.clientX) /(screen.width * 0.9) * 10);
//     musicSeekBarRange.value = (w * 10);
//     musicSeekCompletionBar.style.width = (w * 10) +'%';
// })

//volume controller bar
const musicVolumeBarRange = document.querySelector('.volume-controller');
const musicVolumeCompletionBar = document.querySelector('.completionBar-volume');
const volumeControllerContainer = document.querySelector('.volume-controller-container');
const volumeIcon = document.querySelector('.volume-icon');

volumeIcon.addEventListener('click',function() {
    volumeControllerContainer.classList.toggle('active');
    volumeIcon.classList.toggle('active');
})

musicVolumeBarRange.oninput = function() {
  musicVolumeCompletionBar.style.width =( this.value * 4.5)+'rem';
  audio.volume = musicVolumeBarRange.value;

}

//playlist queue
const playlist = document.querySelector('.playlist-section');

const generateMarkup = function(song) {
    return `<div class="queue">
    <div class="queue-cover">
        <i class="fa fa-pause pause-playlist active" aria-hidden="true"></i>
        <i class="fa fa-play play-playlist" aria-hidden="true"></i>  
        <img alt="" src="${song.cover}">
    </div>
    <div class="queue-details">
        <p class="music-song-name">${song.name}</p>
        <p class="music-song-artist">${song.artist}</p>
    </div>
</div>
`
}


const playlistPauseBtn = document.querySelector('.pause-playlist');
const playlistPlayBtn = document.querySelector('.play-playlist');

// playlistPauseBtn.addEventListener('click',function() {
//     playlistPauseBtn.classList.add('hide');
//     playlistPlayBtn.classList.remove('hide');

//     console.log(playlistPauseBtn);
//     console.log(playlistPlayBtn);

// })


console.log('lhafjoefr');
console.log(playlistPauseBtn);
console.log(playlistPlayBtn);


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
musicPlayer.addEventListener('touchstart',function() {
    musicPlayer.classList.add('active');
});

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

//Music//
let currentMusicIndex = 0;
const music = document.getElementById('audio-source');
const currentSongName = document.querySelector('.current-song-name');
const currentSongArtist = document.querySelector('.current-song-artist');
const currentSongCover = document.querySelector('.current-song-cover');
const currentSongTime = document.querySelector('.current-time');
const currentSongDuration = document.querySelector('.duration');

//select button
const backwardBtn = document.querySelector('.backward-button');
const playBtn = document.querySelector('.play-button');
const pauseBtn = document.querySelector('.pause-button');
const forwardBtn = document.querySelector('.forward-button');
const repeatBtn = document.querySelector('.repeat-button');
const playlistSongs = document.querySelectorAll('.queue');


let audio;

//toggle play and pause button
playBtn.addEventListener('click',function(){
    audio.play();
    playBtn.classList.remove('active');
    pauseBtn.classList.add('active');
})

pauseBtn.addEventListener('click',function() {
    audio.pause();
    pauseBtn.classList.remove('active');
    playBtn.classList.add('active');
})

const setMusic = function(i) {
    musicSeekBarRange.value = 0;
    let song = songs[i];
    currentMusicIndex = i;
    music.src = song.path;
    console.log(song.path);
    currentSongCover.src = song.cover;
    currentSongName.textContent = song.name;
    currentSongArtist.textContent = song.artist;

    audio = new Audio();
    audio.src = music.src;

    audio.addEventListener('loadedmetadata', function() {
        currentSongDuration.textContent = formatDuration(audio.duration);
    });
    

    currentSongTime.textContent = '00:00';

    setTimeout(() => {
        musicSeekBarRange.max = audio.duration;
    },3000)

    playlistSongs.forEach( item => {
        item.classList.remove('active');
    });

    playlistSongs[currentMusicIndex].classList.add('active');
    const pausePlaylist = playlistSongs[currentMusicIndex].querySelector('.pause-playlist');
    pausePlaylist.classList.add('active');
    
}

setMusic(15)

const formatDuration = function(time) {
    let  min = Math.floor(time / 60) ;
    min = min < 10 ? `0${min}` : min;

    let  sec = Math.floor(time % 60) ;
    sec = sec < 10 ? `0${sec}` : sec;

    return `${min}:${sec}`
}


setInterval(() => {
    musicSeekBarRange.value = audio.currentTime;
    currentSongTime.textContent = formatDuration(audio.currentTime);
    if (currentSongTime.textContent == formatDuration(audio.duration)) {
       if (repeatBtn.classList.contains('active')) {
           pauseBtn.click();
           setMusic(currentMusicIndex);
           playBtn.click();
       }  else {
           forwardBtn.click();
       }
    }
},500)

musicSeekBarRange.addEventListener('change',function() {
    audio.currentTime = musicSeekBarRange.value;
})


forwardBtn.addEventListener('click',function() {
    if (currentMusicIndex >= songs.length - 1) {
        currentMusicIndex = 0;
    } else {
        currentMusicIndex ++ ;
    }
    pauseBtn.click();
    setMusic(currentMusicIndex);
    playBtn.click();
})


backwardBtn.addEventListener('click',function() {
    if (currentMusicIndex < 0) {
        currentMusicIndex = songs.length - 1;
    } else {
        currentMusicIndex -- ;
    }
    
    pauseBtn.click();
    setMusic(currentMusicIndex);
    playBtn.click();
})


repeatBtn.addEventListener('click',function() {
    repeatBtn.classList.toggle('active');
})


/////playlist

playlistSongs.forEach((item,i) => {
    item.addEventListener('click',function() {

        if (currentMusicIndex === i) {

            const pauseplaylistEl = playlistSongs[currentMusicIndex].querySelector('.pause-playlist');
            const playPlaylistEl = playlistSongs[currentMusicIndex].querySelector('.play-playlist');

            if (pauseplaylistEl.classList.contains('active')) {
                pauseBtn.click();
                pauseplaylistEl.classList.remove('active');
                playPlaylistEl.classList.add('active');
            } else {
                playBtn.click();
                pauseplaylistEl.classList.add('active');
                playPlaylistEl.classList.remove('active');
            }
        }

        else {
            pauseBtn.click();
            setMusic(i);
            playBtn.click();
        }
    })
})