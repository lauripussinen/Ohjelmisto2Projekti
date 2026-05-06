#aleksin ja laurin koodi

@app.route("/api/lenna", methods=["POST"])
def api_lenna():
    global RUOTSI_AVATTU, ITALIA_AVATTU, BRITANNIA_AVATTU

    data = request.get_json()
    game_id = data["game_id"]
    kohde_maa = data["iso_country"]

    if kohde_maa == "SE" and not RUOTSI_AVATTU:
        return jsonify({
            "status": "blackjack_required",
            "message": "Ruotsiin lentäminen vaatii blackjack-haasteen. Voita 5 kierrosta."
        })

    if kohde_maa == "IT" and not ITALIA_AVATTU:
        return jsonify({
            "status": "math_required",
            "message": "Italiaan lentäminen vaatii matikkahaasteen. Ratkaise 5 tehtävää oikein."
        })

    if kohde_maa == "GB" and not BRITANNIA_AVATTU:
        return jsonify({
            "status": "horse_required",
            "message": "Iso-Britanniaan lentäminen vaatii heppakisan. Valitse hevonen ja voita kisa."
        })

    lento = lenna(game_id, kohde_maa)

    if lento["status"] == "game_over":
        return jsonify(lento)

    esineet = hae_esineet()
    esine_tila = tarkista_esine(game_id, kohde_maa, esineet)
    peli = hae_peli(game_id)

    if peli["current_item"] >= len(esineet):
        return jsonify({
            "status": "win",
            "message": "Voitit pelin!"
        })

    seuraava_esine = esineet[peli["current_item"]]
    tarina = None

    if esine_tila == "loydetty":
        loydetty_esine = None

        for esine in esineet:
            if esine["iso_country"] == kohde_maa:
                loydetty_esine = esine
                break

        if loydetty_esine is not None:
            tarina = hae_esineen_tarina_ja_kuva(loydetty_esine)

    vastaus = dict(lento)

    vastaus["found_item"] = esine_tila == "loydetty"
    vastaus["item_status"] = esine_tila
    vastaus["hint"] = anna_vihje(seuraava_esine, peli["attempts"])
    vastaus["tarina"] = tarina

    return jsonify(vastaus)