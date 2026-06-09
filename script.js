const encodedMessage =
"SGFwcHkgYmlydGhkYXkgTGluZG8uIFlvdXIgIG1pc3Npb24gdG9kYXkgaXMgdG8gaGF2ZSBhIGJsYXN0LiBHb2RzcGVlZCE=";

function decodeMessage() {
    return atob(encodedMessage);
}

// Birthday config
const BIRTHDAY_DAY = 9;
const BIRTHDAY_MONTH = 5; // June

async function checkDate() {

    const input = document.getElementById("dateInput").value;
    const status = document.getElementById("status");
    const card = document.getElementById("mainCard");
    const music = document.getElementById("birthdayMusic");
    const balloonContainer = document.getElementById("balloon-container");

    // reset system
    card.classList.remove("celebration");
    balloonContainer.innerHTML = "";
    music.pause();
    music.currentTime = 0;

    if (!input) {
        status.innerHTML = "SYSTEM ERROR: No access code entered.";
        return;
    }

    const selectedDate = new Date(input);
    selectedDate.setHours(0, 0, 0, 0);

    const day = selectedDate.getDate();
    const month = selectedDate.getMonth();

    const isBirthday = (day === BIRTHDAY_DAY && month === BIRTHDAY_MONTH);

    // 🎉 BIRTHDAY MODE
    if (isBirthday) {

        status.innerHTML = "<div class='loading'>Verifying identity...</div>";
        await delay(900);

        status.innerHTML = "<div class='loading'>Decrypting secure file...</div>";
        await delay(1000);

        status.innerHTML = "<div class='loading'>Access granted pending final check...</div>";
        await delay(1000);

        launchConfetti();
        createBalloons();

        card.classList.add("celebration");

        try {
            await music.play();
        } catch (e) {
            console.log("Audio blocked:", e);
        }

        status.innerHTML = `
            <div class="birthday-message">
                🔓 ACCESS GRANTED<br><br>
                🎉 HAPPY BIRTHDAY LINDO.<br>
                YOUR MISSION TODAY IS TO HAVE A BLAST.<br>
                GODSPEED!
            </div>
        `;

        return;
    }

    // ⏳ COUNTDOWN MODE
    const year = selectedDate.getFullYear();

    let nextBirthday = new Date(year, BIRTHDAY_MONTH, BIRTHDAY_DAY);
    nextBirthday.setHours(0, 0, 0, 0);

    if (selectedDate > nextBirthday) {
        nextBirthday = new Date(year + 1, BIRTHDAY_MONTH, BIRTHDAY_DAY);
    }

    const diff = nextBirthday - selectedDate;
    const daysRemaining = Math.ceil(diff / (1000 * 60 * 60 * 24));

    status.innerHTML =
        `ACCESS DENIED<br><br>
        Next mission activation in:<br>
        <b>${daysRemaining}</b> day(s)`;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function launchConfetti() {

    const duration = 5000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({ particleCount: 5, spread: 90, origin: { x: 0 } });
        confetti({ particleCount: 5, spread: 90, origin: { x: 1 } });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

function createBalloons() {

    const container = document.getElementById("balloon-container");

    const colors = ["#ff4d6d", "#ffd60a", "#4cc9f0", "#80ed99", "#c77dff"];

    for (let i = 0; i < 25; i++) {

        const balloon = document.createElement("div");
        balloon.classList.add("balloon");

        balloon.style.left = Math.random() * 100 + "%";
        balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.animationDuration = (8 + Math.random() * 8) + "s";

        container.appendChild(balloon);

        setTimeout(() => balloon.remove(), 16000);
    }
}
