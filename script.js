let currentMusic = 1;
const music = new Audio(`audio/${currentMusic}.mp3`);

// Set initial volume
music.volume = 0.3;

const songs = [
    {
        id:'1',
        songName:'Luther <br> <div class="subtitle">Kendrick Lamar ft. SZA</div>', 
        poster:"images/kdot.jpg"
    },
    {
        id:'2',
        songName:'Heart pt.6 <br> <div class="subtitle">Kendrick Lamar</div>', 
        poster:"images/kdot.jpg"
    },
    {
        id:'3',
        songName:'Squabble Up <br> <div class="subtitle">Kendrick Lamar</div>', 
        poster:"images/kdot.jpg"
    },
    {
        id:'4',
        songName:'Timeless <br> <div class="subtitle">The Weeknd ft. Playboi Carti</div>', 
        poster:"images/hurryuptomorrow.jpg"
    },
    {
        id:'5',
        songName:'Reincarnated <br> <div class="subtitle">Kendrick Lamar</div>', 
        poster:"images/kdot.jpg"
    },
    {
        id:'6',
        songName:'Stay High <br> <div class="subtitle">Juice WRLD</div>', 
        poster:"images/Legends Never Die.jfif"
    },
    {
        id:'7',
        songName:'Conversations <br> <div class="subtitle">Juice WRLD</div>', 
        poster:"images/Legends Never Die.jfif"
    },
    {
        id:'8',
        songName:'Cry For Me <br> <div class="subtitle">The Weeknd</div>', 
        poster:"images/hurryuptomorrow.jpg"
    },
    {
        id:'9',
        songName:'Not Like Us<br><div class="subtitle">Kendrick Lamar</div>', 
        poster:"images/notlikeus.jfif"
    },
    {
        id:'10',
        songName:'Starboy<br><div class="subtitle">The Weeknd</div>', 
        poster:"images/starboy.jfif"
    },
    {
        id:'11',
        songName:'Whoa<br><div class="subtitle">XXXTENTACION</div>', 
        poster:"images/skins.jpg"
    },
    {
        id:'12',
        songName:'Gloria<br><div class="subtitle">Kendrick Lamar ft. SZA</div>', 
        poster:"images/kdot.jpg"
    },
    {
        id:'13',
        songName:'Empty Out Your Pocket<br><div class="subtitle">Juice WRLD</div>', 
        poster:"images/tpne.jfif"
    },
    {
        id:'14',
        songName:'Misfit<br><div class="subtitle">Juice WRLD</div>', 
        poster:"images/tpne.jfif"
    },
    {
        id:'15',
        songName:'Like That<br><div class="subtitle">Future & Metro Boomin ft. Kendrick Lamar</div>', 
        poster:"images/wedonttrustyou.jfif"
    },
    {
        id:'16',
        songName:'Wacced Out Murals<br><div class="subtitle">Kendrick Lamar</div>', 
        poster:"images/kdot.jpg"
    },
    {
        id:'17',
        songName:'Righteous<br><div class="subtitle">Juice WRLD</div>', 
        poster:"images/juicewrld.jfif"
    }
];

// Get DOM elements
let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave')[0];
let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.querySelector('.dot');
let vol_icon = document.querySelector('.vol i');
let vol = document.querySelector('.vol input');
let vol_bar = document.querySelector('.vol_bar');
let vol_dot = document.querySelector('.vol .dot');

// Time conversion function
const formatTime = (seconds) => {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
};

// Update time stamps and progress bar
music.addEventListener('timeupdate', () => {
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    currentStart.textContent = formatTime(music_curr);
    
    if (!isNaN(music_dur)) {
        currentEnd.textContent = formatTime(music_dur);
        seek.max = Math.floor(music_dur);
    }

    seek.value = music_curr;
    let seekbar = seek.value;
    bar2.style.width = `${(seekbar / music_dur) * 100}%`;
    dot.style.left = `${(seekbar / music_dur) * 100}%`;
});

// Seek functionality
seek.addEventListener('change', () => {
    music.currentTime = seek.value;
});

// Volume controls
const setupVolumeControls = () => {
    if (vol) {
        vol.addEventListener('change', () => {
            let vol_a = vol.value;
            music.volume = vol_a / 100;
            vol_bar.style.width = `${vol_a}%`;
            vol_dot.style.left = `${vol_a}%`;
            
            if (vol_a == 0) {
                vol_icon.classList.remove('bi-volume-down-fill');
                vol_icon.classList.add('bi-volume-mute-fill');
            } else {
                vol_icon.classList.add('bi-volume-down-fill');
                vol_icon.classList.remove('bi-volume-mute-fill');
            }
        });
    }
};

// Update play icon function
const updatePlayIcon = (isPlaying) => {
    if (isPlaying) {
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
    } else {
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');
    }
};

// Play/pause function
const togglePlay = () => {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        updatePlayIcon(true);
        makeAllPlays();
        let playlistButton = document.getElementById(currentMusic);
        if (playlistButton) {
            playlistButton.classList.remove('bi-play-fill');
            playlistButton.classList.add('bi-pause-fill');
        }
    } else {
        music.pause();
        updatePlayIcon(false);
        let playlistButton = document.getElementById(currentMusic);
        if (playlistButton) {
            playlistButton.classList.add('bi-play-fill');
            playlistButton.classList.remove('bi-pause-fill');
        }
    }
};

// Master play button event
masterPlay.addEventListener('click', togglePlay);

// Reset all playlist buttons
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('playListPlay')).forEach((element) => {
        element.classList.add('bi-play-fill');
        element.classList.remove('bi-pause-fill');
    });
};

// Reset all backgrounds
const makeAllBackgrounds = () => {
    Array.from(document.getElementsByClassName('songItem')).forEach((element) => {
        element.style.background = "rgb(105, 105, 170, 0)";
    });
};

// Song loading function
const loadSong = (index) => {
    music.src = `audio/${index}.mp3`;
    let song = songs.find(item => item.id === index.toString());
    
    if (song) {
        let poster_master_play = document.getElementById('poster_master_play');
        let masterPlayTitle = document.querySelector('.master_play h5');
        
        if (poster_master_play) poster_master_play.src = song.poster;
        if (masterPlayTitle) masterPlayTitle.innerHTML = song.songName;
        
        bar2.style.width = '0%';
        dot.style.left = '0%';
        currentStart.textContent = '0:00';
    }
    
    music.addEventListener('loadeddata', () => {
        music.play();
        updatePlayIcon(true);
        makeAllPlays();
        let currentButton = document.getElementById(index);
        if (currentButton) {
            currentButton.classList.remove('bi-play-fill');
            currentButton.classList.add('bi-pause-fill');
        }
    });
};

// Playlist button events
Array.from(document.getElementsByClassName('playListPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        let newIndex = e.target.id;
        
        if (newIndex === currentMusic && !music.paused) {
            music.pause();
            updatePlayIcon(false);
            e.target.classList.add('bi-play-fill');
            e.target.classList.remove('bi-pause-fill');
        } else {
            makeAllPlays();
            currentMusic = newIndex;
            loadSong(currentMusic);
            
            e.target.classList.remove('bi-play-fill');
            e.target.classList.add('bi-pause-fill');
            updatePlayIcon(true);
            
            makeAllBackgrounds();
            Array.from(document.getElementsByClassName('songItem'))[currentMusic - 1].style.background = "rgb(105, 105, 170, .1)";
        }
    });
});
document.querySelector('.buttons button:first-child').addEventListener('click', () => {
    currentMusic = 4; // Set to Timeless
    loadSong(currentMusic);
    
    makeAllPlays();
    let playButton = document.getElementById('4');
    if (playButton) {
        playButton.classList.remove('bi-play-fill');
        playButton.classList.add('bi-pause-fill');
    }
    
    music.play();
    masterPlay.classList.remove('bi-play-fill');
    masterPlay.classList.add('bi-pause-fill');
    wave.classList.add('active2');
});
music.addEventListener('canplay', () => {
    music.play();
    updatePlayIcon(true);
});

// When song ends
music.addEventListener('ended', () => {
    updatePlayIcon(false);
    makeAllPlays();
});

// Popular Song scroll buttons
let pop_song_left = document.getElementById('left_scroll');
let pop_song_right = document.getElementById('right_scroll');
let pop_song = document.getElementsByClassName('pop_song')[0];

pop_song_right.addEventListener('click', () => {
    pop_song.scrollLeft += 330;
});

pop_song_left.addEventListener('click', () => {
    pop_song.scrollLeft -= 330;
});

// Popular Artists scroll buttons
let pop_art_left = document.getElementById('left_scrolls');
let pop_art_right = document.getElementById('right_scrolls');
let Artists_bx = document.getElementsByClassName('item')[0];

pop_art_right.addEventListener('click', () => {
    Artists_bx.scrollLeft += 330;
});

pop_art_left.addEventListener('click', () => {
    Artists_bx.scrollLeft -= 330;
});

// Initialize
setupVolumeControls();
loadSong(currentMusic);