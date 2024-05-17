'use strict';

// {sim engine} {{{
// ================

/**
 * Represents a game with various functionalities and validations.
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
 * The number of data iterations.
 * @type {number}
 */
const dataIterator = 100;

/**
 * The maximum number of game steps.
 * @type {number}
 */
const gameStepLimit = 3;

/**
 * The time limit for each game step in seconds.
 * @type {number}
 */
const gameStepTimeLimit = 1;

/**
 * An object containing XP credit values for different levels.
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
 * @returns {Array} An array of data with the given prefix and length.
 */
const genData = (_prefix, _i) => {
  const data = [];
  for (let i = 0; i < _i; i++) {
    data.push(`${_prefix}${i}`);
  }
  return data;
};

/**
 * Validates the game lifespan.
 *
 * @returns {boolean} True if the current time is less than the game lifespan limit, false otherwise.
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
 * Validates the game phase.
 *
 * @returns {boolean} True if the global game phase is 1, false otherwise.
 */
const phaseValidation = () => {
    let phaseFlag = false;
    if(globalData.globalGamePhase === 1) {
        phaseFlag = true;
    }
    return phaseFlag;
};

/**
 * Validates the system by checking the game phase and lifespan.
 *
 * @returns {boolean} True if both the phase and lifespan are valid, false otherwise.
 */
const sysValidation = () => {
    let sysValidationFlag = false;
    if(phaseValidation() && gameLifespanValidation()) {
        sysValidationFlag = true;
    }
    return sysValidationFlag;
}

/**
 * Generates a random number between 1 and 9.
 *
 * @returns {number} A random number between 1 and 9.
 * @throws {Error} If the system validation fails, an error is thrown indicating the game is blocked.
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
 * @throws {Error} If the system validation fails, an error is thrown indicating the game is blocked.
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
 * @throws {Error} If the system validation fails, an error is thrown indicating the game is blocked.
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
 * @throws {Error} If the system validation fails, an error is thrown indicating the game is blocked.
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
 * @throws {Error} If the system validation fails, an error is thrown indicating the game is blocked.
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
 * Generates a random number from the random number sequence based on the noise ID.
 *
 * @param {Array} _arr - The random number sequence.
 * @returns {number} The optimized random number based on the noise ID.
 * @throws {Error} If the system validation fails, an error is thrown indicating the game is blocked.
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
 * Retrieves the XP credit values for a given level.
 *
 * @param {number} _i - The level for which the XP credit values should be retrieved.
 * @returns {Array} The XP credit values for the given level.
 * @throws {Error} If the system validation fails, an error is thrown indicating the game is blocked.
 */
const getXpCredValues = (_i) => {
    if(sysValidation()) {
        return xpCreditObj['xpCredVal_' + (_i)];
    } else {
        throw new Error(`${gameBlockedNotice} => getXpCredValues function blocked`);
    }
}

/**
 * Updates the text content of an element with the given label and data.
 *
 * @param {string} _label - The label of the element.
 * @param {string} _data - The data to be appended to the label.
 * @returns {string} The updated text content.
 */
const updateText = (_label, _data) => {
    return _label + ': ' + _data;
}

/**
 * Validates the step time log for a given user.
 *
 * @param {number} _i - The ID of the user.
 * @returns {boolean} True if the step time log is valid, false otherwise.
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
 * Validates the step time log for a given user.
 *
 * @param {number} _i - The ID of the user.
 * @returns {boolean} True if the step time log is valid, false otherwise.
 */
const stepTimeUiLogValidation = (_i) => {

    let lastStepTimeLog;
    let stepTimeFlag             = false;
    const currentTime            = new Date();
    const currentTimeInMillis    = currentTime.getTime();
    const accStepsTimeLogElement = document.getElementById(`userData-${_i}-accStepsTimeLog`);

    if (accStepsTimeLogElement) {

        const accStepsTimeLogText = accStepsTimeLogElement.textContent;
        const [_, valueGroup]     = accStepsTimeLogText.split(":");
        let stepsTimeArray        = valueGroup.trim().split(",");

        if (stepsTimeArray.length === 1) {
            if (stepsTimeArray[0].trim() === '0') {
                stepsTimeArray[0] = currentTimeInMillis;
                stepTimeFlag = true;
            } else {
                lastStepTimeLog = parseInt(stepsTimeArray[0].trim());
                if (currentTimeInMillis > lastStepTimeLog + (gameStepTimeLimit * 1000)) {
                    stepTimeFlag = true;
                }
            }
        } else {
            lastStepTimeLog = parseInt(stepsTimeArray[stepsTimeArray.length - 1].trim());
            if (currentTimeInMillis > lastStepTimeLog + (gameStepTimeLimit * 1000)) {
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
 * Initializes the global game variables.
 */
const iniGameGlobals = () => {
    globalData.globalGamePhase = 1;
    globalData.globalGameLifespan = iniGameLifespan();
};

/**
 * Generates a random avatar ID between 1 and 4.
 *
 * @returns {number} A random avatar ID between 1 and 4.
 */
const genRandAvID = () => Math.floor(Math.random() * 4) + 1;

/**
 * Simulates user accounts in the DOM by creating list items for each user.
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
        document.getElementById('acc-sim').appendChild(div);
    };

    for (let i = 0; i < _i; i++) {
        const dynamicId = `userData-${i}`;
        const ethAddress = _ethAddr[i] || '';
        const username = _userName[i] || '';
        appendData(dynamicId, ethAddress, username);
    }
};

/**
 * Updates the steps completed for each user account.
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
                        console.log(`updateStepsCompleted :: accStepsCompleted, accStepsTimeLogElement, xpValue, creditsValue`);
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
 * Validates the steps completed for a given user account.
 *
 * @param {number} _id - The ID of the user account.
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

iniGameGlobals();
console.log('--- iniGameGlobals ---');

/**
 * Simulates XP credit values in the DOM by creating list items for each level and user.
 *
 * @param {number} _step - The number of game steps.
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

const ethAddresses = genData('0xAddress',dataIterator);
const usernames    = genData('User',dataIterator);

simXpCreditValuesDOM(gameStepLimit,dataIterator);
simUserAccontsDOM(dataIterator, ethAddresses, usernames);

// }}}

// {ui engine} {{{
// ===============

/**
 * Generates a leaderboard based on the data from the simulation.
 * The leaderboard is displayed in the specified HTML element with the id 'GCG-leaderboard'.
 */
const generateLeaderboard = () => {
    const leaderboardSelector = document.getElementById('GCG-leaderboard');
    const accSim = document.getElementById('acc-sim');
    const accounts = accSim.querySelectorAll('div[id^="userData-"]');

    const scores = [];
    accounts.forEach(account => {
        const id = account.id.split('-')[1];
        const xp = parseInt(document.getElementById(`userData-${id}-accXp`).textContent.split(': ')[1]);
        const credits = parseInt(document.getElementById(`userData-${id}-accCredits`).textContent.split(': ')[1]);
        const addr = document.getElementById(`userData-${id}-accAddr`).textContent.split(': ')[1];
        const name = document.getElementById(`userData-${id}-accName`).textContent.split(': ')[1];
        const score = xp + credits;
        scores.push({ addr, name, score });
    });

    scores.sort((a, b) => b.score - a.score);

    const leaderboardContainer = document.createElement('div');
    const leaderboardList = document.createElement('ul');
    leaderboardList.classList.add("leaderboard-list");


    scores.forEach((account, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <ul>
                <li>position: ${index + 1}</li>
                <li>score: ${account.score}</li>
                <li>username: ${account.name}</li>
                <li>address: ${account.addr}</li>
            </ul>
            <hr>
        `;
        leaderboardList.appendChild(listItem);
    });

    leaderboardContainer.appendChild(leaderboardList);
    leaderboardSelector.appendChild(leaderboardContainer);
};

document.addEventListener("DOMContentLoaded", () => {

    let mainGameUIStateFlag = false;
    let travelCdBtn;
    let travelBtn;
    let accStepID;
    let cycleID;
    let xpDataValue;
    let creditDataValue;
    let travelTriggerCtr;
    let summaryButton;
    let dataSim;
    let accSim;
    let userDataAccAvatarID = document.getElementById('userData-0-accAvatarID');
    let userDataAccAddr = document.getElementById('userData-0-accAddr');
    let userDataAccName = document.getElementById('userData-0-accName');
    let userDataAccXp = document.getElementById('userData-0-accXp');
    let userDataAccCredits = document.getElementById('userData-0-accCredits');
    let userDataAccStepsCompleted = document.getElementById('userData-0-accStepsCompleted');

    let accAvatarID = "ID: " + userDataAccAvatarID.innerText.split(': ')[1];
    let accAddr = "ETHaddr: " + userDataAccAddr.innerText.split(': ')[1];
    let accName = "userName: " + userDataAccName.innerText.split(': ')[1];
    let accXp = "xp: " + userDataAccXp.innerText.split(': ')[1];
    let accCredits = "credits: " + userDataAccCredits.innerText.split(': ')[1];
    let accStepsCompleted = "accStepsCompleted: " + userDataAccStepsCompleted.innerText.split(': ')[1];

    // Define the states of the UI
    const states = {
        connectionState: 1,
        registrationState: 2,
        mainGameUIState: 3,
        travelUIState: 4,
    };

    // Set the initial state
    let currentState = states.connectionState;

    /**
     * Creates the HTML for the state control buttons.
     *
     * @param {number} activeState - The currently active state.
     * @returns {string} The HTML for the state control buttons.
     */
    const createStateCtrHTML = (activeState) => {
        const stateCtr = document.createElement('div');
        stateCtr.id = 'state-ctr';
        stateCtr.className = 'lg-mb-25';
        stateCtr.innerHTML = `
            <ul class="state-ctr-ul flex-core flex-row flex-center">
                <li id="state-id-01" class="button state-trigger ${activeState === 1 ? 'active' : ''}">1</li>
                <li id="state-id-02" class="button state-trigger ${activeState === 2 ? 'active' : ''}">2</li>
                <li id="state-id-03" class="button state-trigger ${activeState === 3 ? 'active' : ''}">3</li>
                <li id="state-id-04" class="button state-trigger ${activeState === 4 ? 'active' : ''}">4</li>
            </ul>
        `;
        return stateCtr.outerHTML;
    };

    /**
     * Initializes the summary UI and generates the leaderboard.
     */
    const iniSummary = () => {
        let uiHTML = "";
        uiHTML = `
        <div id="GCG-main-ctr" class="flex-core flex-col flex-center">
            <div class="flex-core flex-col flex-center-dev">
                <img class="GCG-sum-logo lg-mb-25 lg-mt-25" src="_img/gcg-logo-0.1.png" alt="">
                <p class="GCG-sum-p01">Total Game Lifespan :: ${gameLifespanLimit} seconds</p>
                <p class="GCG-sum-p01">Total accounts simulated :: ${dataIterator} accounts</p>
                <p class="GCG-sum-p01">Game Step Limit :: ${gameStepLimit} steps</p>
                <p class="GCG-sum-p01">Game Step Time Limit :: ${gameStepTimeLimit} second</p>
                <p class="GCG-sum-p01">Game phases :: 2 phases | default-phase, game-phase</p>
                <p class="GCG-sum-p01">Noise layers :: 2 layers | modulo-operation, random noise sequnce lookup</p>
                <p class="GCG-sum-p01">Game objectives :: 3 objectives | collecting: experience, credits, completing: ${gameStepLimit} steps</p>
                <p class="GCG-sum-p01">Security layers :: 3 layers | Game Lifespan validation, Game phase validation, Player Step validation</p>
                <button id="GCG-reset" class="button lg-mt-25 lg-mb-25">Reset</button>
                <p class="GCG-sum-p01">Scoreboard:</p>
                <div id="GCG-leaderboard"></div>
            </div>
        </div>
        `;
        document.getElementById('GCG-UI').innerHTML = uiHTML;
        document.getElementById('GCG-UI').classList.remove("container");
        document.getElementById('GCG-reset').addEventListener('click', handleResetBackButtonClick);
    }

    /**
     * Updates the UI based on the current state.
     *
     * @param {number} state - The current state of the UI.
     */
    const updateUI = (state) => {
        userDataAccStepsCompleted = document.getElementById('userData-0-accStepsCompleted');
        userDataAccAvatarID = document.getElementById('userData-0-accAvatarID');
        userDataAccAddr = document.getElementById('userData-0-accAddr');
        userDataAccName = document.getElementById('userData-0-accName');
        userDataAccXp = document.getElementById('userData-0-accXp');
        userDataAccCredits = document.getElementById('userData-0-accCredits');
        accAvatarID = "ID: " + userDataAccAvatarID.innerText.split(': ')[1];
        accAddr = "ETHaddr: " + userDataAccAddr.innerText.split(': ')[1];
        accName = "userName: " + userDataAccName.innerText.split(': ')[1];
        accXp = "xp: " + userDataAccXp.innerText.split(': ')[1];
        accCredits = "credits: " + userDataAccCredits.innerText.split(': ')[1];
        accStepsCompleted = "accStepsCompleted: " + userDataAccStepsCompleted.innerText.split(': ')[1];

        let uiHTML = "";
        switch (state) {
            case states.connectionState:

                mainGameUIStateFlag = false;

                uiHTML = `
                    <div id="GCG-main-ctr" class="container flex-core flex-col flex-center">
                        ${createStateCtrHTML(state)}
                        <button id="GCG-connect" class="button">Connect</button>
                    </div>
                `;
                break;
            case states.registrationState:

                mainGameUIStateFlag = false;

                uiHTML = `
                    <div id="GCG-main-ctr" class="container flex-core flex-col flex-center">
                        ${createStateCtrHTML(state)}
                        <div id="image-placeholders-container">
                            <ul class="image-placeholders-container flex-core flex-row flex-start">
                                <li class="image-placeholders flex-core flex-center">av_id_01</li>
                                <li class="image-placeholders flex-core flex-center">av_id_02</li>
                                <li class="image-placeholders flex-core flex-center">av_id_03</li>
                                <li class="image-placeholders flex-core flex-center">av_id_04</li>
                            </ul>
                        </div>
                        <div id="form-container">
                            <form class="form-container flex-core flex-col flex-end lg-mt-66">
                                <input type="text" placeholder="Username input" id="username-selection" value="${accAddr}">
                                <input class="lg-mt-16" type="text" placeholder="ETH amount input" id="ETH-input" value="ETH amount: 0.004">
                                <button id="GCG-reg-btn" class="button lg-mt-41">Register</button>
                            </form>
                        </div>
                    </div>
                `;
                break;
            case states.mainGameUIState:

                mainGameUIStateFlag = true;

                uiHTML = `
                    <div id="GCG-main-ctr" class="container flex-core flex-col flex-center">
                        ${createStateCtrHTML(state)}
                        <div id="data-warp" class="data-warp flex-core flex-row">
                            <div id="acc-data-container" class="data-container flex-core flex-col flex-end-start lg-mr-25">
                                <div id="av-small-container" class="av-small-container flex-core flex-center">${accAvatarID}</div>
                                <div id="eth-addr-display" class="eth-addr-display lg-mt-25 flex-core flex-center">${accAddr}</div>
                                <div id="acc-name" class="acc-name-display lg-mt-25 flex-core flex-center">${accName}</div>
                                <div id="xp-display" class="xp-display lg-mt-25 flex-core flex-center">${accXp}</div>
                                <div id="credit-display" class="credit-display lg-mt-25 flex-core flex-center">${accCredits}</div>
                                <div id="step-counter-display" class="credit-display lg-mt-25 flex-core flex-center">${accStepsCompleted}</div>
                            </div>
                            <div id="acc-avatar-travel-container" class="flex-core flex-col flex-start">
                                <div id="av-img-ctr" class="av-travel-container flex-core flex-center">${accAvatarID}</div>
                                <div id="travel-trigger-ctr" class="travel-trigger-container flex-core flex-col flex-center">
                                    <button id="travel-trigger-btn" class="button travel-trigger lg-mt-25 flex-core flex-center">travel</button>
                                    <div id="travel-trigger-cd-container" class="travel-trigger-cd-container flex-core flex-col flex-end">
                                        <div id="travel-cd" class="travel-trigger-cd flex-core flex-center">cd</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;
            case states.travelUIState:

                mainGameUIStateFlag = false;

                cycleID             = (userDataAccStepsCompleted.innerText.split(': ')[1])-1;
                xpDataValue         = `xp-credit-value-cycle-${cycleID}-user-0-xp`;
                creditDataValue     = `xp-credit-value-cycle-${cycleID}-user-0-credit`;

                try {
                    xpDataValue     = document.getElementById(`xp-credit-value-cycle-${cycleID}-user-0-xp`).innerText;
                    creditDataValue = document.getElementById(`xp-credit-value-cycle-${cycleID}-user-0-credit`).innerText;
                } catch (e) {
                    console.log(e);
                }

                uiHTML = `
                    <div id="GCG-travel-ctr" class="container flex-core flex-col flex-center">
                        ${createStateCtrHTML(state)}
                        <div id="data-travel-warp" class="data-warp flex-core flex-row flex-start">
                            <div id="acc-data-container" class="data-container flex-core flex-col flex-end-start lg-mr-25">
                                <div id="av-small-container" class="av-small-container flex-core flex-center">${accAvatarID}</div>
                                <div id="eth-addr-display" class="eth-addr-display lg-mt-25 flex-core flex-center">${accAddr}</div>
                                <div id="acc-name" class="acc-name-display lg-mt-25 flex-core flex-center">${accName}</div>
                                <div id="xp-display" class="xp-display lg-mt-25 flex-core flex-center">${xpDataValue}</div>
                                <div id="credit-display" class="credit-display lg-mt-25 flex-core flex-center">${creditDataValue}</div>
                            </div>
                            <div id="acc-av-travel-container" class="flex-core flex-col flex-start">
                                <div class="av-travel-container flex-core flex-center">story_img_id</div>
                                <div class="travel-trigger-container flex-core flex-col flex-center">
                                    <button id="travel-trigger-back-btn" class="button travel-trigger lg-mt-25 flex-core flex-center">back</button>
                                </div>
                            </div>
                            <div id="acc-story-container" class="data-container flex-core flex-col flex-start lg-ml-25">
                                <div class="story-h-display flex-core flex-center">story_header_id</div>
                                <div class="story-p-display lg-mt-25 flex-core flex-center">story_description_id</div>
                            </div>
                        </div>
                    </div>
                `;
                break;
        }

        document.getElementById('GCG-UI').innerHTML = uiHTML;

        try {
            accStepID = parseInt(userDataAccStepsCompleted.innerText.split(': ')[1]);
            if(accStepID === gameStepLimit && mainGameUIStateFlag) {
                travelBtn = document.getElementById('travel-trigger-btn');
                travelCdBtn = document.getElementById('travel-cd');
                travelTriggerCtr = document.getElementById('travel-trigger-ctr');
                summaryButton = document.createElement("button");
                summaryButton.id = "summary-btn";
                summaryButton.classList.add("button", "travel-trigger", "lg-mt-25", "flex-core", "flex-center");
                summaryButton.textContent = "summary";
                travelBtn.remove();
                travelCdBtn.remove();
                travelTriggerCtr.appendChild(summaryButton);
            }
        } catch (e) {
            console.log(e);
        }

        switch (state) {
            case states.connectionState:
                document.getElementById('GCG-connect').addEventListener('click', handleConnectButtonClick);
                break;
            case states.registrationState:
                document.getElementById('GCG-reg-btn').addEventListener('click', handleRegisterButtonClick);
                break;
            case states.mainGameUIState:
                try {
                    document.getElementById('travel-trigger-btn').addEventListener('click', handleTravelTriggerButtonClick);
                } catch(_) {

                }
                try {
                    document.getElementById('summary-btn').addEventListener('click', handleSummaryTriggerButtonClick);
                } catch(_) {

                }

                break;
            case states.travelUIState:
                document.getElementById('travel-trigger-back-btn').addEventListener('click', handleTravelBackButtonClick);
                break;
        }

        document.querySelectorAll('.state-trigger').forEach(button => {
            button.addEventListener('click', handleStateButtonClick);
        });
    };

    /**
     * Handles the click event of the Connect button.
     * Updates the UI state to the Registration state.
     */
    const handleConnectButtonClick = () => {
        currentState = states.registrationState;
        updateUI(currentState);
    };

    /**
     * Handles the click event of the Register button.
     * Updates the UI state to the Main Game UI state.
     *
     * @param {Event} event - The click event.
     */
    const handleRegisterButtonClick = (event) => {
        event.preventDefault();
        currentState = states.mainGameUIState;
        updateUI(currentState);
    };

    /**
     * Handles the click event of the Travel Trigger button.
     * Updates the UI state to the Travel UI state.
     */
    const handleTravelTriggerButtonClick = () => {
        currentState = states.travelUIState;
        if(stepTimeUiLogValidation(0)) {
            updateStepsCompleted(dataIterator);
            updateUI(currentState);
        } else {
            console.log('invalid stepTimeLogValidation => handleTravelTriggerButtonClick function blocked');
        }
    };

    /**
     * Handles the click event of the Summary Trigger button.
     * Initializes the summary UI and generates the leaderboard.
     */
    const handleSummaryTriggerButtonClick = () => {
        iniSummary();
        generateLeaderboard();
    };

    /**
     * Handles the click event of the Travel Back button.
     * Updates the UI state to the Main Game UI state.
     */
    const handleTravelBackButtonClick = () => {
        currentState = states.mainGameUIState;
        updateUI(currentState);
    };

    /**
     * Handles the click event of the Reset Back button.
     * Resets the simulation and updates the UI state to the Connection state.
     */
    const handleResetBackButtonClick = () => {

        document.getElementById('data-sim').remove();
        document.getElementById('acc-sim').remove();
        dataSim = document.createElement('div');
        dataSim.id = 'data-sim';
        dataSim.classList.add('display-none');
        document.body.append(dataSim);

        accSim = document.createElement('div');
        accSim.id = 'acc-sim';
        accSim.classList.add('display-none');
        document.body.append(accSim);

        simXpCreditValuesDOM(gameStepLimit,dataIterator);
        simUserAccontsDOM(dataIterator, ethAddresses, usernames);

        currentState = states.connectionState;
        updateUI(currentState);
    };

    /**
     * Handles the click event of the state control buttons.
     * Updates the UI state based on the clicked button.
     *
     * @param {Event} event - The click event.
     */
    const handleStateButtonClick = (event) => {
        const targetId = event.target.id;
        switch (targetId) {
            case 'state-id-01':
                currentState = states.connectionState;
                break;
            case 'state-id-02':
                currentState = states.registrationState;
                break;
            case 'state-id-03':
                currentState = states.mainGameUIState;
                break;
            case 'state-id-04':
                currentState = states.travelUIState;
                break;
        }
        updateUI(currentState);
    };

    updateUI(currentState);
});

// }}}
