![Grid Chain Games Banner](https://github.com/ATrnd/GridChainGames/blob/main/_img/GCG_banner_0.1.png?raw=true)

# Grid Chain Games — Demo Walkthrough

The GCG demo is an abstract Javascript representation of accounts (Ethereum addresses), the Ethereum blockchain, and the GCG smart contract fused into one chunk of code.

This is an oversimplified (and very experimental) version of demonstrating concepts, which would take time, developer power, and resources to build at the production level; it contains many hacks and practices that I wouldn't call safe (or efficient) for public use at all.

Fortunately, it can't be misused since it has no Solidity implementation. Everything is designed to simulate events that should happen on-chain, and they would be implemented differently than they are implemented in the demo at this moment.

## GCG — Demo Elements

To explain what this Javascript simulation is (thus the GCG demo), we need to understand the core elements we use and the things we're trying to simulate.

## GCG — Accounts
First, we simulate accounts as the foundation of every app or dApp.
Accounts are generated as they were registered to a smart contract containing the information required for the game engine to work.
The GCG engine has access to these accounts and modifies them as the user progresses through the game.
Whenever we take a 'step' in the game, all changes applied to each account happen simultaneously, which would (probably) never happen on-chain. However, for rapid demonstration, I designed it to work this way so we can see what happens with the data and test/showcase different behaviours.

## GCG — Steps

Accounts must go through the following 'steps' to complete the game.
 1. connection,
 2. registration,
 3. main game UI,
 4. travel UI,
 5. summary phase,

Let's discuss each step briefly now and see what they do:

### GCG Steps — Connection

The connection state demonstrates a crypto wallet connection to the dApp; establishing a connection to a crypto wallet has not been implemented since we're not dealing with smart contracts right now. It's just there to indicate that the user needs to connect a wallet to access the following states.

![Grid Chain Games - Connection UI](https://github.com/ATrnd/GridChainGames/blob/main/_img/_connection_UI_0.1.png?raw=true)

### GCG Steps — Registration

The registration state demonstrates how users would set up their accounts to become eligible to play the game.

#### Registration UI — Overview

__Avatars__:

Users need to pick an avatar, which is indicated by avatar_IDs. These are placeholders for AI-generated avatars that users can choose for a game cycle.

__ETH address__:

The user's ETH address should be automatically injected into this page. This is the address the user will use to send and receive transactions in the game.

__ETH amount__:

This is the fee for participating in the game. This value is set by the contract creator, usually at a low price of approx(10-20 USD/ETH) for a game cycle. This registration fee should go to an ETH pool, which is re-distributed among users when the game cycle is over.

__Register button__:

If all these conditions are set & validated, the user should be able to register and proceed to the next step.

![Grid Chain Games - Registration UI](https://github.com/ATrnd/GridChainGames/blob/main/_img/_reg_UI_0.1.png?raw=true)

### GCG Steps — The Main Game UI

The main game state is where users can trigger game functions and complete game objectives, such as gaining experience, credits, and steps.

#### The Main Game UI — Overview

- The main game UI consists of:
    - a small avatar icon (indicated by an avatar ID)
    - a large avatar display (indicated by an avatar ID)
    - the user's ETH address
    - the user's nickname
    - the collected total experience points
    - the collected total credit points
    - the total steps completed
    - the travel button
    - the travel cooldown (cd) indicator (not implemented)

![Grid Chain Games - The Main Game UI](https://github.com/ATrnd/GridChainGames/blob/main/_img/_game_UI_0.1.png?raw=true)

#### Gameplay — Overview

The user needs to trigger the travel function to complete steps and gain experience & credits. Whenever the travel function is triggered, we re-render the UI and display the Travel UI, where we log the results of each step. The travel UI should display the results of procedures that happen on-chain. In the demo, we must cycle between the main game and the travel UI to complete the game and get to the summary state.

### GCG Steps — The Travel UI

The travel UI is rendered if a user triggers the travel function. It displays the collected experience, credits, and a related story.

#### The Travel UI — Overview

- The travel UI consists of:
    - a small avatar icon (indicated by an avatar ID)
    - a large story image display (indicated by a story ID)
    - a story header (indicated by a story ID)
    - a story description (indicated by a story ID)
    - the user's ETH address
    - the user's nickname
    - the collected experience points (for the current step)
    - the collected total credit points (for the current step)
    - the back button

![Grid Chain Games - The Travel UI](https://github.com/ATrnd/GridChainGames/blob/main/_img/_travel_UI_0.1.png?raw=true)

#### Gameplay — Overview

The travel UI serves as a data log for the user. It displays a slight hint of the story and an image to mimic MMOG quests & behaviours fused into a 2d representation. From here, the user needs to hit the back button and repeat the stepping process through the main game UI to become eligible for the game's final state. In production, this should take weeks (to complete all steps and approx 24 hours to reset the cooldown on one step); in the demo, I set a low time barrier for controlling step cooldowns for testing purposes.

### GCG Steps — Summary UI

The summary UI is currently designed to display data about global game variables and objectives, a reset button and a scoreboard.

#### Summary UI — Overview

At the moment, the summary UI is more of a log of global variables/events and game elements than a 'real' UI element. It's there to log significant concepts and information. To understand the summary logs, we must dig deeper into what happens behind the scenes, which is the essence of what the GCG demo is meant to demonstrate.

### GCG — Concepts

- At this point, we should have a basic understanding of GCGs:
    - Accounts (created to simulate how users progress through the game),
    - Steps (required to connect, register & play the game)

#### Concepts — Total Game Lifespan

In the GCG demo, the total lifespan of a game is 100 seconds. If this limit is reached, game functions will block execution, rendering the game unusable. This is the equivalent of blocking smart contract execution on-chain with solidity modifiers. In a real application / dApp, a game lifespan should be around 30-90 days, based on the game's complexity & objectives. Game lifespans are one of the vital security layers simulated in the demo.

The purpose of this layer is to keep up with security best practices by constantly re-evaluating contracts containing game logic & functions and refactoring and re-designing them to be as resilient as possible as often as needed.

Simply put, contracts are 'valid' for a fixed timespan and become unusable at the end of the lifespan. Thus, GCG contracts must be redeployed each time to launch a new game instance. From the gameplay perspective, Game lifespans are there to support daily streaks and player returns since users have a fixed time limit to finish the game EG: 30 days total.

#### Concepts — Total Accounts simulated

In the GCG demo, the total number of accounts simulated is 100. Account simulation has no limits, and the engine can easily render more than 1k accounts. However, the number of checks and loops sometimes affects the browser's performance, so I kept it at a low value.

Accounts represent users onchain, with addresses, avatar_ids, and usernames, but more importantly, with experience points, credits, step, and time counters. Accounts behave simultaneously, as the demo (precisely the travel function) gets triggered and fed by the pre-generated data (from the DOM), using GCGs noising simulations. Accounts are there to simulate (& provide us with the opportunity to analyze how our noise mechanisms affect) data and get a picture of the possible outcomes of a game cycle in terms of credits & experience collected.

#### Sidenote — About the data

In the GCG demo, the data (that should be generated on-chain, on the fly, when the contract is executed) is pre-generated using the DOM as the database of information required to populate accounts with experience and credits for each step of the game. When the demo gets initialized, we generate these pseudo-random sets of values for each account, which are fed to the engine whenever the travel function gets triggered and verified.

#### Concepts — Game Step Limit

In the GCG demo, the total number of allowed steps is 3. If a user completes these steps, thus triggering the contract (n) times (in this case, three times), it becomes eligible for the game's final stage.

In essence, the step limit serves as a counter that limits the maximum allowed steps for each user on the one hand and as a goal to achieve on the other. In a production-level application, we combine the Game lifespan, Game step limit (and other factors) to validate if a user account is eligible for the final game stage.

#### Concepts — Game Step Time Limit

In the GCG demo, the Game Step Time Limit is 2 seconds. If the user tries to execute the travel function within this period, the engine blocks execution. This limit should be set to approximately 12-24 hours in production.

GCG features the concept of minimalism, which also applies to gameplay (gamers are busy people!). In the first iterations of GCG, the engine should operate with minimal user time investment. With future extensions, Game Step Time limits may be extended and applied to different aspects of the game.

#### Concepts — Game Phases

In the GCG demo, we have 2 Game phases. Game phases are states in the game engine, designed to lock & unlock functions. This concept is a security enhancement and an essential strategic feature since on-chain data is visible. While most of the data should be generated on the fly, with user interactions, some core parameters must be stored initially in the contract. Some of these parameters are (may) used to affect the outcomes of user steps and could be exploited without controlling access to specific functions by game phase controls.

Also, it serves as an important security layer to prevent malicious contract requests to specific parts of the engine to gain access to another. By controlling game phases, users may only interact with a set of limited functions of the game engine if they already completed a list of steps stored in a previous state of the contract.

#### Concepts — Noise Layers

In the GCG demo, we have 2 Noise layers. The 'modulo-operation' and the 'random noise sequence lookup'. The concept of noise layers is very similar to giving passwords 'salt' to make them harder to reverse engineer.

In contrast with password salting, what we're trying to achieve with adding noise to each step (which predefines the amount of experience & credits gained!) is to make it harder to craft automated attacks with an objective of getting the highest score from a step, based on pre-calculating the possible outcomes and triggering the (game-engine) contract only when those specific conditions are given. 

The 'modulo-operation' gives us a number we can add or subtract from the random number (which should/may be generated by an oracle in production) to further randomize it based on block timestamps. 

The 'random noise sequence lookup' uses a set of random numbers as the source for looking up the final step value by using the (random number generated + the noise value) as an ID in the 'random noise sequence'.

Thus, we making it way more complicated to design a contract targeting a specific / or a range of numbers to submit (assuming these submissions go through GCGs noise layers to return a final result) than if we'd simply work with 'plain' numbers.

#### Sidenote — For Further Clarification

Summarizing the Noise Layer procedures:

1. We get/generate a random number onchain
2. We add noise to it
3. We use the (random number +|- the noise) to get a third value
4. We use this third value to lookup a number in a random number sequence [1-9]
5. Finally, we use this value (as an ID) to look up the credit and experience points in another (ideally randomized) number sequence.
6. Thus, we are eliminating the use of 'plain numbers' from player score-related functions and generating 'noise', making inner game mechanisms harder to exploit.

### GCG — Game Objectives

- In the GCG demo, we have three game objectives:
    - completing 'steps' and collecting 'experience' & 'credits'.

Using similar methods & objectives, GCG can be extended by collecting materials & more assets for crafting, trading & more. 

- __steps__: can be completed by triggering the contract (n) times (in the case of the demo n=3)
- __experience__: can be collected by triggering the travel function,
- __credits__: can be collected by triggering the travel function

### GCG — Security Layers

In the GCG demo, we have four security layer implementations.

- If any of these conditions return false, thus:
    - The game lifespan is invalid (the game exceeded the 100-sec lifespan, initialized at page load) 
    - The game state is invalid (we're in the 'default state' & not in the 'game state'; note on game initialization, we set the 'game state' to true; this may only triggered if we modify the demo's source)
    - The player steps exceeded the max value (we triggered the travel function more than three times)
    - The travel function is triggered while the 'step time limit' is active (we trigger the travel function in &lt; 2sec)

__Function execution is blocked.__

### GCG — Scoreboard

In the GCG demo, we calculate the game's final outcome (score) by adding together the collected experience and credit points. We render the results in descending order.

### GCG — Troubleshooting

1. If the demo is kept open in the browser for a longer time (> 100s), the game lifespan layer will block execution. Refresh the browser to reload the demo.
2. There is a developer control navigation for easy access to each UI element, labelled with numbers; here, we can access, connect, and register the main game UI and the travel UI (but not the summary UI; summary needs data to render); however, if we open the Travel UI using the developer navigation it won't load 'step data', it will still render tho, the Travel UI will only work properly if all simulated security conditions met and we trigger the travel button from the main game UI.
3. Use (Google Chrome &) Google Chrome's developer tools to see the logs for more info about what's happening behind the scenes, function blocks & updates displayed in the console.
4. If something looks odd or doesn't render, gives strange errors refresh the browser; remember, this is super experimental.

<br>

![Grid Chain Games Footer](https://github.com/ATrnd/GridChainGames/blob/main/_img/GCG_footer_0.2.png?raw=true)

