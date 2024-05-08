/**
 * Represents user data in the application.
 *
 * @typedef {Object} UserData
 * @property {string} accAddr - The account address associated with the user.
 * @property {number} accAvatarID - The ID of the user's avatar.
 * @property {string} accName - The name of the user.
 * @property {number} accStepsCompleted - The number of steps completed by the user.
 * @property {number[]} accStepsTimeLog - An array of timestamps representing the time when each step was completed.
 * @property {number} accXp - The experience points earned by the user.
 * @property {number} accCredits - The credits earned by the user.
 * @property {number} accTravelCd - The travel cooldown time for the user.
 * @property {number} accPosition - The position of the user.
 * @property {number} accFeeTracker - The fee tracker for the user.
 * @property {boolean} accPaidFlag - A flag indicating if the user has paid.
 * @property {number} accUiActive - The active UI for the user.
 */

/**
 * Represents global data in the application.
 *
 * @typedef {Object} GlobalData
 * @property {number} globalGamePhase - The current phase of the game.
 * @property {number} globalGameLifespan - The lifespan of the game.
 * @property {number} globalEthPool - The ETH pool in the game.
 */

'use strict';

/**
 * The initial user data object.
 *
 * @type {UserData}
 */
let userData = {
    'accAddr': '0x0000000000000000000000000000000000000000',
    'accAvatarID': 0,
    'accName': '',
    'accStepsCompleted': 0,
    'accStepsTimeLog': [],
    'accXp': 0,
    'accCredits': 0,
    'accTravelCd': 0,
    'accPosition': 0,
    'accFeeTracker': 0,
    'accPaidFlag': false,
    'accUiActive': 0
};

/**
 * The initial global data object.
 *
 * @type {GlobalData}
 */
let globalData = {
    'globalGamePhase': 0,
    'globalGameLifespan': 0,
    'globalEthPool': 0,
};
