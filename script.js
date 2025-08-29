let players_max_score = 0;

let player_score = 0;
let computer_score = 0;

function endGame() {

    const my_playable_buttons = document.querySelectorAll(".playable_button");
    const myDisappearItems = document.querySelectorAll(".disappear_play");
    const playBackground = document.getElementById("playBackground");

    for (const my_btn of my_playable_buttons) {
        my_btn.style.border = '';
        my_btn.style.filter = '';
    }
    displayText("Get 5 points to win! Rock, paper, scissors?");

    for (const my_item of myDisappearItems) {
        my_item.style.display = 'flex';
    }
    playBackground.style.display = "none";
    const myBestScore = document.getElementById("my_best_score");
    myBestScore.textContent = "Best Score: " + String(players_max_score);
    console.log(players_max_score);
    player_score = 0;
    computer_score = 0;
    updateScoreDisplay();

}

function colorOption(choice) {
    if (choice == 'rock') {
        document.getElementById("rock_button").style.border = '5px solid rgb(19, 175, 104)';
        document.getElementById("rock_button").style.filter = 'blur(0.5rem)';
    }
    else if (choice == 'paper') {
        document.getElementById("paper_button").style.border = '5px solid rgb(0, 145, 255)';
        document.getElementById("paper_button").style.filter = 'blur(0.5rem)';
    }
    else {
        document.getElementById("scissors_button").style.border = '5px solid red';
        document.getElementById("scissors_button").style.filter = 'blur(0.5rem)';
    }
}

function colorStrongOption(choice) {
    if (choice == 'rock') {
        document.getElementById("rock_button").style.border = '10px solid rgb(19, 175, 104)';
        document.getElementById("rock_button").style.filter = 'blur(0.25rem)';
    }
    else if (choice == 'paper') {
        document.getElementById("paper_button").style.border = '10px solid rgb(0, 145, 255)';
        document.getElementById("paper_button").style.filter = 'blur(0.25rem)';
    }
    else {
        document.getElementById("scissors_button").style.border = '10px solid red';
        document.getElementById("scissors_button").style.filter = 'blur(0.25rem)';
    }
}

function updateScoreDisplay() {
    const playerScoreBox = document.getElementById("playerScore");
    const computerScoreBox = document.getElementById("computerScore");
    playerScoreBox.textContent = "Your Score: " + String(player_score);
    computerScoreBox.textContent = "PC's Score: " + String(computer_score);
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getComputerChoice() {
    let choices = ['rock', 'paper', 'scissors'];
    let my_result = Math.floor(Math.random() * 3);
    return choices[my_result];
}

function displayText(my_string) {
    const text_box = document.getElementById("text_box");
    text_box.textContent = my_string;
}

function decidingWinner(first_choice, second_choice) {
    // 0: PLAYER LOST, 1: PLAYER WON, 2: DRAW //
    if (first_choice == 'rock') {
        if (second_choice == 'rock') {
            return 2;
        }
        else if (second_choice == 'paper') {
            return 0;
        }
        else {
            return 1;
        }
    }
    else if (first_choice == 'paper') {
        if (second_choice == 'rock') {
            return 1;
        }
        else if (second_choice == 'paper') {
            return 2;
        }
        else {
            return 0;
        }
    }
    else {
        if (second_choice == 'rock') {
            return 0;
        }
        else if (second_choice == 'paper') {
            return 1;
        }
        else {
            return 2;
        }
    }
}

async function playGame(player_choice) {
    const my_playable_buttons = document.querySelectorAll(".playable_button");

    for (const my_btn of my_playable_buttons) {
        my_btn.disabled = true;
    }


    displayText("You chose "+ player_choice +'.');

    colorOption(player_choice);

    await wait(1500);

    let computer_choice = getComputerChoice();

    if (computer_choice == player_choice) {
    displayText("The computer also chose " +computer_choice+".");
    colorStrongOption(computer_choice);
    }
    else {
    displayText("The computer chose " +computer_choice+".");
    colorOption(computer_choice);
    }

    let final_winner = decidingWinner(player_choice, computer_choice);

    await wait(2000);

    if (final_winner == 0) {
        // PLAYER LOST//
        colorStrongOption(computer_choice);
        displayText("The computer gets 1 point!");
        computer_score += 1;
    }
    else if (final_winner == 1) {
        // PLAYER WON//
        colorStrongOption(player_choice);
        displayText("You get 1 point!");
        player_score += 1;
    }
    else {
        displayText("It's a draw!");
    }

    updateScoreDisplay();

    await wait(1500);

    if (player_score >= 5) {
        players_max_score = 5;
        displayText("You won!");
        await wait(2000);
        endGame();
    }
    else if (computer_score >= 5) {
        players_max_score = player_score;
        displayText("The computer won!");
        await wait(2000);
        endGame();
    }
    else {

        for (const my_btn of my_playable_buttons) {
            my_btn.style.border = '';
            my_btn.style.filter = '';
        }
        displayText("Rock, paper, scissors?");
    }

    for (const my_btn of my_playable_buttons) {
        my_btn.disabled = false;
    }

}

document.getElementById("rock_button").addEventListener("click", function() {
    console.log("pressed_rock");
    playGame("rock");

});

document.getElementById("paper_button").addEventListener("click", function() {
    console.log("pressed_blue");
    playGame("paper");
});

document.getElementById("scissors_button").addEventListener("click", function() {
    console.log("pressed");
    playGame("scissors");

});

document.getElementById("playButton").addEventListener("click", function() {
    const myDisappearItems = document.querySelectorAll(".disappear_play");
    const playBackground = document.getElementById("playBackground");

    for (const my_item of myDisappearItems) {
        my_item.style.display = 'none';
    }
    playBackground.style.display = "flex";

});
