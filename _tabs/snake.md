---
layout: page
icon: fas fa-staff-snake
order: 2
---
<style>
    #game-container {
        width: 100%;
        text-align:center;
    }
    #game-score {
        background-color: rgb(87, 125, 160);
        border-radius: 0.5em;
        width: 400px;
        margin-left: 21%;
    }
    #high-score {
        background-color: rgb(255, 60, 0);
        border-radius: 0.5em;
        width: 400px;
        margin-left: 21%;
    }
    #game {
        display: inline;
        border-radius: 0.5em;
        background-color: rgb(87, 125, 160);
        height: 400px;
        width: 400px;
    }
    #popup {
        margin-left: 20%;
    }
</style>



<div id="game-container">
    <h1 id="game-score">0</h1>
    <canvas width="400" height="400" id="game"></canvas>
    <h1 id="high-score">0</h1>
</div>

<script src="../assets/js/pages/snake.js"></script>
<script>  
    window.addEventListener("keydown", function(e) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);
    gameLoop();
</script>