var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function (game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1,
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 650, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
                { "type": "sawblade", "x": 1200, "y": groundY },
                { "type": "rocket", "x": 1400, "y": groundY},
                { "type": "enemy", "x": 400, "y": groundY},
                { "type": "enemy", "x": 850, "y": groundY},
                { "type": "enemy", "x": 1400, "y": groundY},
                { "type": "reward", "x": 500, "y": groundY},
                { "type": "reward", "x": 1250, "y": groundY},
                { "type": "reward", "x": 900, "y": groundY},
            ]

        };
        
        
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        function createSawBlade(x, y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 10;
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = x;
            sawBladeHitZone.y = y;
            game.addGameItem(sawBladeHitZone);
            var obstacleImage = draw.bitmap("img/sawblade.png");
            obstacleImage.x = -25
            obstacleImage.y = -25
            sawBladeHitZone.addChild(obstacleImage);
        }
        createSawBlade(650, 525)
        createSawBlade(900, 400)
        createSawBlade(1200, 525)
        function createRocket(x, y) {
            var hitZoneSize = 40;
            var damageFromObstacle = 50;
            var rocketHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            rocketHitZone.x = x;
            rocketHitZone.y = y;
            game.addGameItem(rocketHitZone);
            var rocketImage = draw.bitmap("img/rocket.png");
            rocketImage.x = -60;
            rocketImage.y = -40;
            rocketHitZone.addChild(rocketImage);
        }
        createRocket(1400, 397);
        
        function createEnemy(x, y) {
            var enemy = game.createGameItem("enemy", 100);
            var redSquare = draw.bitmap("img/aliens.png")
            redSquare.x = -120;
            redSquare.y = -155;
            enemy.addChild(redSquare);
            enemy.x = x
            enemy.y = groundY - y;
            game.addGameItem(enemy);
            enemy.velocityX = -1.5
            enemy.rotationalVelocity = 0
            velocityY = 0
            enemy.onPlayerCollision = function () {
                game.changeIntegrity(-40)
            };
            enemy.onProjectileCollision = function () {
                game.increaseScore(1000);
                enemy.fadeOut();
                game.changeIntegrity(10);
            };
        }
        createEnemy(400, groundY - 500);
        createEnemy(850, groundY - 500);
        createEnemy(1400, groundY - 500);
        
        function createReward(x, y) {
            var reward = game.createGameItem("reward", 40);
            var goldenSquare = draw.bitmap("img/god-apple.png")
            goldenSquare.x = -30;
            goldenSquare.y = -45;
            reward.addChild(goldenSquare);
            reward.x = x
            reward.y = groundY - y;
            game.addGameItem(reward);
            reward.velocityX = -0.5
            reward.rotationalVelocity = 0
            velocityY = 0
            reward.onPlayerCollision = function () {
                game.changeIntegrity(30)
                game.increaseScore(1500);
            };
        }
        createReward(500, groundY - 500) 
        createReward(1250, groundY - 500)
        createReward(900, groundY - 500)
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if ((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
