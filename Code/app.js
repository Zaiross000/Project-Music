const audio = document.querySelector('.audio');

var music = {
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
    play: function () {
        const btnPlay = document.querySelector('.play');
        const play = document.querySelector('.fa-circle-play');
        const pause = document.querySelector('.fa-pause');
        let count = 0
        btnPlay.onclick = () => {
            count++
            if (count % 2 != 0) {
                audio.play()
                play.classList.add('playing')
                pause.classList.remove('pause')
            } else{
                audio.pause()
                play.classList.remove('playing')
                pause.classList.add('pause')
            }
        }
    },
    defaultSong: function () {
        const cdThumb = document.querySelector('.cd-thumb img');
        cdThumb.src = this.songs[0].img

        const title = document.querySelector('.current-title h3');
        title.innerHTML = this.songs[0].title

        audio.src = this.songs[0].src
    },
    currentProgress: ()=> {
        const range = document.querySelector('.range');
        audio.ontimeupdate = () => {
            const percent = Math.floor(audio.currentTime * 100 / audio.duration)
            if(percent) {
                range.value = percent
            }
        }
    },
    start: function () {
        // Play music when click button play
        this.play()

        // Default Song 
        this.defaultSong()

        // Render list music
        this.render()

        // Current Progress audio
        this.currentProgress()
    }
}

music.start()




