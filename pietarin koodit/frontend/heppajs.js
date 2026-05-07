let heppaValittu = null;
let heppaPositions = [0, 0, 0];
let heppaFinished = [];

    if (data.status === "horse_required") {
      odottavaBritannia = isoCountry;
      document.getElementById("info").textContent = data.message;
      await avaaHeppakisa();
      return;
    }
        if (data.status === "win") {
      document.getElementById("info").textContent = data.message;
      document.getElementById("hint").textContent = "";

      const tarinat = [];

      if (data.item_status === "loydetty" && data.tarina) {
        tarinat.push(data.tarina);
      }

      if (data.voittotarina) {
        tarinat.push(data.voittotarina);
      }

      naytaTarinat(tarinat);
      return;
    }

        async function avaaHeppakisa() {
  heppaValittu = null;
  heppaPositions = [0, 0, 0];
  heppaFinished = [];

  document.getElementById("heppa-container").style.display = "block";
  document.getElementById("heppa-aloita").disabled = true;
  document.getElementById("heppa-rata-alue").style.display = "none";
  document.getElementById("heppa-uusi").style.display = "none";
  document.getElementById("heppa-tulos").textContent = "";
  document.getElementById("heppa-liiku").disabled = false;

  const response = await fetch("http://127.0.0.1:5000/api/heppa/aloita", {
    method: "POST"
  });

  const data = await response.json();
  heppaPositions = data.positions;
  heppaFinished = data.finished;
  renderHepat();
}

function aloitaHeppakisa() {
  if (!heppaValittu) {
    alert("Valitse hevonen!");
    return;
  }

  document.getElementById("heppa-rata-alue").style.display = "block";
  document.getElementById("heppa-tulos").textContent = "";
  document.getElementById("heppa-uusi").style.display = "none";
  document.getElementById("heppa-liiku").disabled = false;

  renderHepat();
}

function valitseHevonen(hevonen) {
  heppaValittu = hevonen;
  document.getElementById("heppa-aloita").disabled = false;
}

function renderHepat() {
  const radatDiv = document.getElementById("heppa-radat");

  radatDiv.innerHTML = heppaPositions.map((pos, index) => {
    const prosentti = Math.min((pos / 30) * 100, 100);

    return `
      <div class="heppa-track">
        <div class="heppa-label">Hevonen ${index + 1}</div>
        <div class="heppa-horse" style="left:${prosentti}%"></div>
      </div>
    `;
  }).join("");
}

async function liikutaHepat() {
  const sound = document.getElementById("hirnahdus");
  sound.currentTime = 0;
  sound.play();

  const response = await fetch("http://127.0.0.1:5000/api/heppa/liiku", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chosenHorse: heppaValittu
    })
  });

  const data = await response.json();

  heppaPositions = data.positions;
  heppaFinished = data.finished;
  renderHepat();

  if (data.valmis) {
    const voittaja = data.winner;
    const tulos = document.getElementById("heppa-tulos");
    const liikuNappi = document.getElementById("heppa-liiku");
    const uusiNappi = document.getElementById("heppa-uusi");

    liikuNappi.disabled = true;

    if (data.won) {
      tulos.textContent = `Voitit! ${voittaja} tuli ensimmäisenä maaliin!`;
      document.getElementById("info").textContent =
        "Heppakisa voitettu. Lennetään Iso-Britanniaan...";

      setTimeout(async () => {
        document.getElementById("heppa-container").style.display = "none";
        liikuNappi.disabled = false;

        if (odottavaBritannia) {
          const maa = odottavaBritannia;
          odottavaBritannia = null;
          await lenna(maa);
        }
      }, 1500);

    } else {
      tulos.textContent =
        `Hävisit! Voittaja oli ${voittaja}. Valitse hevonen ja yritä uudestaan.`;
      uusiNappi.style.display = "inline-block";
      document.getElementById("heppa-rata-alue").style.display = "block";
    }
  }
}