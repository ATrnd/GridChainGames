'use strict';

// {sim engine} {{{
// ================
// {notices}
// =========
const gameBlockedNotice = 'invalid globalGamePhase || globalGameLifespan';

// {globals}
// =========
const gameLifespanLimit = 100;
const gameStepLimit     = 3;
const gameStepTimeLimit = 1;

// {gameplay data}
// ===============
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

// {user & data generator utility}
// ===============================
// refactoring : fn name : concatNameWithIterator
const genData = (_prefix, _i) => {
  const data = [];
  for (let i = 0; i < _i; i++) {
    data.push(`${_prefix}${i}`);
  }
  return data;
};

// {security layers, game state & phase (global) validators}
// =========================================================
const gameLifespanValidation = () => {
    let lifespanFlag = false;
    const gameLifespanLimitInMillis = globalData.globalGameLifespan;
    const getCurrentTimeInMillis    = Date.now();
    if(getCurrentTimeInMillis < gameLifespanLimitInMillis) {
        lifespanFlag = true;
    }
    return lifespanFlag;
};

const phaseValidation = () => {
    let phaseFlag = false;
    if(globalData.globalGamePhase === 1) {
        phaseFlag = true;
    }
    return phaseFlag;
};

const sysValidation = () => {
    let sysValidationFlag = false;
    if(phaseValidation() && gameLifespanValidation()) {
        sysValidationFlag = true;
    }
    return sysValidationFlag;
}

// {game engine utility}
// =====================
const genRandNum = () => {
    if(sysValidation()) {
        return Math.floor(Math.random() * 9) + 1;
    } else {
        throw new Error(`${gameBlockedNotice} => genRandNum function blocked`);
    }
}

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

const genNoise = () => {
    if(sysValidation()) {
        let currentTime = new Date().getTime();
        return Math.floor(currentTime % 3);
    } else {
        throw new Error(`${gameBlockedNotice} => genNoise function blocked`);
    }
};

const optimiseId = (_id) => {
    if(sysValidation()) {
        return (_id - 1);
    } else {
        throw new Error(`${gameBlockedNotice} => optimiseId function blocked`);
    }
}

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

const genRandNumSeqNoiseIDOpt = (_arr) => {
    if(sysValidation()) {
        let noiseID = simNoiseID();
        let randNumSeqValueByNoiseID = _arr[noiseID];
        return optimiseId(randNumSeqValueByNoiseID);
    } else {
        throw new Error(`${gameBlockedNotice} => genRandNumSeqNoiseIDOpt function blocked`);
    }
};

const getXpCredValues = (_i) => {
    if(sysValidation()) {
        return xpCreditObj['xpCredVal_' + (_i)];
    } else {
        throw new Error(`${gameBlockedNotice} => getXpCredValues function blocked`);
    }
}

// {time log utility}
// ==================
const updateText = (_label, _data) => {
    return _label + ': ' + _data;
}

//
// =================
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

// {game initialiser utility}
// ==========================
const iniGameLifespan = () => {
    const currentTime = new Date();
    const futureTimeInMillis = currentTime.getTime() + (gameLifespanLimit * 1000);
    return futureTimeInMillis;
};

const iniGameGlobals = () => {
    globalData.globalGamePhase = 1;
    globalData.globalGameLifespan = iniGameLifespan();
};

// {simulation utility}
// ====================
const genRandAvID = () => Math.floor(Math.random() * 4) + 1;

//
// =====================
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

// {step simulation for sim accounts}
// ==================================
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

// {step simulation utility & verification}
// ========================================
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

//
// =======================
iniGameGlobals();
console.log('--- iniGameGlobals ---');

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

// {game ini}
// ==========
// {generate utility data}
// =======================
const dataIterator = 2;

simXpCreditValuesDOM(gameStepLimit,dataIterator);
const ethAddresses = genData('0xAddress',dataIterator);
const usernames    = genData('User',dataIterator);

// {generate UI for testing the step engine}
// =========================================
// const button = document.createElement('button');
// button.textContent = 'Update Steps Completed';
// button.classList.add('button');
// button.addEventListener('click', () => updateStepsCompleted(dataIterator));
// document.body.prepend(button);

// }}}

// {UI engine} {{{
// ===============
// {generate DOM simulation (data)}
// ================================
simUserAccontsDOM(dataIterator, ethAddresses, usernames);

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

    const states = {
        connectionState: 1,
        registrationState: 2,
        mainGameUIState: 3,
        travelUIState: 4,
    };

    let currentState = states.connectionState;

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

    const iniSummary = () => {
        let uiHTML = "";
        uiHTML = `
        <div id="GCG-main-ctr" class="container flex-core flex-col flex-center">
            <p>--- ini summary data ---</p>
            <button id="GCG-reset" class="button lg-mt-25">Reset</button>
        </div>
        `;
        document.getElementById('GCG-UI').innerHTML = uiHTML;
        document.getElementById('GCG-reset').addEventListener('click', handleResetBackButtonClick);
    }

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
            if(accStepID === 3 && mainGameUIStateFlag) {
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
                    // console.log(_);
                }
                try {
                    document.getElementById('summary-btn').addEventListener('click', handleSummaryTriggerButtonClick);
                } catch(_) {
                    // console.log(_);
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

    const handleConnectButtonClick = () => {
        currentState = states.registrationState;
        updateUI(currentState);
    };

    const handleRegisterButtonClick = (event) => {
        event.preventDefault();
        currentState = states.mainGameUIState;
        updateUI(currentState);
    };

    const handleTravelTriggerButtonClick = () => {
        currentState = states.travelUIState;
        updateStepsCompleted(dataIterator);
        updateUI(currentState);
    };

    const handleSummaryTriggerButtonClick = () => {
        console.log('ini summary state');
        iniSummary();
    };

    const handleTravelBackButtonClick = () => {
        currentState = states.mainGameUIState;
        updateUI(currentState);
    };

    const handleResetBackButtonClick = () => {

        document.getElementById('data-sim').remove();
        document.getElementById('acc-sim').remove();
        dataSim = document.createElement('div');
        dataSim.id = 'data-sim';
        dataSim.classList.add('display-none');
        document.body.prepend(dataSim);

        accSim = document.createElement('div');
        accSim.id = 'acc-sim';
        accSim.classList.add('display-none');
        document.body.prepend(accSim);

        simXpCreditValuesDOM(gameStepLimit,dataIterator);
        simUserAccontsDOM(dataIterator, ethAddresses, usernames);

        currentState = states.connectionState;
        updateUI(currentState);
    };

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
