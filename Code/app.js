const audio = document.querySelector('.current-audio .audio');
const rangeCurrentTime = document.querySelector('.range');
const cdThumbImg = document.querySelector('.cd-thumb img');
const btnPlay = document.querySelector('.play');
const play = document.querySelector('.fa-circle-play');
const pause = document.querySelector('.fa-pause');
const title = document.querySelector('.current-title h3');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
const btnRandom = document.querySelector('.btn-random');
const updateCurrentTime = document.querySelector('.current-time');
const rangeVolume = document.querySelector('.volume');
const btnVolume = document.querySelector('.btn-volume');
const iconMute = document.querySelector('.fa-volume-xmark');
const iconSound = document.querySelector('.fa-volume-high');


const music = {
    currentIndex: 0,
    isPlaying: false,
    isMute: false,
    songs: [
        {
            id: 1,
            title: 'Until I Found You',
            src: '../Music/Until I Found You.mp3',
            img: '../Image/until i found you.jfif',
            time: '2:55',
            artist: 'Stephen Sanchez'
        },
        {
            id: 2,
            title: 'Lock Out Of Heaven',
            src: '../Music/Lock Out Of Heaven.mp3',
            img: '../Image/lock out of heaven.jfif',
            time: '3:55',
            artist: 'Bruno Mars'
        },
        {
            id: 3,
            title: 'Some Body That I Used To Know',
            src: '../Music/Some Body That Used To Know.mp3',
            img: '../Image/some body that i used to know.jfif',
            time: '4:04',
            artist: 'Gotye'
        },
        {
            id: 4,
            title: 'Toxic',
            src: '../Music/Toxic.mp3',
            img: '../Image/toxic.jfif',
            time: '2:49',
            artist: 'BoyWithUke',
        },
        {
            id: 5,
            title: 'I am Blue',
            src: '../Music/I Am Blue.mp3',
            img: '../Image/i am blue.jfif',
            time: '4:43',
            artist: 'Bliss Corporation'
        },
        {
            id: 6,
            title: 'We Will Meet Again',
            src: '../Music/We Will Meet Again.mp3',
            img: '../Image/we will meet again.jfif',
            time: '3:16',
            artist: 'Laura Brehm'
        }
    ],
    handeleNumber: (number) => {
        const minutes = Math.floor(number / 60)
        const seconds = Math.floor(number - (minutes * 60))
        return `${minutes}:${seconds}`
    },
    render: function () {
        const htmls = this.songs.map(song => {
            return `
            <div class="music-group">
                <div class="wrapper-music">
                    <i class="fa-solid fa-music"></i>
                    <img src="${song.img}" alt="" class="music-thumb">
                    <div class="title">
                        <p>${song.title}</p>
                        <p>${song.artist}</p>
                    </div>
                </div>
                <p class ="title-music">${song.title}</p>
                <p class="time">${song.time}</p>
            </div>`
        })
        document.querySelector('.play-list').innerHTML = htmls.join('')
    },
    handleEvent: () => {
        let count = 0

        // Click button play audio
        btnPlay.onclick = () => {
            if (music.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        // Prev audio
        btnPrev.onclick = () => {
            // console.log(music.currentIndex);
            if (music.currentIndex < 0) {
                music.currentIndex = music.songs.length - 1
                music.currentSong()
                audio.play()
                console.log(music.currentIndex);

            } else {
                music.currentIndex-- 
                music.currentSong()
                audio.play()
            }
        }

        // Next audio
        btnNext.onclick = () => {
            music.currentIndex++
            if (music.currentIndex >= music.songs.length) {
                music.currentIndex = 0
                music.currentSong()
                audio.play()
            } else {
                cdThumbAnimate.play()
                music.currentSong()
                audio.play()

            }
        }

        // Random audio
        btnRandom.onclick = () => {
            music.currentIndex = Math.floor(Math.random() * music.songs.length)
            music.currentSong()
            audio.play()
        }

        // Change time audio
        rangeCurrentTime.oninput = (e) => {
            const changeProgress = Math.floor(audio.duration * e.target.value / 100)
            audio.currentTime = changeProgress
        }

        // CD thumb animation
        const cdThumbAnimate = cdThumbImg.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000, // 10 seconds
            iterations: Infinity,
        })
        // Default pause
        cdThumbAnimate.pause()

        // Current time audio
        audio.ontimeupdate = () => {
            const percent = Math.floor(audio.currentTime * 100 / audio.duration)
            if (percent) {
                rangeCurrentTime.value = percent
            }
            updateCurrentTime.innerHTML = `${music.handeleNumber(audio.currentTime)} / ${music.handeleNumber(audio.duration)}`

            // Auto next audi when the current audio end
            if (audio.currentTime == audio.duration) {
                music.currentIndex++
                music.currentSong()
                audio.play()
            }
        }

        // Pause audio event
        audio.onpause = () => {
            btnPlay.classList.remove('playing')
            music.isPlaying = false
            cdThumbAnimate.pause()
        }

        // Play audio event
        audio.onplay = () => {
            btnPlay.classList.add('playing')
            music.isPlaying = true
            cdThumbAnimate.play()
        }

        // Update time audio when the browser start load the audio
        audio.onloadedmetadata = () => {
            updateCurrentTime.innerHTML = `${music.handeleNumber(audio.currentTime)} / ${music.handeleNumber(audio.duration)}`
        }

        // Change volume audio
        rangeVolume.oninput = (e) => {
            audio.volume = e.target.value
        }

        // Stop propagation when click range volume
        rangeVolume.onmousedown = (e) => {
            e.stopPropagation()
        }

        // Mute when click btn volume
        btnVolume.onmousedown = () => {
            if (music.isMute) {
                music.isMute = false
                audio.volume = rangeVolume.value
                iconMute.classList.add('mute')
                iconSound.classList.remove('mute')
            } else {
                music.isMute = true
                audio.volume = 0
                iconMute.classList.remove('mute')
                iconSound.classList.add('mute')
            }
        }


    },
    currentSong: () => {
        // console.log(music.songs[music.currentIndex])
        if(music.currentIndex < 0) {
            music.currentIndex = music.songs.length - 1
            console.log(music.songs[music.currentIndex].img);
            cdThumbImg.src = music.songs[music.currentIndex].img
            title.innerHTML = music.songs[music.currentIndex].title
            audio.src = music.songs[music.currentIndex].src
        }
        else {
            cdThumbImg.src = music.songs[music.currentIndex].img
            title.innerHTML = music.songs[music.currentIndex].title
            audio.src = music.songs[music.currentIndex].src
        }
    },
    clickList: () => {
        const audioList = document.querySelectorAll('.music-group');
        audioList.forEach((item, index) => {
            item.onclick = () => {
                music.currentIndex = index
                music.currentSong()
                audio.play()
            }
        })
    },
    start: function () {
        // Render list music
        this.render()

        // Handle event
        this.handleEvent()

        // load audio        
        this.currentSong()


        // Play audio when click list item audio
        this.clickList()
    }
}
music.start()





