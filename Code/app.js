const audio = document.querySelector('.current-audio .audio');
const range = document.querySelector('.range');
const cdThumbImg = document.querySelector('.cd-thumb img');
const btnPlay = document.querySelector('.play');
const play = document.querySelector('.fa-circle-play');
const pause = document.querySelector('.fa-pause');
const title = document.querySelector('.current-title h3');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

const music = {
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
            count++
            changeIcon(count)
        }

        // Change icon button play
        function changeIcon(count) {
            if (count % 2 != 0) {
                // Play audio
                playMusic()
            } else {
                // Pause audio
                pauseMusic()
            }
        }

        function playMusic() {
            audio.play()
            play.classList.add('playing')
            pause.classList.remove('pause')
        }

        function pauseMusic() {
            audio.pause()
            play.classList.remove('playing')
            pause.classList.add('pause')
        }

        // CD thumb animation
        const cdThumbAnimate = cdThumbImg.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000, // 8 seconds
            iterations: Infinity,
        })
        cdThumbAnimate.pause()
        audio.onplay = () => {
            cdThumbAnimate.play()
        }
        audio.onpause = () => {
            cdThumbAnimate.pause()
        }

        // Current time audio
        audio.ontimeupdate = () => {
            const percent = Math.floor(audio.currentTime * 100 / audio.duration)
            if (percent) {
                range.value = percent
            }
        }

        // Change time audio
        range.oninput = (e) => {
            const changeProgress = Math.floor(audio.duration * e.target.value / 100)
            audio.currentTime = changeProgress
        }

        // Default audio
        cdThumbImg.src = music.songs[count].img
        title.innerHTML = music.songs[count].title
        audio.src = music.songs[count].src

        // Prev audio
        btnPrev.onclick = () => {
            if (count > 0) {
                count--
                cdThumbImg.src = music.songs[count].img
                title.innerHTML = music.songs[count].title
                audio.src = music.songs[count].src
                playMusic()
            } else {
                count = music.songs.length - 1
                console.log(count);
                cdThumbImg.src = music.songs[count].img
                title.innerHTML = music.songs[count].title
                audio.src = music.songs[count].src
                playMusic()
            }
        }

        // Next audio
        btnNext.onclick = () => {
            if (count >= music.songs.length - 1) {
                count = 0
                cdThumbImg.src = music.songs[count].img
                title.innerHTML = music.songs[count].title
                audio.src = music.songs[count].src
                playMusic()
            } else {
                count++
                cdThumbImg.src = music.songs[count].img
                title.innerHTML = music.songs[count].title
                audio.src = music.songs[count].src
                playMusic()
            }
        }

    },
    start: function () {
        // Handle event
        this.handleEvent()


        // Render list music
        this.render()



    }
}

music.start()




