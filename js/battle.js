function checkWinner() {
    if (player.health <= 0 && cpu.health <= 0) {
        log.push("IT WAS A DRAW");
    } else if (player.health <= 0) {
        log.push("YOU LOST!");
    } else if (cpu.health <= 0) {
        log.push("YOU WIN!!!");
    } else {
        fightAgain = true;
    }
}

function battleLog() {
    let battlelog = document.querySelector(".battlelog");
    log.map(function(line) {
        battlelog.innerHTML += "<li>" + line + "</li>";
    });
}

function spawn() {
    document.querySelector(".player .name").innerText = player.pokemon.name;
    document.querySelector(".player .health").innerText =
        player.health + " / " + player.pokemon.hp;
    let playerImg = document.querySelector(".player img");
    playerImg.src = player.pokemon.image;

    document.querySelector(".cpu .name").innerText = cpu.pokemon.name;
    document.querySelector(".cpu .health").innerText =
        cpu.health + " / " + cpu.pokemon.hp;
    let cpuImg = document.querySelector(".cpu img");
    cpuImg.src = cpu.pokemon.image;
}

function footerButton() {
    let footer = document.querySelector("footer");
    if (fightAgain) {
        player.pokemon.attacks.map(function(attack, index) {
            let button = document.createElement("button");
            button.innerText = attack.name;
            button.addEventListener("click", function() {
                player.move = index;
                cpu.move = Math.floor(Math.random() * cpu.pokemon.attacks.length);
                Cookies.set("game", JSON.stringify(game));
                location.reload();
            });
            footer.append(button);
        });
    } else {
        let button = document.createElement("button");
        button.innerText = "Play a new game";
        button.addEventListener("click", function() {
            Cookies.remove("game");
            location.href = "index.html";
        });
        footer.append(button);
    }
}

function battleSequence() {
    const playerMove = player.pokemon.attacks[player.move];
    const playerDamage = typeMatch(playerMove.hit, playerMove.dam);
    cpu.health = cpu.health - playerDamage;
    log.push(
        `Player attacks with ${playerMove.name} and does ${playerDamage} damage`
    );

    const cpuMove = cpu.pokemon.attacks[cpu.move];
    const cpuDamage = typeMatch(cpuMove.hit, cpuMove.dam);
    player.health = player.health - cpuDamage;
    log.push(
        `CPU attacks with ${cpuMove.name} and does ${cpuDamage} damage`
    );
}

function typeMatch(amount, sides) {
    total = 0;
    for (let i = 0; i < amount; i++) {
        match = Math.floor(Math.random() * sides) + 1;
        total += match;
    }
    return total;
}

let game = JSON.parse(Cookies.get("game"));
let cpu = game.cpu;
let player = game.player;
let log = [];
let fightAgain = false;

if (!game.firstRound) {
    battleSequence();
}
checkWinner();
spawn();
battleLog();

game.firstRound = false;
footerButton();