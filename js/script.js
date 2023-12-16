const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const Griffin = {
    name: 'Griffin',
    hp: 2000,      // Жизненная энергия
    defense: 120,  // Защита
    str: 150,      // Сила
    weapon: 0,     // Оружие
    getStatus: function() {
        return this.hp;
    },
    changeHP: function(damage) {
        this.hp += damage;

        if (this.hp < 0) {
            this.hp = 0;
        }
    },
};
 
const Witcher = {
    name: 'Witcher',
    hp: 1000,
    defense: 100,
    str: 120,
    weapon: 250,
    getStatus: function() {
        return this.hp;
    },
    changeHP: function(damage) {
        this.hp += damage;

        if (this.hp < 0) {
            this.hp = 0;
        }
    },
    getIgniDamage: function() {
        let damage = getRandomInt(150, 200);
        console.log('The Witcher has used Igni!');
        return damage;
    },
    listenLutik: function() {
        const messages = [
            'Хватит валять дурака, пора уже тушить пожар в этой программе.',
            'Говорят, грифон никогда не наступит на лежащего ведьмака.',
            'Когда скромняга бард, отдыхал от дел, с Геральтом из Ривии, он песню эту пел...',
            'Трус умирает сто раз. Мужественный человек – лишь однажды.',
            'Людям для жизни необходимы три вещи: еда, питье и сплетни.',
        ];
        let message = messages[getRandomInt(0, messages.length - 1)];
        return message;
    },
    runAway: function() {
        console.log(`The Witcher ran away!` + `\n` +
        `The Witcher HP: ${Witcher.hp}` + `\n` +
        `The Griffin HP: ${Griffin.hp}`
        );
    },
    drinkSwallow: function() {
        restoredHealth = getRandomInt(50, 100);
        this.changeHP(restoredHealth);

        console.log(`The Witcher drank Swallow elixir` + `\n` +
        `THe elixir has added ${restoredHealth} HP. Now The Witcher's HP is ${this.getStatus()}`
        );
        console.log('=======================');
    },
};

const Game = {
    isGameRun: true,
    attackEnemy: function(hero, enemy, hitProbability, igniDamage = false) {
        let randomInt = getRandomInt(0, 100);
        let damage;
        
        if (igniDamage) {
            damage = Witcher.getIgniDamage();
        } else {
            damage = hero.str + hero.weapon - enemy.defense;
        }
    
        if (randomInt <= hitProbability) {
            enemy.changeHP(-damage);
            console.log(`The ${hero.name} attacked The ${enemy.name} with ${damage} damage` + '\n' + 
            `The ${enemy.name} HP: ${enemy.getStatus()}`);
            console.log('=======================');
            return damage;
        } else {
            if (hero.name === 'Griffin') {
                console.log('The Griffin flew away!');
                console.log('=======================');
            } else {
                console.log('The Witcher missed!');
                console.log('=======================');
            }
        } 
    }, 
    getActionFromPlayer: function() {
        let action = prompt('Choose action' + '\n' +
        '1 - attack' + '\n' +
        '2 - igni' + '\n' +
        '3 - listen Lutik' + '\n' +
        '4 - run away' + '\n' +
        '5 - drink Swallow elixir' + '\n' +
        '0 - exit'
        );
    
        return action;
    }, 
    startGame: function() {
        let swallowRounds = 0;
    
        while (this.isGameRun) {
            let playerAction = this.getActionFromPlayer();
    
            if (playerAction == 0 || playerAction === null) {
                console.log('You exited!');
                break;
            }
            
            playerAction = parseInt(playerAction);
            if (!Number.isInteger(playerAction)) {
                console.log('Please, enter a number!');
                continue;
            } else if (playerAction === 1) {
                this.attackEnemy(Witcher, Griffin, 75);
            } else if (playerAction === 2) {
                Game.attackEnemy(Witcher, Griffin, 100, true);
            } else if (playerAction === 3) {
                let message = Witcher.listenLutik();
                console.log(message);
            } else if (playerAction === 4) {
                Witcher.runAway();
                break;
            } else if (playerAction === 5) {
                if (swallowRounds < 0) {
                    Witcher.drinkSwallow();
                    swallowRounds = 2;
                } else {
                    console.log(`You can use Swallow elixir after ${swallowRounds + 1} rounds`);
                }
            } else {
                console.log('Please, choose action!');
                continue;
            }

            swallowRounds--;
            
            let griffinAttack = this.attackEnemy(Griffin, Witcher, 50);

            if (griffinAttack) {
                swallowRounds = -1;
            }
    
            if (Griffin.hp <= 0) {
                console.log(`The ${Witcher.name} won!`);
                break;
            } else if (Witcher.hp <= 0) {
                console.log(`The ${Griffin.name} won!`);
                break;
            }
        }
    }
}

Game.startGame();