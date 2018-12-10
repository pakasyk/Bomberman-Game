let main =  document.querySelector("main");
let tileSize = 40;
let gameW = 600;
let gameH = 400;
let tilesW = gameW / tileSize; //15
let tilesH = gameH / tileSize; //10
let index = 0;
let bombs = [];
let indexBomb;
// let map =   [
//                 9, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0,
//                 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1,
//                 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1,
//                 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1,
//                 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
//                 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
//                 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0,
//                 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0,
//                 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1,
//                 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1
// ];

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

let map = [];
for (let i = 0; i < (tilesH*tilesW); i++){
    map.push(getRandomInt(2));
}

map[0] = 9;
map[1] = 0;
map[15] = 0;



document.onkeydown = checkKey;
function checkKey(e) {

    e = e || window.event;
    
    if (e.keyCode == '32') {
        // up arrow
         return move("space");
    }
    else if (e.keyCode == '38') {
        // up arrow
         return move("up");
    }
    else if (e.keyCode == '40') {
        // down arrow
       
         return move("down");
    }
    else if (e.keyCode == '37') {
       // left arrow
       return move("left");
    }
    else if (e.keyCode == '39') {
       // right arrow
       return move("right");
       
    }
}

let move = (element) => {
    
    
    switch (element) {
        case "down":
            
            if (map[index+tilesW] === 0){
                if (map[index] != 8) {
                    map[index] = 0;
                }
                index += tilesW;
                map[index] = 9;
            }
            drawMap();
        break;
        case "up":
            if (map[index-tilesW] === 0){
                if (map[index] != 8) {
                    map[index] = 0;
                }
                index -= tilesW;
                map[index] = 9;
            }
            drawMap();
        break;
        case "right":
            if (map[index+1] === 0 && (index+1)%15 != 0){ //%15 uzkerta ejima i kaire uz ribu
                if (map[index] != 8) {
                    map[index] = 0;
                }
                index++;
                map[index] = 9;
            }
            drawMap();
        break;
        case "left":
            if (map[index-1] === 0 && index%15 != 0){ //%15 uzkerta ejima i kaire uz ribu
                if (map[index] != 8) {
                    map[index] = 0;
                }
                
                index--;
                map[index] = 9;
            }
            drawMap();
        break;
        case "space":
            map[index] = 8;
            
            setTimeout(boom, 2000);
            bombs.push(index);
            
        break;
    
        default:
        break;
    }
}

let boom = () => {
   // console.log("boom" + indexBomb);

    indexBomb = bombs.shift();
    
    let bombArray = [indexBomb-tilesW, indexBomb-1, indexBomb, indexBomb+1, indexBomb+tilesW];

    bombArray.forEach(element => {
        map[element] = 2;
    })

    setTimeout(function(){
        bombArray.forEach(element => {
            map[element] = 0;
        })
    
        bombArray.forEach(element => {
            if (index == element) {
                console.log("game over");
                
            }
        })
        drawMap();
    },200)
    
    
    

    

    drawMap();
}

let drawMap = () => {

    let mainTemp = "";

    for (let i = 0; i < (tilesW*tilesH); i++){
    
        switch(map[i]) {
            case 0:
                mainTemp += `<div class="block-black"></div>`;
            break;
            case 1:
                mainTemp += `<div class="block-red"></div>`;
            break;
            case 2:
                mainTemp += `<div class="block-pink"></div>`;
            break;
            case 8:
                mainTemp += `<div class="block-bomb"></div>`;
            break;
            case 9:
                mainTemp += `<div class="hero"></div>`;
            break;
            default:
                mainTemp += `<div class="block-black"></div>`;
        }
        
    }
    main.innerHTML = mainTemp;

}

drawMap();