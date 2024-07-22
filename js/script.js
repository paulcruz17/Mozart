document.addEventListener('DOMContentLoaded', () => {
    let audioElement = document.getElementById('background-music');
    let songList = [
        '/assets/Sounds/Playlist 1.mp3',
        '/assets/Sounds/Playlist 2.mp3',
        '/assets/Sounds/Playlist 3.mp3',
        '/assets/Sounds/Playlist 4.mp3',
        '/assets/Sounds/Playlist 5.mp3',
        '/assets/Sounds/Playlist 6.mp3',
        '/assets/Sounds/Playlist 7.mp3'
    ];

    let shuffledSongList = [...songList]; // Creamos una copia de la lista original
    let currentSongIndex = 0;

    let isPlaying = false;
    let waveformInitialized = false;
    let waveformContainer = document.getElementById('waveform');

    // Configuración de WaveSurfer
    const wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'black',
        progressColor: '#fa6400',
        barWidth: 1,
        hideScrollbar: true,
        height: 50,
        barGap: 1,
        responsive: true,
        cursorColor: 'black',
        cursorWidth: 0,
        interact: false, // Interacción desactivada
        barHeight: 0.6,
        backend: 'WebAudio'
    });

    function playNextSong() {
        if (shuffledSongList.length === 0) {
            shuffledSongList = [...songList]; // Resetamos la lista si se ha reproducido toda
        }
        currentSongIndex = Math.floor(Math.random() * shuffledSongList.length);
        const songUrl = shuffledSongList[currentSongIndex];
        audioElement.src = songUrl;
        wavesurfer.load(songUrl);
        audioElement.play();
        // Eliminamos la canción reproducida de la lista
        shuffledSongList.splice(currentSongIndex, 1);
    }

    function handleCheckboxChange() {
        let checkbox = document.getElementById('check');
        if (checkbox.checked) {
            audioElement.volume = 0.5; // Volumen al 100%
            waveformContainer.classList.add('show'); // Mostrar el waveform
            if (!isPlaying) {
                playNextSong();
                isPlaying = true;
            }
        } else {
            audioElement.volume = 0; // Volumen a 0%
            waveformContainer.classList.remove('show'); // Ocultar el waveform
        }
    }

    document.getElementById('check').addEventListener('change', handleCheckboxChange);

    audioElement.addEventListener('play', () => {
        if (waveformInitialized) {
            wavesurfer.play();
        }
    });

    audioElement.addEventListener('pause', () => {
        wavesurfer.pause();
    });

    audioElement.addEventListener('timeupdate', () => {
        let currentTime = audioElement.currentTime;
        let duration = audioElement.duration;
        let progress = currentTime / duration;
        if (!wavesurfer.isPlaying()) {
            wavesurfer.seekTo(progress);
        }
    });

    // Maneja el final de la canción
    audioElement.addEventListener('ended', () => {
        // Detiene la canción actual un segundo antes de su final
        setTimeout(() => {
            playNextSong();
        }, 1000);
    });

    // Cuando el waveform está listo, se marca como inicializado
    wavesurfer.on('ready', () => {
        waveformInitialized = true;
    });


    // Manejo del scroll y otras configuraciones
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 25) {
            header.classList.add('hide');
        } else {
            header.classList.remove('hide');
        }
        lastScrollY = currentScrollY;
    });

    const links = document.querySelectorAll('.navlist li a');
    const sections = document.querySelectorAll('section');
    const navbar = document.querySelector('.navbar');

    function removeActiveClasses() {
        links.forEach(link => {
            link.classList.remove('active');
        });
    }

    function addActiveClass(link) {
        removeActiveClasses();
        link.classList.add('active');
    }

    function updateNavbarColor() {
        let section3Visible = false;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop) {
                if (section.getAttribute('id') === 'docentes') {
                    section3Visible = true;
                }
            }
        });

        if (section3Visible) {
            navbar.classList.add('white-text');
        } else {
            navbar.classList.remove('white-text');
        }
    }

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            addActiveClass(link);
            const href = link.getAttribute('href');
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            if (link.getAttribute('href').substring(1) === current) {
                addActiveClass(link);
            }
        });
        updateNavbarColor();
    });

    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 150,
                "density": {
                    "enable": true,
                    "value_area": 1000
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "image",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "/assets/music-fill.png",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 8,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
});
