const inquirer = require('inquirer');

function Character(name, hitpoints, attackPower, defense, charClass) {
    this.name = name;
    this.hitpoints = hitpoints;
    this.attackPower = attackPower;
    this.defense = defense;
    this.charClass = charClass;
    this.attack = (target) => {
        console.log(
            `${this.name} attacked ${target.name} for ${this.attackPower}.`
        );
        target.hitpoints = target.hitpoints - (this.attackPower - target.defense);
    };
    this.checkHealth = () => {
        console.log(`${this.name}'s current hitpoints: ${this.hitpoints}.`);
    };
}
//TEST ENEMY
const dummyOne = new Character("dummyOne", 15, 10, 15, 10, "dumb");
const dummyTwo = new Character("dummyTwo", 15, 10, 15, 10, "dumb");
const dummyThree = new Character("dummyThree", 15, 10, 15, 10, "dumb");


const main = async () => {
    greeting();
    const answers = await initialPRompt();
    const charName = answers.name;
    const charClass = answers.class.toLowerCase();
    welcomeChar(charName, charClass);
    const isRolling = await isRollingStats();


    if (!isRolling) {
        console.log("You can't play the game without stats...");
    };

    const stats = rollStats(charClass);

    const newChar = new Character(charName, stats.hitpoints, stats.attackPower, stats.defense, charClass);
    console.log(newChar);
    const firstPath = await firstChoice();

    const pathOne = firstPath.path;

    const firstEnemy = firstEncounter(pathOne)
    console.log(firstEnemy)

    const firstResult = await battle(newChar, firstEnemy)
    console.log(firstResult);


};
const greeting = () => {
    console.log(`-----------------------------
WELCOME to the most sick RPG.
    Get Ready to Fight!!!
-----------------------------`);
};


const initialPRompt = async () => {
    const answers = await inquirer.prompt([
        {
            name: 'name',
            message: 'what is your name?'
        },
        {
            name: 'class',
            message: 'What class is your character?',
            type: 'list',
            choices: ['druid',
                'barbarian',
                'fighter',
                'wizard',
                'assassin',
                'healer'
            ],
        },
    ]);

    return answers;
};
const welcomeChar = (charName, charClass) => {
    console.log(`Hello, ${charName} the ${charClass}.`)
};

const isRollingStats = async () => {
    const isRolling = await inquirer.prompt([
        {
            name: "isRollingStats",
            message: "Would you like to role your stats?",
            type: "list",
            choices: ['Yes', 'No']
        }
    ]);

    return isRolling.isRollingStats === 'Yes';
}





const rollStats = (charClass) => {
    const stats = new Object();

    const buffs = generateCharBufs(charClass)

    stats.hitpoints = generateRandInt(100, 200);
    stats.attackPower = Math.floor(generateRandInt(20, 30) * buffs.attack);
    stats.defense = Math.floor(generateRandInt(10, 15) * buffs.defense);


    return stats;
}
/**  
* Returns a random int given a base number and a maximum modifier to be added to that base int
* 
* @param {number} baseInt the base value our interger can be
* @param {number} max the max value our interger can be
*/

const generateRandInt = (baseInt, max) => {
    if (typeof baseInt !== 'number' || typeof max !== 'number') throw 'BaseInt and max must have type number';
    return Math.floor(Math.random() * (max - baseInt + 1)) + baseInt;
}

const generateCharBufs = (charClass) => {
    const buffs = new Object()

    switch (charClass) {
        case "druid":
            buffs.attack = 1.2
            buffs.defense = .95
            break;
        case "barbarian":
            buffs.attack = 1.1
            buffs.defense = 1.5
            break;
        case "fighter":
            buffs.attack = 1.25
            buffs.defense = 1.1
            break;
        case "wizard":
            buffs.attack = 1.3
            buffs.defense = .9
            break;
        case "assassin":
            buffs.attack = 1.2
            buffs.defense = 1
            break;
        case "healer":
            buffs.attack = .85
            buffs.defense = .85
            break;

    }
    return buffs;

}


const firstChoice = async () => {
    const answers = await inquirer.prompt(
        {
            name: "path",
            message: "What direction do you choose?",
            type: "list",
            choices: ['left', 'right', 'forward']
        })

    return answers;
}
//USE THIS FUNCTION
const firstEncounter = (path) => {
    let enemy
    switch (path) {
        case "left":
            enemy = dummyOne
            break;
        case "right":
            enemy = dummyTwo
            break;
        case "forward":
            enemy = dummyThree
            break;
    }
    console.log(`You encounter ${enemy.name}`);
    return enemy;
}

const combatMenu = async () => {
    const turn = await inquirer.prompt(
        {
            name: "action",
            message: "What action would you like to take?",
            type: "list",
            choices: ['Attack', 'Defend']
        }
    );
    return turn.action
}
const battle = async (player, enemy) => {
    while (player.hitpoints > 0 && enemy.hitpoints > 0) {
        const action = await combatMenu()
        switch (action) {
            case 'Attack':
                player.attack(enemy)
                enemy.attack(player)
                break;
            default:
                console.log(`You can only attack`)
                break;
        }
    }

    const battleResult = {
        'player': player, 'enemy': enemy
    };

    return battleResult
}
main();




// use node rpg.js to run game

// inquirer
//     .prompt([
//         {
//             name: 'name',
//             message: 'what is your name?'
//         },
//         {
//             name: 'class',
//             message: 'What class is your character?',
//             type: 'list',
//             choices: ['Druid','Barbarian', 'Fighter', 'Wizard', 'Assassin', 'Healer']
//         },
//     ]);
//     .then(answer => {
//         const charClass = answer.class;
//         const charName = answer.name;
//         console.log(`------------------------
//         Hello ${charName} the ${charClass.toLowercase()}. Get ready to pick an opponent.`)

//      //   inquirer
     //       .prompt()
     //       .then()
  //  })

  //  .catch(err => console.log(err))
