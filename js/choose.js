function startGame(index) {
    const randomNumber = Math.floor(Math.random() * pokemon.length);

    const game = {
        firstRound: true,
        player: {
            pokemon: pokemon[index],
            health: pokemon[index].hp,
            move: null,
        },
        cpu: {
            pokemon: pokemon[randomNumber],
            health: pokemon[randomNumber].hp,
            move: null,
        },
    };

    console.log(game);

    Cookies.set("game", JSON.stringify(game));
    location.href = "battle.html";
}

pokemon.map(function(choice, index) {
    let div = document.createElement("div");

    div.innerHTML = `
        <img src="${choice.image}">
        <h3>${choice.name}</h3>
    `;

    let attackList = document.createElement("ul");
    choice.attacks.map(function(attack) {
        let attackItem = document.createElement("li");
        attackItem.innerText = attack.name;
        attackList.append(attackItem);
    });

    div.append(attackList);

    div.addEventListener("click", function() {
        startGame(index);
    });

    document.querySelector(".choose-pokemon").append(div);
});