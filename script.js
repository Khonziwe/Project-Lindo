const encodedMessage =
"SGFwcHkgYmlydGhkYXkgTGluZG8uIFlvdXIgIG1pc3Npb24gdG9kYXkgaXMgdG8gaGF2ZSBhIGJsYXN0LiBHb2RzcGVlZCE=";

function decodeMessage() {
    return atob(encodedMessage);
}

const BIRTHDAY_DAY = 9;
const BIRTHDAY_MONTH = 5; // June

async function checkDate() {

    const input = document.getElementById("dateInput").value;
    const status = document.getElementById("status");
    const card = document.getElementById("mainCard");
    const music = document.getElementById("birthdayMusic");
    const balloonContainer = document.getElementById("balloon-container");

    card.classList.remove("celebration");
    balloonContainer.innerHTML = "";
    music.pause();
    music.currentTime = 0;

    if (!input) {
        status.innerHTML = "Enter a valid access date.";
        return;
    }

    const selectedDate = new Date(input);
    selectedDate.setHours(0,0,0,0);

    const day = selectedDate.getDate();
    const month = selectedDate.getMonth();

    const isBirthday = (day === BIRTHDAY_DAY && month === BIRTHDAY_MONTH);

    // 🎉 CORRECT DATE (BIRTHDAY)
    if (isBirthday) {

        status.innerHTML = "<div class='loading'>Verifying identity...</div>";
        await delay(900);

        status.innerHTML = "<div class='loading'>Decrypting archive...</div>";
        await delay(900);

        status.innerHTML = "<div class='loading'>Access granted...</div>";
        await delay(900);

        launchConfetti();
        createBalloons();

        try {
            await music.play();
        } catch (e) {}

        status.innerHTML = `
            <div class="birthday-message">
                🎉 HAPPY BIRTHDAY LINDO.<br>
                YOUR MISSION TODAY IS TO HAVE A BLAST.<br>
                GODSPEED!
            </div>
        `;

        return;
    }

    // ⏳ WRONG DATE (COUNTDOWN)
    const year = selectedDate.getFullYear();
    let nextBirthday = new Date(year, BIRTHDAY_MONTH, BIRTHDAY_DAY);
    nextBirthday.setHours(0,0,0,0);

    if (selectedDate > nextBirthday) {
        nextBirthday = new Date(year + 1, BIRTHDAY_MONTH, BIRTHDAY_DAY);
    }

    const diff = nextBirthday - selectedDate;
    const daysRemaining = Math.ceil(diff / (1000*60*60*24));

    status.innerHTML =
        `Access denied.<br><br>
        Next activation in <b>${daysRemaining}</b> day(s).`;
}

function delay(ms){
    return new Promise(r => setTimeout(r, ms));
}

function launchConfetti(){
    const end = Date.now() + 4000;

    (function frame(){
        confetti({particleCount:5, spread:90, origin:{x:0}});
        confetti({particleCount:5, spread:90, origin:{x:1}});
        if(Date.now() < end) requestAnimationFrame(frame);
    })();
}

function createBalloons(){
    const container = document.getElementById("balloon-container");
    const colors = ["#ff4d6d","#ffd60a","#4cc9f0","#80ed99","#c77dff"];

    for(let i=0;i<25;i++){
        const b = document.createElement("div");
        b.classList.add("balloon");

        b.style.left = Math.random()*100 + "%";
        b.style.background = colors[Math.floor(Math.random()*colors.length)];
        b.style.animationDuration = (8 + Math.random()*6) + "s";

        container.appendChild(b);
        setTimeout(()=>b.remove(),15000);
    }
}
