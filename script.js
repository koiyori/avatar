const canvas = document.getElementById("avatarCanvas");
const ctx = canvas.getContext("2d");

const assets = {
    A: {
        hairColors: {
            gold: "data:image/png;base64,...", // 原作
            purple: "data:image/png;base64,...", // アニメ
            silver: "data:image/png;base64,...", // テニミュ
        },
        outfits: {
            casual: "data:image/png;base64,...", // 私服A
            uniform: "data:image/png;base64,...", // 制服
        },
    },
    B: {
        hairColors: {
            brown: "data:image/png;base64,...", // 茶髪
            sandy: "data:image/png;base64,...", // 砂色
        },
        outfits: {
            casual: "data:image/png;base64,...", // 私服B
            uniform: "data:image/png;base64,...", // 制服
        },
    },
};

const characterSelect = document.getElementById("characterSelect");
const hairColorSelect = document.getElementById("hairColor");
const outfitSelect = document.getElementById("outfit");
const downloadBtn = document.getElementById("downloadBtn");

function updateOptions() {
    const selectedCharacter = characterSelect.value;

    // 髪の色の選択肢を更新
    hairColorSelect.innerHTML = "";
    Object.keys(assets[selectedCharacter].hairColors).forEach((key) => {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = key === "gold" ? "原作" : key === "purple" ? "アニメ" : key === "silver" ? "テニミュ" : key === "brown" ? "茶髪" : "砂色";
        hairColorSelect.appendChild(option);
    });

    // 服装の選択肢を更新
    outfitSelect.innerHTML = "";
    Object.keys(assets[selectedCharacter].outfits).forEach((key) => {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = key === "casual" ? "制服(夏)" : "制服(冬)";
        outfitSelect.appendChild(option);
    });

    // プレビューを更新
    updateAvatar();
}

async function updateAvatar() {
    const selectedCharacter = characterSelect.value;
    const selectedHair = hairColorSelect.value;
    const selectedOutfit = outfitSelect.value;

    // Canvasをクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 髪と服の画像をロードしてCanvasに描画
    const hairImg = new Image();
    hairImg.src = assets[selectedCharacter].hairColors[selectedHair];
    await new Promise((resolve) => (hairImg.onload = resolve));
    ctx.drawImage(hairImg, 0, 0);

    const outfitImg = new Image();
    outfitImg.src = assets[selectedCharacter].outfits[selectedOutfit];
    await new Promise((resolve) => (outfitImg.onload = resolve));
    ctx.drawImage(outfitImg, 0, 0);
}

characterSelect.addEventListener("change", updateOptions);
hairColorSelect.addEventListener("change", updateAvatar);
outfitSelect.addEventListener("change", updateAvatar);

downloadBtn.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "avatar.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
});

// 初期設定
updateOptions();
