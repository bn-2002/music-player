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
console.log(images);

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
    const w = (e.clientX / screen.width);
    musicSeekBarRange.value = (w * 100);
    musicSeekCompletionBar.style.width = (w * 100) +'%';
})


const musicVolumeBarRange = document.querySelector('.volume-controller');
const musicVolumeCompletionBar = document.querySelector('.completionBar-volume');

musicVolumeBarRange.oninput = function() {
    console.log(this.value);
  musicVolumeCompletionBar.style.width =( this.value * 4.6)+'rem';
}

musicVolumeCompletionBar.addEventListener('click',function(e) {
    console.log(musicVolumeBarRange.offsetHeight);
    console.log(musicVolumeBarRange.getBoundingClientRect().bottom);
    console.log(musicVolumeBarRange.getBoundingClientRect().bottom - e.clientY);
    const p = musicVolumeBarRange.getBoundingClientRect().bottom - e.clientY;
    console.log('p : ' + p); 
    const percent = p / 100;
    const  r =  Math.trunc(percent * (percent * musicVolumeBarRange.offsetHeight));
    musicVolumeBarRange.value = r - 0.5;
    console.log(r);
       
    // musicVolumeCompletionBar.style.width = (r) + 'rem' ;

    // const w = (e.clientY / screen.height);
    // musicVolumeBarRange.value = (w * 100);
    // musicVolumeCompletionBar.style.width = (w * 100) +'%';


})
