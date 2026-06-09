const encodedMessage =
"SGFwcHkgYmlydGhkYXkgTGluZG8uIEkgaG9wZSB5b3UgYXJlIGhhdmluZyBhIGJsYXN0IG9mIGEgZGF5LiBHb2QgYmxlc3Mu";

function decodeMessage() {
    return atob(encodedMessage);
}

async function checkDate() {

    const input = document.getElementById("dateInput").value;
    const status = document.getElementById("status");
    const card = document.getElementById("mainCard");
    const music = document.getElementById("birthdayMusic");
    const balloonContainer = document.getElementById("balloon-container");

    // RESET EVERYTHING EVERY TIME (fixes first-try bug)
    card.classList.remove("celebration");
    balloonContainer.innerHTML = "";
    music.pause();
    music.currentTime = 0;

    if (!input) {
        status.innerHTML = "Please select a date.";
        return;
    }

    const selectedDate = new Date(input);

    // BLOCK PAST DATES (before today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        status.innerHTML = "You cannot enter a past date.";
        return;
    }

    const day = selectedDate.getDate();
    const month = selectedDate.getMonth();

    const birthdayDay = 9;
    const birthdayMonth = 5; // June

    const isBirthday = (day === birthdayDay && month === birthdayMonth);

    if (isBirthday) {

        status.innerHTML = "<div class='loading'>Date Verified...</div>";
        await delay(800);

        status.innerHTML = "<div class='loading'>Loading Project Lindo...</div>";
        await delay(800);

        status.innerHTML = "<div class='loading'>Preparing Message...</div>";
        await delay(1200);

        launchConfetti();
        createBalloons();

        card.classList.add("celebration");

        try {
            await music.play();
        } catch (e) {
            console.log("Audio blocked:", e);
        }

        status.innerHTML =
            `<div class="birthday-message">
                🎉<br><br>
                ${decodeMessage()}
            </div>`;

    } else {

        const currentYearBirthday =
            new Date(selectedDate.getFullYear(), birthdayMonth, birthdayDay);

        let nextBirthday = currentYearBirthday;

        if (selectedDate > currentYearBirthday) {
            nextBirthday =
                new Date(selectedDate.getFullYear() + 1, birthdayMonth, birthdayDay);
        }

        const diff = nextBirthday - selectedDate;
        const daysRemaining = Math.ceil(diff / (1000 * 60 * 60 * 24));

        status.innerHTML =
            "Hang in there. There are " +
            daysRemaining +
            " day(s until the next birthday.";
    }
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
