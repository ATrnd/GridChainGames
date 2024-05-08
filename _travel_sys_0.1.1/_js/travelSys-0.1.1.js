/**
 * @file This file contains the code for a game that updates the user's account based on certain conditions and rules.
 * The game has a lifespan limit, step count limit, and step time limit. The game also involves generating random numbers
 * and performing calculations based on those numbers.
 *
 * @summary Game that updates the user's account based on certain conditions and rules.
 *
 * @requires globalData
 * @requires userData
 * @requires xpCreditObj
 */

'use strict';

/**
 * The maximum number of steps allowed to be completed by the user.
 *
 * @constant {number}
 */
const accStepLimit = 3;

/**
 * The maximum lifespan of the game in seconds.
 *
 * @constant {number}
 */
const gameLifespanLimit = 10;

/**
 * The time limit for each step in seconds.
 *
 * @constant {number}
 */
const gameStepTimeLimit = 3;

/**
 * The error message to be thrown when the game is blocked due to invalid conditions.
 *
 * @constant {string}
 */
const gameBlockedNotice = 'invalid globalGamePhase || globalGameLifespan || accStepsCompleted';

/**
 * An object that stores the xp & credit values for different levels.
 *
 * @constant {Object}
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
 * Checks if the game lifespan is valid.
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
 * Checks if the game phase is valid.
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
 * Checks if the step count is valid.
 *
 * @returns {boolean} True if the step count is valid, false otherwise.
 */
const stepCountValidation = () => {
    let stepFlag = false;
    if(userData.accStepsCompleted < accStepLimit) {
        stepFlag = true;
    }
    return stepFlag;
};

/**
 * Stacks validation layers, validating the game phase, game lifespan, and step count.
 *
 * @returns {boolean} True if the system is valid, false otherwise.
 */
const sysValidation = () => {
    let sysValidationFlag = false;
    if(phaseValidation() && gameLifespanValidation() && stepCountValidation()) {
        sysValidationFlag = true;
    }
    return sysValidationFlag;
}

/**
 * Logs the step time and checks if the step time is valid.
 *
 * @returns {boolean} True if the step time is valid, false otherwise.
 */
const stepTimeLog = () => {
    let stepTimeFlag = false;
    const currentTime = new Date();
    const currentTimeInMillis = currentTime.getTime();
    if(userData.accStepsTimeLog.length === 0) {
        userData.accStepsTimeLog.push(currentTimeInMillis);
        stepTimeFlag = true;
    } else {
        if(stepCountValidation()) {
            let lastStepTimeLog = userData.accStepsTimeLog[userData.accStepsTimeLog.length-1];
            if((currentTimeInMillis > lastStepTimeLog + (gameStepTimeLimit * 1000)) ) {
                userData.accStepsTimeLog.push(currentTimeInMillis);
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
 * Initializes the game globals by setting the game phase and game lifespan.
 */
const iniGameGlobals = () => {
    globalData.globalGamePhase = 1;
    globalData.globalGameLifespan = iniGameLifespan();
};

/**
 * Generates a random number between 1 and 9, inclusive.
 *
 * @returns {number} The generated random number.
 * @throws {Error} If any of the validation layers are not valid, an error is thrown indicating that the function is blocked.
 */
const genRandNum = () => {
    if(sysValidation()) {
        return Math.floor(Math.random() * 9) + 1;
    } else {
        throw new Error(`${gameBlockedNotice} => genRandNum function blocked`);
    }
}

/**
 * Generates a random number sequence of length 9 without repetition.
 *
 * @returns {number[]} The generated random number sequence.
 * @throws {Error} If any of the validation layers are not valid, an error is thrown indicating that the function is blocked.
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
 * Optimizes the given ID by subtracting 1.
 *
 * @param {number} _id - The ID to be optimized.
 * @returns {number} The optimized ID.
 * @throws {Error} If any of the validation layers are not valid, an error is thrown indicating that the function is blocked.
 */
const optimiseId = (_id) => {
    if(sysValidation()) {
        return (_id - 1);
    } else {
        throw new Error(`${gameBlockedNotice} => optimiseId function blocked`);
    }
}

/**
 * Generates a random noise value between 0 and 2, inclusive.
 *
 * @returns {number} The generated random noise value.
 * @throws {Error} If any of the validation layers are not valid, an error is thrown indicating that the function is blocked.
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
 * Simulates the noise ID by generating a noise value and adding or subtracting it from the optimized random number.
 *
 * @returns {number} The simulated noise ID.
 * @throws {Error} If any of the validation layers are not valid, an error is thrown indicating that the function is blocked.
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
 * Generates a random number from the random number sequence based on the noise ID and optimizes it.
 *
 * @param {number[]} _arr - The random number sequence.
 * @returns {number} The optimized random number.
 * @throws {Error} If any of the validation layers are not valid, an error is thrown indicating that the function is blocked.
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
 * Gets the xp & credit values for the given index.
 *
 * @param {number} _i - The index of the XP credit values.
 * @returns {number[]} The XP credit values.
 * @throws {Error} If any of the validation layers are not valid, an error is thrown indicating that the function is blocked.
 */
const getXpCredValues = (_i) => {
    if(sysValidation()) {
        return xpCreditObj['xpCredVal_' + (_i)];
    } else {
        throw new Error(`${gameBlockedNotice} => getXpCredValues function blocked`);
    }
}

/**
 * Updates the user's account by adding the XP and credits based on the XP credit values and increments the step count.
 *
 * @param {number[]} _arr - The xp & credit values.
 * @param {Object} _accObj - The user's account object.
 * @throws {Error} If any of the validation layers are not valid, an error is thrown indicating that the function is blocked.
 */
const accUpdate = (_arr, _accObj) => {
    if(sysValidation()) {
        userData.accXp += _arr[0];
        userData.accCredits += _arr[1];
        userData.accStepsCompleted += 1;
    } else {
        throw new Error(`${gameBlockedNotice} => accUpdate function blocked`);
    }
};

// Initialize game globals
iniGameGlobals();
console.log('--- iniGameGlobals ---');

let randNumSeq;
let randNumSeqValueByNoiseIDOptimised;
let randXpCreditValues;
let stepTimeLogValidate;

/**
 * Event listener function that updates the user's account when the "accUpdateID" button is clicked.
 */
function updateAccount() {

    console.log(`==============================`);
    console.log(`gameLifespanValidation :: ${gameLifespanValidation()}`);
    console.log(`phaseValidation :: ${phaseValidation()}`);
    console.log(`stepCountValidation :: ${stepCountValidation()}`);
    console.log(`==============================`);

    let stepTimeLogValidate = stepTimeLog();
    if(stepTimeLogValidate) {

        randNumSeq = genRandNumSeq();
        randNumSeqValueByNoiseIDOptimised = genRandNumSeqNoiseIDOpt(randNumSeq);
        randXpCreditValues = getXpCredValues(randNumSeqValueByNoiseIDOptimised);
        accUpdate(randXpCreditValues,userData);

        console.log(`userData.accCredits :: ${userData.accCredits}`);
        console.log(`userData.accXp :: ${userData.accXp}`);
        console.log(`userData.accStepsCompleted :: ${userData.accStepsCompleted}`);
        console.log(`userData.accStepsTimeLog =>`);
        console.log(userData.accStepsTimeLog);

    } else {
        console.log(`stepTimeLogValidate :: ${stepTimeLogValidate}`);
    }

}

// Add event listener to the "accUpdateID" button
const accUpdateBtn = document.getElementById('accUpdateID');
accUpdateBtn.addEventListener('click', updateAccount);
