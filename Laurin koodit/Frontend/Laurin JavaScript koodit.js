//1. lisäys yhteiseen lenna funktioon

if (data.item_status === "loydetty") {
      document.getElementById("hint").textContent =
        "Löysit esineen! Uusi vihje: " + data.hint;
      naytaTarina(data.tarina);
    } else if (data.item_status === "jo_saatu") {
      document.getElementById("hint").textContent =
        "Olet saanut esineen täältä jo aiemmin.";
    } else {
      document.getElementById("hint").textContent =
        "Väärä maa. Vihje: " + data.hint;
    }

  } catch (error) {
    console.error(error);
    piilotaLentoGif();
    document.getElementById("info").textContent =
      "Virhe lentäessä. Tarkista Flask-palvelin.";
  }
}

//2.
function naytaTarinat(tarinat) {
  tarinaJono = tarinat.filter(function(tarina) {
    return tarina && tarina.teksti;
  });

  naytaSeuraavaTarina();
}

function naytaSeuraavaTarina() {
  if (tarinaJono.length === 0) {
    document.getElementById("tarina-overlay").style.display = "none";
    return;
  }

  const tarina = tarinaJono.shift();
  naytaTarina(tarina);
}

function naytaTarina(tarina) {
  if (tarina === null) {
    return;
  }

  if (tarina === undefined) {
    return;
  }

  if (tarina.teksti === null) {
    return;
  }

  if (tarina.teksti === undefined) {
    return;
  }

  if (tarina.teksti === "") {
    return;
  }

  if (tarina.otsikko) {
    document.getElementById("tarina-otsikko").textContent = tarina.otsikko;
  } else {
    document.getElementById("tarina-otsikko").textContent = "Löysit esineen";
  }

  document.getElementById("tarina-teksti").textContent = tarina.teksti;

  const kuva = document.getElementById("tarina-kuva");

  if (tarina.kuva) {
    kuva.src = tarina.kuva;
    kuva.style.display = "block";
  } else {
    kuva.removeAttribute("src");
    kuva.style.display = "none";
  }

  document.getElementById("tarina-overlay").style.display = "flex";
}

function suljeTarina() {
  naytaSeuraavaTarina();
}