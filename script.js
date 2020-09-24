var player1 = true;
var player2 = false;

var player1_score = 0;
var player2_score = 0;
var player1_current_score = 0;
var player2_current_score = 0;

function startMethod()
{
    $('.winner').hide();
    $('.control-buttons').show();
    $('#circle-player2').hide();
    $('.player-1-score').text(player1_score);
    $('.player-2-score').text(player2_score);
    $('.current-score-number-player-1').text(player1_current_score);
    $('.current-score-number-player-2').text(player2_current_score);
    var new_game = document.querySelector('#new_game');
    var roll_dice = document.querySelector('#roll_dice');
    var switch_player = document.querySelector('#switch');

    new_game.addEventListener('click', resetGame);

    roll_dice.addEventListener('click', rollDice);

    switch_player.addEventListener('click', switchPlayer);
}

function resetGame()
{
    player1_score = 0;
    player2_score = 0;
    player1_current_score = 0;
    player2_current_score = 0;

    player1 = true;
    player2 = false;

    $('#circle-player1').show();

    $('.player-1').addClass('active');
    $('.player-2').removeClass('active');

    $('#dice').remove();
    startMethod();
}

function rollDice()
{
    $('#dice').remove();
    let randomNumber = getRandomNumber();
    showDice(randomNumber);
    checkIfOne(randomNumber);
    setCurrentScore(randomNumber);
    checkForWin();
}

function checkForWin()
{
    total_player1 = player1_score + player1_current_score;
    total_player2 = player2_score + player2_current_score;

    if (total_player1 >= 100)
    {
        $('.winner').show();
        $('.control-buttons').hide();
        $('.winner-text').text('congrats player 1 you have won');
    }
    else if(total_player2 >= 100)
    {
        $('.winner').show();
        $('.control-buttons').hide();
        $('.winner-text').text('congrats player 2 you have won');
    }
}

function checkIfOne(randomNumber)
{
    if (randomNumber == 1)
    {
        if (player1)
        {
            player1_current_score = 0;
        }
        else 
        {
            player2_current_score = 0;
        }
        switchPlayer();
    }
}

function setCurrentScore(number)
{
    if (player1 && number != 1)
    {
        player1_current_score += number;
        $('.current-score-number-player-1').text(player1_current_score);
    }
    else if (player2 && number != 1)
    {
        player2_current_score += number;
        $('.current-score-number-player-2').text(player2_current_score);
    }
}

function getRandomNumber()
{
    return Math.floor(Math.random() * (6 - 1 + 1)) + 1;
}

function showDice(randomNumber)
{
    let image_name = 'dice-' + randomNumber + '.png';
    image = document.createElement('img');
    image.src = './images/' + image_name;
    image.alt = 'dice';
    image.className = 'dice';
    image.id = 'dice';
    $('.row').append(image);
}

function switchPlayer()
{
    if (player1)
    {
        player1_score += player1_current_score;
        player1_current_score = 0;
        player1 = false;
        player2 = true;
        $('.player-1-score').text(player1_score);
    }
    else 
    {
        player2_score += player2_current_score;
        player2_current_score = 0;
        player1 = true;
        player2 = false;
        $('.player-2-score').text(player2_score);
    }

    player1_container = document.querySelector('.player-1');
    player1_container.classList.toggle('active');
    player2_container = document.querySelector('.player-2');
    player2_container.classList.toggle('active');
    $('.current-score-number-player-1').text(player1_current_score);
    $('.current-score-number-player-2').text(player2_current_score);
    $('#circle-player1').toggle();
    $('#circle-player2').toggle();
    $('#dice').remove();
}

window.onload = startMethod;