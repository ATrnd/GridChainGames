/**
 * Represents a game with various functionalities and validations.
 * The game involves generating random numbers, validating game phases and lifespans,
 * and performing operations on game data.
 *
 */

'use strict';

/**
 * A notice indicating that the game is blocked due to invalid global game phase or game lifespan.
 * @type {string}
 */
const gameBlockedNotice = 'invalid globalGamePhase || globalGameLifespan';

/**
 * The maximum lifespan of the game in seconds.
 * @type {number}
 */
const gameLifespanLimit = 100;

/**
 * The amount for the maximum amount of game steps allowed.
 * @type {number}
 */
const gameStepTimeLimit = 3;

/**
 * An object representing the xp & credit values for different levels.
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
 * Concatenates a name with an iterator to create an array of names.
 *
 * @param {string} name - The name to concatenate.
 * @param {number} iterator - The number of iterations.
 * @returns {string[]} An array of concatenated names.
 */
const concatNameWithIterator = (name, iterator) => {
    const resultArray = [];
    for (let i = 0; i < iterator; i++) {
        resultArray.push(`${name}${i}`);
    }
    return resultArray;
};

/**
 * Validates the game lifespan.
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
 * Validates the game phase.
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
 * Validates the game system.
 *
 * @returns {boolean} True if the game system is valid, false otherwise.
 */
const sysValidation = () => {
    let sysValidationFlag = false;
    if (phaseValidation() && gameLifespanValidation()) {
        sysValidationFlag = true;
    }
    return sysValidationFlag;
};

/**
 * Generates a random number between 1 and 9.
 *
 * @returns {number} The generated random number.
 * @throws {Error} If the game is blocked, an error is thrown indicating the function is blocked.
 */
const genRandNum = () => {
    if (sysValidation()) {
        return Math.floor(Math.random() * 9) + 1;
    } else {
        throw new Error(`${gameBlockedNotice} => genRandNum function blocked`);
    }
};

/**
 * Generates a sequence of random numbers without repetition.
 *
 * @returns {number[]} The generated sequence of random numbers.
 * @throws {Error} If the game is blocked, an error is thrown indicating the function is blocked.
 */
const genRandNumSeq = () => {
    if (sysValidation()) {
        let _arr = [];
        while (_arr.length < 9) {
            let randomNumber = genRandNum();
            if (!_arr.includes(randomNumber)) {
                _arr.push(randomNumber);
            }
        }
        return _arr;
    } else {
        throw new Error(`${gameBlockedNotice} => genRandNumSeq function blocked`);
    }
};

/**
 * Generates a random noise value.
 *
 * @returns {number} The generated random noise value.
 * @throws {Error} If the game is blocked, an error is thrown indicating the function is blocked.
 */
const genNoise = () => {
    if (sysValidation()) {
        let currentTime = new Date().getTime();
        return Math.floor(currentTime % 3);
    } else {
        throw new Error(`${gameBlockedNotice} => genNoise function blocked`);
    }
};

/**
 * Optimizes an ID by subtracting 1.
 *
 * @param {number} _id - The ID to optimize.
 * @returns {number} The optimized ID.
 * @throws {Error} If the game is blocked, an error is thrown indicating the function is blocked.
 */
const optimiseId = (_id) => {
    if (sysValidation()) {
        return (_id - 1);
    } else {
        throw new Error(`${gameBlockedNotice} => optimiseId function blocked`);
    }
};

/**
 * Simulates a noise ID based on random number, noise value, and optimization.
 *
 * @returns {number} The simulated noise ID.
 * @throws {Error} If the game is blocked, an error is thrown indicating the function is blocked.
 */
const simNoiseID = () => {
    if (sysValidation()) {
        const arrMaxLength = 8;
        let noiseID;
        let randNum = genRandNum();
        let randNumOptimisedForID = optimiseId(randNum);
        let noiseValue = genNoise();
        if ((randNumOptimisedForID + noiseValue) > arrMaxLength) {
            noiseID = randNumOptimisedForID - noiseValue;
        } else {
            noiseID = randNumOptimisedForID + noiseValue;
        }
        return noiseID;
    } else {
        throw new Error(`${gameBlockedNotice} => simNoiseID function blocked`);
    }
};

/**
 * Generates a random number from the sequence based on the noise ID.
 *
 * @param {number[]} _arr - The array of random numbers.
 * @returns {number} The generated random number.
 * @throws {Error} If the game is blocked, an error is thrown indicating the function is blocked.
 */
const genRandNumSeqNoiseIDOpt = (_arr) => {
    if (sysValidation()) {
        let noiseID = simNoiseID();
        let randNumSeqValueByNoiseID = _arr[noiseID];
        return optimiseId(randNumSeqValueByNoiseID);
    } else {
        throw new Error(`${gameBlockedNotice} => genRandNumSeqNoiseIDOpt function blocked`);
    }
};

/**
 * Gets the xp & credit values for a given index.
 *
 * @param {number} _i - The index.
 * @returns {number[]} The XP credit values.
 * @throws {Error} If the game is blocked, an error is thrown indicating the function is blocked.
 */
const getXpCredValues = (_i) => {
    if (sysValidation()) {
        return xpCreditObj['xpCredVal_' + (_i)];
    } else {
        throw new Error(`${gameBlockedNotice} => getXpCredValues function blocked`);
    }
};

/**
 * Initializes the game lifespan.
 *
 * @returns {number} The future time in milliseconds.
 */
const iniGameLifespan = () => {
    const currentTime = new Date();
    const futureTimeInMillis = currentTime.getTime() + (gameLifespanLimit * 1000);
    return futureTimeInMillis;
};

/**
 * Initializes the game globals.
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
 * Creates div elements with list items for each user.
 *
 * @param {number} numberOfDivs - The number of div elements to create.
 * @param {string[]} ethAddresses - The array of Ethereum addresses.
 * @param {string[]} usernames - The array of usernames.
 */
const createDivsWithListItems = (numberOfDivs, ethAddresses, usernames) => {
    /**
     * Creates a list item element.
     *
     * @param {string} id - The ID of the list item.
     * @param {string} name - The name of the list item.
     * @param {string} value - The value of the list item.
     * @returns {HTMLLIElement} The created list item element.
     */
    const createListItem = (id, name, value) => {
        const li = document.createElement('li');
        li.id = `${id}-${name}`;
        li.textContent = `${name}: ${value}`;
        return li;
    };

    /**
     * Appends a div element to the document.
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
 * Updates the steps completed for each user.
 *
 * @param {number} numberOfAccounts - The number of user accounts.
 */
const updateStepsCompleted = (numberOfAccounts) => {
    const currentStep = parseInt(document.getElementById('userData-0-accStepsCompleted').textContent.split(': ')[1]) || 0;

    for (let i = 0; i < numberOfAccounts; i++) {
        if (sysValidation()) {
            if (stepCountValidation(i)) {

                const accStepsCompleted = document.getElementById(`userData-${i}-accStepsCompleted`);
                if (accStepsCompleted) {
                    const currentValue = parseInt(accStepsCompleted.textContent.split(': ')[1]) || 0;
                    accStepsCompleted.textContent = `accStepsCompleted: ${currentValue + 1}`;
                }

                const xpElement = document.getElementById(`xp-credit-value-cycle-${currentStep}-user-${i}-xp`);
                const creditsElement = document.getElementById(`xp-credit-value-cycle-${currentStep}-user-${i}-credit`);
                if (xpElement && creditsElement) {
                    const xpValue = parseInt(xpElement.textContent) || 0;
                    const creditsValue = parseInt(creditsElement.textContent) || 0;
                    const userDataAccXp = document.getElementById(`userData-${i}-accXp`);
                    const userDataAccCredits = document.getElementById(`userData-${i}-accCredits`);
                    if (userDataAccXp && userDataAccCredits) {
                        if (parseInt(userDataAccXp.textContent.split(': ')[1]) === 0) {
                            userDataAccXp.textContent = `accXp: ${xpValue}`;
                        } else {
                            userDataAccXp.textContent = `accXp: ${parseInt(userDataAccXp.textContent.split(': ')[1]) + xpValue}`;
                        }

                        if (parseInt(userDataAccCredits.textContent.split(': ')[1]) === 0) {
                            userDataAccCredits.textContent = `accCredits: ${creditsValue}`;
                        } else {
                            userDataAccCredits.textContent = `accCredits: ${parseInt(userDataAccCredits.textContent.split(': ')[1]) + creditsValue}`;
                        }

                        console.log(`Updated accXp and accCredits for userData-${i}`);
                    }
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
 * Validates the step count for a user.
 *
 * @param {number} id - The ID of the user.
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

/**
 * Initializes the game globals and lifespan.
 */
iniGameGlobals();
console.log('--- iniGameGlobals ---');

/**
 * Generates a list of xp & credit values for each step and user.
 *
 * @param {number} step - The number of steps.
 * @param {number} amount - The number of users.
 */
const generateList = (step, amount) => {
    const ul = document.createElement('ul');
    for (let i = 0; i < step; i++) {
        for (let j = 0; j < amount; j++) {
            const randNumSeqNoiseIDOptResult = genRandNumSeqNoiseIDOpt(genRandNumSeq());
            const xpCredValues = getXpCredValues(randNumSeqNoiseIDOptResult);

            const li1 = document.createElement('li');
            li1.textContent = `${xpCredValues[0]}`;
            li1.id = `xp-credit-value-cycle-${i}-user-${j}-xp`;

            const li2 = document.createElement('li');
            li2.textContent = `${xpCredValues[1]}`;
            li2.id = `xp-credit-value-cycle-${i}-user-${j}-credit`;

            ul.appendChild(li1);
            ul.appendChild(li2);
        }
    }
    document.getElementById('data-sim').appendChild(ul);
};

// define user & data amount
const dataIterator = 10;

// Generate the list of xp & credit values
generateList(gameStepTimeLimit, dataIterator);

// Generate Ethereum addresses and usernames
const ethAddresses = concatNameWithIterator('0xAddress', dataIterator);
const usernames = concatNameWithIterator('User', dataIterator);

// Add a button to update the steps completed
const button = document.createElement('button');
button.textContent = 'Update Steps Completed';
button.addEventListener('click', () => updateStepsCompleted(dataIterator));
document.body.appendChild(button);

// Create div elements with list items for each user
createDivsWithListItems(dataIterator, ethAddresses, usernames);
