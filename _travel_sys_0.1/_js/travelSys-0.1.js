/**
 * Represents the game phase block notice.
 * @type {string}
 */
const gamePhaseBlockNotice = 'globalData.globalGamePhase === false';

/**
 * Checks if the game phase is valid.
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
 * Object that stores XP credit values.
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
 * Generates a random number between 1 and 9.
 * @returns {number} The generated random number.
 * @throws {Error} If the game phase is blocked, an error is thrown.
 */
const genRandNum = () => {
    if(phaseValidation()) {
        return Math.floor(Math.random() * 9) + 1;
    } else {
        throw new Error(`${gamePhaseBlockNotice} | genRandNum function blocked`);
    }
}

/**
 * Generates a random number sequence of length 9.
 * @returns {number[]} The generated random number sequence.
 * @throws {Error} If the game phase is blocked, an error is thrown.
 */
const genRandNumSeq = () => {
    if(phaseValidation()) {
        let _arr = [];
        while (_arr.length < 9) {
            let randomNumber = genRandNum();
            if (!_arr.includes(randomNumber)) {
                _arr.push(randomNumber);
            }
        }
        return _arr;
    } else {
        throw new Error(`${gamePhaseBlockNotice} | genRandNumSeq function blocked`);
    }
}

/**
 * Optimizes an ID by subtracting 1.
 * @param {number} _id - The ID to be optimized.
 * @returns {number} The optimized ID.
 * @throws {Error} If the game phase is blocked, an error is thrown.
 */
const optimiseId = (_id) => {
    if(phaseValidation()) {
        return (_id - 1);
    } else {
        throw new Error(`${gamePhaseBlockNotice} | optimiseId function blocked`);
    }
}

/**
 * Generates a random noise value.
 * @returns {number} The generated random noise value.
 * @throws {Error} If the game phase is blocked, an error is thrown.
 */
const genNoise = () => {
    if(phaseValidation()) {
        let currentTime = new Date().getTime();
        return Math.floor(currentTime % 3);
    } else {
        throw new Error(`${gamePhaseBlockNotice} | genNoise function blocked`);
    }
};

/**
 * Simulates a noise ID based on random number, optimized ID, and noise value.
 * @returns {number} The simulated noise ID.
 * @throws {Error} If the game phase is blocked, an error is thrown.
 */
const simNoiseID = () => {
    if(phaseValidation()) {
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
        throw new Error(`${gamePhaseBlockNotice} | simNoiseID function blocked`);
    }
}

/**
 * Generates a random number sequence noise ID optimized value.
 * @param {number[]} _arr - The random number sequence.
 * @returns {number} The optimized value based on the noise ID.
 * @throws {Error} If the game phase is blocked, an error is thrown.
 */
const genRandNumSeqNoiseIDOpt = (_arr) => {
    if(phaseValidation()) {
        let noiseID = simNoiseID();
        let randNumSeqValueByNoiseID = _arr[noiseID];
        return optimiseId(randNumSeqValueByNoiseID);
    } else {
        throw new Error(`${gamePhaseBlockNotice} | genRandNumSeqNoiseIDOpt function blocked`);
    }
};

/**
 * Gets the XP credit values based on the index.
 * @param {number} _i - The index.
 * @returns {number[]} The xp credit values.
 * @throws {Error} If the game phase is blocked, an error is thrown.
 */
const getXpCredValues = (_i) => {
    if(phaseValidation()) {
        return xpCreditObj['xpCredVal_' + (_i)];
    } else {
        throw new Error(`${gamePhaseBlockNotice} | getXpCredValues function blocked`);
    }
}

/**
 * Updates the account by adding xp and credits.
 * @param {number[]} _arr - The xp and credits values.
 * @param {Object} _accObj - The account object.
 * @throws {Error} If the game phase is blocked, an error is thrown.
 */
const accUpdate = (_arr, _accObj) => {
    if(phaseValidation()) {
        userData.accXp += _arr[0];
        userData.accCredits += _arr[1];
    } else {
        throw new Error(`${gamePhaseBlockNotice} | accUpdate function blocked`);
    }
};

/**
 * The random number sequence.
 * @type {number[]}
 */
let randNumSeq;

/**
 * The optimized value based on the noise ID.
 * @type {number}
 */
let randNumSeqValueByNoiseIDOptimised;

/**
 * The XP and credits values.
 * @type {number[]}
 */
let randXpCreditValues;

/**
 * Updates the account by generating a random number sequence, optimizing the value based on the noise ID,
 * getting the xp and credits values, and updating the account.
 */
function updateAccount() {
    randNumSeq = genRandNumSeq();
    randNumSeqValueByNoiseIDOptimised = genRandNumSeqNoiseIDOpt(randNumSeq);
    randXpCreditValues = getXpCredValues(randNumSeqValueByNoiseIDOptimised);
    accUpdate(randXpCreditValues,userData);
    console.log(`userData.accCredits :: ${userData.accCredits}`);
    console.log(`userData.accXp :: ${userData.accXp}`);
}

/**
 * The account update button element.
 * @type {HTMLElement}
 */
const accUpdateBtn = document.getElementById('accUpdateID');

/**
 * Adds an event listener to the account update button.
 */
accUpdateBtn.addEventListener('click', updateAccount);
