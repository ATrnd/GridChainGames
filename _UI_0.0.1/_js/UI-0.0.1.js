/**
 * This event listener is triggered when the DOM content has been loaded.
 * It initializes the main functionality of the code.
 */
document.addEventListener("DOMContentLoaded", function() {

    // Get the main container element
    const mainContainer = document.getElementById('GCG-main-ctr');

    // Get the connect button element
    const connectButton = document.getElementById('GCG-connect');

    // Get the user data elements
    const userDataAccAvatarID = document.getElementById('userData-0-accAvatarID');
    const userDataAccAddr = document.getElementById('userData-0-accAddr');
    const userDataAccName = document.getElementById('userData-0-accName');
    const userDataAccXp = document.getElementById('userData-0-accXp');
    const userDataAccCredits = document.getElementById('userData-0-accCredits');
    const userDataAccStepsCompleted = document.getElementById('userData-0-accStepsCompleted');

    // Add a click event listener to the connect button
    connectButton.addEventListener('click', function() {

        // Extract user data from the user data elements
        const accAvatarID = "ID: " + userDataAccAvatarID.innerText.split(': ')[1];
        const accAddr = "ETHaddr: " + userDataAccAddr.innerText.split(': ')[1];
        const accName = "userName: " + userDataAccName.innerText.split(': ')[1];
        const accXp = "xp: " + userDataAccXp.innerText.split(': ')[1];
        const accCredits = "credits: " + userDataAccCredits.innerText.split(': ')[1];
        const accStepsCompleted = "accStepsCompleted: " + userDataAccStepsCompleted.innerText.split(': ')[1];

        // Create a new element for image placeholders
        const element1 = document.createElement('div');
        element1.id = "image-placeholders-container";
        element1.innerHTML = `
            <ul class="image-placeholders-container flex-core flex-row flex-start">
                <li class="image-placeholders flex-core flex-center">av_id_01</li>
                <li class="image-placeholders flex-core flex-center">av_id_02</li>
                <li class="image-placeholders flex-core flex-center">av_id_03</li>
                <li class="image-placeholders flex-core flex-center">av_id_04</li>
            </ul>
        `;

        // Create a new element for the form
        const element2 = document.createElement('div');
        element2.id = "form-container";
        element2.innerHTML = `
            <form class="form-container flex-core flex-col flex-end lg-mt-66">
                <input type="text" placeholder="Username input" id="username-selection" value="${accAddr}">
                <input class="lg-mt-16" type="text" placeholder="ETH amount input" id="ETH-input" value="ETH amount: 0.004">
                <button id="GCG-reg-btn" class="button lg-mt-41">Register</button>
            </form>
        `;

        // Remove the connect button
        connectButton.remove();

        // Append the image placeholders and form elements to the main container
        mainContainer.appendChild(element1);
        mainContainer.appendChild(element2);

        // Get the register button element
        const registerButton = document.getElementById('GCG-reg-btn');

        // Add a click event listener to the register button
        registerButton.addEventListener('click', function() {
            event.preventDefault();
            console.log('GCG-reg-btn clicked');

            // Remove the image placeholders container if it exists
            const imagePlaceholdersContainer = document.getElementById('image-placeholders-container');
            if (imagePlaceholdersContainer) {
                imagePlaceholdersContainer.remove();
            }

            // Remove the form container if it exists
            const formContainer = document.getElementById('form-container');
            if (formContainer) {
                formContainer.remove();
            }

            // Create a new data warp element
            const dataWarp = document.createElement('div');
            dataWarp.id = "data-warp";
            dataWarp.classList.add("data-warp", "flex-core", "flex-row");

            // Create a new account data container element
            const accDataContainer = document.createElement('div');
            accDataContainer.id = "acc-data-container";
            accDataContainer.classList.add("data-container", "flex-core", "flex-col", "flex-end-start", "lg-mr-25");
            accDataContainer.innerHTML = `
                <div id="av-small-container" class="av-small-container flex-core flex-center">${accAvatarID}</div>
                <div id="eth-addr-display" class="eth-addr-display lg-mt-25 flex-core flex-center">${accAddr}</div>
                <div id="acc-name" class="acc-name-display lg-mt-25 flex-core flex-center">${accName}</div>
                <div id="xp-display" class="xp-display lg-mt-25 flex-core flex-center">${accXp}</div>
                <div id="credit-display" class="credit-display lg-mt-25 flex-core flex-center">${accCredits}</div>
                <div id="step-counter-display" class="credit-display lg-mt-25 flex-core flex-center">${accStepsCompleted}</div>
            `;

            // Create a new account avatar travel container element
            const accAvatarTravelContainer = document.createElement('div');
            accAvatarTravelContainer.id = "acc-avatar-travel-container";
            accAvatarTravelContainer.classList.add("flex-core", "flex-col", "flex-start");
            accAvatarTravelContainer.innerHTML = `
                <div id="av-img-ctr" class="av-travel-container flex-core flex-center">${accAvatarID}</div>
                <div id="travel-trigger-ctr" class="travel-trigger-container flex-core flex-col flex-center">
                    <button id="travel-trigger-btn" class="button travel-trigger lg-mt-25 flex-core flex-center">travel</button>
                    <div class="travel-trigger-cd-container flex-core flex-col flex-end">
                        <div id="travel-cd" class="travel-trigger-cd flex-core flex-center">cd</div>
                    </div>
                </div>
            `;

            // Append the account data container and account avatar travel container to the data warp
            dataWarp.appendChild(accDataContainer);
            dataWarp.appendChild(accAvatarTravelContainer);

            // Append the data warp to the main container
            mainContainer.appendChild(dataWarp);

            // Get the travel trigger button element
            const travelTriggerBtn = document.getElementById('travel-trigger-btn');

            // Add a click event listener to the travel trigger button
            travelTriggerBtn.addEventListener('click', function() {
                console.log('travel-trigger-btn clicked');
            });
        });
    });
});

