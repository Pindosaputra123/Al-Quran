const listSurat = document.querySelector('.card-surat-list');
const loader = document.querySelector('.loader');
const error = `<div class="loader text-danger">Oppps Ada Masalah Nihh!</div>`;
async function getSurat() {

    try {
        await getUi();
        loader.classList.add('hidden-loader');
    } catch (err) {
        loader.classList.add('hidden-loader');
        listSurat.innerHTML = error;
        console.log(err);
    }
}

function getUi() {
    return fetch('https://equran.id/api/surat')
        .then(response => response.json())
        .then(response => {
            let cardSurat = '';
            response.forEach(surat => {
                cardSurat += `
                <div class="col-lg-3 col-md-4 col-sm-12">
                    <div class="card mb-4 card-surat">
                        <div class="card-body" onclick="location.href='surat.html?nomorsurat=${surat.nomor}' " >
                            <h5 class="card-title">${surat.nomor}. ${surat.nama_latin}</h5>
                            <h3 class="card-subtitle mb-2 text-muted text-end">${surat.nama}</h3>
                            <p class="card-text text-end">${surat.arti}</p>
                        </div>
                    </div>
                </div>
                `;

            });

            listSurat.innerHTML = cardSurat;
            console.log(listSurat)
        });
}


getSurat();