const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle') /*dohvacam krug unutar moving-outline*/

    //Sounds
    const sounds = document.querySelectorAll ('.cat-select button');
    
    //Time dispaly
    const timeDisplay = document.querySelector ('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button')

    //Get the length of the outline
    const outlineLength = outline.getTotalLength();
    //duration
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //pick different sounds
    sounds.forEach(sound =>{
        sound.addEventListener('click', function(){
            song.src = this.getAttribute('data-sound');
            checkPlaying(song);
        });
    });

    //play sound
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    //Select sound
    timeSelect.forEach(option =>{
        option.addEventListener('click', function() {
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = ` ${Math.floor(fakeDuration / 60)}:${Math.floor(
                fakeDuration % 60)} `;
        });
    });


    //create function for stop and play sounds
    const checkPlaying = song =>{
    if(song.paused){
        song.play();
        play.src = './svg/pause.svg';
        }
        else{
            song.pause();
            play.src = './svg/play.svg';
        }
    }
    //we can animate the circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime
        let seconds = Math.floor (elapsed % 60);
        let minutes = Math.floor (elapsed / 60);

    // animate the circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;
    //animate the text
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if(currentTime >= fakeDuration) {
        song.pause();
        song.currentTime = 0;
        play.src = './svg/play.svg';
        }
    };
};

app();