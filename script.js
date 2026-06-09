const encodedMessage =
"SGFwcHkgYmlydGhkYXkgTGluZG8uIEkgaG9wZSB5b3UgYXJlIGhhdmluZyBhIGJsYXN0IG9mIGEgZGF5LiBHb2QgYmxlc3Mu";

function decodeMessage() {
    return atob(encodedMessage);
}

// Birthday config (Lindo's birthday)
const BIRTHDAY_DAY = 9;
const BIRTHDAY_MONTH = 5; // June (0-indexed)

async function checkDate() {

    const input = document.getElementById("dateInput").value;
    const status = document.getElementById("status");
    const card = document.getElementById("mainCard");
    const music = document.getElementById("birthdayMusic");
    const balloonContainer = document.getElementById("balloon-container");

    // RESET SYSTEM STATE
    card.classList.remove("celebration");
    balloonContainer.innerHTML = "";
    music.pause();
    music.currentTime = 0;

    if (!input) {
        status.innerHTML = "SYSTEM ERROR: No input detected.";
        return;
    }

    const selectedDate = new Date(input);
    selectedDate.setHours(0, 0, 0, 0);

    const day = selectedDate.getDate();
    const month = selectedDate.getMonth();

    const isBirthday = (day === BIRTHDAY_DAY && month === BIRTHDAY_MONTH);

    // 🎉 BIRTHDAY UNLOCK SEQUENCE
    if (isBirthday) {

        status.innerHTML = "<div class='loading'>Verifying credentials...</div>";
        await delay(800);

        status.innerHTML = "<div class='loading'>Decrypting secure archive...</div>";
        await delay(1000);

        status.innerHTML = "<div class='loading'>Establishing secure channel...</div>";
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
                🎉 CLASSIFIED MESSAGE UNLOCKED:<br><br>
                ${decodeMessage()}
            </div>
        `;

        return;
    }

    // ⏳ COUNTDOWN SYSTEM
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
        Next authorized activation in:<br>
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

        setTimeout(() => {
            balloon.remove();
        }, 16000);
    }
}
