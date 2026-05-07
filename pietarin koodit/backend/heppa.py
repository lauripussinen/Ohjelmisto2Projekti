HEPAT = ["Hevonen 1", "Hevonen 2", "Hevonen 3"]
HEPPA_PAJAT = [0, 0, 0]
HEPPA_MAALISSA = []
BRITANNIA_AVATTU = False

@app.route("/api/heppa/aloita", methods=["POST"])
def heppa_aloita():
    global HEPPA_PAJAT, HEPPA_MAALISSA

    HEPPA_PAJAT = [0, 0, 0]
    HEPPA_MAALISSA = []

    return jsonify({
        "positions": HEPPA_PAJAT,
        "finished": HEPPA_MAALISSA
    })


@app.route("/api/heppa/liiku", methods=["POST"])
def heppa_liiku():
    global HEPPA_PAJAT, HEPPA_MAALISSA, BRITANNIA_AVATTU

    data = request.get_json()
    valittu_hevonen = data.get("chosenHorse")

    if len(HEPPA_MAALISSA) >= 1:
        voittaja = HEPPA_MAALISSA[0]
        voitto = voittaja == valittu_hevonen

        if voitto:
            BRITANNIA_AVATTU = True

        return jsonify({
            "positions": HEPPA_PAJAT,
            "finished": HEPPA_MAALISSA,
            "winner": voittaja,
            "won": voitto,
            "valmis": True
        })

    for i in range(len(HEPPA_PAJAT)):
        if HEPAT[i] not in HEPPA_MAALISSA:
            askel = random.randint(1, 6)
            HEPPA_PAJAT[i] += askel

            if HEPPA_PAJAT[i] >= 30 and HEPAT[i] not in HEPPA_MAALISSA:
                HEPPA_MAALISSA.append(HEPAT[i])

    voittaja = HEPPA_MAALISSA[0] if HEPPA_MAALISSA else None
    voitto = voittaja == valittu_hevonen if voittaja else False

    if voitto:
        BRITANNIA_AVATTU = True

    return jsonify({
        "positions": HEPPA_PAJAT,
        "finished": HEPPA_MAALISSA,
        "winner": voittaja,
        "won": voitto,
        "valmis": len(HEPPA_MAALISSA) >= 1
    })