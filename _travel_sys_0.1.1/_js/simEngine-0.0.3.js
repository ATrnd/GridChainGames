/**
 * @fileoverview This script contains the logic for a game system that generates random numbers and performs various operations.
 * The code includes functions for generating random numbers, validating game phases and lifespan, updating user data, and more.
 *
 */

'use strict';

/**
 * A notice indicating that the game is blocked due to invalid global game phase or global game lifespan.
 * @type {string}
 */
const gameBlockedNotice = 'invalid globalGamePhase || globalGameLifespan';

/**
 * The maximum lifespan of the game in seconds.
 * @type {number}
 */
const gameLifespanLimit = 100;

/**
 * The maximum number of steps allowed in the game.
 * @type {number}
 */
const gameStepLimit = 3;

/**
 * The time limit for each game step in seconds.
 * @type {number}
 */
const gameStepTimeLimit = 1;

/**
 * An object that stores XP credit values for different levels.
 * @type {Object}
 */
let xpCreditObj = {
    xpCredVal_0: [1000,1000],
    xpCredVal_1: [1000,2000],
    xpCredVal_2: [1000,3000],
    xpCredVal_3: [2000,1000],
    xpCredVal_4: [2000,2000],
    xpCredVal_5: [2000,3000],
    xpCredVal_6: [3000,1000],
    xpCredVal_7: [3000,2000],
    xpCredVal_8: [3000,3000]
};

/**
 * Generates an array of data with a given prefix and length.
 *
 * @param {string} _prefix - The prefix to be added to each element of the array.
 * @param {number} _i - The length of the array.
 * @returns {Array} An array of strings with the given prefix and length.
 */
const genData = (_prefix, _i) => {
  const data = [];
  for (let i = 0; i < _i; i++) {
    data.push(`${_prefix}${i}`);
  }
  return data;
};

/**
 * Validates the game lifespan by comparing the current time with the game lifespan limit.
 *
 * @returns {boolean} True if the game lifespan is valid, false otherwise.
 */
const gameLifespanValidation = () => {
    let lifespanFlag = false;
    const gameLifespanLimitInMillis = globalData.globalGameLifespan;
    const getCurrentTimeInMillis    = Date.now();
    if(getCurrentTimeInMillis < gameLifespanLimitInMillis) {
        lifespanFlag = true;
    }
    return lifespanFlag;
};

/**
 * Validates the game phase by checking if the global game phase is equal to 1.
 *
 * @returns {boolean} True if the game phase is valid, false otherwise.
 */
const phaseValidation = () => {
    let phaseFlag = false;
    if(globalData.globalGamePhase === 1) {
        phaseFlag = true;
    }
    return phaseFlag;
};

/**
 * Validates the game system by checking if both the game phase and lifespan are valid.
 *
 * @returns {boolean} True if the game system is valid, false otherwise.
 */
const sysValidation = () => {
    let sysValidationFlag = false;
    if(phaseValidation() && gameLifespanValidation()) {
        sysValidationFlag = true;
    }
    return sysValidationFlag;
}

/**
 * Generates a random number between 1 and 9, inclusive.
 *
 * @returns {number} A random number between 1 and 9.
 * @throws {Error} If the game system is invalid, an error is thrown indicating that the function is blocked.
 */
const genRandNum = () => {
    if(sysValidation()) {
        return Math.floor(Math.random() * 9) + 1;
    } else {
        throw new Error(`${gameBlockedNotice} => genRandNum function blocked`);
    }
}

/**
 * Generates a random number sequence of length 9 with unique numbers.
 *
 * @returns {Array} An array of unique random numbers between 1 and 9.
 * @throws {Error} If the game system is invalid, an error is thrown indicating that the function is blocked.
 */
const genRandNumSeq = () => {
    if(sysValidation()) {
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
}

/**
 * Generates a random noise value between 0 and 2.
 *
 * @returns {number} A random noise value between 0 and 2.
 * @throws {Error} If the game system is invalid, an error is thrown indicating that the function is blocked.
 */
const genNoise = () => {
    if(sysValidation()) {
        let currentTime = new Date().getTime();
        return Math.floor(currentTime % 3);
    } else {
        throw new Error(`${gameBlockedNotice} => genNoise function blocked`);
    }
};

/**
 * Optimizes an ID by subtracting 1 from it.
 *
 * @param {number} _id - The ID to be optimized.
 * @returns {number} The optimized ID.
 * @throws {Error} If the game system is invalid, an error is thrown indicating that the function is blocked.
 */
const optimiseId = (_id) => {
    if(sysValidation()) {
        return (_id - 1);
    } else {
        throw new Error(`${gameBlockedNotice} => optimiseId function blocked`);
    }
}

/**
 * Simulates a noise ID by generating a random number, optimizing it, and adding noise to it.
 *
 * @returns {number} The simulated noise ID.
 * @throws {Error} If the game system is invalid, an error is thrown indicating that the function is blocked.
 */
const simNoiseID = () => {
    if(sysValidation()) {
        const arrMaxLength = 8;
        let noiseID;
        let randNum = genRandNum();
        let randNumOptimisedForID = optimiseId(randNum);
        let noiseValue = genNoise();
        if((randNumOptimisedForID + noiseValue) > arrMaxLength) {
            noiseID = randNumOptimisedForID - noiseValue;
        } else {
            noiseID = randNumOptimisedForID + noiseValue;
        }
        return noiseID;
    } else {
        throw new Error(`${gameBlockedNotice} => simNoiseID function blocked`);
    }
}

/**
 * Generates a random number from the random number sequence based on the simulated noise ID.
 *
 * @param {Array} _arr - The random number sequence.
 * @returns {number} The optimized random number from the sequence.
 * @throws {Error} If the game system is invalid, an error is thrown indicating that the function is blocked.
 */
const genRandNumSeqNoiseIDOpt = (_arr) => {
    if(sysValidation()) {
        let noiseID = simNoiseID();
        let randNumSeqValueByNoiseID = _arr[noiseID];
        return optimiseId(randNumSeqValueByNoiseID);
    } else {
        throw new Error(`${gameBlockedNotice} => genRandNumSeqNoiseIDOpt function blocked`);
    }
};

/**
 * Retrieves the xp & credit values for a given level.
 *
 * @param {number} _i - The level index.
 * @returns {Array} An array containing the xp & credit values for the given level.
 * @throws {Error} If the game system is invalid, an error is thrown indicating that the function is blocked.
 */
const getXpCredValues = (_i) => {
    if(sysValidation()) {
        return xpCreditObj['xpCredVal_' + (_i)];
    } else {
        throw new Error(`${gameBlockedNotice} => getXpCredValues function blocked`);
    }
}

/**
 * Updates the text content of an element by concatenating a label and data.
 *
 * @param {string} _label - The label to be added.
 * @param {string} _data - The data to be added.
 * @returns {string} The updated text content.
 */
const updateText = (_label, _data) => {
    return _label + ': ' + _data;
}

/**
 * Validates the step time log for a given user ID and updates it if necessary.
 *
 * @param {number} _i - The user ID.
 * @returns {boolean} True if the step time log is valid and updated, false otherwise.
 */
const stepTimeLogValidation = (_i) => {

    let lastStepTimeLog;
    let updatedStepsTimeLog;
    let stepTimeFlag             = false;
    const currentTime            = new Date();
    const currentTimeInMillis    = currentTime.getTime();
    const accStepsTimeLogElement = document.getElementById(`userData-${_i}-accStepsTimeLog`);

    if (accStepsTimeLogElement) {

        const accStepsTimeLogText      = accStepsTimeLogElement.textContent;
        const [labelGroup, valueGroup] = accStepsTimeLogText.split(":");
        let stepsTimeArray             = valueGroup.trim().split(",");

        if (stepsTimeArray.length === 1) {
            if (stepsTimeArray[0].trim() === '0') {
                stepsTimeArray[0] = currentTimeInMillis;
                accStepsTimeLogElement.textContent = updateText(labelGroup,stepsTimeArray[0]);
                stepTimeFlag = true;
            } else {
                lastStepTimeLog = parseInt(stepsTimeArray[0].trim());
                if (currentTimeInMillis > lastStepTimeLog + (gameStepTimeLimit * 1000)) {
                    stepsTimeArray.push(currentTimeInMillis);
                    updatedStepsTimeLog = stepsTimeArray.join(",");
                    accStepsTimeLogElement.textContent = updateText(labelGroup,updatedStepsTimeLog);
                    stepTimeFlag = true;
                }
            }
        } else {
            lastStepTimeLog = parseInt(stepsTimeArray[stepsTimeArray.length - 1].trim());
            if (currentTimeInMillis > lastStepTimeLog + (gameStepTimeLimit * 1000)) {
                stepsTimeArray.push(currentTimeInMillis);
                updatedStepsTimeLog = stepsTimeArray.join(",");
                accStepsTimeLogElement.textContent = updateText(labelGroup,updatedStepsTimeLog);
                stepTimeFlag = true;
            }
        }
    }
    return stepTimeFlag;
}

/**
 * Initializes the game lifespan by calculating the future time in milliseconds.
 *
 * @returns {number} The future time in milliseconds.
 */
const iniGameLifespan = () => {
    const currentTime = new Date();
    const futureTimeInMillis = currentTime.getTime() + (gameLifespanLimit * 1000);
    return futureTimeInMillis;
};

/**
 * Initializes the global game phase and game lifespan.
 */
const iniGameGlobals = () => {
    globalData.globalGamePhase = 1;
    globalData.globalGameLifespan = iniGameLifespan();
};

/**
 * Generates a random avatar ID between 1 and 4, inclusive.
 *
 * @returns {number} A random avatar ID between 1 and 4.
 */
const genRandAvID = () => Math.floor(Math.random() * 4) + 1;

/**
 * Simulates user accounts in the DOM by creating list items with user data.
 *
 * @param {number} _i - The number of user accounts to simulate.
 * @param {Array} _ethAddr - An array of Ethereum addresses.
 * @param {Array} _userName - An array of usernames.
 */
const simUserAccontsDOM = (_i, _ethAddr, _userName) => {
    const createListItem = (id, name, value) => {
        const li = document.createElement('li');
        li.id = `${id}-${name}`;
        li.textContent = `${name}: ${value}`;
        return li;
    };

    const appendData = (id, ethAddress, username) => {

        const div = document.createElement('div');
        div.id    = id;
        const ul  = document.createElement('ul');

        const listItems = [
            { name: 'accAddr', defaultValue: '0x0000000000000000000000000000000000000000', value: ethAddress },
            { name: 'accAvatarID', defaultValue: '0', value: genRandAvID() },
            { name: 'accName', defaultValue: '', value: username },
            { name: 'accStepsCompleted', defaultValue: '0', value: '' },
            { name: 'accStepsTimeLog', defaultValue: '0', value: '' },
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

    for (let i = 0; i < _i; i++) {
        const dynamicId = `userData-${i}`;
        const ethAddress = _ethAddr[i] || '';
        const username = _userName[i] || '';
        appendData(dynamicId, ethAddress, username);
    }
};

/**
 * Updates the steps completed for all user accounts.
 *
 * @param {number} _numberOfAccounts - The number of user accounts.
 */
const updateStepsCompleted = (_numberOfAccounts) => {
    const currentStep = parseInt(document.getElementById('userData-0-accStepsCompleted').textContent.split(': ')[1]) || 0;

    for (let i = 0; i < _numberOfAccounts; i++) {
        if (sysValidation()) {
            if (stepCountValidation(i)) {
                if(stepTimeLogValidation(i)) {

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

                        }
                    }
                } else {
                    console.log('invalid stepTimeLogValidation => updateStepsCompleted function blocked');
                }
            } else {
                console.log('invalid accStepsCompleted => updateStepsCompleted function blocked');
            }
        } else {
            console.log('invalid sysValidation => updateStepsCompleted function blocked');
        }
    }

};

/**
 * Validates the steps completed for a given user ID.
 *
 * @param {number} _id - The user ID.
 * @returns {boolean} True if the steps completed is less than the game step limit, false otherwise.
 */
const stepCountValidation = (_id) => {
    let stepFlag = false;
    const accStepsCompleted = document.getElementById(`userData-${_id}-accStepsCompleted`);
    if (accStepsCompleted) {
        const currentValue = parseInt(accStepsCompleted.textContent.split(': ')[1]) || 0;
        if (currentValue < gameStepLimit) {
            stepFlag = true;
        }
    }
    return stepFlag;
};

/**
 * Initializes the game globals by setting the global game phase and game lifespan.
 */
iniGameGlobals();
console.log('--- iniGameGlobals ---');

/**
 * Simulates xp & credit values in the DOM by creating list items with xp & credit values.
 *
 * @param {number} _step - The number of steps.
 * @param {number} _amount - The number of user accounts.
 */
const simXpCreditValuesDOM = (_step, _amount) => {
    const ul = document.createElement('ul');
    for (let i = 0; i < _step; i++) {
        for (let j = 0; j < _amount; j++) {
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

/**
 * The number of user accounts to simulate.
 * @type {number}
 */
const dataIterator = 50;

simXpCreditValuesDOM(gameStepLimit,dataIterator);
const ethAddresses = genData('0xAddress',dataIterator);
const usernames    = genData('User',dataIterator);

/**
 * Creates a new button element and appends it to the document body.
 * The button is used to update the steps completed and triggers the
 * updateStepsCompleted function when clicked.
 *
 * @example
 * const button = document.createElement('button');
 * button.textContent = 'Update Steps Completed';
 * button.addEventListener('click', () => updateStepsCompleted(dataIterator));
 * document.body.appendChild(button);
 */
const button = document.createElement('button');
button.textContent = 'Update Steps Completed';
button.addEventListener('click', () => updateStepsCompleted(dataIterator));
document.body.appendChild(button);

/**
 * Calls the simUserAccontsDOM function with the provided parameters.
 * This function is responsible for simulating user accounts in the DOM
 * based on the dataIterator, ethAddresses, and usernames.
 *
 * @param {object} dataIterator - An iterator object that provides access to the data.
 * @param {array} ethAddresses - An array of Ethereum addresses.
 * @param {array} usernames - An array of usernames.
 *
 * @example
 * simUserAccontsDOM(dataIterator, ethAddresses, usernames);
 */
simUserAccontsDOM(dataIterator, ethAddresses, usernames);
