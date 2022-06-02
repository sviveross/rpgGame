const inquirer = require('inquirer');

function Character(name, hitpoints, attackPower, defense, dickSize) {
    this.name = name;
    this.hitpoints = hitpoints + dickSize;
    this.attackPower = attackPower + dickSize;
    this.defense = defense;
    this.dickSize = dickSize;
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

const main = async () => {
    greeting ();
    const answers = await initialPRompt();
    const charName = answers.name;
    const charClass = answers.class.toLowerCase();
    welcomeChar(charName, charClass);
    const isRolling = await isRollingStats();

    
    if (!isRolling) {
        console.log("You can't play the game without stats...");
    };

    rollStats();

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
            choices: ['Druid',
            'Barbarian', 
            'Fighter', 
            'Wizard', 
            'Assassin', 
            'Healer'
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

const rollStats = () => {

}

main();
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
