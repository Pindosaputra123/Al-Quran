function getURL(e) {
    const pageURL = window.location.search.substring(1);
    const urlVariable = pageURL.split('&');

    for (let i = 0; i < urlVariable.length; i++) {
        const parameterName = urlVariable[i].split('=');
        if (parameterName[0] == e) {
            return parameterName[1];
        }
    }
}

const nomorsurat = getURL('nomorsurat');
const loader = document.querySelector('.loader');
const error = `<div class="loader text-danger">Oppps Ada Masalah Nihh!</div>`;

const judulSurat = document.querySelector('.judul-surat');
const cardIsiSurat = document.querySelector('.card-isi-surat');

const cardLoading = document.querySelector('.card');

async function getSurat() {

    try {
        cardLoading.classList.add('hidden-loader');
        await getUiDetail(nomorsurat)
        loader.classList.add('hidden-loader');
        cardLoading.classList.remove('hidden-loader');
    } catch (err) {
        loader.classList.add('hidden-loader');
        cardIsiSurat.innerHTML = error;
        console.log(err);
    }
}

function getUiDetail(nomorsurat) {
    return fetch(`https://equran.id/api/surat/${nomorsurat}`)
        .then(response => response.json())
        .then(response => {

            // Title Surat
            const titleSurat = document.querySelector('#title-surat');
            titleSurat.textContent = `Surat ${response.nama_latin}`

            // Judul surat

            const cardJudulSurat = `
            <strong>${response.nama_latin} - ${response.nama} </strong>
            <p>Jumlah ayat: ${response.jumlah_ayat} (${response.arti})</p>
            <button class="btn btn-primary audio-button-play">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-file-earmark-play-fill" viewBox="0 0 16 16">
                    <path
                        d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM6 6.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43V6.884z" />
                </svg>
                Dengarkan
            </button>
            <button class="btn btn-danger hidden-button audio-button-pause">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stop-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.5 5A1.5 1.5 0 0 0 5 6.5v3A1.5 1.5 0 0 0 6.5 11h3A1.5 1.5 0 0 0 11 9.5v-3A1.5 1.5 0 0 0 9.5 5h-3z"/>
            </svg>
                Stop
            </button>
            <audio id="audio-tag" src="${response.audio}"></audio>
            `;
            judulSurat.innerHTML = cardJudulSurat;
            // End Judul Surat

            // isi Surat
            const surat = response.ayat;
            let isiSurat = '';
            surat.forEach(s => {
                isiSurat += `
                <div class="card mb-3 ">
                    <div class="card-body">
                        <p>${s.nomor}</p>
                        <h3 class="text-end mb-2">${s.ar}</h3>
                        <p>${s.tr}</p>
                        <p>${s.idn}</p>
                    </div>
                </div>
                `;
            });


            cardIsiSurat.innerHTML = isiSurat;

            // play and pause audio

            const buttonPlay = document.querySelector('.audio-button-play');
            const buttonPause = document.querySelector('.audio-button-pause');
            const audioSurat = document.querySelector('#audio-tag');

            // play
            buttonPlay.addEventListener('click', function () {
                buttonPlay.classList.add('hidden-button');
                buttonPause.classList.remove('hidden-button');
                audioSurat.play();
            });

            // pause
            buttonPause.addEventListener('click', function () {
                buttonPause.classList.add('hidden-button');
                buttonPlay.classList.remove('hidden-button');
                audioSurat.pause();
            });


        });
}

getSurat();