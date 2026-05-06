tarina_funktiot = {
    "Kirje": Tarinat.kirje,
    "Kultainen teelusikka": Tarinat.teelusikka,
    "Kaulakoru": Tarinat.kaulakoru,
    "Nahkahanskat": Tarinat.nahkahanskat,
    "Taskukello": Tarinat.taskukello
}


def hae_esineen_tarina_ja_kuva(esine):
    kuvat = {
        "Kirje": "kuvat/kirje.png",
        "Kultainen teelusikka": "kuvat/teelusikka.png",
        "Kaulakoru": "kuvat/kaulakoru.png",
        "Nahkahanskat": "kuvat/nahkahanskat.png",
        "Taskukello": "kuvat/taskukello.png"
    }

    tarina = []
    if esine["nimi"] in tarina_funktiot:
        tarina = tarina_funktiot[esine["nimi"]]()

    return {
        "otsikko": esine["nimi"],
        "teksti": "\n".join(tarina),
        "kuva": kuvat.get(esine["nimi"], "")
    }

def onko_esine_jo_pelaajalla(game_id, item_id):
    sql = 'SELECT 1 FROM game_items WHERE game_id = %s AND item_id = %s LIMIT 1'
    cursor = yhteys.cursor()
    cursor.execute(sql, (game_id, item_id))
    tulos = cursor.fetchone()
    cursor.close()
    return tulos is not None


def lisaa_esine_pelaajalle(game_id, item_id):
    sql = 'INSERT IGNORE INTO game_items (game_id, item_id) VALUES (%s, %s)'
    cursor = yhteys.cursor()
    cursor.execute(sql, (game_id, item_id))
    yhteys.commit()
    cursor.close()


def hae_maan_nimi(iso_koodi):
    sql = 'SELECT name FROM country WHERE iso_country = %s'
    cursor = yhteys.cursor(dictionary=True)
    cursor.execute(sql, [iso_koodi])
    tulos = cursor.fetchone()
    cursor.close()
    return tulos["name"]


def resetoi_peli(game_id, aloitus_icao, difficulty):
    cursor = yhteys.cursor()
    cursor.execute('DELETE FROM game_items WHERE game_id = %s', (game_id,))
    cursor.execute('UPDATE game SET location = %s, co2_consumed = 0, co2_budget = 5000, current_item = 0, attempts = 0, difficulty = %s WHERE id = %s', (aloitus_icao, difficulty, game_id))
    yhteys.commit()
    cursor.close()

def luo_peli(nimi, aloitus_icao, difficulty):
    sql = 'INSERT INTO game (screen_name, location, co2_consumed, co2_budget, current_item, attempts, difficulty) VALUES (%s, %s, 0, 5000, 0, 0, %s)'
    cursor = yhteys.cursor()
    cursor.execute(sql, (nimi, aloitus_icao, difficulty))
    yhteys.commit()
    game_id = cursor.lastrowid
    cursor.close()
    return game_id


def paivita_peli(game_id, location, co2_consumed, current_item, attempts, difficulty):
    sql = 'UPDATE game SET location=%s, co2_consumed=%s, current_item=%s, attempts=%s, difficulty=%s WHERE id=%s'
    cursor = yhteys.cursor()
    cursor.execute(sql, (location, co2_consumed, current_item, attempts, difficulty, game_id))
    yhteys.commit()
    cursor.close()

def lenna(game_id, kohde_maa):
    peli = hae_peli(game_id)
    nykyinen_icao = peli["location"]
    kohde_icao = hae_maan_paakentta(kohde_maa)

    if kohde_icao is None:
        return {
            "status": "error",
            "message": "Tuntematon maa."
        }

    km = etaisyys(nykyinen_icao, kohde_icao)
    paasto = vaikeustaso(km, peli["difficulty"])
    uusi_kulutus = peli["co2_consumed"] + paasto

    paivita_peli(
        game_id,
        kohde_icao,
        uusi_kulutus,
        peli["current_item"],
        peli["attempts"],
        peli["difficulty"]
    )

    maan_nimi = hae_maan_nimi(kohde_maa)

    if uusi_kulutus > peli["co2_budget"]:
        return {
            "status": "game_over",
            "country": maan_nimi,
            "km": round(km, 1),
            "co2": round(uusi_kulutus, 1),
            "budget": peli["co2_budget"],
            "message": "Peli loppui, koska CO2-budjetti ylittyi."
        }

    return {
        "status": "ok",
        "country": maan_nimi,
        "iso_country": kohde_maa,
        "km": round(km, 1),
        "co2": round(uusi_kulutus, 1),
        "budget": peli["co2_budget"]
    }


def hae_pelaajan_peli(nimi):
    cursor = yhteys.cursor(dictionary=True)
    cursor.execute('SELECT * FROM game WHERE screen_name = %s ORDER BY id DESC LIMIT 1', [nimi])
    tulos = cursor.fetchone()
    cursor.close()
    return tulos