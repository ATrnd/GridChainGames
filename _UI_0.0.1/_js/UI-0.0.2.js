/**
 * This event listener is triggered when the DOM content has been loaded.
 * It initializes the user interface and sets up event handlers for different states.
 */
document.addEventListener("DOMContentLoaded", function () {

    // Get references to the user data elements
    const userDataAccAvatarID = document.getElementById('userData-0-accAvatarID');
    const userDataAccAddr = document.getElementById('userData-0-accAddr');
    const userDataAccName = document.getElementById('userData-0-accName');
    const userDataAccXp = document.getElementById('userData-0-accXp');
    const userDataAccCredits = document.getElementById('userData-0-accCredits');
    const userDataAccStepsCompleted = document.getElementById('userData-0-accStepsCompleted');

    // Extract the values from the user data elements
    const accAvatarID = "ID: " + userDataAccAvatarID.innerText.split(': ')[1];
    const accAddr = "ETHaddr: " + userDataAccAddr.innerText.split(': ')[1];
    const accName = "userName: " + userDataAccName.innerText.split(': ')[1];
    const accXp = "xp: " + userDataAccXp.innerText.split(': ')[1];
    const accCredits = "credits: " + userDataAccCredits.innerText.split(': ')[1];
    const accStepsCompleted = "accStepsCompleted: " + userDataAccStepsCompleted.innerText.split(': ')[1];

    // Define the different states of the application
    const states = {
        connectionState: 1,
        registrationState: 2,
        mainGameUIState: 3,
        travelUIState: 4,
    };

    // Initialize the current state to the connection state
    let currentState = states.connectionState;

    // HTML template for the state control element
    const stateCtrHTML = `
        <div id="state-ctr" class="lg-mb-25">
            <ul class="state-ctr-ul flex-core flex-row flex-center">
                <li id="state-id-01" class="button state-trigger">1</li>
                <li id="state-id-02" class="button state-trigger">2</li>
                <li id="state-id-03" class="button state-trigger">3</li>
                <li id="state-id-04" class="button state-trigger">4</li>
            </ul>
        </div>
    `;

    // Get a reference to the main container element
    let mainContainer = document.getElementById('GCG-main-ctr');

    /**
     * Creates the HTML for the state control element with the active state highlighted.
     *
     * @param {number} activeState - The active state.
     * @returns {string} The HTML string for the state control element.
     */
    function createStateCtrHTML(activeState) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(stateCtrHTML, 'text/html');
        const stateCtr = doc.body.firstChild;

        stateCtr.querySelector(`#state-id-0${activeState}`).classList.add('active');
        return stateCtr.outerHTML;
    }

    /**
     * Updates the user interface based on the current state.
     *
     * @param {number} state - The current state.
     */
    function updateUI(state) {

        let uiHTML = "";
        switch (state) {
            case states.connectionState:
                uiHTML = `
                    <div id="GCG-main-ctr" class="container flex-core flex-col flex-center">
                        ${createStateCtrHTML(state)}
                        <button id="GCG-connect" class="button">Connect</button>
                    </div>
                `;
                break;
            case states.registrationState:
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
                uiHTML = `
                    <div id="GCG-travel-ctr" class="container flex-core flex-col flex-center">
                        ${createStateCtrHTML(state)}
                        <div id="data-travel-warp" class="data-warp flex-core flex-row flex-start">
                            <div id="acc-data-container" class="data-container flex-core flex-col flex-end-start lg-mr-25">
                                <div id="av-small-container" class="av-small-container flex-core flex-center">${accAvatarID}</div>
                                <div id="eth-addr-display" class="eth-addr-display lg-mt-25 flex-core flex-center">${accAddr}</div>
                                <div id="acc-name" class="acc-name-display lg-mt-25 flex-core flex-center">${accName}</div>
                                <div id="xp-display" class="xp-display lg-mt-25 flex-core flex-center">${accXp}</div>
                                <div id="credit-display" class="credit-display lg-mt-25 flex-core flex-center">${accCredits}</div>
                            </div>
                            <div id="acc-av-travel-container" class="flex-core flex-col flex-start">
                                <div class="av-travel-container"></div>
                                <div class="travel-trigger-container flex-core flex-col flex-center">
                                    <button id="travel-trigger-back-btn" class="button travel-trigger lg-mt-25 flex-core flex-center">back</button>
                                </div>
                            </div>
                            <div id="acc-story-container" class="data-container flex-core flex-col flex-start lg-ml-25">
                                <div class="story-h-display flex-core flex-center">story_header</div>
                                <div class="story-p-display lg-mt-25 flex-core flex-center">story_description</div>
                            </div>
                        </div>
                    </div>
                `;
                break;
        }

        // Update the HTML of the document body with the new UI
        document.body.innerHTML = uiHTML;

        // Attach event listeners based on the current state
        switch (state) {
            case states.connectionState:
                document.getElementById('GCG-connect').addEventListener('click', handleConnectButtonClick);
                break;
            case states.registrationState:
                document.getElementById('GCG-reg-btn').addEventListener('click', handleRegisterButtonClick);
                break;
            case states.mainGameUIState:
                document.getElementById('travel-trigger-btn').addEventListener('click', handleTravelTriggerButtonClick);
                break;
            case states.travelUIState:
                document.getElementById('travel-trigger-back-btn').addEventListener('click', handleTravelBackButtonClick);
                break;
        }

        // Attach event listeners to the state control buttons
        document.querySelectorAll('.state-trigger').forEach(button => {
            button.addEventListener('click', handleStateButtonClick);
        });
    }

    /**
     * Event handler for the "Connect" button click event.
     * Updates the current state to the registration state and updates the UI accordingly.
     */
    function handleConnectButtonClick() {
        currentState = states.registrationState;
        updateUI(currentState);
    }

    /**
     * Event handler for the "Register" button click event.
     * Prevents the default form submission behavior and updates the current state to the main game UI state.
     * Updates the UI accordingly.
     *
     * @param {Event} event - The button click event.
     */
    function handleRegisterButtonClick(event) {
        event.preventDefault();
        currentState = states.mainGameUIState;
        updateUI(currentState);
    }

    /**
     * Event handler for the "Travel" button click event.
     * Updates the current state to the travel UI state and updates the UI accordingly.
     */
    function handleTravelTriggerButtonClick() {
        currentState = states.travelUIState;
        updateUI(currentState);
    }

    /**
     * Event handler for the "Back" button click event in the travel UI state.
     * Updates the current state to the main game UI state and updates the UI accordingly.
     */
    function handleTravelBackButtonClick() {
        currentState = states.mainGameUIState;
        updateUI(currentState);
    }

    /**
     * Event handler for the state control button click events.
     * Updates the current state based on the clicked button and updates the UI accordingly.
     *
     * @param {Event} event - The button click event.
     */
    function handleStateButtonClick(event) {
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
    }

    // Initialize the UI with the initial state
    updateUI(currentState);
});
