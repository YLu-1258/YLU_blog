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
        margin-left: 200px;
    }
    #high-score {
        background-color: rgb(255, 60, 0);
        border-radius: 0.5em;
        width: 400px;
        margin-left: 200px;
    }
    #game {
        display: inline;
        border-radius: 0.5em;
        background-color: rgb(87, 125, 160);
        height: 400px;
        width: 400px;
    }
    #popup {
        margin-left: 200px;
    }
</style>



<div id="game-container">
    <h1 id="game-score">0</h1>
    <canvas width="400" height="400" id="game"></canvas>
    <h1 id="high-score">0</h1>
    <button onclick="resetGame()">Start Game!</button>
</div>

<script>
    const container = document.getElementById("game-container");
    const canvas = document.getElementById("game");
    const game_score = document.getElementById("game-score");
    const game_high_score = document.getElementById("high-score");
    const ctx = canvas.getContext("2d");

    // Defining our game variables
    const tileSize = 10;
    let snake = [{x: 10, y: 10}];
    let direction = "right";
    let wall = [];
    let food = generateFood();
    let score = 0;
    let high_score = 0;
        
    // Randomly generate a food tile for the snake
    function generateFood() {
        const x = Math.floor(Math.random() * canvas.width / tileSize) * tileSize;
        const y = Math.floor(Math.random() * canvas.height / tileSize) * tileSize;
        return { x, y };
    }

    // Arbirtrarily place a wall on the result of a dice roll
    // I still gotta make sure that the wall doesn't generate on the player instantly killing them
    function generateWall() {
        const res = Math.floor(Math.random()*6)+1
        if (res > 4) {
            const x = Math.floor(Math.random() * canvas.width / tileSize) * tileSize;
            const y = Math.floor(Math.random() * canvas.height / tileSize) * tileSize;
            wall.push({ x, y })
        }
    }
        
    // Iterate through our snake, food, and walls to render the game state.
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
            
        
        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = i === 0 ? "white" : "lightgrey"; // Make the head of the snake white and the body light grey
            ctx.fillRect(snake[i].x, snake[i].y, tileSize, tileSize);
        }
            
        ctx.fillStyle = "green";
        ctx.fillRect(food.x, food.y, tileSize, tileSize);


        for (let i = 0; i < wall.length; i++) {
            ctx.fillStyle = "red";
            ctx.fillRect(wall[i].x, wall[i].y, tileSize, tileSize);
        }
    }

    // Call upon game loss, reset the game to initial state
    function resetGame() {
        snake = [{ x: 10, y: 10 }];
        direction = "right";
        food = generateFood();
        wall = []
        
        const popup = document.querySelector(".popup");
        if (popup) {
            popup.remove();
        }
        
        gameLoop();
    }

    // Provide pop up window for when player dies    
    function gameOver() {
        const popup = document.createElement("div");
        popup.className = "popup";
        popup.innerHTML = `
            <h2>Game Over</h2>
            <p>Your snake died!</p>
            <button onclick="resetGame()">Play Again</button>
        `;
        
        score = 0;
        game_score.innerHTML = score;
        
        container.appendChild(popup);
    }

    // Update the game state
    function update() {
        const head = { ...snake[0] };
            
        switch (direction) {
            case "up":
                head.y -= tileSize;
                break;
            case "down":
                head.y += tileSize;
                break;
            case "left":
                head.x -= tileSize;
                break;
            case "right":
                head.x += tileSize;
                break;
        }
            
        snake.unshift(head);
        
        if (head.x === food.x && head.y === food.y) {
            food = generateFood();
            generateWall();
            score++;
            game_score.innerHTML = score;
        } else {
            snake.pop();
        }

        if (score > high_score) {
            high_score = score;
        }
        game_high_score.innerHTML = high_score;
    }


    // Main game loop to host the game    
    function gameLoop() {
        const head = { ...snake[0] };
        draw();
        update();
        for (let i = 2; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                gameOver();
                return;
            }
        }

        for (let i = 0; i < wall.length; i++) {
            if (head.x === wall[i].x && head.y === wall[i].y) {
                gameOver();
                return;
            }
        }

        if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
            gameOver();
            return;
        }
        setTimeout(gameLoop, 120);
    }
     
    // track key presses to change snake directions
    document.addEventListener("keydown", (event) => {
        const key = event.key;
        if (key === "ArrowUp" && direction !== "down") direction = "up";
        if (key === "ArrowDown" && direction !== "up") direction = "down";
        if (key === "ArrowLeft" && direction !== "right") direction = "left";
        if (key === "ArrowRight" && direction !== "left") direction = "right";
    });
        
    gameLoop();
</script>