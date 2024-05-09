/**
 * @fileOverview This file contains the code for a game system that manages user data and game progress.
 * The code includes functions for initializing the game, validating game state, updating game progress,
 * and generating user interface elements.
 *
 * @requires globalData
 */

'use strict';

/**
 * The maximum number of steps allowed for each account.
 * @constant {number}
 */
const accStepLimit = 100;

/**
 * The maximum lifespan of the game in seconds.
 * @constant {number}
 */
const gameLifespanLimit = 100;

/**
 * The time limit for each game step in seconds.
 * @constant {number}
 */
const gameStepTimeLimit = 3;

/**
 * An object that stores XP credit values for different levels.
 * @type {Object}
 */
let xpCreditObj = {
    xpCredVal_0: [1000, 1000],
    xpCredVal_1: [1000, 2000],
    xpCredVal_2: [1000, 3000],
    xpCredVal_3: [2000, 1000],
    xpCredVal_4: [2000, 2000],
    xpCredVal_5: [2000, 3000],
    xpCredVal_6: [3000, 1000],
    xpCredVal_7: [3000, 2000],
    xpCredVal_8: [3000, 3000]
};

/**
 * Concatenates a name with an iterator value to create an array of names.
 *
 * @param {string} name - The name to concatenate.
 * @param {number} iterator - The number of iterations.
 * @returns {Array} An array of concatenated names.
 */
const concatNameWithIterator = (name, iterator) => {
    const resultArray = [];
    for (let i = 0; i < iterator; i++) {
        resultArray.push(`${name}${i}`);
    }
    return resultArray;
};

/**
 * Checks if the game lifespan is valid.
 *
 * @returns {boolean} True if the game lifespan is valid, false otherwise.
 */
const gameLifespanValidation = () => {
    let lifespanFlag = false;
    const gameLifespanLimitInMillis = globalData.globalGameLifespan;
    const getCurrentTimeInMillis = Date.now();
    if (getCurrentTimeInMillis < gameLifespanLimitInMillis) {
        lifespanFlag = true;
    }
    return lifespanFlag;
};

/**
 * Checks if the game phase is valid.
 *
 * @returns {boolean} True if the game phase is valid, false otherwise.
 */
const phaseValidation = () => {
    let phaseFlag = false;
    if (globalData.globalGamePhase === 1) {
        phaseFlag = true;
    }
    return phaseFlag;
};

/**
 * Checks if the system is valid.
 *
 * @returns {boolean} True if the system is valid, false otherwise.
 */
const sysValidation = () => {
    let sysValidationFlag = false;
    if (phaseValidation() && gameLifespanValidation()) {
        sysValidationFlag = true;
    }
    return sysValidationFlag;
};

/**
 * Initializes the game lifespan.
 *
 * @returns {number} The future time in milliseconds when the game will end.
 */
const iniGameLifespan = () => {
    const currentTime = new Date();
    const futureTimeInMillis = currentTime.getTime() + (gameLifespanLimit * 1000);
    return futureTimeInMillis;
};

/**
 * Initializes the game global variables.
 */
const iniGameGlobals = () => {
    globalData.globalGamePhase = 1;
    globalData.globalGameLifespan = iniGameLifespan();
};

/**
 * Generates a random number between 1 and 4.
 *
 * @returns {number} The generated random number.
 */
const generateRandomNumber = () => Math.floor(Math.random() * 4) + 1;

/**
 * Creates div elements with list items based on the number of divs, eth addresses, and usernames provided.
 *
 * @param {number} numberOfDivs - The number of div elements to create.
 * @param {Array} ethAddresses - An array of Ethereum addresses.
 * @param {Array} usernames - An array of usernames.
 */
const createDivsWithListItems = (numberOfDivs, ethAddresses, usernames) => {
    /**
     * Creates a list item element.
     *
     * @param {string} id - The ID of the list item.
     * @param {string} name - The name of the list item.
     * @param {string} value - The value of the list item.
     * @returns {HTMLElement} The created list item element.
     */
    const createListItem = (id, name, value) => {
        const li = document.createElement('li');
        li.id = `${id}-${name}`;
        li.textContent = `${name}: ${value}`;
        return li;
    };

    /**
     * Appends a div element with list items to the document body.
     *
     * @param {string} id - The ID of the div element.
     * @param {string} ethAddress - The Ethereum address.
     * @param {string} username - The username.
     */
    const appendDivToDocument = (id, ethAddress, username) => {
        const div = document.createElement('div');
        div.id = id;
        const ul = document.createElement('ul');

        const listItems = [
            { name: 'accAddr', defaultValue: '0x0000000000000000000000000000000000000000', value: ethAddress },
            { name: 'accAvatarID', defaultValue: '0', value: generateRandomNumber() },
            { name: 'accName', defaultValue: '', value: username },
            { name: 'accStepsCompleted', defaultValue: '0', value: '' },
            { name: 'accStepsTimeLog', defaultValue: '', value: '' },
            { name: 'accXp', defaultValue: '0', value: '' },
            { name: 'accCredits', defaultValue: '0', value: '' },
            { name: 'accTravelCd', defaultValue: '0', value: '' },
            { name: 'accPosition', defaultValue: '0', value: '' },
            { name: 'accFeeTracker', defaultValue: '0', value: '' },
            { name: 'accPaidFlag', defaultValue: 'false', value: '' },
            { name: 'accUiActive', defaultValue: '0', value: '' }
        ];

        listItems.forEach(item => {
            const value = item.name === 'accAddr' ? ethAddress :
                item.name === 'accName' ? username :
                item.value !== '' ? item.value : item.defaultValue;
            const li = createListItem(id, item.name, value);
            ul.appendChild(li);
        });

        div.appendChild(ul);
        document.body.appendChild(div);
    };

    for (let i = 0; i < numberOfDivs; i++) {
        const dynamicId = `userData-${i}`;
        const ethAddress = ethAddresses[i] || '';
        const username = usernames[i] || '';
        appendDivToDocument(dynamicId, ethAddress, username);
    }
};

/**
 * Updates the steps completed for each account.
 *
 * @param {number} numberOfAccounts - The number of accounts to update.
 */
const updateStepsCompleted = (numberOfAccounts) => {
    for (let i = 0; i < numberOfAccounts; i++) {
        if (sysValidation()) {
            if (stepCountValidation(i)) {
                const accStepsCompleted = document.getElementById(`userData-${i}-accStepsCompleted`);
                if (accStepsCompleted) {
                    const currentValue = parseInt(accStepsCompleted.textContent.split(': ')[1]) || 0;
                    accStepsCompleted.textContent = `accStepsCompleted: ${currentValue + 1}`;
                    console.log(`added to (+1) to accStepsCompleted @ ${accStepsCompleted.id} | currentValue was :: ${currentValue} now currentValue is ${currentValue + 1}`);
                }
            } else {
                console.log('invalid accStepsCompleted => updateStepsCompleted function blocked');
            }
        } else {
            console.log('invalid sysValidation => updateStepsCompleted function blocked');
            console.log(globalData.globalGamePhase);
            console.log(globalData.globalGameLifespan);
        }
    }
};

/**
 * Checks if the step count is valid for the given account.
 *
 * @param {number} id - The ID of the account.
 * @returns {boolean} True if the step count is valid, false otherwise.
 */
const stepCountValidation = (id) => {
    let stepFlag = false;
    const accStepsCompleted = document.getElementById(`userData-${id}-accStepsCompleted`);
    if (accStepsCompleted) {
        const currentValue = parseInt(accStepsCompleted.textContent.split(': ')[1]) || 0;
        if (currentValue < gameStepTimeLimit) {
            stepFlag = true;
        }
    }
    return stepFlag;
};

// Initialize game globals
iniGameGlobals();
console.log('--- iniGameGlobals ---');

// Generate data for divs
const dataIterator = 100;
const ethAddresses = concatNameWithIterator('0xAddress', dataIterator);
const usernames = concatNameWithIterator('User', dataIterator);

// Create button to update steps completed
const button = document.createElement('button');
button.textContent = 'Update Steps Completed';
button.addEventListener('click', () => updateStepsCompleted(dataIterator));
document.body.appendChild(button);

// Create divs with list items
createDivsWithListItems(dataIterator, ethAddresses, usernames);
