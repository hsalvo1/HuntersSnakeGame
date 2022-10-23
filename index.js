    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');



    class SnakePart{
        constructor(x, y){
            this.x = x;
            this.y = y;
        }
    }

    let speed = 7;

    let tileCount = 20;
    let tileSize = canvas.width / tileCount -2;

    let headX = 10;
    let headY = 10;
    const SnakeParts = [];
    let tailLength = 2;

    let appleX = 5;
    let appleY = 5;

    let xVelocity=0;
    let yVelocity=0;

    let score = 0;

    const gulpsound = new Audio("Gulp.mp3");
    const deathsound = new Audio("death.mp3");

    //game loop
    function drawGame(){
        changeSnakePosition();
        let result = isGameOver();
        if(result){
            return; 
        }
        clearScreen();
        

        CheckAppleCollision();
        drawApple();
        drawSnake();

        drawScore();

        if(score > 2){
            speed = 9;}

        if(score > 5){
            speed = 11;}

        if(score > 9){
            speed = 13;}

        if(score > 14){
            speed = 15;}

        setTimeout(drawGame, 1000 / speed);
    }
    function isGameOver(){
        let gameOver = false;

        if(yVelocity ===0 && xVelocity ===0){
            return false;
        }

        // walls
        if(headX < 0){
            deathsound.play();
            gameOver = true
        }
        if(headX === tileCount){
            deathsound.play();
            gameOver = true
        }
        else if(headY < 0){
            deathsound.play();
            gameOver = true;
        }
        else if(headY === tileCount){
            deathsound.play();
            gameOver = true;
        }

        for(let i =0; i < SnakeParts.length; i++){
            let part = SnakeParts[i];
            if(part.x === headX && part.y === headY)
            gameOver = true;
            break;
        }

        if(gameOver){
            ctx.fillStyle = "white";
            ctx.font = "50px Verdana";

            var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
            gradient.addColorStop("0", " magenta");
            gradient.addColorStop("0.5", "blue");
            gradient.addColorStop("1.0", "red");
            // fill with gradient
            ctx.fillStyle = gradient
            
            ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
        }

        return gameOver
    }

    function drawScore(){
        ctx.fillStyle = "white";
        ctx.font = "10px Verdana";
        ctx.fillText("Score " + score, canvas.width-50, 10)
    }

    function clearScreen(){
        ctx.fillStyle = 'black';
        ctx.fillRect(0,0,canvas.width,canvas.height)
    }

    function drawSnake(){

        ctx.fillStyle = 'green';
        for(let i =0; i < SnakeParts.length; i++){
            let part = SnakeParts[i];
            ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
        }

        SnakeParts.push(new SnakePart(headX, headY)); //put an item at the end of the list next to the head
        while (SnakeParts.length > tailLength){
            SnakeParts.shift(); // remove the furthest item from the snake parts if we have more than our tail size
        }

        ctx.fillStyle = 'orange';    
        ctx.fillRect(headX * tileCount, headY* tileCount, tileSize,tileSize);

        
    }

    function changeSnakePosition(){
        headX = headX + xVelocity;
        headY = headY + yVelocity;
    }

    function drawApple(){
        ctx.fillStyle = "red"
        ctx.fillRect(appleX* tileCount, appleY* tileCount, tileSize, tileSize)
    }

    function CheckAppleCollision(){
        if(appleX === headX &appleY === headY){
            appleX = Math.floor(Math.random() * tileCount);
            appleY = Math.floor(Math.random() * tileCount);
            tailLength++;
            score ++;
            gulpsound.play();
        }
    }

    document.body.addEventListener('keydown', keyDown);

    function keyDown(event){
        //Letter W or up key
        if(event.keyCode == 87 || event.keyCode == 38 ){
            if(yVelocity == 1)
                return;
            yVelocity = -1;
            xVelocity = 0;
        }

        //Letter S or down key
        if(event.keyCode == 83 || event.keyCode == 40){
            if (yVelocity == -1)
                return;
            yVelocity = 1;
            xVelocity = 0;
    }

        //Letter A or left key
        if(event.keyCode == 65 || event.keyCode == 37){
            if (xVelocity == 1)
                return;
            yVelocity = 0;
            xVelocity = -1;
        }

        //Letter D or right key
        if(event.keyCode == 68 || event.keyCode == 39){
            if (xVelocity == -1)
                return;
            yVelocity = 0;
            xVelocity = 1;
        }
}
    drawGame()