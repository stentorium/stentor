/*! Copyright (c) 2019, XAPPmedia */
/* tslint:disable:no-magic-numbers */

export const handlers: any = [
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-06T17:58:07.293Z",
        name: "Al Is Telling The Truth",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "AlIsTellingTheTruthIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.929001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["Al {is telling the truth|}", "Al truth"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T18:50:53.742Z",
        name: "Blue Card",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "BlueCardIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.931001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["{I choose|I want|} {the|} blue {card|}"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-02T18:35:36.174Z",
        name: "BlueDoor",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "BlueDoorIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.930001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["{Pick|} {the|} blue {door|}"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T19:02:33.001Z",
        name: "Boat Trip To Nowhere",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "BoatTripToNowhereIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.930001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["Boat trip {to nowhere|} {first|}"]
    },
    {
        content: {
            CancelIntent: [
                {
                    name: "Saved your spot",
                    outputSpeech: {
                        displayText:
                            "Ok. I’ve saved your spot in the adventure for next time. There are plenty more Goosebumps left!",
                        ssml:
                            "Ok. I’ve saved your spot in the adventure for next time. There are plenty more Goosebumps left!"
                    }
                }
            ]
        },
        forward: {},
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-06-28T15:03:12.726Z",
        name: "Global Cancel",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "CancelIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.935001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T15:18:15.225Z",
        name: "Cannon",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "CannonIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.932001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["{I choose|} {the|} cannon"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-06-28T19:29:18.608Z",
        name: "CheckoutMidwayIntent",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "CheckoutMidwayIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.942001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["Midway {please|}", "Checkout {the|} Midway {please|}", "The midway"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T15:32:00.382Z",
        name: "Choo Choo",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "ChooChooIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.934001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["{I choose|} {the|} choo choo", "{I choose|} {the|} chew chew"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-02T15:32:43.284Z",
        name: "Choose Blue ",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "ChooseBlueIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.941001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["{I choose|} blue {please|thanks|}"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [
            {
                name: "number",
                type: "STENTOR.NUMBER",
                isNew: true
            }
        ],
        createdAt: "2018-07-17T13:04:05.692Z",
        name: "Claps Number Intent",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "ClapsNumberIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.946001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["i got {-|number} claps", "{-|number} claps", "i only got {-|number} claps"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-06-28T15:59:48.303Z",
        name: "Climb The Fence Intent",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "ClimbTheFenceIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.962001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["Climb the fence", "fence", "climb", "climb the fence please"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T19:31:10.528Z",
        name: "Decide To Be Rescued",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "DecideToBeRescuedIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.937001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: [
            "Keep yelling",
            "yell",
            "I keep yelling",
            "yell out",
            "call out",
            "keep",
            "i call out",
            "calling out"
        ]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T19:31:19.512Z",
        name: "Decide To Swim For It",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "DecideToSwimForItIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.971001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["Swim for it", "Swim to it", "safety", "{i|} swim {to|for|} safety", "swim", "swimming"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T20:12:51.360Z",
        name: "EscapeThroughTheDoor",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "EscapeThroughTheDoorIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.945001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["escape {through|} {the|} {door|} {down|} {the|} {hall|}"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-02T18:31:26.813Z",
        name: "FindYourOwnWayOut",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "FindYourOwnWayOutIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.945001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["Find your own way {out|}", "Own way"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T18:17:24.143Z",
        name: "Flap Your Arms",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "FlapYourArmsIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.964001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["Flap your arms", "Try to fly", "Fly", "Flap your arms to try and fly", "flap"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T17:26:43.930Z",
        name: "FollowPatty",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "FollowPattyIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.946001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["Follow {Patty|}"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-02T18:30:37.082Z",
        name: "FollowTheDwarf",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "FollowTheDwarfIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.948001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["{Follow|} the dwarf", "Follow"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-06-28T16:00:54.303Z",
        name: "Go Home Intent",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "GoHomeIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.948001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["go home", "home", "go home please", "home please"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T17:56:49.883Z",
        name: "Grab the side of the bridge",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "GrabTheSideOfTheBridgeIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.948001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["{make a|} grab for {the|} side of the bridge", "bridge", "grab", "grab bridge"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T14:36:52.316Z",
        name: "HalloweenExpress",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "HalloweenExpressIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.949001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["Halloween {Express|} {way|}", "Halloween"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T17:51:47.780Z",
        name: "Haunted House",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "HauntedHouseIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.951001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["{the|} haunted house", "house"]
    },
    {
        content: {
            HelpMidStoryHandler: [
                {
                    name: "Help Mid Story",
                    outputSpeech: {
                        displayText:
                            "It looks like you need some help. Carnival of Horror is a choose your own adventure tale. Each decision you make will determine your scare. Throughout the carnival you can say repeat to hear the previous passage or game options again.  You can say stop to end your session and pick it back up later. To start a new adventure from the beginning, just say start over. When it’s time to make a decision, you’ll hear this sound. Are you ready to get back to the Carnival?",
                        ssml:
                            "It looks like you need some help. Throughout the carnival you can say repeat to hear the previous passage or game options again.  You can say stop to end your session and pick it back up later. To start a new adventure from the beginning, just say start over. Are you ready to get back to the Carnival?\n"
                    },
                    reprompt: {
                        ssml: "Are you ready to get back to the Carnival?",
                        displayText: "Are you ready to get back to the Carnival?"
                    }
                }
            ]
        },
        forward: {},
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-06-28T15:05:59.711Z",
        name: "Help Mid Story",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "HelpMidStoryHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.952001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            HelpNewStoryHandler: [
                {
                    name: "Help New Story",
                    outputSpeech: {
                        displayText:
                            "It looks like you need some help. Carnival of Horror is a choose your own adventure tale. Each decision you make will determine your scare. Throughout the carnival you can say repeat to hear the previous passage or game options again.  You can say stop to end your session and pick it back up later.  To start a new adventure from the beginning, just say start over. When it’s time to make a decision, you’ll hear this sound. Are you ready to get started?",
                        ssml:
                            "It looks like you need some help. Throughout the carnival you can say repeat to hear the previous passage or game options again.  You can say stop to end your session and pick it back up later. To start a new adventure from the beginning, just say start over. Are you ready to get started?"
                    },
                    reprompt: {
                        ssml: "Are you ready to get started?"
                    }
                }
            ]
        },
        forward: {},
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-06-28T14:43:15.717Z",
        name: "Help New Story",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "HelpNewStoryHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.955001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-02T18:15:03.489Z",
        name: "Hop Out oF the Car",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "HopOutOFTheCarIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.969001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["hop out", "hop out of the car", "out of the car", "get out", "hop", "car"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T18:24:36.063Z",
        name: "House of Horrors",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "HouseOfHorrorsIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.950001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["{ready for the|} house of horrors {first|}"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T16:09:19.083Z",
        name: "JumpOut",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "JumpOutIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.956001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["jump {out|}"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T20:45:10.542Z",
        name: "Kick The Doctor",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "KickTheDoctorIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.957001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["{try to|} Kick {the doctor|}"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-06T14:07:54.828Z",
        name: "Knock all of the ships down",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "KnockAllOfTheShipsDownIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.969001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["{i|we|he|she|} knocked all {of the|} ships {down|off|}"]
    },
    {
        content: {
            LaunchRequest: [
                {
                    name: "New User - Success",
                    outputSpeech: {
                        displayText:
                            "Welcome to Goosebump’s Carnival of Horrors. This is no ordinary carnival. Here you’ll find awesome rides. Exciting games of chance. And the weirdest Freak Show ever. This scary adventure is all about you. You decide what will happen. And you decide how terrifying the scares will be.  You make the choices.  If you make the right choices, you’ll escape from the spine-tingling Carnival of Horrors in time. If you make the wrong choice … BEWARE! So take a long, deep breath, cross your fingers.  Are you ready to give yourself Goosebumps?",
                        ssml:
                            'Welcome to Goosebump’s Carnival of Horrors. This is no ordinary carnival. Here you’ll find awesome rides. Exciting games of chance. And the weirdest Freak Show ever.\nThis scary adventure is all about you. You decide what will happen. And you decide how terrifying the scares will be.  You make the choices.  If you make the right choices, you’ll escape from the spine-tingling Carnival of Horrors in time. If you make the wrong choice … BEWARE!\nSo take a long,<break time="500ms"/> deep breath, cross your fingers.  Are you ready to give yourself Goosebumps?\n'
                    },
                    reprompt: {
                        ssml: "Are you ready to give yourself Goosebumps?",
                        displayText: "Are you ready to give yourself Goosebumps?"
                    }
                }
            ]
        },
        forward: {
            NoIntent: [
                {
                    type: "START",
                    intentId: "NotReadyForGoosebumpsHandler"
                }
            ],
            YesIntent: [
                {
                    type: "START",
                    intentId: "NewUserPageOnePageTwoHandler"
                },
                {
                    type: "START",
                    intentId: "PageOneAndPageTwoHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-06-28T14:19:26.520Z",
        name: "Launch Request",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "LaunchRequest",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.969001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-06T14:06:21.586Z",
        name: "Missed",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "MissIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.957001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["{I|we|he|she|} {miss|missed} {it|the ship}"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-10T13:28:10.223Z",
        name: "Mission to Mars",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "MissionToMarsIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.965001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["mission to mars", "i choose mission to mars"]
    },
    {
        content: {
            MissionToMarsPageSeventyTwoHandler: [
                {
                    outputSpeech: {
                        ssml:
                            "<!-- Page 72-->\n \nYou step up to the Mission to Mars booth. A woman in a space suit motions you inside a gate. You pass through and find yourself in the middle of a courtyard that looks just like a miniature launching site — complete with its own rocket!\n \n“Security check,” the lady says as she presses your hand onto a screen.\n \n“So how does this game work?” you ask.\n \nThe space lady points to a pyramid of five stacked bottles that look like rocket ships. Then she hands you a ball. “Take this meteor and knock all of the rockets off the platform.”\n \nThis shouldn’t be too hard, you think.\n \n“If you get them all, you can go,” she says.\n \n<!-- Page 18 -->\n \nThe space lady slowly circles you as she sizes you up from head to toe. “Hmmmm, I’ve never seen anyone win this before.”\n \nShe snaps her fingers and two enormous guards appear. They stand on each side of you while you get ready to throw. Something tells you that what Big Al said about having to survive might be true.\n \n<!-- Page 134 -->\n \nYou stretch your arm to loosen it up. If you want to escape, you know you need to do this. No pressure!\n \nYou go into your windup. Take aim. And throw.\n\nDid you knock all of the ships down or did you miss?"
                    },
                    reprompt: {
                        ssml: "Did you knock all of the ships down or did you miss?"
                    }
                }
            ]
        },
        forward: {
            KnockAllOfTheShipsDownIntent: [
                {
                    intentId: "PageFiftyThreeAndFourtyHandler"
                }
            ],
            MissIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageTwentytwoHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T19:44:56.032Z",
        name: "Page 72 and 18 and 134 - Mission to Mars",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "MissionToMarsPageSeventyTwoHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.970001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T16:59:58.606Z",
        name: "MondayWednesdsayFridaySaturday",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "MondayWednesdsayFridaySaturdayIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.963001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["Monday", "Wednesday", "Friday", "Saturday"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T15:06:48.665Z",
        name: "More Than 8",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "MoreThanEightIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.966001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: [
            "Eight",
            "Nine",
            "Ten",
            "Eleven",
            "Twelve",
            "Thirteen",
            "Fourteen",
            "Fifteen",
            "Sixteen",
            "Seventeen",
            "Eighteen",
            "Nineteen",
            "Twenty"
        ]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T14:36:59.290Z",
        name: "MountainKing",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "MountainKingIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.964001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["Mountain {King|} {way|}"]
    },
    {
        content: {
            NewUserPageOnePageTwoHandler: [
                {
                    name: "New User + Page 1 + Page 2",
                    outputSpeech: {
                        ssml:
                            "Great!  Here's how to play.  You'll be part of a story where you'll need to make decisions to find out what happens next.  I'll ask you a question when it's time for you to decide.  You can ask me to repeat something if you need to hear it again, or you can ask for help and I'll tell you about your options.  Let's get started.\n \n<!-- Page 1 -->\n \n“What do you want to do?”\n \n“I don’t know, Patty. What do you want to do?”\n \n“Not fair, Brad. I asked you first.”\n \nPatty and Brad. Your two best friends. Arguing. As usual.\n \nIt’s the last week of August. And Patty and Brad haven’t stopped fighting since your summer vacation started.\n \nPatty likes being bossy. You don’t mind, though. It’s no big deal.\n \nIt’s hard to win a fight with her anyway. You don’t know why Brad even tries. You guess it’s because he doesn’t want to look like a wimp.\n \n“There’s nothing to do. I guess I’ll just go home,” Brad says. He shoves his hands in his pockets. Then his shoulders slump and he sort of shrivels up. You guess Brad is kind of a wimp — even if he is your best friend.\n \n“You’re so boring, Brad,” Patty complains. Whenever Patty complains, her freckles really pop out. Now there are about a million of them spread across her face.\n \n“Hey! I know what we should do!” Patty suddenly bursts out.\n \n<!-- Page 2 -->\n \n“Let’s bike over to Bennet’s Field and watch them set up the carnival!”\n \n“I don’t know,” you answer. “It’s getting dark, and Mom said I have to be in by nine.”\n \n“It’s only a quick bike ride,” Brad says. “Are you some kind of wimp?”\n \nBrad calling you a wimp? You can’t believe it!\n \n“Okay. Okay,” you agree. “But if it’s as bad as last year, there won’t be much to see. Don’t you remember the main attraction?” you remind them. “The ride they called Terror Track? It turned out to be a baby choo-choo train that circled around and around and around.”\n \nIt doesn’t matter what you say. Patty’s made up her mind. You’re going to ride over to the carnival.\n \nA hot, humid breeze blows in your face as you pedal along. Patty’s in the lead. No surprise. And Brad’s puffing behind you.\n \nIt’s dark by the time you reach Bennet’s Field.\n \nYou and your friends drop your bikes in the grass and race across the moonlit field, toward the huge wooden fence that surrounds the carnival.\n \n<!-- Insert carnival sound Fx -->\n \nWhat is your favorite carnival ride? "
                    },
                    reprompt: {
                        displayText: "What is your favorite carnival ride? "
                    }
                }
            ]
        },
        forward: {
            "^((?!(StopIntent|HelpIntent|CancelIntent)).)*$": [
                {
                    type: "START",
                    intentId: "PageThreeHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-11T21:13:25.743Z",
        name: "New User and Page 1 and 2",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "NewUserPageOnePageTwoHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.964001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-06-28T14:28:12.163Z",
        name: "NoIntent",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "NoIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.965001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["no", "no thanks"]
    },
    {
        content: {
            NotReadyForGoosebumpsHandler: [
                {
                    name: "Not Ready For Goosebumps",
                    outputSpeech: {
                        displayText: "No problem, sounds you like aren't ready yet.  Come back any time.",
                        ssml: "No problem, sounds you like aren't ready yet.  Come back any time."
                    }
                }
            ]
        },
        forward: {},
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-06-28T14:46:53.258Z",
        name: "Not Ready For Goosebumps",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "NotReadyForGoosebumpsHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.969001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [
            {
                name: "number",
                type: "STENTOR.NUMBER"
            }
        ],
        createdAt: "2018-07-15T18:28:41.711Z",
        name: "NumberIntent",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "NumberIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.969001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["{-|number}"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-10T14:42:29.083Z",
        name: "One - Three - Two",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "OneThreeTwoIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.965001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["one three two", "one hundred {and|} thirty two"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T17:17:05.995Z",
        name: "Option A",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "OptionAIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.966001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["A", "Option A", "karru marri odonna loma molonu karrano", "first choice", "choice a"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T17:17:12.519Z",
        name: "Option B",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "OptionBIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.964001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["B", "option b", "choice b", "second choice", "oopah lupah dummie dupah"]
    },
    {
        content: {
            PageEightyEightAndThirtyTwoHandler: [
                {
                    name: "Page 88 and 32",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 88 -->\n \nYou head toward the Boat Trip to Nowhere. At the dock, you spot a stubby guy with long arms slouching against one of the mooring posts. In the strange light of the swamp, his skin shines with an oily, green glow. And his ears and nose are as craggy as tree bark.\n \n“Step right up,” he calls in a gravelly voice.\n \n<!-- Insert motorboat sound Fx -->]\n\nHe pulls one of the motorboats over. It’s red with a silver racing stripe! “You can do fifteen knots in these babies,” he says. “But stay away from the tree stumps.”\n \nYou watch the little man’s sharp green fingernails tearing the mooring rope apart. As soon as the boat is free, you jump in, step on the gas, and roar away from the dock.\n \n<!-- Insert boating sound Fx -->]\n\nThe wind blows hard against your face. You’re flying over the water. This is totally cool! You head for a channel that you see up ahead. Too bad you didn’t notice that sign that reads: TO BOOGER BOG.\n \n<!-- Page 32 -->\n \nYour boat glides through the channel at high speed to Booger Bog. Water sprays up into your face. But soon you have to slow down. Trees have suddenly sprung up all around you. You’re completely surrounded now by their towering trunks.\n \nIn the dark light, their limbs take on the shape of gnarled arms with blackened, bony fingers at the ends. You stare hard at the tree trunks. Could it be? Are they reaching out for you?\n \n<!-- Insert boating sound Fx -->]\n\nYou slowly weave the boat through the twisted trunks and branches. They’ve grown so thick here that you can barely pilot your boat through them.\n \n<!-- Insert tree sound Fx -->]\n\nThe trees rustle as if they’re whispering to each other. Their limbs begin to sway. As you glide carefully through the water, the leaves slap against your face. Slap. Slap. Slap.\n \nYour heart starts hammering away in your chest. This is really scary. Just how far is nowhere? you begin to wonder. \n\n<!-- Insert swipe sound Fx -->]\n\nSomething swipes at your hair!\n \nWhat was that?"
                    },
                    reprompt: {
                        ssml: "What was that?"
                    }
                }
            ]
        },
        forward: {
            "^((?!(StopIntent|HelpIntent|CancelIntent)).)*$": [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageOneOhFiveAndNinetyHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T19:08:07.552Z",
        name: "Page 88 and 32 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageEightyEightAndThirtyTwoHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.970001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageEightyFiveHandler: [
                {
                    name: "Page 85",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 85 -->\n \nThe giant hangs over you, flexing his muscles. He squints at you as if you are a bug — ready to be squashed.\n \n“Did you call me a wimp?” he thunders.\n \nYou are much too scared to answer.\n \nThe giant answers for you. “You’re right. I am a wimp!”\n \nAnd with that, he bends the bars, and you, Patty, and Brad scramble through.\n \n“Follow me,” the giant says. “I know a way out of here.”\n \n“What about the others?” you ask, pointing to the freaks in the cells that line the wall.\n \n“No problem!” Patty yells, grabbing the keys from a hook on the wall. “Here — catch!”\n \nYou quickly unlock all the doors — setting the freaks free!\n \n<!-- Page 126 -->\n \n“Yay! Our hero!” the freaks cheer as they bolt out of their cells.\n \nYou follow the giant through a side exit. And in no time, you’re leading all your new friends to your house.\n \nYou’re sure your parents won’t mind taking them in. After all, how much can an eight foot giant, a snake lady, and a three-headed man eat? Hmmmm. Better not answer that question.\n \nJust be happy that you’ve come to …\n \nThe end."
                    }
                }
            ]
        },
        forward: {},
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-06T18:23:48.624Z",
        name: "Page 85 and 126 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageEightyFiveHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.966001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageEightyFourHandler: [
                {
                    name: "Page 84",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 84 -->\n \nBig Al shoves you and your friends into a huge red tent. It seems to be set up for some kind of show. Red carpeted steps lead up to a platform, which sits under a golden arch. The arch twinkles with a thousand colored lights that spell out: FINAL CHALLENGE.\n \nTrumpets blast as people flood into the viewing area. As they march in, they clap their hands and yell, “FI-NAL. FI-NAL.”\n \nBig Al leads you up the carpeted steps. You are standing on the platform now — in front of a shimmering curtain that hangs down from the arch.\n \nThe crowd begins to chant, “SUD-DEN DEATH. SUD-DEN DEATH.”\n \n<!-- Read in prompt voice -->]\n\n What do you think that means?"
                    },
                    reprompt: {
                        ssml: " What do you think that means?"
                    }
                }
            ]
        },
        forward: {
            "^((?!(StopIntent|HelpIntent|CancelIntent)).)*$": [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageOneTwentyThreeAndTwentyFiveHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T17:52:00.831Z",
        name: "Page 84 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageEightyFourHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.968001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageEightyOneHandler: [
                {
                    name: "Page 81 Handler",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 81 -->\n \n“You’re lying!” you yell. “You are a robot.”\n \nYou quickly reach up with both hands and tug at his head. His sharp jaws slash at you. But you’re fast. You hold on firmly and pull!\n \nOh, no! He really is a monster. And he’s not happy.\n \nYou know you’re dead meat, but you have to try one more time. Just to make sure. You give his head one more tug. He laughs. Then he gives your head a tug.\n \nSorry. You were doing so well. But now you’ve gone and lost your head. The only way you’ll be able to face the challenge of the Carnival of Horrors now is to begin another day. At least then — you’ll have a head start.\n \nThe end."
                    }
                }
            ]
        },
        forward: {},
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-06T13:31:23.940Z",
        name: "Page 81 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageEightyOneHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.978001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageEightySevenHandler: [
                {
                    name: "Page 87 Handler",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 87 -->\n \nThe man doesn't move. \"We wanted to look around. That’s all. But we’ll leave. Right now.”\n \nHis eyes stare into yours. He clamps both hands down on your shoulders and says, “You’re not going anywhere!”\n \n<!-- Page 4 -->\n \n“Wh-what do you mean?” Brad asks, trembling all over.\n \n“I just had an idea. A great idea,” the man replies. “I want you kids to stay and try out the rides before the grand opening tomorrow.”\n \nPatty’s eyes open wide. “Cool!” she says.\n \n“Are you sure it’s all right with the owner?” you ask.\n \n“I’m Big Al, the manager. And what I say around here goes.”\n \nBig Al digs around in his checkered jacket and pulls out three maps. He hands one to each of you.\n \n“Study them carefully,” he says. “If you have any questions, ask them now.”\n\nAsk Al a question. "
                    },
                    reprompt: {
                        ssml: "Ask Al a question. "
                    }
                }
            ]
        },
        forward: {
            "^((?!(StopIntent|HelpIntent|CancelIntent)).)*$": [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageFourHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-06-28T19:18:09.563Z",
        name: "Page 87 & 4 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageEightySevenHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714152.972001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageEightySixHandler: [
                {
                    name: "Page 86",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 86 -->\n \n“I don’t know,” you say. “I don’t think we should take any more risks. Especially not in this crazy carnival.”\n \n“Don’t you trust me?” Patty demands. Her eyes flash angrily.\n \nYou glance at Brad. He stares at the ground.\n \n“I just have a bad feeling about this, Patty. Okay?”\n \nBut Patty doesn’t answer. She throws her shoulders back and stands up taller. And taller. And taller.\n \nYou gasp! Patty is growing! She’s nearly ten feet tall!\n \nShe reaches out a long arm and grabs you by the wrist. Her nails dig deep into your skin.\n \nYou can’t move.\n \n<!-- Insert scream sound Fx -->]\n\nYou scream as Patty continues to change. Her skin turns green and lumpy. Horns sprout from her head. And her teeth grow into sharp fangs.\n \nYou remember the horrible monsters on the walls of the slide. Patty has turned into one of them!\n \n“Let me go. Please!” you plead.\n \n“Too bad you didn’t trust me,” she growls. “I can’t have you ruining my plans.” Her nails sink deeper into your flesh.\n \n“Ha-ha-ha!” she cackles. Then she wraps her slimy mouth around your arm and bites down. Hard!\n \nThe end."
                    }
                }
            ]
        },
        forward: {},
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T17:45:59.392Z",
        name: "Page 86 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageEightySixHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714153.915001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageEightyTwoHandler: [
                {
                    name: "Page 82",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 82 -->\n \n“Oooopah lupah dummie dupah.” You say the magic words and wait for the dummy to spring to life.\n \nAnd you wait.\n \nAnd you wait.\n \nThe dummy remains the same.\n \nBut something strange is happening to you. What are those feathers sprouting out of your skin? And what’s happening to your feet? Are those claws you see growing out of them?\n \nIs it possible that the magic words are turning you — \n\n<!-- Insert chicken sound Fx -->]\n\nCLUCK — into a — CLUCK — chicken?\n \nThat’s eggs-actly what’s happening.\n\nBrad was wrong. Very wrong!\n \nWell, you laid an egg this time. Let’s hope you won’t be too chicken to open this again and try once more to escape from the Carnival of Horrors.\n \nThe end."
                    }
                }
            ]
        },
        forward: {},
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T17:19:57.939Z",
        name: "Page 82 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageEightyTwoHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714153.918001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageElevenAndThirtyFiveAndThirteenHandler: [
                {
                    name: "Page 11 and 35 and 13",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 11 -->\n \nYou’ve decided to help the freaks. As you race down the midway, you spot Brad and Patty.\n \n“Listen, guys,” you tell them, lowering your voice. “We’ve got a problem. A big problem.”\n \nYou take a deep breath and tell them all about Madame Zeno and the blue card.\n \n“So,” you finish saying, “somebody might need our help in the back of the Freak Show.”\n \n“What’s a freak show?” Brad asks nervously.\n \n“Remember the poster we saw when we came in? The one with the three-headed man and the lady with the snake body?” you remind him.\n \nBrad bites down on his lip. “Are they really real?”\n \n“Sure they’re real,” Patty chimes in.\n \n“I don’t know,” Brad says. “It sounds kind of creepy.”\n \n“Well, Madame Zeno said this was my fate. I’m going to help them — whatever they are. Are you guys in?”\n \n“You bet,” Patty answers, her eyes shining with excitement.\n \n“Okay, okay. I’ll go,” Brad mumbles.\n \n“Then let’s hurry!” you exclaim.\n \n<!--Page 35 -->\n \nFive minutes later, the three of you are sneaking down a dark alley. Brad is so frightened, he’s practically walking on top of you.\n \nThe alley is littered with large cardboard boxes and overflowing trash cans. And it smells like dead fish.\n \n“Hey! Quit stepping on my shoe,” you say to Brad.\n \n“I’m not stepping on your shoe,” he shoots back. “I’m not anywhere near your shoe.”\n \nYou glance down. And nearly scream.\n \nBrad’s right. He’s not stepping on you. But about a dozen rats are.\n \n<!--Insert rat sound fx -->\n \nYou shake your foot wildly. The rats scurry off.\n \nBrad catches sight of the rats and tries to bolt.\n \nYou and Patty quickly pull him back.\n \n“Hey! Look!” Patty says, pointing up ahead. “A door!”\n \nOn the door you see a big sign that reads KEEP OUT, so … you go in.\n \n<!--Page 13 -->\n \nThe room is dark, but all around you, you hear hushed moans. “Help us! Help us!”\n \n“We’re in a prison,” Patty says. “And look at the prisoners! They’re weird!”\n \nPatty is right. As your eyes grow accustomed to the darkness, you see cell after cell. Each one holds a strange-looking prisoner. There’s a lady with a snake’s body, and a monster with three heads. A giant nearly bursting out of his cage. And a man who looks like he’s part plant.\n \n“We’re the freakssss,” the Snake Lady says. “Every night when the sssshow endssss, the masssster lockssss ussss up.”\n \n“The master? You mean Big Al is —” you start to say.\n \n“You must help us!” the giant interrupts.\n \n“Sssssssh,” the Snake Lady says. “The master’sssss coming — you musssstn’t be here! Go! That way!” She points to a door down the hall.\n \nDo you escape through the door down the hall or stay and talk to Big Al?"
                    },
                    reprompt: {
                        ssml: "Do you escape through the door down the hall or stay and talk to Big Al?"
                    }
                }
            ]
        },
        forward: {
            TalkToBigAlIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageSixtyTwoHandler"
                }
            ],
            EscapeThroughTheDoorIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageFourtyEightAndSixtyHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T19:17:36.496Z",
        name: "Page 11 and 35 and 13",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageElevenAndThirtyFiveAndThirteenHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714153.915001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageFifteenHandler: [
                {
                    name: "Page 15",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 15 -->\n \n<!-- Insert spinning wheel sound Fx -->  \n\nRound and round the wheel spins. It finally lands on number 15. NO CHANCE.\n \nNo chance. Does that mean what you think it means?\n \nNo chance at all.\n \nZip.\n \nZero.\n \nNothing.\n \nNada.\n \nNegatory.\n \nYes. That’s exactly what it means. You have met …\n \nThe end."
                    }
                }
            ]
        },
        forward: {},
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-09T19:46:11.216Z",
        name: "Page 15 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageFifteenHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714153.916001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageFiftyFourAndEightyThreeHandler: [
                {
                    name: "Page 54 and 83 Handler",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 54 -->\n \nYour heart begins to race as the car speeds out of control. You tear through an eerie forest, speed past more cottages — but still you don’t see a way out.\n \nAnd then it comes into view — a service exit!\n \nAll you have to do is stop the car, jump out, and scramble through the fence, and you’ll be free.\n \nFive minutes to midnight!\n \n“Oh, no!” Patty screams. “Quick, turn left! Don’t stop!”\n \n<!-- Page 83 -->\n \nYou squint hard at the road ahead of you — and see why Patty wants you to turn. There they are — the people in the old-fashioned clothes. Only they don’t look the same.\n \nSome have green flesh. Some are deathly white. Their rotting skin hangs from their bones.\n \nAnd they’re all reaching out. Reaching out for you!\n \n“Turn! Turn!” Patty yells.\n \nYou spin the wheel sharply to the left to avoid them. But you can’t dodge the ghostly creature that’s rising above you. He’s ten feet tall — with arms so long that they scrape the ground. His mouth gapes open to reveal hundreds of blackened, rotting teeth.\n \nHe swoops down at you. You turn the steering wheel hard to the right. Too hard — it comes off in your hands!\n \n“Jump!” you cry. “Jump and run! Run!”\n \nThe three of you leap out of the moving car. But are you fast enough? That depends on how good your reflexes are.\n \nWhen I say go, count how many claps you can get before I say stop. Go. Stop.\n \nHow many claps did you get?"
                    },
                    reprompt: {
                        ssml: "How many claps did you get?"
                    }
                }
            ]
        },
        forward: {
            "ClapsNumberIntent|NumberIntent": [
                {
                    type: "START",
                    intentId: "PageOneTwentySevenHandler",
                    slotMatch: {
                        name: "number",
                        value: 8,
                        operation: "<"
                    }
                },
                {
                    type: "START",
                    intentId: "PageSeventyThreeHandler",
                    slotMatch: {
                        name: "number",
                        value: 8,
                        operation: ">="
                    }
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T14:48:57.641Z",
        name: "Page 54 and 83 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageFiftyFourAndEightyThreeHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714153.917001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageFiftyNineHandler: [
                {
                    outputSpeech: {
                        ssml:
                            "<!-- Page 59 -->\n \nBlue is your favorite color. You turn the blue card over.\n \nThere is a message: Help us! You are our only hope. Hurry to the back door of the freak show. Signed, The Freaks.\n \n“What does this mean?” you ask Madame Zeno. She stares deep into your eyes. Her lips tremble. She leans forward. She’s about to speak.\n \nAnd then the lights go out — \n\n<!-- Insert scream sound fx --> \n\nand a blood-curdling scream rips through the dark!\n \nYou start to bolt for the door when a dim light suddenly flickers. You stare across the table. Madame Zeno is gone!\n \nYou reach out to take the card. And it bursts into red-hot flames! In seconds, the entire tent fills with thick smoke. Flames shoot across the floor. You run for the door.\n \nOutside, you gulp the fresh air. Whew! You made it.\n \nYou glance back. No smoke. No fire. No tent! Everything has disappeared!\n \nDo you help the freaks?"
                    },
                    reprompt: {
                        ssml: "What should you do now, do you help the freaks??",
                        displayText: "What should you do now, do you help the freaks??"
                    }
                }
            ]
        },
        forward: {
            NoIntent: [
                {
                    type: "START",
                    intentId: "PageOneThirteenAndSixteenHandler"
                }
            ],
            YesIntent: [
                {
                    type: "START",
                    intentId: "PageElevenAndThirtyFiveAndThirteenHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T18:53:02.993Z",
        name: "Page 59",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageFiftyNineHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714153.916001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageFiftyOneHandler: [
                {
                    name: "Page 51",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 51 -->\n \nYou can’t take on both monsters, so you decide to wait until one of them leaves the room.\n \n<!-- Insert struggle sound fx -->\n\nYou grab hold of Dr. Stone’s hand. He’s a lot stronger than he looks. With one small tug, he pulls you free of the web.\n \nThen he turns to the monsters. “Okay,” he barks. “Adjust the net. It’s time to practice spiking.”\n \nSpiking? What does he mean by that?\n \nThe monsters leap up. They rub their hands together in evil delight. Then they untie the net and head to the back of the room, where two huge poles rest on the floor.\n \nYou close your eyes — and hope that when you open them, you’ll see that this was all a dream. A really bad dream.\n\n<!-- Insert volleyball sound fx -->\n \nBut when you open your eyes, you know it’s not a dream. No — it’s a volleyball game. The net has been tied to the poles — and guess what position you play? That’s right. You’re the ball! Watch out for those two-handed spikes! They can be pretty painful!\n \nThe end."
                    }
                }
            ]
        },
        forward: {},
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-06T18:53:30.246Z",
        name: "Page 51 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageFiftyOneHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714153.916001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageFiftySevenAndOneThirtyFiveHandler: [
                {
                    name: "Page 57 and 135",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 57 -->\n \nYou open the blue door and peer through. You’re staring down a long dark passageway. At least you think it’s long. It’s difficult to tell. It’s pitch-black. You don’t know what to do.\n \n“Maybe I should have picked the other door,” you say to yourself. “I’m getting out of here!”\n \nBut the blue door has locked behind you! Now you’re sure you made the wrong choice. But there’s nowhere to go but forward.\n \nYour knees begin to tremble as you inch your way down the dark hallway.\n \nThe passage ends in a bright burst of light. And in front of you, a tall purple mountain rises hundreds of feet into the air.\n \nYou breathe out a long sigh of relief. You’re out of the dark!\n \nYou study the mountain. It looks so real! But cut into its side, you spot a doorway. Above it a brightly painted sign reads: DOOM SLIDE. WILL YOU BE THE ONE TO SLIDE FOREVER?\n \n<!-- Page 135 -->\n \n<!-- Insert door open sound fx --> \n\nYou open the door and climb a steep ramp that curves around and around. It’s cold and dark inside. Halfway up the ramp, you stop. There’s another sign: WARNING! — YOU MAY BE THE ONE TO SLIDE TO YOUR DOOM!\n \nYou continue up the ramp. You finally make it to the top, and find yourself standing on a wide, dimly lit platform. A row of long, curving slides stretches out before you. The slides are numbered from one to ten.\n \nYou think hard. The Doom Slide. You know you’ve heard about it before. But where? Where was it?\n \nAnd then you remember! It was in a GOOSEBUMPS book you read! One Day at HorrorLand.\n \nNow you know you’re in big trouble. Because you remember all about the Doom Slide from the book. You remember that if you pick the wrong slide, you’ll spend the rest of your life sliding and sliding — forever!\n \nPick one and hope it’s not the Doom Slide!\n \nWhich number between 1 and 10 do you choose?"
                    },
                    reprompt: {
                        ssml: "Which number between 1 and 10 do you choose?"
                    }
                }
            ]
        },
        forward: {
            "SlideNumberIntent|NumberIntent": [
                {
                    type: "START",
                    intentId: "PageOneTwentyOneAndSixtyThreeHandler",
                    slotMatch: {
                        name: "number",
                        value: [1, 4, 5],
                        operation: "=="
                    }
                },
                {
                    type: "START",
                    intentId: "PageNinetyFiveHandler",
                    slotMatch: {
                        name: "number",
                        value: [2, 7, 9],
                        operation: "=="
                    }
                },
                {
                    type: "START",
                    intentId: "PageSixtyEightHandler",
                    slotMatch: {
                        name: "number",
                        value: [3, 6, 8, 10],
                        operation: "=="
                    }
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-02T20:00:57.475Z",
        name: "Page 57 and 135 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageFiftySevenAndOneThirtyFiveHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714153.921001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: ["shortcut doom slide"]
    },
    {
        content: {
            PageFiftySixHandler: [
                {
                    name: "Page 56",
                    outputSpeech: {
                        ssml:
                            "<!-- Insert water sound fx -->\n\nYou leap out of the boat. The putrid brown water splashes into your mouth. Gross!\n \nYou swim a few strokes and suddenly find your knees scraping the bottom of the bog. The water here is less than a foot deep. Unbelievable! You were practically inches away from safety the entire time!\n \nSlogging through the brown foam, you wade to shore. Your clothes are dripping wet and smell like a sewer. Well, look at the bright side, you remind yourself. At least you didn’t go down with your boat.\n \nBut your troubles aren’t over yet. You’re standing in a dank, eerie forest that surrounds the lake. \n\n<!-- Insert echo sound fx --> \n\nCreepy screeches echo through the night mist. And you’re totally lost.\n \nThe wind starts to blow. Shivering, you wrap your arms around your shoulders and wonder where your friends are and what they are doing.\n \n<!-- Insert bat sound fx --> \n\nThen — POW! Something black and furry swoops down at you! You duck your head, but it comes at you again and again.\n \nWhat could it be!?"
                    },
                    reprompt: {
                        ssml: "What could it be!?"
                    }
                }
            ]
        },
        forward: {
            "^((?!(StopIntent|HelpIntent|CancelIntent)).)*$": [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageThirtySevenAndNinetyThreeHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T19:37:32.746Z",
        name: "Page 56 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageFiftySixHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714153.920001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageFiftyThreeAndFourtyHandler: [
                {
                    outputSpeech: {
                        ssml:
                            '<!-- Page 53 -->\n\n<!-- Insert battle sound fx -->\n\nYou hit them all off the platform! Boy, oh, boy! What a relief.\n \nYou jump up and down. “I won! I won!"\n \nThe two guards grab you and shove you into the space chamber. The door slams shut behind you.\n \n“What are you doing?” you yell. “I won!”\n \nIt’s a clear, narrow tube that rises farther up than you can see.\n \nYou press the chamber-door release, but it’s stuck.\n \nYou try again. It doesn’t budge.\n \nMaybe it’s locked from the outside.\n \n“Hey! I can’t get out!” you yell to the guards. But they simply wave.\n \n“Hey, let me out!” Now you’re mad. “Let me out!”\n \nAll at once the room starts to shake and rattle.\n\n<!-- Insert rocket sound fx --> \n\n RRRRRRRR. The thrust of powerful rocket engines echoes in your ears. It sounds as if you’re being launched into space. But that’s impossible, isn’t it?\n \n<!-- Page 40 -->\n \n<!-- Insert launch sound fx --> \n \n“Five, four, three, two, one. We have liftoff,” a mechanical voice announces.\n \nTo your horror, the rocket blasts off! You’re slammed against the side of the capsule with hurricane force. Seconds later, you’ve left Earth’s atmosphere.\n \nA recorded message comes on: “Congratulations. You won Mission to Mars! Your prize is you get to go—to Mars. We’ll be monitoring your trip and will bring you back in approximately twenty years — with a plus or minus ten-year margin of error in case something goes wrong. But do not worry. Nothing can go wrong … go wrong … go wrong.”\n \nThe end.'
                    }
                }
            ]
        },
        forward: {},
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-06T14:03:59.443Z",
        name: "Page 53 and 40",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageFiftyThreeAndFourtyHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714153.916001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageFiftyTwoAndTwentyFourHandler: [
                {
                    name: "Page 52 and 24",
                    outputSpeech: {
                        ssml:
                            "<!-_ Page 52 -->\n \n<!-- Insert clock strike sound fx --> \n\nJust as the clock strikes twelve, the train enters a tunnel.\n \nYou hold your breath, wondering what you’ll see when you reach the other end.\n\n<!-- Insert chug sound fx --> \n \nChug. Chug. Chug.\n \nThe choo-choo slowly pulls out of the tunnel — and you are surrounded by carnival workers — everywhere!\n \n<!-- Page 24 -->\n \nCarnival workers. The carnival workers who set up the same rinky-dink carnival you go to every summer.\n \nYou can’t believe your eyes. You must be seeing things!\n \nPatty tries to say something smart, but the only thing she manages is “Huh?”\n \n“Hey, kids!” a worker yells at you. “Get away from that ride. The carnival doesn’t start till tomorrow night.”\n \nYou gaze around in wonder at the faded games, the baby rides, the tacky food stands. For the first time in your life, it all looks great!\n \n“We’ll be there!” you shout as you head for your bikes. “This is the greatest carnival I’ve ever seen!”\n \nThe end."
                    }
                }
            ]
        },
        forward: {},
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T15:36:29.249Z",
        name: "Page 52 and 24 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageFiftyTwoAndTwentyFourHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714153.917001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageFiveAndOneTwentySevenHandlerIntent: [
                {
                    name: "Page 5 and 127",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 5 -->\n \n“Come on, run!” you yell to Patty and Brad as you spin around. “There’s got to be another way out!”\n \n<!-- Insert whistle sound fx --> \n\nBig Al blows a whistle. Its shrill blast hurts your ears.\n\n<!-- Insert whistle sound fx --> \n\n He blows it again and, suddenly, dozens and dozens of carnival people appear out of nowhere. But they don’t look the way they did before.\n \nSome have green flesh. Some are deathly white. Their rotting skin hangs from their bones. Above their sunken cheekbones, their eyes glow an eerie yellow.\n \nYou watch in horror as more and more of them appear.\n \nWhat should you do? Your legs won’t budge. You can’t think clearly. You’re terrified! You stand there — frozen — in a trance.\n \nBut Brad breaks the spell when he screams out, “They’re ghosts! That’s why they’re wearing those old-fashioned clothes. They’re dead!”\n \n“Watch out! Over there!” Patty yells. “That — that ghost … It’s coming right at us. Run!”\n \n<!-- Page 127 -->\n \n<!-- Insert chase sound fx -->\n\nYou’re not fast enough to get away from the ghost. You’re running now, but the ghost swoops down in front of you. You plow into him — and pass right through him!\n \nThe carnival people are swarming after you. They don’t want you to leave the carnival.\n \n“Hurry!” you yell to your friends — only three minutes to midnight! You dash off in one direction, then another. The carnival people are approaching from every which way. They carry torches with flames that leap high in the air.\n \nYou steal a glance at your watch — 11:58.\n \n“We can’t let them catch us!” you scream. “Let’s hide!”\n \nBut where can you hide? Up ahead you see a gigantic cannon. All three of you could fit easily in there.\n \nYou also spot a baby ride — the baby choo-choo train — maybe you could squeeze into that.  Quick! Pick one — and hope for the best.\n \nDo you choose the cannon or the choo-choo?"
                    },
                    reprompt: {
                        ssml: "The cannon or the choo-choo. Which do you choose?"
                    }
                }
            ]
        },
        forward: {
            ChooChooIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageOneTwentyEightAndSeventyHandler"
                }
            ],
            CannonIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageOneThirtyAndOneOhOneHandlerI"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T17:10:32.084Z",
        name: "Page 5 and 127 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageFiveAndOneTwentySevenHandlerIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714153.929001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageFortyFiveAndNinetyEightHandler: [
                {
                    name: "Page 45 and 98 ",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 45 -->\n \nThe giant looms over you. He’s as tall as the tree outside your house — and a lot meaner. His huge lips part and he says, “You hurt my feelings.”\n \nThen he begins to cry.\n\n<!-- insert crying sound fx -->\n \n“I am not a wimp. I am not,” he says between huge sobs.\n \nHe sure looks like a wimp.\n \n<!-- Page 98 -->\n \nWell, looks can fool you. He is not a wimp.\n \nAnd he’s mad — at you.\n \nIn the next moment, he scoops you up and hurls you at the cell wall. His throw is so forceful, you smash right through the wall and soar out of the carnival grounds.\n \nCongratulations! You escaped the Carnival of Horrors — but not in one piece.\n \nThe end."
                    }
                }
            ]
        },
        forward: {},
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-06T18:34:45.420Z",
        name: "Page 45 and 98 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageFortyFiveAndNinetyEightHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714153.917001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageFortyNineAndFiftyHandler: [
                {
                    name: "Page 49 and 50",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 49 -->\n\n<!-- Insert wheel spin sound fx --> \n\nThe wheel stops on FREE SPIN. You are ready to try again. But the dumb parrot flies over and latches onto your shoulder.\n \n“Ouch! That hurts,” you cry.\n \n“Free spin, free spin, you’re going on a free spin.”\n \n“Turn me loose,” you command. When you swivel your head to glare at the bird, a scream freezes in your throat. The parrot has ballooned into an enormous vulture. His black, beady eyes pierce right through you. He digs his razor-sharp claws deeper into your shoulder.\n \nRun! — your every survival instinct shouts. But the bird of prey has other ideas. One of them is dinner — with you as the main course.\n \n<!-- Insert struggle sound fx --> \n\nThe big bird snatches you by the back of your shirt as if you were a rag doll. Kicking and screaming and using every defensive move you learned from karate class, you struggle for your life. But it’s no use. With a jerk he lifts you off the ground.\n \nAnd suddenly you have a frightening view of the carnival from twenty feet … thirty feet … fifty feet up.\n \n<!-- Page 50 -->\n \n<!-- Insert heartbeat sound fx --> \n\nThummp, thump, thump. Your heart bangs loudly inside your chest. What kind of carnival is this, you wonder, where a free spin is more like a death sentence?\n \nYou circle a green clump of treetops. You’re really dizzy now. You want to close your eyes. But you know it’s not a good idea — since you’re flying fifty feet high without a plane or a parachute.\n \nAs you circle closer to the treetops, you are met with a horrifying view. Five baby vultures in a nest, five very hungry babies, with mouths gaping wide open.\n \nThe end is near. You are going to wind up as a take-home dinner. Unless you can somehow force the vulture to let you go. Frantically, you reach into your pockets!\n \nYou remember something from earlier that might help, what is it?"
                    },
                    reprompt: {
                        ssml: "You remember something from earlier that might help, what is it?"
                    }
                }
            ]
        },
        forward: {
            "^((?!(StopIntent|HelpIntent|CancelIntent)).)*$": [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageSeventySixHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-06T18:49:00.869Z",
        name: "Page 49 and 50 WITH BAR Handler ",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageFortyNineAndFiftyHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714153.924001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageFortyNineAndFiftyWITHOUTBARHandler: [
                {
                    name: "Page 49 and 50",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 49 -->\n\n<!-- Insert wheel spin sound fx --> \n \nThe wheel stops on FREE SPIN. You are ready to try again. But the dumb parrot flies over and latches onto your shoulder.\n \n“Ouch! That hurts,” you cry.\n \n“Free spin, free spin, you’re going on a free spin.”\n \n“Turn me loose,” you command. When you swivel your head to glare at the bird, a scream freezes in your throat. The parrot has ballooned into an enormous vulture. His black, beady eyes pierce right through you. He digs his razor-sharp claws deeper into your shoulder.\n \nRun! — your every survival instinct shouts. But the bird of prey has other ideas. One of them is dinner — with you as the main course.\n \n<!-- Insert struggle sound fx --> \n\nThe big bird snatches you by the back of your shirt as if you were a rag doll. Kicking and screaming and using every defensive move you learned from karate class, you struggle for your life. But it’s no use. With a jerk he lifts you off the ground.\n \nAnd suddenly you have a frightening view of the carnival from twenty feet … thirty feet … fifty feet up.\n \n<!-- Page 50 -->\n \n<!-- Insert heartbeat sound fx --> \n\nThummp, thump, thump. Your heart bangs loudly inside your chest. What kind of carnival is this, you wonder, where a free spin is more like a death sentence?\n \nYou circle a green clump of treetops. You’re really dizzy now. You want to close your eyes. But you know it’s not a good idea — since you’re flying fifty feet high without a plane or a parachute.\n \nAs you circle closer to the treetops, you are met with a horrifying view. Five baby vultures in a nest, five very hungry babies, with mouths gaping wide open.\n \nThe end is near. You are going to wind up as a take-home dinner. Unless you can somehow force the vulture to let you go. Tell the vulture why it should let you go."
                    },
                    reprompt: {
                        ssml: " Tell the vulture why it should let you go."
                    }
                }
            ]
        },
        forward: {
            "^((?!(StopIntent|HelpIntent|CancelIntent)).)*$": [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageOneFifteenHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-09T19:20:50.297Z",
        name: "Page 49 and 50 WITHOUT BAR Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageFortyNineAndFiftyWITHOUTBARHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714153.925001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageFortySixHandler: [
                {
                    name: "Page 46",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 46 -->\nYou’re falling … falling … everything passes as if you’re dropping in slow motion. Is this …\nthe end?\nYes.\n"
                    }
                }
            ]
        },
        forward: {},
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T18:02:34.627Z",
        name: "Page 46 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageFortySixHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714153.925001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageFourHandler: [
                {
                    name: "Page 4 Handler",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 4 -->\n\nYour eyes fall upon the map but when you gaze up, Big Al is gone. He’s vanished!\n \n“A whole carnival to ourselves!” Patty exclaims. “Where should we start?”\n \nYou stare down at your map once again. You notice that the carnival is split in half. On one side are the rides. Tons of them. On the other side is the midway, packed with games of chance and the Freak Show.\n \nYou can go to the midway or the rides. Which do you checkout first?"
                    },
                    reprompt: {
                        ssml: "The midway or the rides. Which do you check out first?"
                    }
                }
            ]
        },
        forward: {
            TheRidesIntent: [
                {
                    type: "START",
                    intentId: "PagethirtyfourAndfourtysevenHandler"
                }
            ],
            CheckoutMidwayIntent: [
                {
                    type: "START",
                    intentId: "PageseventysevenAndseventyeightHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-06-28T19:21:28.002Z",
        name: "Page 4 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageFourHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714153.926001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageFourteenAndFortyOneHandler: [
                {
                    outputSpeech: {
                        ssml:
                            "<!-- Page 14 -->\n \nYou reach out slowly and touch the red card.\n \nTo your amazement, a 3-D heart magically appears and rises from the flat surface. Then it starts to beat! \n\n<!-- Insert beat sound Fx --> \n\nTha-dump, tha-dump. It must be some fancy optical illusion. You lean closer to figure out the trick.\n \n“Yowwwww!” you screech and jerk back to avoid the warm red liquid that nearly squirts in your eye. Is it blood? It looks like blood. “Wow! Cool effect,” you say. “How did you do it?”\n \n“Turn over the card,” Madame Zeno orders. “Do it now!”\n \nMadame Zeno really gets into her act. Doesn’t she know this is just a game? you think. But you do as you’re told.\n \nBig deal. No weird pictures. No hidden fortunes. All you see are the numbers 1, 3, 2 shimmering in gold script against a midnight background. “What does it mean?” you ask.\n \n“You will know when the time is right,” the fortune-teller whispers. Her voice is so low, you can barely hear her. “It could save your life!”\n \n<!-- Page 41 -->\n \n“What do you mean the magic number could save my life?” you ask Madame Zeno. But the fortune-teller doesn’t answer. She stares off into space. She seems to have fallen into a deep trance.\n \nYou don’t really believe her — these fortune-tellers are all fakes, but you memorize the number anyway. 1–3–2, 1–3–2. I picked red instead of blue, you chant to help you remember.\n \nMadame Zeno puts the card back in the deck. She closes her eyes and waves you away with her jeweled hand.\n \nYou guess the fortune-telling is over, so you leave the tent to search for Patty and Brad.\n \nYou squint under the bright lights of the midway, scanning all the game booths. But you can’t find them.\n \nYou’re trying to figure out which way to go when you spot Big Al coming toward you. He’s not alone. He’s leading a large group of people. As they come closer, you hear that they are chanting something. What is it?\n \n“PLAY OR PAY. PLAY OR PAY.”\n \n<!-- Page 16 -->\n \nHi!” you say to Big Al. “Who are all those people?”\n \nHe doesn’t really answer your question.\n \n“Welcome to the Carnival of Horrors,” he says. “You must play or pay. We have many games on our midway. You must play two.” He practically spits the word must out. “If you succeed, you can win prizes. But if you lose, you pay with your life!”\n \nBoy, he’s really laying it on thick, you think. But it’s a pretty cool gimmick. “Okay, I’ll play a game. Then I’ve got to go home.”\n \n“No one goes home,” Big Al says, “until they play. You must play two games. And survive.”\n \n“Okay. Okay,” you mutter to yourself.\n \nYou glance around the midway at the two closest games. Mission to Mars and the Wheel of Chance. You have to pick one to start, or you’ll never get out of here.\n \nMission to Mars or the Wheel of Chance?"
                    },
                    reprompt: {
                        ssml: "Mission to Mars or the Wheel of Chance, Which do you choose?"
                    }
                }
            ]
        },
        forward: {
            MissionToMarsIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "MissionToMarsPageSeventyTwoHandler"
                }
            ],
            WheelOfChanceIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "WheelOfChancePageEightHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T18:52:37.745Z",
        name: "Page 14 and 41 and 16",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageFourteenAndFortyOneHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714153.923001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageFourtyEightAndSixtyHandler: [
                {
                    name: "Page 48 and 60",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 48 -->\n \n“Come on!” Patty cries. “Come on!”\n \nThen, without another word, she races off. You and Brad dash after her.\n \nI hope Patty knows what she’s doing, you think as you try to catch up. Because right now, it doesn’t look that way.\n \nPatty leads you through a maze of underground passageways. Then, just as you’re about to yell, “Stop!” — she does. And you find yourself standing outside, in front of a barbed-wire fence!\n \nUp ahead, you spot an opening.\n \n“Let’s go in!” Patty says.\n\n<!-- Insert fence sound fx -->\n \nThe three of you creep through the fence and trudge through some tall, wet grass. You gaze around. It’s way too dark to see.\n \nBut you can hear perfectly. And the sounds that reach your ears make your skin crawl.\n \n<!-- insert sliterhing sound fx -->\n\nSlithering. You definitely hear slithering.\n \nAnd hissing.\n \nYou want to leave. You spin around, but you can’t find the opening in the fence! You do see something else. A sign!\n \n<!-- Page 60 -->\n \n“There’s a sign!” you call out to Patty and Brad. “Let’s see what it says.”\n \nThe three of you race through the wet grass. Your socks are drenched. And your sneakers squeak as you run. But that’s not the sound that’s sending chills down your spine.\n \n<!-- insert squeaks and hiss sound fx -->\n\nIt’s the hissing. It’s growing louder.\n \n“I’m not sure I want to read that sign,” you call out to Patty and Brad.\n \n“I know what you mean!” Patty shouts back. “I have a feeling we’re not going to like what it says.”\n \nAnd you don’t. You reach the sign and read it aloud. “Reptile Petting Zoo! Whoever heard of a Reptile Petting Zoo! What kind of carnival is this anyway?”\n \n“This carnival is e-evil,” Brad stammers.\n \nYou’re about to agree when you notice the grass in front of you is swaying. Something is slithering through it. Something big. And then it comes into view.\n \n“Snake!” Brad cries.\n \nWhich way do you run - left or right?"
                    },
                    reprompt: {
                        ssml: "Do you run left or right?"
                    }
                }
            ]
        },
        forward: {
            TurnRightIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageTwelveHandler"
                }
            ],
            TurnLeftIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageOneTwentyFiveAndFourtyThreeHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T17:28:16.202Z",
        name: "Page 48 and 60 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageFourtyEightAndSixtyHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714153.924001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageFourtyFourHandler: [
                {
                    name: "Page 44",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 44 -->\n \n<!-- insert wheel spin sound fx -->\n\nYou’re spinning round and round. Everything is a blur. You can’t see, but you hear the crowd chanting, “FI-NAL! FI-NAL! FI-NAL!”\n \nAnd then the wheel stops.\n \nA huge gasp escapes from the audience.\n \nDid you win or lose?\n \nNeither. You stopped on SPIN AGAIN.\n \nBig Al approaches the wheel.\n \nHe gives the wheel — with you on it — a hard turn. Where will it stop?\n \nGuess a number between 1 and 3!"
                    },
                    reprompt: {
                        ssml: "Guess a number between 1 and 3!"
                    }
                }
            ]
        },
        forward: {
            "SlideNumberIntent|NumberIntent": [
                {
                    type: "START",
                    intentId: "PageFourtyFourHandler",
                    slotMatch: {
                        name: "number",
                        value: 1,
                        operation: "=="
                    }
                },
                {
                    type: "START",
                    intentId: "PageSeventyFourAndOneThirtyOneAndOneSixteenHandler",
                    slotMatch: {
                        name: "number",
                        value: 2,
                        operation: "=="
                    }
                },
                {
                    type: "START",
                    intentId: "PageSeventyThreeAndOneThirtyOneAndOneSixteenWITHOUTBLOODHandler",
                    slotMatch: {
                        name: "number",
                        value: 2,
                        operation: "=="
                    }
                },
                {
                    type: "START",
                    intentId: "PageOneTwentyFourAndOneTwelveHandler",
                    slotMatch: {
                        name: "number",
                        value: 3,
                        operation: "=="
                    }
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T16:59:04.107Z",
        name: "Page 44 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageFourtyFourHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714153.926001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageNineteenHandler: [
                {
                    name: "Page 19",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 19 -->\n \n<!-- Insert spinning wheel sound Fx --> \n\nYou land on number 19.\n \n“Double or nothing. Double or nothing,” two voices behind you echo.\n \nYou whirl around — and gasp! It’s a man with two heads.\n \n“Congratulations. You win ten points,” one head says to you. “Quit while you’re ahead!”\n \n“Ahead, get it? A head!” the other head adds, laughing hysterically.\n \n“Shut up,” head number one says.\n \n“You shut up,” head number two shoots back. “Ten points is nothing. You better spin again. And this time it’s double or nothing. You get double the points wherever you land.”\n \nYou’re not sure which head to listen to, do you want to spin again or quit while you are ahead?"
                    },
                    reprompt: {
                        ssml: "do you want to spin again or quit while you are ahead?"
                    }
                }
            ]
        },
        forward: {
            QuitWhileAheadIntent: [
                {
                    type: "START",
                    intentId: "MissionToMarsPageSeventyTwoHandler"
                },
                {
                    type: "START",
                    intentId: "PageSeventeenAndEightyFourAndOneTwentyThreeAndTwentyFiveHandler"
                }
            ],
            SpinAgainIntent: [
                {
                    type: "START",
                    intentId: "WheelOfChancePageEightHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-09T19:47:48.789Z",
        name: "Page 19 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageNineteenHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714153.925001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageNinetyFiveHandler: [
                {
                    name: "Page 95 Handler",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 95 -->\n \nYou sit down on the slide and push off. The world tilts as you plunge down. Down, down, down.\n \nYou’re scared. But you can’t help feeling that this is kind of cool! Sliding and swirling in the darkness.\n \n<!-- Insert scream sound Fx -->]\n\nUntil you hear the screams. The eerie screams that follow you as you twist and turn.\n \nYour heart starts pounding wildly. Oh, no! You must have picked the Doom Slide. You’re going to slide forever!\n \nAnd then --\n\n<!-- Insert bump/chute sound Fx -->]\n\nBump. A chute opens up. You hit the ground hard. You tumble over and over and finally stop.\n \nYou lie on the ground. Panting.\n \nYou’re outside!\n \nYou scramble to your feet and gaze around.\n\n<!-- Insert laughter sound Fx -->]\n \nYou hear laughter. It seems to be coming from the bright pink building a few feet in front of you.\n \nYou walk over to its big pink door and press your ear against it.\n \nYes. The laughter is definitely coming from inside.\n \n<!-- Page 117 -->\n \nYou open the door and enter a room bursting with people who seem to be waiting for you. You think that’s weird until you study them — and realize something even stranger. They’re all dressed up in old-fashioned costumes.\n \n“Welcome to the Carnival of Horrors,” a tall woman with a red parasol says, smiling. “Nice of you to join us.”\n \nThe Carnival of Horrors. The words send shivers down your spine.\n \nThe woman with the parasol whispers in your ear, Do you want to know the secret?"
                    },
                    reprompt: {
                        ssml: 'Yes or no, do you want to know the secret?"'
                    }
                }
            ]
        },
        forward: {
            NoIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageOneSeventeenAndOneOhSixAndFortyTwoNOHandler"
                }
            ],
            YesIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageOneOhSixAndFourtyTwoHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T14:18:20.121Z",
        name: "Page 95 and 117 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageNinetyFiveHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714153.925001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageNinetyNineHandler: [
                {
                    name: "Page 99",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 99 -->\n \n“Okay, get me out of here,” you say to the goblin. “Did you help my friends, too?”\n \nThe goblin does not answer. He sprints off and you have to race to keep up with him. Through a confusing maze of twisting tunnels. You’re sure glad you have a guide.\n \nThe goblin suddenly stops. “That way,” he says gruffly, pointing straight ahead.\n \nBefore you can blink, he vanishes in a puff of smoke! And you’re left standing in front of two doors. One red. One blue. The red one has a sign that reads: DANGER. The blue one has a sign that reads: BIG DANGER.\n \nDo you pick the red door or the blue door?"
                    },
                    reprompt: {
                        ssml: "Do you pick the red door or the blue door?"
                    }
                }
            ]
        },
        forward: {
            BlueDoorIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageFiftySevenAndOneThirtyFiveHandler"
                }
            ],
            RedDoorIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageOneOhFourAndSixtyOneHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-02T18:32:47.329Z",
        name: "Page 99 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageNinetyNineHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714153.924001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageNinetySevenAndOneTwentyNineHandler: [
                {
                    name: "Page 97 and 129",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 97 -->\n \nYour hand clamps around the can of Monster Blood in your pocket. Quickly, you snap off the lid and the green gunk pours out.\n \n“Look! It’s alive!” Brad shouts.\n \n<!-- Insert sucking sound fx-->\n\nHe’s right. The Monster Blood oozes from the can, quivers, and appears to stretch and pull itself up! Then it starts to roll and bounce, making horrible sucking sounds.\n \nGreat! It’s rolling into the crowd, sucking up everything in its path!\n \n“Run!” Big Al screams as the huge green ball rolls over the people in the crowd — sucking them up with a loud plop.\n \nThen the Monster Blood hits the side of the tent. It changes direction.\n \nIt’s coming after you!\n \n<!-- Page 129 -->\n \nThe Monster Blood has grown so big — now you can’t see over it or around it.\n \n“Run for your lives!” Patty screams. But reaching the door is impossible.\n \nThe mound of green slime is bearing down on you. Fast! You stand frozen to the spot. Terrified. And then — just in time — you, Patty, and Brad leap to the side. \n\n<!-- Insert crushing sound fx-->\n\nAnd the Monster Blood slams into the wall with a crushing force — and plows right through it.\n \nYou stare at the giant gaping hole in the wall. Quickly, the three of you jump through the opening. You are standing outside the main gate — where you came in!\n \nThere’s a wide path of destruction across the field and the forest beyond. From somewhere, a clock chimes twelve times, sending a chill down your spine. And when you peer back at the carnival, it has disappeared. All that’s left is a spooky silver mist.\n \nThe end."
                    }
                }
            ]
        },
        forward: {},
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T17:09:10.805Z",
        name: "Page 97 and 129 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageNinetySevenAndOneTwentyNineHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714153.929001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageNinetySixAndTwentyThreeHandler: [
                {
                    name: "Page 96 and 23",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 96 -->\n \n<!-- Insert swinging axe/horse sound Fx -->]\n\nthey’re swinging axes.\n \nYour heart leaps into your throat. The elves move to the roadside now — and they’re chopping down the horse-drawn carts ahead of you! One cart splinters into a million pieces before your horrified eyes.\n \nThe elves continue on to the next cart. Their sharp blades slice right through it!\n \nYour horse keeps trotting up the steep path. You’re headed right for the wildly chopping elves!\n \n“Do something!” Patty cries.\n \n<!-- Page 23 -->\n\n<!-- Insert swinging axe/horse sound Fx -->]\n \nYou yank on the reins. But your horse plows ahead, pulling you forward — closer and closer to the chopping, chopping, chopping blades. Brad squinches down in the cart and buries his head in his lap.\n \nPatty jumps into the front seat with you. Together you pull on the reins and scream, “Whoa, fellow! Whoa!”\n \nBut your horse trots onward. “It’s no use,” you cry. “We’d better jump!”\n \nYou stare over the side. You’re riding along a narrow ridge and there’s a deep drop that makes your blood run cold! If you jump, you’ll plunge to your death!\n \nThen you glance up ahead — and spot a safer place to leap. Great!\n \nYou are about to show it to your friends when Brad cries out, “Look at the elves! They chop at set times. If we can get the horse to move faster, we can miss the axes!”\n \n“That’s dumb, we should jump!” argues Patty.\n \nWhat do you think you should do, jump out or get the horse to sneak by the axes?"
                    },
                    reprompt: {
                        ssml: "You can jump out our speed up the horses. Which would you like to do?"
                    }
                }
            ]
        },
        forward: {
            SneakByTheAxesIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageOneNineteenHandler"
                }
            ],
            JumpOutIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageOneOhThreeAndOneOhNineHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T16:04:15.003Z",
        name: "Page 96 and 23 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageNinetySixAndTwentyThreeHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714153.923001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageNinetyTwoHandler: [
                {
                    outputSpeech: {
                        ssml:
                            "<!-- Page 92 -->\n \nYou decide to wait. Someone should be here soon, you think. But after waiting in the space shuttle for at least fifteen minutes, you’re not so sure. No one has shown up to rescue you.\n \nA chill runs down your back. You feel as if a thousand pairs of eyes are watching you from the shadows.\n \n<!-- Insert rustling sound Fx -->]\n\nNow that you’re accustomed to the darkness, you can see dozens of tracks leading in and out of the tunnel.\n \nAnd then you hear a rustling sound. You freeze. You listen hard. Could it be rats — or something worse?\n \nYou draw up your knees and wrap your arms around them tightly. \n\n<!-- Insert hissing sound Fx -->]\n\nThen you hear a hissing sound — and you smell something odd. It’s kind of a sweet smell — like heavy perfume. You hold your nose because the smell is making you feel strange. Dizzy. Sick.\n \n<!--Page 20 -->\n \nIt seems as if hours have passed. Or maybe it’s only minutes.\n \nYou try to unclasp your hands. But they won’t budge. It’s as if your arms are glued around your knees.\n \nYou try to move something. Anything.\n \nBut you can’t blink an eyelid. Your body is paralyzed. You can’t even scream.\n \nA door opens and two men dressed in overalls and wearing gas masks amble in. Finally. They’re here to rescue you!\n \n“Looks like the perfume worked,” you hear one of them say.\n \n“Yeah. And just in time. We needed a new dummy for the Real-Life Space Display,” the other adds.\n \nThey pick up your rigid body and carry you out. No wonder those astronauts in the silver tunnel looked so real!\n \nSorry. You can’t scream. You can’t escape.\n \nNext time, you promise yourself, you’ll stick with the baby rides. But then you remember — there isn’t going to be a next time … because this is … The end."
                    }
                }
            ]
        },
        forward: {},
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-02T18:16:17.833Z",
        name: "Page 92 and 20 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageNinetyTwoHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714153.924001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageOneAndPageTwoHandler: [
                {
                    name: "Page 1 + Page 2",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 1 -->\n \n“What do you want to do?”\n \n“I don’t know, Patty. What do you want to do?”\n \n“Not fair, Brad. I asked you first.”\n \nPatty and Brad. Your two best friends. Arguing. As usual.\n \nIt’s the last week of August. And Patty and Brad haven’t stopped fighting since your summer vacation started.\n \nPatty likes being bossy. You don’t mind, though. It’s no big deal.\n \nIt’s hard to win a fight with her anyway. You don’t know why Brad even tries. You guess it’s because he doesn’t want to look like a wimp.\n \n“There’s nothing to do. I guess I’ll just go home,” Brad says. He shoves his hands in his pockets. Then his shoulders slump and he sort of shrivels up. You guess Brad is kind of a wimp — even if he is your best friend.\n \n“You’re so boring, Brad,” Patty complains. Whenever Patty complains, her freckles really pop out. Now there are about a million of them spread across her face.\n \n“Hey! I know what we should do!” Patty suddenly bursts out.\n \n<!-- Page 2 -->\n \n“Let’s bike over to Bennet’s Field and watch them set up the carnival!”\n \n“I don’t know,” you answer. “It’s getting dark, and Mom said I have to be in by nine.”\n \n“It’s only a quick bike ride,” Brad says. “Are you some kind of wimp?”\n \nBrad calling you a wimp? You can’t believe it!\n \n“Okay. Okay,” you agree. “But if it’s as bad as last year, there won’t be much to see. Don’t you remember the main attraction?” you remind them. “The ride they called Terror Track? It turned out to be a baby choo-choo train that circled around and around and around.”\n \nIt doesn’t matter what you say. Patty’s made up her mind. You’re going to ride over to the carnival.\n \nA hot, humid breeze blows in your face as you pedal along. Patty’s in the lead. No surprise. And Brad’s puffing behind you.\n \nIt’s dark by the time you reach Bennet’s Field.\n \nYou and your friends drop your bikes in the grass and race across the moonlit field, toward the huge wooden fence that surrounds the carnival.\n \n<!-- Insert carnival sound Fx -->\n \nWhat is your favorite carnival ride?"
                    },
                    reprompt: {
                        ssml: "What is your favorite carnival ride?"
                    }
                }
            ]
        },
        forward: {
            "^((?!(StopIntent|HelpIntent|CancelIntent)).)*$": [
                {
                    type: "START",
                    intentId: "PageThreeHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-06-28T15:09:39.942Z",
        name: "Page 1 and 2",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageOneAndPageTwoHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714153.925001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageOneEighteenHandler: [
                {
                    name: "Page 118",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 118 -->\n\n<!-- Insert laughter sound Fx -->\n\nYou turn left. Somewhere ahead of you, you hear laughter. \n\n“Is somebody there?” you call out.\n \nSilence.\n \nYou stare at your reflections in the mirrored hall.\n \nAm I trapped? you wonder. Am I in real danger? Or is this all a big, scary joke? Your heart begins to race.\n \nYou inch forward a few more steps — moving toward the laughter. Slowly.\n \n“Over here,” a voice calls again. But now the voice seems to be coming from behind you!\n \n<!-- Page 36 -->\n \nYou turn back and head in the other direction. Your reflections bounce off the walls at crazy angles. Are you walking straight, or have you rounded a corner? There’s no way to tell. Yet this time you’re sure you’re going the right way!\n \n“Over here!” a voice calls. “Turn left again!”\n \nTurn left again? Now you are really confused.\n \nIf you turn left again, will you finally escape?\n\n<!-- Page 36B -->\n\nYou turn left. \n\n<!-- Insert laughter sound Fx -->\n\nSomewhere ahead of you, you hear laughter…again. You think, this seems familiar. It should because you were just here. I hope you like you’re reflection because you’re stuck in this loop…forever. \n\n<!-- Insert panic sound Fx -->\n\nYou turn left. You turn left. You turn left. You turn left. \n\nThe end. "
                    }
                }
            ]
        },
        forward: {},
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T18:56:14.793Z",
        name: "Page 118 and 36 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageOneEighteenHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714153.928001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageOneElevenHandlerIntent: [
                {
                    name: "Page 111",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 111 -->\n \nYour pulse pounds in your ears as you carefully lift yourself out of the car. The tunnel is dark and musty and really creepy. Anything could be lurking in the shadows.\n \nThis must be part of the ride, you reason. And the more you think about it, the more convinced you are. You’re scared. But you have to admit, this is pretty cool.\n \nIn the distance, you spot several red lights that seem to lead to other dimly lit tunnels. You cautiously head toward one of them. Overhead something dark and slimy drips. Splattering on the top of your head. Stinging your forehead.\n \nAs you desperately try to wipe the burning slime away, something grabs you by the knees!\n \nAaaah! You look down. A pair of red-rimmed eyes meet yours. It’s a goblin with scraggly red hair and a toothless smile.\n \n“Want me to lead you out of here, kid?” he asks. You’re about to follow the goblin, but then you stop. Is he part of the ride? He looks really evil.\n \nDo you follow the goblin or find your own way out?"
                    },
                    reprompt: {
                        ssml: "Do you follow the goblin or find your own way out?"
                    }
                }
            ]
        },
        forward: {
            FindYourOwnWayOutIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageThirtyThreeHandler"
                }
            ],
            FollowTheDwarfIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageNinetyNineHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-02T18:28:09.108Z",
        name: "Page 111 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageOneElevenHandlerIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714153.926001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageOneFifteenHandler: [
                {
                    name: "Page 115",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 115 -->\n \n\n“Help! Save me!” you cry.\n \n<!--Insert swooping sound Fx -->  The vulture swoops down and drops you in the nest.\n \nThe baby vultures approach.\n \nMouths open — ready to peck you to death …\n \nBut — good news! They don’t eat you. You fall out of the nest instead.\n \n<!-- Insert thud sound -->\n\nTHUD!\n \nDon’t go to pieces. Pull yourself together and prepare to visit the Carnival of Horrors again — the next time you’re brave enough!\n \nThe end."
                    }
                }
            ]
        },
        forward: {},
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-06T19:20:53.873Z",
        name: "Page 115 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageOneFifteenHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714153.927001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageOneFourteenHandler: [
                {
                    name: "Page 114",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 114 -->\n \nThis is your lucky day.\n \nYou duck as the crane swings over your head.\n \n“Run!” you shout to your friends.\n \nYou glance at your watch — 11:55. If you’re really lucky, you can still make it out of the carnival by midnight.\n \nYou can see the exit up ahead. As you charge through the gate, you feel really hopeful — until you run into Big Al.\n \nHe blocks the exit with his huge body. His massive hands are planted on his hips. “No one escapes from the Carnival of Horrors!” he roars.\n \nYou’ve got to find a way out. Now!\n \nTo your right is the entrance to Halloween Express — you could try that.\n \nOr maybe you should run down a different path. There’s got to be more exits around here somewhere.\n \nChoose fast!\n \nWant to try the Halloween Express or run down a different path?"
                    },
                    reprompt: {
                        ssml: "Do you want to try the Halloween Express or run down a different path?"
                    }
                }
            ]
        },
        forward: {
            RunDownADifferentPathIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageFiveAndOneTwentySevenHandlerIntent"
                }
            ],
            HalloweenExpressIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageOneOhEightAndFiftyFourHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T17:01:39.563Z",
        name: "Page 114 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageOneFourteenHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.066001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageOneHundredHandler: [
                {
                    name: "Page 100",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 100 -->\n \n“Help! Help! Over here!” you scream, waving your arms wildly in the air.\n \n“Hold on!” a deep voice answers through the heavy mist.\n \n<!--Insert boat sound Fx -->\n \nThe boat turns and speeds toward you. As it nears, the voice calls out again. “Jump! Jump over!”\n \nJump? Is he crazy? Can you really jump onto a moving boat?\n \n<!--Insert boat sound Fx -->\n \nThe boat is coming closer now. Closer. Closer. You stand up. You bend your knees. You’re about to jump — and the boat speeds right past you.\n \nBut wait! It is circling back now in a nice, slow approach. It glides up to you, and gigantic hands pull you onto the boat.\n \n“You saved me!” you cry.\n \nYou gaze up and gasp in surprise. The man in the other boat isn’t a man — it’s a monster with a drooling snout and rows of jagged teeth.\n \n“Save you? Save you?” the monster repeats.\n \nHis red eyes light up. “Save you … good idea,” he says. “I won’t eat you now. I’ll save you for a midnight snack!”\n \nThe end.\n\nThe Carnival of Horrors never stops. Do you want to try your luck again and start from the beginning?"
                    },
                    reprompt: {
                        ssml: "Do you want to try your luck again and start from the beginning?"
                    }
                }
            ]
        },
        forward: {},
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T19:34:45.128Z",
        name: "Page 100 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageOneHundredHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714153.927001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageOneNineteenHandler: [
                {
                    name: "Page 119",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 119 -->\n \n<!-- Insert horse sound fx --> \n\nYou take charge of the reins to urge the horse on.\n \n“Giddyap, boy,” you and Patty shout. But your horse won’t move any faster.\n \nYou shoot a glance up ahead. The elves are chopping … and a shiny blade … is now … right over … your head!\n \n“No,” you scream. “NO! Let me out of here.”\n \nYou feel a sharp pain. And you realize you’ve just had the shortest haircut of your life. Unfortunately, they took a little too much off the top.\n \nThe end."
                    }
                }
            ]
        },
        forward: {},
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T16:11:07.942Z",
        name: "Page 119 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageOneNineteenHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.056001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageOneOhEightAndFiftyFourHandler: [
                {
                    name: "Page 108 and 54",
                    outputSpeech: {
                        ssml:
                            "<!--Page 108 -->\n \n“We’ve got to get out of here, it’s almost midnight,” you say as you run toward the Halloween Express ride.\n \n“Hey, maybe we should try one of these cars,” Brad says, pointing to the red and orange cars that run on a track.\n \nThe three of you crowd into a little car that’s really meant for two. You jam your foot on the gas pedal, and you’re flying!\n \n“All right!” Brad cheers. “We’re on our way home! Hey, I wonder why they call this Halloween Express?” he asks.\n \nYou turn the wheel sharply to the left, and then you know why….\n \n<!-- Page 54 -->\n \nYour Halloween Express car pulls up in front of a cottage and the cottage door opens with a creak.\n \n<!-- Insert creak sound Fx -->\n \nYou all jerk your heads up to peer at the door. You see a skeleton wearing an evil smile. And he lunges right for you!\n \n“Trick or treat!” he screeches. Then he stretches out his bony hands to snatch you!\n \nYou pound on the gas pedal, and the car shoots forward — out of the skeleton’s grasp!\n \n<!-- Insert car sound Fx -->\n \nYell something at the skeleton as you drive away."
                    },
                    reprompt: {
                        ssml: "Yell something at the skeleton as you drive away."
                    }
                }
            ]
        },
        forward: {
            "^((?!(StopIntent|HelpIntent|CancelIntent)).)*$": [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageFiftyFourAndEightyThreeHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T14:42:41.567Z",
        name: "Page 108 and 54 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageOneOhEightAndFiftyFourHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.057001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageOneOhFiveAndNinetyHandler: [
                {
                    name: "Page 105 and 90",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 105 -->\n \nIt’s a tree branch! Grabbing at you. Tugging, tugging at your hair. You can’t break free. Its gnarly stubs dig in deeper as you struggle.\n \nSuddenly, you feel something wrap itself around your arms. Then your legs. Closing in tighter. Tighter.\n \nYou gaze down and see them — black knobby tree limbs twisting around you. Strangling you.\n \nYou drop hold of the steering wheel and begin to claw at the branches, ripping them away.\n \nAnd then you peer up — and see a terrifying sight. It’s a huge tree. And you’re headed straight for it! You grasp the steering wheel to regain control of the boat. The tree is just inches away.\n \nAre you going to CRASH?!\n \n<!-- Page 90 -->\n \nNO!\n\n<!-- Insert boat sound Fx -->\n \nAt the last minute, you wrench the steering wheel hard to the left. The side of your boat clears the tree with a sickening scrape.\n \nYou breathe a sigh of relief, but it ends in a groan. A huge, sharp root below the water has just ripped into the bottom of your boat.\n \n<!-- Insert tearing and water sound Fx -->.\n \nYou hear a tearing sound, then gurgling as the cockpit starts to fill with water.\n \n“Now what?” you mutter.\n \nThen through the mist you spot another boat. But it’s some distance away.\n \n“Hey, over here!” you cry out.\n \nDid they hear you? You cry out again. Then you glance behind you. More than half your boat is underwater — and you’re going down fast.\n \nQuick - do you keep yelling or swim to safety?"
                    },
                    reprompt: {
                        ssml: "Do you keep yelling or swim to safety?"
                    }
                }
            ]
        },
        forward: {
            DecideToBeRescuedIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageOneHundredHandler"
                }
            ],
            DecideToSwimForItIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageFiftySixHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T19:15:47.703Z",
        name: "Page 105 and 90 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageOneOhFiveAndNinetyHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.056001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageOneOhFourAndSixtyOneHandler: [
                {
                    name: "Page 104 and 61",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 104 -->\n \nYou push open the red door. Another tunnel lies beyond it. You follow its twists and turns, and you realize that you’re sloshing through cold muddy water. It grows deeper and chillier as you go.\n \nWith a cold shudder, you decide to head back — until you hear a slurping noise behind you.\n \n<!--Insert slurping sound Fx -->\n \nWhirling around, you watch in horrible fascination as giant earthworms crawl out of the mud. Gross!\n \nNo way you’re heading back there. You clench your teeth and slog onward. Up ahead, you see a dim green light. Great! An exit.\n \nAs you reach the end of the tunnel, you hear a low growl behind you.\n \n<!--Insert low growl with footsteps sound Fx-->\n \nAt first you try to pretend it’s your imagination. But there’s no mistaking the sound of thudding footsteps. Getting closer. And closer. And now it’s breathing down your neck!\n \n<!-- Page 61 -->\n \nYou’re too scared to turn around. And too scared not to. Risking a glance over your shoulder, you see a large, dark shape behind you. It’s a big man. No. You squint hard. It’s dark and hairy with muddy leaves and green vines trailing from its body. It’s some sort of swamp monster!\n \nYou run as fast as you can. Your chest is on fire. The swamp monster is gaining on you.\n \nYou know you should keep running, but your heart feels as if it’s about to explode. You have to stop.\n \nYou turn and stare right into the swamp monster’s bloody eyes. “Neat costume,” you say hopefully.\n \nGood try — but the swamp monster isn’t wearing a costume. He’s real and this, unfortunately, is really … the end.\n\nThe Carnival of Horrors never stops. Do you want to try your luck again and start from the beginning?"
                    },
                    reprompt: {
                        ssml:
                            "The Carnival of Horrors never stops. Do you want to try your luck again and start from the beginning?"
                    }
                }
            ]
        },
        forward: {},
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-02T18:54:21.101Z",
        name: "Page 104 and 61 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageOneOhFourAndSixtyOneHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.049001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageOneOhSevenAndSeventyFiveHandler: [
                {
                    name: "Page 107 and 75",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 107 -->\n \n“Sorry, Brad. I think Patty’s right,” you tell him as you turn toward the Hall of the Mountain King. “I think I spotted an exit there when we first came in.”\n \nPatty runs ahead. “Look!” she cries out. “There’s the path. It leads past the Hall of the Mountain King to the exit.”\n \n“Yeah, but who are those people up there?” Brad asks. “They’re blocking the way.”\n \nYou peer up ahead and see them — the people in the old-fashioned clothes. And they’re still chanting — “Only one right way, only one right way.”\n \n“They’re not going to let us out!” Brad panics.\n \n“Okay. Okay. I have an idea,” you say calmly. “Let’s go into the Mountain King ride — maybe we can jump off at the end and sneak past them.”\n \nDo you have another choice? No.\n \n<!-- Page 75 -->\n \nThe three of you duck inside the Hall of the Mountain King!\n \nA painted backdrop of rounded, snowcapped mountains rises on your left. Up in the mountains, a big stone castle rests in the sunshine.\n \n<!-- Insert cheerful/garden sound Fx -->.\n\nA group of cheerful elves picks flowers in the castle’s garden. \n\nTo your right, you spot the ride — wooden carts pulled by real horses. “Come on!” you call to your friends. “Jump in a cart. This is great. We’ll be out of here in no time.” No time — that reminds you. You glance at your watch. 11:45!\n \nYou all scramble into one of the carts and grab the reins. Your horse plods forward, and you pass through a painted stone archway.\n \nYou gasp. Everything in the painted backdrop is now in front of you. And it has suddenly become real. But different!\n \nThe snowcapped mountains rise to black, jagged peaks that pierce the sky. The big stone castle huddles on a scary, dark hill. And the elves — they aren’t picking flowers.\n \nThey’re …\n \n<!-- Read in prompt voice -->\n \nWhat do you think the elves are doing?"
                    },
                    reprompt: {
                        ssml: "What do you think the elves are doing?"
                    }
                }
            ]
        },
        forward: {
            "^((?!(StopIntent|HelpIntent|CancelIntent)).)*$": [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageNinetySixAndTwentyThreeHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T15:43:38.482Z",
        name: "Page 107 and 75 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageOneOhSevenAndSeventyFiveHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.056001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageOneOhSixAndFourtyTwoHandler: [
                {
                    name: "Page 117 and 106 and 42",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 117 -->\n \n“The Carnival of Horrors comes alive in a different place and a different time each night. Tonight we’re in your town. Tomorrow we could be in another country! But every place we stop, we invite kids like you to join us….”\n \n“Thanks for the invitation,” you say, “but I gotta go.”\n \n“I’m sorry.” The lady chuckles. “You can never escape from the Carnival of Horrors,” she says solemnly. “Unless …”\n \n<!-- Page 106 -->\n \n“Unless what?” you scream. “Tell me!”\n \n“You can escape the Carnival of Horrors if you leave before closing time.”\n \n“When is closing time?” you shoot back.\n \n“When the last ride stops….” the lady whispers. “At midnight.”\n \nYou glance at your watch — 11:40. Twenty minutes — that’s not so bad. But how do you get out of here?\n \nAs if the lady can read your mind, she says, “There’s only one right way.”\n\n <!-- Insert chanting sound Fx -->\n\nThen all around you, the crowd begins to chant. \n \n“ONLY ONE RIGHT WAY, ONLY ONE RIGHT WAY.” They repeat it over and over again.\n \n“What is it?” you scream. “Which way?”\n \nIt’s useless. They’re not going to tell you.\n \nBut it’s not midnight yet. There’s still time to figure it out.\n\n<!-- Insert tremble sound Fx -->\n \nUntil the floor begins to tremble. And the walls begin to shake. \n \nEarthquake!\n \n<!-- Page 42 -->\n \n<!-- Insert tremble sound Fx -->  \n\nA wave of panic washes over you as the walls crumble around you. You throw your arms over your head and close your eyes.\n \nThen silence. The shaking stops.\n \nWhen you open your eyes, the room and all the costumed people have vanished. And you are outside — in the rides area! But the biggest surprise of all is that you spot Patty and Brad!\n \n“Boy, am I glad to see you,” you say, racing over to them. “Where have you guys been?”\n \nBrad shakes his head. “You wouldn’t believe the rides we were on!”\n \n“We’ve got to get out of here before midnight,” you say. Quickly, you tell your friends about the warning from the lady with the red parasol.\n \n“No problem,” Patty says. “Look. I’m sure the exit is right over there past that ride called the Hall of the Mountain King.”\n \n“No, it’s that way — near the sign that says ‘Halloween Express,’” Brad insists.\n \nDo you think the exit is near Halloween Express or Mountain King?"
                    },
                    reprompt: {
                        ssml: "Is the exit near the Halloween Express or Mountain King?"
                    }
                }
            ]
        },
        forward: {
            HalloweenExpressIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageOneOhEightAndFiftyFourHandler"
                }
            ],
            MountainKingIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageOneOhSevenAndSeventyFiveHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T14:34:17.805Z",
        name: "Page 117 and 106 and 42 YES Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageOneOhSixAndFourtyTwoHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.064001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageOneOhThreeAndOneOhNineHandler: [
                {
                    name: "Page 103 and 109",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 103 -->\n \n“We’ve got to jump,” you tell Patty and Brad. “It’s our only chance.”\n \n“Okay,” Brad agrees as your cart inches up to the chopping elves.\n \n“Come on,” you cry. “Now!” But Brad is too paralyzed with fear to move. You and Patty grab him and haul him toward the side of the cart.\n \nYour cart has reached the elves! One of them smirks as he lifts his ax.\n \nIt’s right above your neck.\n \nYou picture your head tumbling down the side of the mountain.\n \nWith a loud cry, all three of you jump. You land with a thud on a rocky ledge. It breaks your fall. But the rock is too weak to hold all of you.\n \nYou scream again as the edge tears loose and the world drops from under your feet.\n \n<!-- Insert rock breaking and tumble sound Fx -->\n \nYou tumble over and over, down the side of the mountain.\n \n<!-- Page 109 -->\n \nYou squeeze your eyes shut and wait for the crash. Finally, you land. You glance up. You’re at the foot of the Log Flume ride.\n \nYou, Patty, and Brad have lots of cuts and bruises, but you’re okay! Terrific! you think — until you spot the army of elves with their axes. They’re rushing down the mountain toward you! The only escape is to enter the flume ride, so you dash inside.\n \nThe Log Flume reminds you of a western logging camp, complete with log cabins, trees, trucks, and a sparkling blue lake.\n \n<!-- Insert chain saw sound Fx -->\n \nIn the distance, you can hear the buzz of chain saws. And down by the lake, giant cranes pick up logs and plop them in the water. Some of the logs are hollowed out in the middle with seats for passengers. As you watch, the current catches one. It glides to the edge of a waterfall, plunges over, and shoots down.\n \nAs you glance around, you spot an EXIT sign.\n \nThen to your horror, you see a giant crane swinging your way. “Duck!” you scream.\n \nWill you make it to the exit?\n \nTo find out, tell me what day of the week it is."
                    },
                    reprompt: {
                        ssml: "What day of the week is it right now?"
                    }
                }
            ]
        },
        forward: {
            MondayWednesdsayFridaySaturdayIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageOneFourteenHandler"
                }
            ],
            TuesdayThursdaySundayIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageSeventyOneHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T16:56:42.223Z",
        name: "Page 103 and 109 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageOneOhThreeAndOneOhNineHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.050001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageOneOhTwoAndOneTwentyHandler: [
                {
                    name: "Page 102 and 120",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 102 -->\n \n“I’m not going anywhere with you, Big Al. I believe the Snake Lady!”\n \n“So do I,” says Patty.\n \n“Me, too!” Brad echoes.\n \n“That’s too bad,” Big Al says. Then he turns to the Snake Lady.\n \n“And as for you, Miss Reptilia — I told you, you’ve been overacting. If these kids believe you, we won’t be able to torture them with our real horrors.”\n \n“Ssssssorry, bosssssss,” she says. “Sssssso what do you want me to do with them?”\n \nYou can hardly believe it! Real horrors?\n \n“What kind of carnival is this?” you shout.\n \n“The Carnival of Horrorssssss,” the Snake Lady answers — and that’s the good news.\n \n<!-- Page 120 -->\n \nThe bad news is the Snake Lady fooled you.\n \n“Throw them into the large cell with Harold and all the other prisoners,” Big Al commands.\n \n<!--Insert click sound Fx -->\n \nYou are shoved into a dark cell. You hear a click. You’re locked in.\n \n<!--Insert laughter sound Fx -->\n \nAs the Snake Lady leaves with Big Al, you can hear their laughter echo down the hall.\n \nYou glance into the other cells and think, the freaks are prisoners. They do need our help. Then you peer into the darkness of your cell — to find out who Harold is.\n \nThere’s no way you could miss him. Harold is a giant. He’s huge — twice as big as a football player. His hands are, in fact, the size of two footballs. His arms look like tree trunks.\n \nAt first you are afraid of him, but then you think, Hey! He’s trapped, too. Maybe we can convince him to help us.\n \nTo get Harold to help you, give him a compliment to get on his good side."
                    },
                    reprompt: {
                        ssml: "Give Harold a compliment to get on his good side."
                    }
                }
            ]
        },
        forward: {
            "^((?!(StopIntent|HelpIntent|CancelIntent)).)*$": [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageTwentyEightHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-06T18:03:06.138Z",
        name: "Page 102 and 120 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageOneOhTwoAndOneTwentyHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.051001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageOneSeventeenAndOneOhSixAndFortyTwoNOHandler: [
                {
                    name: "Page 117 and 106 and 42",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 117 -->\n \nToo bad.\n \n“The Carnival of Horrors comes alive in a different place and a different time each night. Tonight we’re in your town. Tomorrow we could be in another country! But every place we stop, we invite kids like you to join us….”\n \n“Thanks for the invitation,” you say, “but I gotta go.”\n \n“I’m sorry.” The lady chuckles. “You can never escape from the Carnival of Horrors,” she says solemnly. “Unless …”\n \n<!-- Page 106 -->\n \n“Unless what?” you scream. “Tell me!”\n \n“You can escape the Carnival of Horrors if you leave before closing time.”\n \n“When is closing time?” you shoot back.\n \n“When the last ride stops….” the lady whispers. “At midnight.”\n \nYou glance at your watch — 11:40. Twenty minutes — that’s not so bad. But how do you get out of here?\n \nAs if the lady can read your mind, she says, “There’s only one right way.”\n \n<!-- Insert chanting sound Fx -->\n \nThen all around you, the crowd begins to chant. \n\n“ONLY ONE RIGHT WAY, ONLY ONE RIGHT WAY.” They repeat it over and over again.\n \n“What is it?” you scream. “Which way?”\n \nIt’s useless. They’re not going to tell you.\n \nBut it’s not midnight yet. There’s still time to figure it out.\n\n<!-- Insert tremble sound Fx -->\n \nUntil the floor begins to tremble. And the walls begin to shake. \n \nEarthquake!\n \n<!-- Page 42 -->\n \n<!-- Insert tremble sound Fx --> \n\nA wave of panic washes over you as the walls crumble around you. You throw your arms over your head and close your eyes.\n \nThen silence. The shaking stops.\n \nWhen you open your eyes, the room and all the costumed people have vanished. And you are outside — in the rides area! But the biggest surprise of all is that you spot Patty and Brad!\n \n“Boy, am I glad to see you,” you say, racing over to them. “Where have you guys been?”\n \nBrad shakes his head. “You wouldn’t believe the rides we were on!”\n \n“We’ve got to get out of here before midnight,” you say. Quickly, you tell your friends about the warning from the lady with the red parasol.\n \n“No problem,” Patty says. “Look. I’m sure the exit is right over there past that ride called the Hall of the Mountain King.”\n \n“No, it’s that way — near the sign that says ‘Halloween Express,’” Brad insists.\n \nDo you think the exit is near Halloween Express or Mountain King?"
                    },
                    reprompt: {
                        ssml: "Is the exit is near Halloween Express or Mountain King?"
                    }
                }
            ]
        },
        forward: {
            HalloweenExpressIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageOneOhEightAndFiftyFourHandler"
                }
            ],
            MountainKingIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageOneOhSevenAndSeventyFiveHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-11T15:08:27.422Z",
        name: "Page 117 and 106 and 42 NO Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageOneSeventeenAndOneOhSixAndFortyTwoNOHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.062001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageOneTenHandler: [
                {
                    name: "Page 110",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 110 -->\n \nThis one is for real. Maybe it’s the way he stares into your eyes. Or maybe it’s the rows and rows of razor-sharp teeth jutting from his mouth.\n \nYou take a step back. He takes a step closer. A drop of his drool drips on your hand.\n \n<!--Insert sizzle sound fx -->\n \nIt sizzles and burns.\n \nThis is the end, you figure. You’ll never escape the Carnival of Horrors. Never see your family or Patty and Brad again.\n \nThe monster lifts his gigantic, clawed hand. He waves it over your head. And you wait for the searing pain as it plunges down to strike you.\n \nBut that’s not what happens.\n \nThe monster slowly lowers his hand and clutches at his own neck, and then — pulls his own head off! And when you discover what’s underneath, you know you’re still in big trouble!\n \nWhat do you think is underneath the robot head?"
                    },
                    reprompt: {
                        ssml: "What do you think is underneath?"
                    }
                }
            ]
        },
        forward: {
            "^((?!(StopIntent|HelpIntent|CancelIntent)).)*$": [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageOneThirtyThreeAndOneSeventeedHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-06T13:41:17.972Z",
        name: "Page 110 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageOneTenHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.071001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageOneThirteenAndSixteenHandler: [
                {
                    outputSpeech: {
                        ssml:
                            "<!--Page 113 -->\n \nHelp some freaks? That’s a good one! You laugh.\n \nYou think about Madame Zeno, the fire, and the disappearing tent. Totally cool! You wonder who thought up such awesome special effects.\n \nYou can’t wait to tell Brad and Patty all about it.\n \nYou search for your friends in the big wooden booths that line the midway. Instead, you find incredible games of chance. Some test your eye-hand coordination. Others require pure luck. But they all offer the most amazing prizes you’ve ever seen — phones, video games, fifteen-speed mountain bikes. You can’t wait to play!\n \nYou spot a booth across the midway with a crowd gathered in front. That’s odd, you think. Didn’t Big Al say we were the only people at the carnival tonight? You wonder if your friends are in the crowd. You move closer.\n \n“Oh. I get it,” you say aloud. “These people must work at the carnival.”\n \nYou’re about to call out to them. Until you see their eyes. Strange, haunted eyes.\n \n<!--Page 16 -->\n \n“Hi!” you say to Big Al. “Who are all those people?”\n \nHe doesn’t really answer your question.\n \n“Welcome to the Carnival of Horrors,” he says. “You must play or pay. We have many games on our midway. You must play two.” He practically spits the word must out. “If you succeed, you can win prizes. But if you lose, you pay with your life!”\n \nBoy, he’s really laying it on thick, you think. But it’s a pretty cool gimmick. “Okay, I’ll play a game. Then I’ve got to go home.”\n \n“No one goes home,” Big Al says, “until they play. You must play two games. And survive.”\n \n“Okay. Okay,” you mutter to yourself.\n \nYou glance around the midway at the two closest games. Mission to Mars and the Wheel of Chance. You have to pick one to start, or you’ll never get out of here.\n\nMission to Mars or the Wheel of Chance, which do you choose? "
                    },
                    reprompt: {
                        ssml: "Mission to Mars or the Wheel of Chance, which do you choose? "
                    }
                }
            ]
        },
        forward: {
            MissionToMarsIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "MissionToMarsPageSeventyTwoHandler"
                }
            ],
            WheelOfChanceIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "WheelOfChancePageEightHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T19:37:02.189Z",
        name: "Page 113 and 16",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageOneThirteenAndSixteenHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.082001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageOneThirtyAndOneOhOneHandlerI: [
                {
                    name: "Page 130 and 101",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 130 -->\n \nYou and your friends squeeze into the cannon.\n \n“Ouch! You’re sitting on my hand,” Brad whines.\n \nBut you don’t have time to apologize.\n \n“Do you smell something … burning?” you ask.\n \n<!-- Insert explosion sound Fx -->  \n\nBOOM! \n\nThere’s a tremendous explosion. You fly through space. You are headed for a fence that encloses the carnival, and the field beyond.\n \nWill you make it out of the park?\n \n<!-- Page 101 -->\n \nYou make it! You make it out of the park!\n \nYou also make it out of the state!\n \nIn fact, the last time anyone saw you, Patty, and Brad, you were all a tiny blip on NASA’s radar screen.\n \nCongratulations! You escaped from the Carnival of Horrors.\n \nHappy landings!\n \nThe end."
                    }
                }
            ]
        },
        forward: {},
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T15:22:41.765Z",
        name: "Page 130 and 101 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageOneThirtyAndOneOhOneHandlerI",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.050001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageOneThirtyThreeAndOneSeventeedHandler: [
                {
                    name: "Page 133 and 117 and 106",
                    outputSpeech: {
                        ssml:
                            '<!-- Page 133 -->\n \nThose eyes behind the alligator snout — those beady eyes. You should have recognized them before. It’s Big Al.\n \n“Hey! You did a great job here,” he says warmly. “You’ve really got the stuff for the Carnival of Horrors.”\n \n“Uh, thanks,” you mumble. “But I really have to go home now.”\n \n“What’s the rush?” he asks, patting you on the shoulder. “Aren’t you having fun?”\n \nFun? you think. Crushed between solid walls. Then attacked by a bulging-eyed monster. Fun? No. This isn’t fun. This is weird.\n \n“Uh, yeah. It’s been really great. But, um, I really do have to get home,” you stammer. “So if you’ll just take me to wherever Patty and Brad are — and show us the way out — we’ll be going.”\n \n“I’m afraid that isn’t possible,” Big Al says. “Just open the door and you’ll understand.”\n \n<!-- Page 117 -->\n\n<!-- Insert open door sound fx -->\n \nYou open the door and enter a room bursting with people who seem to be waiting for you. You think that’s weird until you study them — and realize something even stranger. They’re all dressed up in old-fashioned costumes.\n \n“Welcome to the Carnival of Horrors,” a tall woman with a red parasol says, smiling. “Nice of you to join us.”\n \nThe Carnival of Horrors. The words send shivers down your spine.\n \nThe woman with the parasol whispers in your ear, “Do you want to know the secret?"'
                    },
                    reprompt: {
                        ssml: "Yes or no, do you want to know the secret?"
                    }
                }
            ]
        },
        forward: {
            NoIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageOneSeventeenAndOneOhSixAndFortyTwoNOHandler"
                }
            ],
            YesIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageOneOhSixAndFourtyTwoHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-06T14:15:21.732Z",
        name: "Page 133 and 117 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageOneThirtyThreeAndOneSeventeedHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.055001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageOneThirtyTwoAndTwentyOneHandler: [
                {
                    name: "Page 132 and 21",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 132 -->\n \nThe fortune-teller said this number might save your life. But how?\n \nThen you see it. In the corner. A tall silver locker with the number 132 painted in red.\n \n“In here,” you say, opening the door to the locker. You push Patty and Brad inside.\n\n<!-- Insert locker rattle and shake sound fx -->\n \nAs soon as you close the door, the locker begins to rattle and shake. You’re nearly blinded by a bright, white light. You hear a loud whooshing sound. And then all is silent. The door pops open — and you’re amazed at what you see.\n \n<!-- Page 21 -->\n \nYou’re outside — standing in Bennet’s Field — gazing at the fence that surrounds the carnival.\n \n“I guess we’ll have to wait until tomorrow night when the carnival opens,” Brad says.\n \n“No way,” Patty says. “Let’s climb the fence.”\n \nWhat’s going on here?\n \nYou guessed it. The silver locker was a time machine. You’ve gone back in time to the first moment you spotted the carnival. Now it appears as if you have to start all over again — fighting horror after horror, right up to …\n \nThe end."
                    }
                }
            ]
        },
        forward: {},
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-06T19:13:52.983Z",
        name: "Page 132 and 21 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageOneThirtyTwoAndTwentyOneHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.074001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageOneTwentyEightAndSeventyHandler: [
                {
                    name: "Page 128 and 70 ",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 128 -->\n \nYou squeeze into the choo-choo and scrunch down. 11:59.\n \nLights from the carnival people’s torches sweep over you. Their foul smell fills your lungs.\n \nThe blood pounds in your temples.\n \nYou’re sure they’re going to find you. But you’re trapped now.\n \nThere’s no way out.\n \nYou hear someone shout in the distance. “Closing time!” \n\n<!--Insert chime sound Fx -->  \n\nAnd then you hear a bell start to chime …\n \n… Midnight!\n \n“One, two, three,” Brad counts the chimes.\n \nYou want to strangle him!\n \n“Four, five …”\n \nSuddenly, the kiddie train starts to move.\n \n“Six … seven … eight …”\n \nYou sit up and what you see is the biggest shock of this whole horrible night….\n \n<!-- Page 70 -->\n \n“Nine … ten …”\n \n“Brad, shut up. Look at this!”\n \nYou point to the letters on the front of the train car.\n \nYou’ve been staring at them the entire time. Why didn’t you notice them before?\n \n“What about the letters?” Patty says sharply.\n \n“Eleven …”\n \n“Don’t you see what they say?” you shoot back.\n \n“ ‘Right-Way Railroad,’ ” Patty reads. “So what?”\n \nThe chants of the merry-go-round people echo in your head. There’s only one right way. There’s only one right way.\n \nCould it be?\n \n“Twelve!”\n \nWhat is the latest time you’ve ever stayed up until?"
                    },
                    reprompt: {
                        ssml: "What is the latest time you’ve ever stayed up until?"
                    }
                }
            ]
        },
        forward: {
            "^((?!(StopIntent|HelpIntent|CancelIntent)).)*$": [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageFiftyTwoAndTwentyFourHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T15:33:39.384Z",
        name: "Page 128 and 70 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageOneTwentyEightAndSeventyHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.053001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageOneTwentyFiveAndFourtyThreeHandler: [
                {
                    name: "Page 125 and 43",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 125 -->\n \n“This way!” You wave to Patty and Brad.\n \nThe three of you turn to the left and keep running — \n\n<!-- Insert water sound Fx -->  \n\nstraight into a pond!\n \n“Why didn’t you tell us to stop?” Patty whines.\n \n“Don’t complain to me!” you shout back. “We followed you through the fence!”\n \nYou turn around and slog your way back to shore. Patty and Brad make it there first. You are a few feet away — when you see it.\n \nAn alligator.\n \nWith its mouth gaping open — revealing two rows of razor-sharp teeth.\n \nYou freeze.\n \nPatty spots the alligator and yells, “Quick! There’s a log! Jump on it!”\n \nYou scramble up on the log, but it’s no use. You’re still an easy target.\n \nThe alligator opens its huge mouth even wider. He slithers right up to the log. And you can tell he’s ready. Ready to crunch down on you!\n \n<!-- Page 43 -->\n \nYou are about to scream. It seems like the only sensible thing to do.\n \nAnd then you remember the sign.\n \nReptile Petting Zoo.\n \nYou have an idea. It’s a dangerous idea, you know. But everything in this carnival is dangerous.\n \nYou can feel the alligator’s hot breath on your arm. But instead of pulling your arm back, you stretch it out!\n \n“What are you doing?” Patty screams.\n \nYour fingers reach out. Out over the alligator’s open snout to the top of his head.\n \nAnd you pet him.\n \n“Nice alligator,” you purr as you stroke his scaly head.\n \nYour arm trembles, but you don’t stop. And slowly — very slowly — the creature’s mouth begins to shut.\n \nThen he rolls over and falls asleep!\n \nYou slip quietly off the log, charge for the shore — and plow right into Big Al!\n \n“Well, well, well. Look who we have here,” Big Al sings out. “Come with me. It’s time for The Final Challenge.”\n \nYou have no choice, you follow Big Al.  Tell Al what you think of his carnival."
                    },
                    reprompt: {
                        ssml: " Tell Al what you think of his carnival."
                    }
                }
            ]
        },
        forward: {
            "^((?!(StopIntent|HelpIntent|CancelIntent)).)*$": [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageEightyFourHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T17:45:22.180Z",
        name: "Page 125 and 43 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageOneTwentyFiveAndFourtyThreeHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.051001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageOneTwentyFourAndOneTwelveHandler: [
                {
                    name: "Page 124 and 112",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 124 -->\n\n<!-- Insert wheel spin sound Fx -->\n \n“FI-NAL! FI-NAL! FI-NAL!” you hear the crowd yelling as you spin round and round. \n\nYou’re getting dizzy. Really dizzy. So dizzy that you faint.\n \n<!-- Page 112 -->\n \n<!-- Insert splash sound Fx --> \n\nYeoow! Someone splashes cold water in your face. Your eyes open.\n \n“Come on! Wake up! It’s almost show time,” a raspy voice says.\n \n“Show time?” you say, gazing into the eyes of a goblin. “What show?”\n \n“The Freak Show. You are the Amazing Three-Headed Monster.”\n \nYou glance around and see Patty on one side of you and Brad on the other. You try to pull away from them, but you can’t.\n \n“We’re stuck together with some kind of glue,” Patty says.\n \n“It isn’t glue,” Brad argues.\n \n“Is too!”\n \n“Is not!”\n \nWell, whatever it is — you are stuck. Stuck between your arguing friends for a long, long time — like forever. And here’s something you can’t argue about. This really is …\n \nThe end."
                    }
                }
            ]
        },
        forward: {},
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T18:08:10.808Z",
        name: "Page 124 and 112 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageOneTwentyFourAndOneTwelveHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.067001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageOneTwentyOneAndSixtyThreeHandler: [
                {
                    name: "Page 121 and 63",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 121 -->\n \nYou grab the sides of the slide and lower yourself down. The second you sit, the slide’s floor tilts up beneath you and propels you forward.\n\n\nYou shriek!\n \nYou raise your arms and scream louder. You slide faster and faster. In total darkness. Darkness so black, you can’t even see your own feet in front of you.\n \nYour eyes dart frantically from side to side. Faces suddenly appear in the darkness in bright flashes of light. Faces of hideous monsters with deformed heads and oozing flesh.\n \nBut you’re moving too fast to focus on them. You slide and slide — until the faces stop flashing and you’re covered in the thick, heavy blackness again.\n\n<!--Insert scream sound Fx -->\n \nYou scream as you round a sharp curve. Your head is spinning. You pick up speed.\n \nWhen will it end?\n\n<!--Insert scream sound Fx -->\n \nThen you hear the screams. Chilling screams that echo through the darkness. \n\nOh, no! You must have picked the Doom Slide!\n \n<!-- Page 63 -->\n \n<!--Insert bump sound Fx -->\n\nBump.\n\n<!-- Insert chute and langing sound Fx -->\n\nA chute opens up. You land headfirst on soft grass.\n \nYou blink several times. A long sigh escapes from your lips. It wasn’t the Doom Slide after all.\n \nAs you climb to your feet you hear someone call your name.\n \nYou glance up and shout for joy. It’s Brad! And Patty’s there, too!\n \nYou tell them about your scary ride on the slide — about how you thought you’d slide forever.\n \n“Cool!” Patty exclaims. “Let’s all ride it this time!”\n \n“No!” you tell her. “This carnival is too weird. And dangerous. Something’s not right. We have to get out of here. Now!”\n \n“Yeah,” Brad agrees. “The faster, the better.”\n \n“I have an idea,” Patty announces. You and Brad huddle around her. “I spotted a back way out of here. But it’s a little risky. We have to squeeze through a barbed-wire fence — and it’s guarded by the carnival’s security. But we should try!”\n \nDo you follow Patty or take the back way out?"
                    },
                    reprompt: {
                        ssml: "Do you follow Patty or take the back way out?"
                    }
                }
            ]
        },
        forward: {
            TakeTheBackWayOutIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageEightySixHandler"
                }
            ],
            FollowPattyIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageFourtyEightAndSixtyHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T17:23:24.762Z",
        name: "Page 121 and 63 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageOneTwentyOneAndSixtyThreeHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.062001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageOneTwentySevenHandler: [
                {
                    name: "Page 127 Handler",
                    outputSpeech: {
                        ssml:
                            " \n<!-- Page 127 -->\n \nYou’re not fast enough to get away from the ghost. You’re running now, but the ghost swoops down in front of you. You plow into him — and pass right through him!\n \nThe carnival people are swarming after you. They don’t want you to leave the carnival.\n \n“Hurry!” you yell to your friends — only three minutes to midnight! You dash off in one direction, then another. The carnival people are approaching from every which way. They carry torches with flames that leap high in the air.\n \nYou steal a glance at your watch — 11:58.\n \n“We can’t let them catch us!” you scream. “Let’s hide!”\n \nBut where can you hide? Up ahead you see a gigantic cannon. All three of you could fit easily in there.\n \nYou also spot a baby ride — the baby choo-choo train — maybe you could squeeze into that. Quick! Pick one — and hope for the best.\n \nDo you choose the cannon or the choo-choo?"
                    },
                    reprompt: {
                        ssml: "Cannon or the choo-choo. Which one will it be?"
                    }
                }
            ]
        },
        forward: {
            ChooChooIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageOneTwentyEightAndSeventyHandler"
                }
            ],
            CannonIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageOneThirtyAndOneOhOneHandlerI"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T15:12:11.915Z",
        name: "Page 127 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageOneTwentySevenHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.061001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageOneTwentyThreeAndTwentyFiveHandler: [
                {
                    name: "Page 123 and 25",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 123 -->\n \n“The Final Challenge,” Big Al announces. And the crowd goes wild.\n \nThen he turns to you and says, “Remember — the fun games are over. Now you are playing for your life.”\n \n“You go first,” Big Al says to you. You see Brad and Patty taken off to the side by a huge man in a black hood.\n \nTwo red-haired goblins in clown costumes scurry up the steps. To your surprise, they fit you with new high-top sneakers — sneakers with metal studs running up the backs. This is going to be some kind of race, you think. But then you change your mind — when they snap a heavy, metal helmet on your head.\n \nThe crowd’s cheers grow louder. Big Al throws a switch. The curtain behind you parts and — \n\n<!--Insert zing sound Fx -->\n\nWhammo! \n\nThe wall behind the curtain turns into a super magnet. You go zinging to the wall like a dart to a bull’s-eye.\n \n<!-- Page 25 -->\n \nSeconds later your head and the back of your feet slam into the wall. You’re hanging upside down — in the middle of a gigantic magnetic wheel with 3 numbers around the edge with “spin again” mixed in around them!\n \n“Are you ready for The Final Challenge?” Big Al asks.\n \n“Of course not!” you say. “LET ME DOWN!”\n \n“We’ll let you down — but not until you face The Final Challenge. One spin will decide your fate. If you win, you go. If you lose, you stay here forever.”\n \nWill that be your fate?\n \nBig Al approaches the wheel.\n \nBrad and Patty are holding on to each other.\n \nYour heart is pounding.\n \nYour hands are sweating.\n \nThis is it. One spin. <!-- Insert wheel spin sound Fx -->\n \nHe gives the wheel — with you on it — a hard turn. Where will it stop? Guess a number between 1 and 3!"
                    },
                    reprompt: {
                        ssml: "Guess a number between 1 and 3!"
                    }
                }
            ]
        },
        forward: {
            "SlideNumberIntent|NumberIntent": [
                {
                    type: "START",
                    intentId: "PageFourtyFourHandler",
                    slotMatch: {
                        name: "number",
                        value: 1,
                        operation: "=="
                    }
                },
                {
                    type: "START",
                    intentId: "PageSeventyFourAndOneThirtyOneAndOneSixteenHandler",
                    slotMatch: {
                        name: "number",
                        value: 2,
                        operation: "=="
                    }
                },
                {
                    type: "START",
                    intentId: "PageSeventyThreeAndOneThirtyOneAndOneSixteenWITHOUTBLOODHandler",
                    slotMatch: {
                        name: "number",
                        value: 2,
                        operation: "=="
                    }
                },
                {
                    type: "START",
                    intentId: "PageOneTwentyFourAndOneTwelveHandler",
                    slotMatch: {
                        name: "number",
                        value: 3,
                        operation: "=="
                    }
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T17:54:55.301Z",
        name: "Page 123 and 25 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageOneTwentyThreeAndTwentyFiveHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.091001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageSeventeenAndEightyFourAndOneTwentyThreeAndTwentyFiveHandler: [
                {
                    outputSpeech: {
                        ssml:
                            "<!--Page 17 -->\n \nYou take a few steps along the midway hoping you’ve won enough prizes and points. You notice the crowd of people surrounding Big Al. They’re still chanting, “PAY OR PLAY. PAY OR PLAY.”\n \nYou break through the crowd and grab Big Al’s arm. “Hey! Do you know where my friends are?”\n \n“Certainly,” Big Al says, pointing up ahead. “They’re right over there!”\n \n“Patty! Brad!” you shout as you rush up to them. “Come on! We’ve got to go! This carnival is evil!”\n \nBut before they can say a word, Big Al’s voice booms from behind you. “Not before The Final Challenge!”\n \n<!--Page 84 -->\n \nBig Al shoves you and your friends into a huge red tent. It seems to be set up for some kind of show. Red carpeted steps lead up to a platform, which sits under a golden arch. The arch twinkles with a thousand colored lights that spell out: FINAL CHALLENGE.\n \nTrumpets blast as people flood into the viewing area. As they march in, they clap their hands and yell, “FI-NAL. FI-NAL.”\n \nBig Al leads you up the carpeted steps. You are standing on the platform now — in front of a shimmering curtain that hangs down from the arch.\n \nThe crowd begins to chant, “SUD-DEN DEATH. SUD-DEN DEATH.”\n \n<!-- In prompt voice -->\n\nWhat do you think that means?"
                    },
                    reprompt: {
                        ssml: " What do you think that means?"
                    }
                }
            ]
        },
        forward: {
            "^((?!(StopIntent|HelpIntent|CancelIntent)).)*$": [
                {
                    intentId: "PageOneTwentyThreeAndTwentyFiveHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-06T14:48:02.884Z",
        name: "Page 17 and 84",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageSeventeenAndEightyFourAndOneTwentyThreeAndTwentyFiveHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.072001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageSeventyFourAndOneThirtyOneAndOneSixteenHandler: [
                {
                    name: "Page 74, 131, 116",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 74 -->\n \n<!-- Insert wheel spin sound Fx -->]\n\nRound and round you go. The world is a blur of colors. You can hear the crowd screaming. “FI-NAL! FI-NAL!”\n \nAnd the wheel stops.\n \n“Ahhhhhh,” the crowd gasps.\n \nWhat does it mean?\n \n“YOU WIN,” Big Al says. “Now come this way to collect your prize and go home.”\n \n<!-- Page 131 -->\n \nSUCKER!\n \nYou didn’t really think you could get out this easily, did you?\n \nIt’s called the Carnival of Horrors.\n \nHorrors! You need to face a lot more horrors — and then maybe you’ll escape.\n \n<!-- Page 116 -->\n \n<!-- Insert zap sound Fx -->]\n\nZAP!\n \nBig Al throws a switch and the magnet shuts off. You come flying down to earth — right where Brad and Patty are waiting.\n \n“I played your dumb game. Now, let us go!” you tell Big Al.\n \nBig Al doesn’t answer. But the crowd does. “SUD-DEN DEATH! SUD-DEN DEATH! SUD-DEN DEATH!”\n \nThe crowd surges toward you. They are not friendly. They back you up against a wall. You’re trapped.\n \nTrapped by a mob!\n \nYou reach into your pocket, hoping to find something that might help you. Something to save you …\n \nyou remember something from earlier that might help, what is it?"
                    },
                    reprompt: {
                        ssml:
                            "You reach into your pocket, hoping to find something that might help you. Something to save you …\n \nyou remember something from earlier that might help, what is it?"
                    }
                }
            ]
        },
        forward: {
            "^((?!(StopIntent|HelpIntent|CancelIntent)).)*$": [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageNinetySevenAndOneTwentyNineHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T18:37:07.775Z",
        name: "Page 74 and 131 and 116 WITH BLOOD Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageSeventyFourAndOneThirtyOneAndOneSixteenHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.066001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageSeventyNineAndSixtySevenHandler: [
                {
                    name: "Page 79 and 67",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 79 -->\n \nThe doctor leans over. He’s so close now, his sour breath fills your nostrils. Then his fingertips brush your hand and — \n\n<!-- Insert foot strike sound Fx -->]\n\nPOW! Your foot flies into his stomach! A direct hit!\n \nBut nothing happens.\n \nHe doesn’t scream. He doesn’t even moan. In fact, he doesn’t seem to notice at all.\n \nHe simply smiles at you.\n \nNow you’re scared. Really scared. But you know you have to do whatever it takes to get out of there. You have to find your friends and escape from this Carnival of Horrors.\n \nYou gather up every ounce of courage and strength you have — and kick him once more. Harder!\n \nAnd this time something does happen — BIG TIME!\n \n<!-- Page 67 -->\n \n<!-- Insert thump sound Fx -->]\n\nThrumpff! Your foot plows into the doctor’s stomach again. But this time, it smashes right through it. And hits … solid steel!\n \nThe crunch of metal echoes in the room — along with the doctor’s screams. “Aiiii!” he wails like a siren.\n \nYou gaze into the gaping hole your sneaker made. Thousands of circuits and wires burn and crackle inside it. The doctor is a robot! Well, an ex-robot now. Your kick totally destroyed him.\n \nThat’s the good news.\n \nThe bad news is headed for you. It’s the monster with the blue horns and red, bulging eyes.\n \nYou scramble out of the net and dash toward the door. But the monster is too quick for you.\n \nDo you try to dodge or fight back?"
                    },
                    reprompt: {
                        ssml: "Do you try to dodge or fight back? "
                    }
                }
            ]
        },
        forward: {
            "^((?!(StopIntent|HelpIntent|CancelIntent)).)*$": [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageSixtySevenAndNinetyOneAndOneTwentyTwoHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T20:48:35.963Z",
        name: "Page 79 and 67 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageSeventyNineAndSixtySevenHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.070001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageSeventyOneHandler: [
                {
                    name: "Page 71 Handler",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 71 -->\n \nSorry. It’s not your lucky day. As you dash toward the sign, the giant crane scoops the three of you up and drops you off into a hollowed-out log. You barely have time to sit up straight before the craft reaches the waterfall!\n \n<!-- Insert water/scream sound Fx -->]\n\nYou hold your breath as the log teeters on the fall’s edge. As it plunges over, you scream.\n \n<!-- Insert water/scream sound Fx -->]\n\nA hard spray smacks you in the face and drenches your clothing as you race down the long slide. At the bottom, the log hits a pool of water and sinks.\n \nYou’re still holding your breath as you wait to bob to the surface again. But it never happens. You keep going down.\n \nYour last thought is that you’re going to set a world’s record for holding your breath underwater. Maybe next time you dive in you’ll have better luck.\n \nThe end."
                    }
                }
            ]
        },
        forward: {},
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T17:18:39.782Z",
        name: "Page 71 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageSeventyOneHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.056001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageSeventySixHandler: [
                {
                    name: "PAge 76",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 76 -->\n \nYou dig deep into the side pocket of your jeans — and find it! The chocolate bar you won.\n \nIt’s a good thing you didn’t eat it all — but will the vulture go for it?\n \nWithout warning, the big bird starts his final approach, diving straight for the nest. You pull out the candy and wave it frantically in front of him. “Treat! Treat!” you holler. These words make your dog at home go wild. But will it work on the vulture?\n \nYes! He cracks open his claws — just enough for you to wiggle loose. Then you’re falling, falling.\n \nYou’ve landed on a giant trampoline.\n \n<!-- Insert trampoline sound Fx -->]\n\nFwanggg!\n \nNow you’re going up again. Higher this time. Now you’re falling again.\n \n<!-- Insert trampoline sound Fx -->]\n\nFwanggg — you’ve bounced up even higher this time.\n \nEvery life has its ups and downs, but it looks as if you’ll be bouncing up and down forever — and boy, is it fun!\n \nThe end."
                    }
                }
            ]
        },
        forward: {},
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-09T19:24:23.536Z",
        name: "Page 76 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageSeventySixHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.062001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageSeventyThreeAndOneThirtyOneAndOneSixteenWITHOUTBLOODHandler: [
                {
                    name: "Page 74 and 131 and 116 ",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 74 -->\n \n<!-- Insert weel spin sound Fx -->]\n\nRound and round you go. The world is a blur of colors. You can hear the crowd screaming. “FI-NAL! FI-NAL!”\n \nAnd the wheel stops.\n \n“Ahhhhhh,” the crowd gasps.\n \nWhat does it mean?\n \n“YOU WIN,” Big Al says. “Now come this way to collect your prize and go home.”\n \n<!-- Page 131 -->\n \nSUCKER!\n \nYou didn’t really think you could get out this easily, did you?\n \nIt’s called the Carnival of Horrors.\n \nHorrors! You need to face a lot more horrors — and then maybe you’ll escape.\n \n<!-- Page 116 -->\n \n<!-- Insert zap sound Fx -->]\n\nZAP!\n \nBig Al throws a switch and the magnet shuts off. You come flying down to earth — right where Brad and Patty are waiting.\n \n“I played your dumb game. Now, let us go!” you tell Big Al.\n \nBig Al doesn’t answer. But the crowd does. “SUD-DEN DEATH! SUD-DEN DEATH! SUD-DEN DEATH!”\n \nThe crowd surges toward you. They are not friendly. They back you up against a wall. You’re trapped.\n \nTrapped by a mob!\n \nSing a line from your favorite song to get the mob to leave you alone."
                    },
                    reprompt: {
                        ssml: "Sing a line from your favorite song to get the mob to leave you alone."
                    }
                }
            ]
        },
        forward: {
            "^((?!(StopIntent|HelpIntent|CancelIntent)).)*$": [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageTwentySevenAndFiftyFiveHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-09T16:33:23.335Z",
        name: "Page 74 and 131 and 116 WITHOUT BLOOD Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageSeventyThreeAndOneThirtyOneAndOneSixteenWITHOUTBLOODHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.073001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageSeventyThreeHandler: [
                {
                    name: "Page 73",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 73 -->\n \nYour reflexes are great. You jumped out fast enough and escaped the ghost — that ghost. But you didn’t see the other one behind the car — waiting for you.\n \nYour heart hammers away in your chest as it circles you. Around and around and around.\n \n“It’s all right,” you tell yourself over and over. “It’s not real. This is just a ride in an amusement park.”\n \nYou’re still telling yourself that as the ghost plucks you off your feet.\n \nHis black lips part.\n \nHe opens his mouth — wider and wider. Until it’s as wide as an entrance to a cave.\n \nThen he stuffs you inside.\n \nInstantly, you feel lightheaded, then light all over. You peek down at your hands.\n \nYou can see straight through them. You’ve been turned into a ghost! And as your senses fade, you hear a distant bell chime twelve times. Too bad. The Carnival of Horrors will be one of your favorite haunts — forever!\n \nTHE END."
                    }
                }
            ]
        },
        forward: {},
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T15:08:18.764Z",
        name: "Page 73 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageSeventyThreeHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.072001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageSixHandler: [
                {
                    name: "Page 6-7",
                    outputSpeech: {
                        ssml:
                            "<!--Page 6 -->\n \n“Let’s do it!” you say to your friends. “Let’s climb the fence!”\n \nPatty is halfway up before you finish speaking. You let Brad go next. You’re last.\n \n<!-- Insert climbing sound Fx -->]\n\nIt’s a hard climb up. There’s really no place on the fence to get a good grip. But you make it to the top, swing your legs over, and tumble down. You land on the grass. You’re inside!\n \n<!-- Insert carnival sound Fx -->]\n\nYou and your friends gaze around. It’s pretty dark — the only light comes from torches. At first the carnival looks the same as it always does. Dinky rides. Hot dog wagons. Then the lights start to flicker on in every corner of the field — the rides start to move. It’s as if the whole place is magically coming to life.\n \n“Hey! Look at that giant roller coaster!” you exclaim, pointing up ahead. “They never had a roller coaster before!”\n \n“Yeah,” Brad agrees. “And the whole place is a lot bigger than last year!”\n \n“This is awesome!” Patty says as she sprints toward the rides.\n \n<!-- Page 7 -->\n \nYou and Brad take off after Patty. You all stop in front of the roller coaster.\n \n<!-- Insert carnival sound fx -->\n\n“Wow!” Patty says as she gazes up at it. “It’s like a rocket to outer space!”\n \nBeyond the roller coaster, you spy a castle surrounded by a moat. And a spooky-looking haunted house sitting high atop a hill.\n \n“These are the coolest rides I’ve ever seen!” you say. “They still have that dumb choo-choo train over there,” you point out, “but we could ride this stuff all night and never go near it!”\n \nPatty grabs your arm and tugs you over to the other side of the carnival — to the midway. Brad races after you.\n \n“Hey! Where are all those dinky wooden booths from last year?” you ask as you gawk at the amazing games of chance.\n \nThey’re gone. And in their place are giant video games and huge spinning wheels studded with hundreds of blinking colored lights!\n \n“Get a load of that!” Brad suddenly cries out.\n \nYou and Patty spin around.\n \nYou can’t believe what you see!\n \n<!-- Page 87 -->\n \nYou’re staring at a sign that reads: WORLD’S FREAKIEST FREAK SHOW! The three of you gape at the pictures.\n \nThere’s the Three-Headed Man with the ugliest collection of faces you’ve ever seen. And the Snake Lady — a young blond girl with a beautiful face and the body of a slithering snake.\n \n“This is, uh — uh —” you start to say. But you don’t finish. Because a large hand has come down on your shoulder. Hard.\n \nYou slowly turn and gaze up at a huge man with shoulders wider than a refrigerator. He has coal-black eyes with a thick mustache to match. He looks strong enough — and mean enough — to pitch you over the fence with one hand.\n \n“What are you doing?” his deep voice booms. “You’re not allowed in here,” he says, pointing directly at you.\n \nYou’re sorry. Give your best apology and hope they accept it.\n"
                    },
                    reprompt: {
                        ssml: "You’re sorry. Give your best apology and hope they accept it."
                    }
                }
            ]
        },
        forward: {
            "^((?!(StopIntent|HelpIntent|CancelIntent)).)*$": [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageFourHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-06-28T16:56:08.358Z",
        name: "Page 6 and 7 and 87 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageSixHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.074001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageSixtyEightHandler: [
                {
                    outputSpeech: {
                        ssml:
                            "<!-- Page 68 -->\n \nYou slowly lower yourself onto the slide. You start to stretch out your legs when the bottom tilts underneath you and throws you forward. \n\n<!-- Insert slide sound Fx -->]\n\nYou’re sliding! Fast!\n \nThe surface must be made of some kind of special material because you’re zooming down at top speed.\n \nYou hold your breath as you fly through the blackness. A bump sends you bouncing into the air. \n\n<!-- Insert scream sound Fx -->]\n\nYou scream. And scream.\n \nWhen is it going to end?\n \nOh, no! Could this be the Doom Slide?\n \n<!-- Insert scream sound Fx -->]\n\nYou hear screams echo in the darkness. You twist around. But you don’t see anyone.\n \nThe ghostly screams grow louder — in front of you, next to you, behind you. Screaming and sliding. And sliding. Never stopping.\n \nYou gasp for breath. And then you hear it.\n \nA voice cuts through the blackness. Through the screams. A voice that cries, “Welcome to the rest of your life. Welcome to the Doom Slide!”\n \nThe End."
                    }
                }
            ]
        },
        forward: {},
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-02T20:07:18.692Z",
        name: "Page 68 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageSixtyEightHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.070001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageSixtyFourHandler: [
                {
                    name: "Page 64",
                    outputSpeech: {
                        ssml:
                            "The House of Horrors! You have to see it. You just have to!\n \n“I’ll catch up with you guys later,” you call to Patty and Brad. “I’m going to check out the haunted house.”\n \nYou glance down at your map for directions. The rickety wooden bridge over to your left appears to lead straight there.\n \n<!-- Insert plank sound Fx -->]\n\nAs you start across the bridge, the wooden planks creak under your feet. Then the bridge begins to sway. You look down. Way down. The bridge spans a deep, rocky gorge. Gulping, you grab the handrail. You move slowly. A strong wind blows up from the canyon below. The bridge is swaying wildly now, tossing from side to side.\n \n<!-- Insert lightning sound Fx -->]\n\nA massive spear of lightning splits the sky. Thunder rumbles so loudly you jump and lose your balance. “Help!” you scream as you tumble right over the side — and plunge toward the jagged rocks below!\n \nDo you grab for the side of the bridge or flap your arms to try to fly?"
                    },
                    reprompt: {
                        ssml: "Do you grab for the side of the bridge or flap your arms to try to fly?"
                    }
                }
            ]
        },
        forward: {
            FlapYourArmsIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageThirtyHandler"
                }
            ],
            GrabTheSideOfTheBridgeIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageFortySixHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T17:53:41.738Z",
        name: "Page 64 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageSixtyFourHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.099001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageSixtyNineFortuneTellerHandler: [
                {
                    name: "Page 68",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 69 -->\n \n“Karru marri odonna loma molonu karrano.” You say the magic words and — the dummy comes to life!\n \nHe opens his mouth and speaks. “Hey, you. Your face reminds me of a wart I once had removed.”\n \n“Come on,” you plead. “We’re the ones who brought you back to life. Aren’t you going to be nice to us? We need your help.”\n \n“I’m sorry,” the dummy says. “I’m sorry you’re so ugly….” Then he laughs at his own lame joke.\n \nYou stare at him and his face grows serious. “You brought me to life,” he says slowly, “but now you are mine.\n \n“Forever — until …\n \nWait!  This isn’t the way this is supposed to end.  Quick – you have one last chance.  What was the number the fortune-teller told you?"
                    },
                    reprompt: {
                        ssml: "What was the number the fortune-teller told you?"
                    }
                }
            ]
        },
        forward: {
            OneThreeTwoIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageOneThirtyTwoAndTwentyOneHandler"
                }
            ],
            "^((?!(StopIntent|HelpIntent|CancelIntent)).)*$": [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageSixtyNineTheEndIntent"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-09T16:40:07.011Z",
        name: "Page 69 Seen the Fortune Teller Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageSixtyNineFortuneTellerHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.075001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageSixtyNineHandler: [
                {
                    name: "Page 69",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 69 -->\n \n“Karru marri odonna loma molonu karrano.” You say the magic words and — the dummy comes to life!\n \nHe opens his mouth and speaks. “Hey, you. Your face reminds me of a wart I once had removed.”\n \n“Come on,” you plead. “We’re the ones who brought you back to life. Aren’t you going to be nice to us? We need your help.”\n \n“I’m sorry,” the dummy says. “I’m sorry you’re so ugly….” Then he laughs at his own lame joke.\n \nYou stare at him and his face grows serious. “You brought me to life,” he says slowly, “but now you are mine.\n \n“Forever — until …\n \nThe end."
                    }
                }
            ]
        },
        forward: {},
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T17:35:53.145Z",
        name: "Page 69 No Fortune Teller Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageSixtyNineHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.090001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageSixtyNineTheEndIntent: [
                {
                    name: "Page 69 Actual End",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 69 -->\n\nThe Fortune Teller told you to remember that number. It’s almost like they could see the future. Too bad you couldn’t. All you’re going to see is…\n \nTHE END"
                    }
                }
            ]
        },
        forward: {},
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-11T15:26:35.773Z",
        name: "Page 69 The End",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageSixtyNineTheEndIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.095001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageSixtySevenAndNinetyOneAndOneTwentyTwoHandler: [
                {
                    name: "Page 67, 91 and 122",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 67 -->\n \n<!-- Insert struggle sound fx -->\n\n His tentacle arms shoot out and snatch you. Giant suckers at the ends of his wrists circle your throat.\n \nYou gasp for air as the monster pins you against the wall. Can you free yourself from his oozing grasp?\n \n<!-- Page 91 -->\n \nThe red-eyed beast leans against you now, pressing you hard against the wall. The monster moves his face close to yours. The jagged horns at the top of his head nick your cheeks.\n \n<!-- Insert struggle sound fx -->\n\nYou can’t bear it anymore. You bring your hand up with all your might and shove his head away from yours.\n \nAs you watch in horror, the monster’s head rolls off its neck. The head tumbles to the floor and lands at your feet.\n \nThe eyes glance up at you, and you notice his hideous lips moving. “That hurt,” the head says. “That really h-h- …”\n \nHe never finishes. You’ve destroyed another robot!\n \n“Almost out of here,” you whisper to yourself. Now all you have to do is slip by the crusty, alligator-snout creature guarding the door.\n \n“You robots aren’t so tough,” you say to him with fake bravery.\n \n“Oh, really?” the scaly beast croaks. “Well, maybe not. But what makes you think that I am a robot?”\n \n<!-- Page 122 -->\n \nThe creature slides one step toward you, and with a burning stare says, “I am not a robot. I am not going to shut down. So don’t bother with any of your silly, human tricks!”\n \nYou stare at him. You study him hard. Is he lying? Is he a robot like the other two? Or could he be a lot more dangerous?\n \nYour knees begin to tremble when you think about never going home — never seeing your family and friends ever again. Tears start to sting your eyes. Angry tears! No carnival — not even a Carnival of Horrors — is going to defeat you!\n \nYou stare deeply into the evil eyes of the creature hovering before you.\n \nDo you think the creature is a robot or a real monster?"
                    },
                    reprompt: {
                        ssml: "Do you think the creature is a robot or a real monster?"
                    }
                }
            ]
        },
        forward: {
            RobotIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageEightyOneHandler"
                }
            ],
            RealMonsterIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageOneTenHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T20:53:41.842Z",
        name: "Page 67 and 91 and 122 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageSixtySevenAndNinetyOneAndOneTwentyTwoHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.071001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageSixtySixAndEightyHandlerIntent: [
                {
                    name: "Page 66 and 80",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 66 -->\n \nYou start up the brick path to the House of Horrors. Suddenly, someone sneaks up behind you and taps you on the shoulder. You spin around and jump back.\n \nStanding in front of you is a bony skeleton.\n \nAnd it talks.\n \n“Don’t go in there,” the skeleton says. “Or you’ll end up like me….”\n \nYou stare in terror at the hideous creature. Then you burst out laughing.\n \n“Wow! You guys really want to make the haunted house totally creepy. This is going to be great!” you say.\n \nYou’re still chuckling as you push open the giant oak door of the House of Horrors. \n\n<!-- Insert creaking sound Fx -->]\n\nIt swings back with a long, loud creak.\n \nYou step inside and find yourself in a narrow hallway. The door slams shut behind you and the hall turns darker than a starless night. “I can’t even see my hands!” you exclaim.\n \nYou stumble ahead slowly, pressing your palms against the walls to guide you.\n \nWhen will this tunnel end?\n \n<!-- Page 80 -->\n \nYou turn a corner and are instantly blinded by glaring lights.\n \nYou are standing in a room of mirrors. Walls. Floor. Ceiling. All mirrors!\n \nEverywhere you gaze, you are met with reflections of yourself! You take a few steps forward and — \n\n<!-- Insert bonk sound Fx -->]\n\nBONK! You hit your head on solid glass.\n \nYou move one step to the left, and a dozen copies of you move in that direction.\n \nTotally dizzy, you close your eyes. Maybe you can find the exit with your hands. Keeping your eyes shut, you walk until your palms hit against another glass wall. Then you hear a voice. “Come this way. Over here,” it calls.\n \nYou walk toward the voice — \n\n<!-- Insert bonk sound Fx -->]\n\nBONK — a solid wall again.\n \nFinally, your hands find an open doorway! It leads to a mirrored hallway that goes left and right.\n \nDo you go left or right?"
                    },
                    reprompt: {
                        ssml: "Do you go left or right?"
                    }
                }
            ]
        },
        forward: {
            TurnRightIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageTwentyNineAndSixtyFiveAndThirtyOneHandler"
                }
            ],
            TurnLeftIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageOneEighteenHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T18:36:15.163Z",
        name: "Page 66 and 80 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageSixtySixAndEightyHandlerIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.101001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageSixtyTwoHandler: [
                {
                    outputSpeech: {
                        ssml:
                            "<!-- Page 62 -->\n \n“Big Al has to free the freaks,” you say to Patty and Brad. “If he doesn’t, we’ll tell him we’re calling the police!”\n \n“Free the freaks?” Big Al says, bursting into the room. “The freaks are free to go any time. This prison is just part of the show. Did you pull that ‘free us’ joke on him?” Big Al laughs heartily.\n \n“He’ssss lying,” the Snake Lady says. “We’re prisonersssss.”\n \n“Oh, come now,” Big Al says. “You’re not prisoners.” And with that he unlocks all the cell doors. Then he turns to you and your friends.\n \n“As you can see, the freaks are free. Now, come with me. You haven’t even tried one game on the midway.”\n \n“Don’t go with him. It’sssss a trick!” the Snake Lady cries.\n\n Do you believe Big Al or the Snake Lady?"
                    },
                    reprompt: {
                        ssml: "Do you believe Big Al or the Snake Lady?"
                    }
                }
            ]
        },
        forward: {
            AlIsTellingTheTruthIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageEightyFourHandler"
                }
            ],
            SnakeLadyIsTellingTheTruthIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageOneOhTwoAndOneTwentyHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T20:10:37.346Z",
        name: "Page 62",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageSixtyTwoHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.074001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageTenHandler: [
                {
                    name: "Page 10 and 6 and 7",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 10 -->\n \nYou’ve decided not to sneak into the carnival? You’re going home instead? Well, it’s a good thing Patty usually makes all the decisions. Otherwise, you’d never have any fun! And this adventure would be over before it began!\n \nGo ahead. Take a deep breath. Then go climb the fence. You’re not scared — are you?\n \n<!-- Page 6 -->\n \nYou finally muster up the courage:\n \n“Let’s do it!” you say to your friends. “Let’s climb the fence!”\n \nPatty is halfway up before you finish speaking. You let Brad go next. You’re last.\n \n<!-- Insert climbing sound Fx -->\n \nIt’s a hard climb up. There’s really no place on the fence to get a good grip. But you make it to the top, swing your legs over, and tumble down. You land on the grass. You’re inside!\n \nYou and your friends gaze around. It’s pretty dark — the only light comes from torches. At first the carnival looks the same as it always does. Dinky rides. Hot dog wagons. Then the lights start to flicker on in every corner of the field — the rides start to move. It’s as if the whole place is magically coming to life.\n \n“Hey! Look at that giant roller coaster!” you exclaim, pointing up ahead. “They never had a roller coaster before!”\n \n“Yeah,” Brad agrees. “And the whole place is a lot bigger than last year!”\n \n“This is awesome!” Patty says as she sprints toward the rides.\n \n<!--Page 7-->\n \nYou and Brad take off after Patty. You all stop in front of the roller coaster.\n \n“Wow!” Patty says as she gazes up at it. “It’s like a rocket to outer space!”\n \nBeyond the roller coaster, you spy a castle surrounded by a moat. And a spooky-looking haunted house sitting high atop a hill.\n \n“These are the coolest rides I’ve ever seen!” you say. “They still have that dumb choo-choo train over there,” you point out, “but we could ride this stuff all night and never go near it!”\n \nPatty grabs your arm and tugs you over to the other side of the carnival — to the midway. Brad races after you.\n \n“Hey! Where are all those dinky wooden booths from last year?” you ask as you gawk at the amazing games of chance.\n \nThey’re gone. And in their place are giant video games and huge spinning wheels studded with hundreds of blinking colored lights!\n \n“Get a load of that!” Brad suddenly cries out.\n \nYou and Patty spin around.\n \nYou can’t believe what you see!\n \n<!-- Page 87-->\n \nYou’re staring at a sign that reads: WORLD’S FREAKIEST FREAK SHOW! The three of you gape at the pictures.\n \nThere’s the Three-Headed Man with the ugliest collection of faces you’ve ever seen. And the Snake Lady — a young blond girl with a beautiful face and the body of a slithering snake.\n \n“This is, uh — uh —” you start to say. But you don’t finish. Because a large hand has come down on your shoulder. Hard.\n \nYou slowly turn and gaze up at a huge man with shoulders wider than a refrigerator. He has coal-black eyes with a thick mustache to match. He looks strong enough — and mean enough — to pitch you over the fence with one hand.\n \n“What are you doing?” his deep voice booms. “You’re not allowed in here,” he says, pointing directly at you.\n \nYou’re sorry. Give your best apology and hope he accepts it."
                    },
                    reprompt: {
                        ssml: "You’re sorry. Give your best apology and hope they accept it."
                    }
                }
            ]
        },
        forward: {
            "^((?!(StopIntent|HelpIntent|CancelIntent)).)*$": [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageFourHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-06-28T19:03:37.330Z",
        name: "Page 10 and 6 and 7 and 87",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageTenHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.089001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageThirthyNineAndNinetyFourHandlerIntent: [
                {
                    name: "Page 39 and 94",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 39 -->\n \n<!-- insert coaster sound fx -->\n\nIt’s a loop-the-loop. Your mouth drops open to scream, but no sound comes out.\n \nNow your car starts to plunge downward — like an elevator out of control. Your heart pounds in your chest. This is the fastest and best roller coaster you’ve ever been on! As you near the bottom, you slow down. You begin to catch your breath. And then you see what’s up ahead. A huge black hole — a tunnel!\n \nAs you shoot toward the open mouth of the tunnel, you begin to scream again. The door of the tunnel is about to close!\n \n<!-- insert door sound fx -->\n\nSnap! The door comes crashing down — behind your car. You breathe out a long sigh. But now you’re in a tunnel so dark that you can’t see a thing.\n \nScary! But not nearly as scary as what happens next.\n \n<!--Page 94 -->\n \nThe ride stops.\n \nDead.\n \nYou are sitting in the dark.\n \nNothing is moving.\n \n“Patty! Brad!” you call.\n \nSilence.\n \nWhy don’t they answer? They have to be there.\n \nYou try to twist around. But you’re locked in your harness and clamped in your headrest.\n \nBlinking in the dim light, your eyes dart to the left. Then to the right. You spot dozens of empty space rockets lining the walls. They seem to come in sections, making longer and shorter space rockets.\n \nYour mind starts working feverishly. Did your section detach from Patty and Brad’s section?\n \nSuddenly, the silence is shattered. Your seat lock grinds open, and you are released from your harness. You quickly spin around. Patty’s and Brad’s cars have disappeared! If this is all part of the ride, maybe you should hop out. But if the ride is broken, maybe you should wait for help.\n \nDo you wait for help to come or hop out of the car?"
                    },
                    reprompt: {
                        ssml: "Do you wait or hop out of the car?"
                    }
                }
            ]
        },
        forward: {
            WaitForHelpToComeIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageNinetyTwoHandler"
                }
            ],
            HopOutOFTheCarIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageOneElevenHandlerIntent"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-02T18:06:25.835Z",
        name: "Page 39 and 94 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageThirthyNineAndNinetyFourHandlerIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.098001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageThirtyEightHandler: [
                {
                    name: "Page 38",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 38 -->\n \n<!-- insert wheel spin sound fx -->\n \n“Got a winner, got a winner,” the parrot squawks. “You’ve won twenty-five points, plus anything you want in the prize room. Step this way.”\n \nEagerly, you follow the bird into a storeroom behind the booth. It’s packed with the weirdest assortment of junk you’ve ever seen. Dusty old catalogs, stuffed rats, a collection of axes, and portraits of headless people holding their own heads!\n \n“So pick something. It’s getting late,” the parrot says.\n \nNot this garbage, you think. Then you spot a shelf of small cans with bright labels: PLAY AND GLOW, CLAY SLIME, and MONSTER BLOOD. Monster Blood? Hey, isn’t that the magic stuff you read about in GOOSEBUMPS?\n \n“I’ll take the Monster Blood,” you decide.\n \n“Excellent choice,” the parrot remarks.\n \nAs you quickly leave the room with your prize, you wonder, is twenty-five points enough?\n \nDo you want to spin again?"
                    },
                    reprompt: {
                        ssml: "Do you want to spin again?"
                    }
                }
            ]
        },
        forward: {
            NoIntent: [
                {
                    type: "START",
                    intentId: "MissionToMarsPageSeventyTwoHandler"
                },
                {
                    type: "START",
                    intentId: "PageSeventeenAndEightyFourAndOneTwentyThreeAndTwentyFiveHandler"
                }
            ],
            YesIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "WheelOfChancePageEightHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-09T19:55:46.261Z",
        name: "Page 38 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageThirtyEightHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.086001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageThirtyHandler: [
                {
                    name: "Page 30",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 30 -->\n \nYou’re falling … falling … You can’t think of anything else to do, so you start flapping your arms like a bird.\n \n<!-- Insert sound Fx --> \n\nAt that moment a huge gust of air shoots up from under you and blows you back onto the bridge.\n \nBreathing hard, you run the rest of the way across the rickety span. When you reach the safety of the other side, you glance back. And gasp! The bridge and the midway beyond it have vanished! Only a black void remains!\n \n“Wow! Awesome special effects!” you cry out loud. But was your fall part of the special effects, too? It didn’t feel like it.\n \nYou spin around to face the House of Horrors. Up close it appears really, really creepy. Cobwebs drip down from its roof and an eerie yellow light glows inside. Cool! Next to the house you spot a sign that reads BOAT TRIP TO NOWHERE. There are amazing speedboats that you can drive yourself.\n \nDo you go to the boat trip to nowhere or to the house of horrors?"
                    },
                    reprompt: {
                        ssml: "Boat trip to nowhere or house of horrors, which do you try first?"
                    }
                }
            ]
        },
        forward: {
            HouseOfHorrorsIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageSixtySixAndEightyHandlerIntent"
                }
            ],
            BoatTripToNowhereIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageEightyEightAndThirtyTwoHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T18:19:53.754Z",
        name: "Page 30 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageThirtyHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.094001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageThirtyOneAndEightyNineHandler: [
                {
                    name: "Page 31 and 89",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 31 -->\n \nYou are facing a short man with wrinkly skin and bloodshot eyes. His bushy black hair resembles a scouring pad — and from the looks of it, it probably feels like one, too. His evil expression makes you cringe.\n \nBut he’s nothing compared to the “things” in back of him — two seven-foot-tall monsters. One has blue horns and bulging red eyes. The other has scaly skin and an alligator snout that snaps open and closed as he eyes you.\n \nThe trio all wear lab coats. And from the eager way they’re looking at you, you realize that you are the lab rat.\n\n<!-- Insert struggle sound fx -->\n \nYou struggle to escape from the net. But you’re trapped in the webbing. Like a fly in a spider’s web.\n \n“Welcome to my humble laboratory,” the short man says. “I am Dr. Frank N. Stone, the mastermind who created the Carnival of Horrors.”\n \nThe Carnival of Horrors! You don’t like the sound of that!\n \n<!-- Page 89 -->\n \nDr. Stone extends a long bony hand to pull you from the net. When you peer into his face, his eyes roll up into his head.\n \n“Pleased to meet you,” he rumbles.\n \nDid he say, “Pleased to meet you” or “Pleased to eat you”? You’re not sure, and you don’t want to hang around to find out.\n \nI’ve got to get out of here, you think.\n \nAs the doctor lowers his hand a bit more, you wriggle your right foot free of the netting. If you give him one hard kick in the stomach, maybe you can make a run for the door.\n \nBut what about the monsters? Can you dodge them?\n \nYou change your mind. “I’ll wait — play it cool until at least one of the beasts leaves the room,” you say to yourself.\n \nThen you change your mind again. “No. I’d better make my escape now!”\n \nThe doctor looms inches away. And you’re still not sure what to do. You’d better decide fast!\n \nDo you try to kick the doctor or wait until one of the monsters leaves to better your odds?"
                    },
                    reprompt: {
                        ssml:
                            "Do you try to kick the doctor or wait until one of the monsters leaves to better your odds?"
                    }
                }
            ]
        },
        forward: {
            WaitUntilMonsterLeavesIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageFiftyOneHandler"
                }
            ],
            KickTheDoctorIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageSeventyNineAndSixtySevenHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T18:47:01.722Z",
        name: "Page 31 and 89 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageThirtyOneAndEightyNineHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.091001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageThirtySevenAndNinetyThreeHandler: [
                {
                    name: "Page 37 and 93 and 26 and 58",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 56 -->\n \n<!-- Insert bat sound fx --> \n\nA huge bat!\n \n<!-- Page 37 -->\n \n<!-- Insert bat sound fx --> \n\nYou cover your head with your hands and try to run into a thick grove of trees. But the bat circles in front of you and dives again.\n \n“Stop it! Stop it!” you scream.\n \nAs you turn and race toward some low bushes, you remember the stories — the horrible stories about bats making nests in people’s hair. And the only way to get them out was to shave your head….\n \nThose stories weren’t true — were they?\n \nYou spot a big stick in the wet dirt and scoop it up.\n \n<!-- insert swoosh sound fx -->\n\nThe bat swoops down at you once more and — FWAP! You hit it.\n \nThe bat falls to the ground.\n \nAnd you see it’s on a wire.\n \nIt’s a mechanical bat.\n \nAll part of the ride, you think. You think about the boat ride. Boy, they really make things seem real at this carnival, you think. You feel much better when you gaze up ahead. There’s a clearing.\n \nBut when you see what’s there — you scream!\n \n<!-- Page 93 -->\n \nWhat a sight!\n \nYou can hardly believe your eyes!\n \nYou scream again.\n \nIt’s Patty and Brad!\n \n<!-- Page 26 -->\n \n“Hey, wait up!” you yell to Brad and Patty as you sprint through the Space Coaster gate.\n \nThey both ignore you and charge straight ahead. You follow them into a narrow tunnel that leads to the boarding area.\n \nYou gaze down at the floor. Black rubber. It makes you walk with a strange bounce.\n \nEvery few feet there is a round porthole window. When you glance out one, you see astronauts planting flags on the moon. You peer out another. Now they’re seated in their capsule. This is amazing, you think. The figures look real. Totally real.\n \nAfter a long climb, you and Patty and Brad finally arrive at the loading area.\n \nA sleek bullet-shaped capsule whooshes up and stops right beside you. It has three sections. Brad climbs defiantly into the last section. You leap into the front. Patty’s left with the middle section.\n \nAnd suddenly you’re trapped!\n \n<!-- Page 58 -->\n \n<!-- insert steel bars sound fx -->  \n\nSteel bars plunge down from above and drop across your lap and chest, pinning you in place. You can’t move at all. Even your head is held by superstrong headphones that clamp over your ears. A voice comes through them announcing: “Five, four, three, two, one, BLAST OFF!”\n \n<!-- insert bang sound fx --> \n\nYou hear a huge bang. Smoke and fireworks fill the air as your car starts up the first big hill. Your head presses back against the seat as you climb higher and higher. That first hill is endless, but the view is awesome. From the top, you can see the midway, the haunted house, and a shadowy swamp. You can’t believe how big the carnival is!\n \n“Neat!” Patty yells. “There’s AHHHH —”\n \nWhatever she was going to say turns into a wild scream as the rocket plunges down the other side of the hill. The wind whips at your face. You are pressed back so hard, you feel like a pancake. Everything passes in a fantastic blur.\n \nAs your car shoots up to the top of the next hill, you’re laughing and screaming at the same time. This is great, you think! But then you make a big mistake.\n \n<!-- Page 39 -->\n \nYou close your eyes. When you open them, your car lunges forward with a burst of speed.\n \nwhat are you most scared of?"
                    },
                    reprompt: {
                        ssml: "What are you most scared of?"
                    }
                }
            ]
        },
        forward: {
            "^((?!(StopIntent|HelpIntent|CancelIntent)).)*$": [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageThirthyNineAndNinetyFourHandlerIntent"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T19:40:07.144Z",
        name: "Page 37 and 93 and 26 and 58 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageThirtySevenAndNinetyThreeHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.101001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageThirtyThreeHandler: [
                {
                    name: "Page 33",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 33 -->\n \nYou glance once more at the goblin. He lets out an evil cackle. That’s it — there’s no way you can trust him. \n\n<!--Insert music sound Fx -->   \n\nBesides, you can hear music up ahead. You’re sure you must be near an exit.\n \n“No, thanks. I don’t need any help,” you mumble again.\n \nHe shrugs. “Oh, yes, you do,” he says. But then he sprints off.\n\n<!--Insert music sound Fx -->   \n \nYou walk in the direction of the music. But after five minutes, you realize that you’re not getting anywhere.\n \nMaybe you should have followed the goblin. You start to think about Patty and Brad. Are they okay? you wonder.\n \nJust when you think you’ll be wandering these tunnels for the rest of your life, the passageway ends! Now you’re facing two doors — one red and one blue.\n \nDo you try the blue door or the red door?"
                    },
                    reprompt: {
                        ssml: "Do you try the blue door or the red door?"
                    }
                }
            ]
        },
        forward: {
            BlueDoorIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageFiftySevenAndOneThirtyFiveHandler"
                }
            ],
            RedDoorIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageOneOhFourAndSixtyOneHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T20:21:01.742Z",
        name: "Page 33 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageThirtyThreeHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.092001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageThreeHandler: [
                {
                    name: "Page Three Handler",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 3 -->\n \n<!--insert carnival sound fx --> \n\nAs you reach the carnival entrance, you hear music coming from inside. Not the usual corny organ stuff they always play. But some really strange music. It sounds familiar and totally new at the same time.\n \nBrad stretches his neck to try to peer over the fence. But no luck. The fence is way too high.\n \nPatty jiggles the padlock on the gate. It’s sealed shut.\n \n“I guess we’ll have to wait until tomorrow night when the carnival opens,” Brad says.\n \n“No way,” Patty says. “Let’s climb the fence. Now!”\n \n“Are you crazy?” Brad says. “We’ll get caught!”\n \n“Come on. There’s probably no one in there,” Patty replies.\n \nYour friends turn to you to cast the deciding vote. You glance at your watch. It’s almost 9:00 P.M. If you’re going to get home in time, you should start back now.\n \nDo you go home or climb the fence?"
                    },
                    reprompt: {
                        ssml: "Do you go home or climb the fence?\n"
                    }
                }
            ]
        },
        forward: {
            GoHomeIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageTenHandler"
                }
            ],
            ClimbTheFenceIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageSixHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-06-28T15:22:15.468Z",
        name: "Page 3 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageThreeHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.879001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageTwelveHandler: [
                {
                    name: "Page 12",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 12 -->\n \nYou run to the right. “Follow me!” you cry out to Patty and Brad.\n\n<!-- Insert running footsteps sound fx --> \n \nYou run faster than you’ve ever run in your life. Your sides ache, but you keep on going.\n \nWhen your chest feels as if it’s about to burst, you finally stop. And hear a crash behind you. Then at both sides of you. Then in front of you. Trapping you.\n \n“Welcome to the Reptile’s Petting Zoo,” a deep voice echoes through the darkness.\n \nReptile’s Petting Zoo? You thought the sign said Reptile Petting Zoo.\n \n“Our alligator has been so lonely,” the deep voice continues. “Waiting and waiting — for his new pets to arrive. And here you are — finally.”\n \nThe end."
                    }
                }
            ]
        },
        forward: {},
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T17:42:55.960Z",
        name: "Page 12 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageTwelveHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.878001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageTwentyEightHandler: [
                {
                    name: "Page 28",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 120 -->\n \nAnd then you get a big idea!\n \n<!-- Page 28 -->\n \nYou’re going to embarrass the giant into helping you.\n \n“Hey, you. You know, you’re a real wimp,” you say to the giant.\n \nHe looks at you as if he can’t believe what he hears.\n \nPatty and Brad look at you as if you’re crazy.\n \nMaybe you are.\n \n“You wimp,” you continue. “You sit here all day, taking orders from that creep, Big Al. And you live in these horrible conditions. Why? Because you’re a wimp and you refuse to fight back. You could bend those bars and escape — but you won’t. Because you are a wimp — W-I-M-P — wimp.”\n \nThe giant stands. You gaze up. He’s over fifteen feet tall. He lumbers over to you. He isn’t smiling.\n \nIs your plan going to work? Is he going to bend the bars to prove you wrong? Or is he going to bend you?\n \nIt’s out of your control now.\n \nLook out of your window.  Is the sun shining?"
                    },
                    reprompt: {
                        ssml: "Look out of your window.  Is the sun shining?"
                    }
                }
            ]
        },
        forward: {
            NoIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageEightyFiveHandler"
                }
            ],
            YesIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageFortyFiveAndNinetyEightHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-06T18:21:16.670Z",
        name: "Page 28 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageTwentyEightHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.878001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageTwentyNineAndSixtyFiveAndThirtyOneHandler: [
                {
                    name: "page 29 and 65 and 31",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 29 -->\n \nYou stumble down the corridor to your right. As you peer from side to side, you are met with hundreds of images of — you! And you look pretty baffled. And scared.\n \n“Hey, I could use some help,” you call out.\n \nSilence.\n \n<!--Insert pound sound fx -->  \n\nYou pound your fist against the wall.\n \nThe wall starts to move.\n \nJust an inch or two — an inch or two closer to you!\n \nYou take a step back — but the wall behind you is moving, too.\n\n<!--Insert wall moving sound fx -->  \n \nThe walls are moving together. They’re closing in on you.\n \nYou’re going to be crushed!\n \n<!-- Page 65 -->\n \nThe walls are closing in faster now.\n \nYou throw your arms out and try to push them away. But it’s hopeless. You’re going to be crushed like a bug.\n \nYou suck in a deep breath — it could be the last breath you take.\n \nThe floor opens beneath your feet!\n \nYou drop down. Down. Down. Down. A long, agonizing scream escapes from your throat as you tumble through space.\n \nWill you ever hit bottom?\n \n“Incoming player,” you hear a commanding voice shout. “Stations, everybody.”\n \nA layer of webbing catches you like one of those nets trapeze artists use. Gasping, unable to understand what’s happening, you bounce up and down.\n \n<!-- Page 31 -->\n \nYou snap your head around to the right --\n\n<!-- Insert footstep sound Fx --> \n\nWhere you hear footsteps coming toward you.\n \nWho do you think the footsteps belong to?"
                    },
                    reprompt: {
                        ssml: "Who do you think the footsteps belong to? "
                    }
                }
            ]
        },
        forward: {
            "^((?!(StopIntent|HelpIntent|CancelIntent)).)*$": [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageThirtyOneAndEightyNineHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T18:40:44.002Z",
        name: "Page 29 and 65 and 31 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageTwentyNineAndSixtyFiveAndThirtyOneHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.877001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageTwentySevenAndFiftyFiveHandler: [
                {
                    name: "Page 27 and 55 ",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 27 -->\n \nIt didn’t work—they hate music! The crowd is closing in. You have nothing to defend yourself with. So you run!\n \nYou spot a crack in the wall, next to the wheel. It’s small — too small for an adult to squeeze through — but you can probably make it.\n \n“Follow me!” you yell out to Patty and Brad as you squeeze through the opening. It leads to a backstage area — and then to the flap of another tent.\n \n<!--Insert crowd sound fx -->\n\nYou can hear the crowd behind you, trying to follow you through the crack.\n \n“Come on! We can slip under this tent,” you say. For once, no one argues with you.\n \nThe three of you duck in and find yourself surrounded by another crowd. They are all seated in chairs. And they don’t move. They just stare at you with glassy eyes.\n \n<!-- Page 55 -->\n \nThey’re dummies. That’s why they don’t move!\n \n“They’ve got to be here somewhere,” you hear Big Al’s voice boom outside the tent.\n \n“Hey! This dummy looks just like the one in that GOOSEBUMPS book,” Patty says.\n \n“You mean Slappy?” Brad asks.\n \nGreat! you think. Your friends are chatting about books minutes before you’re about to be attacked by a mob. Then you get an idea.\n \n“Remember those magic words that brought the dummy to life in that book?” you ask your friends. “Maybe we can bring this guy to life and he’ll help us — he was pretty tough.”\n \nYour friends agree — it’s worth a try.\n \n“I think the words are karru marri odonna loma molonu karrano,” Patty says. \n\n“No way. They’re oopah lupah dummie dupah, Brad says.”  Who is right, Patty or Brad?"
                    },
                    reprompt: {
                        ssml: "Who is right, Patty or Brad?"
                    }
                }
            ]
        },
        forward: {
            OptionAIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageSixtyNineHandler"
                }
            ],
            OptionBIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageEightyTwoHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T17:12:52.863Z",
        name: "Page 27 and 55 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageTwentySevenAndFiftyFiveHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.881001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageTwentysixHandlerIntent: [
                {
                    name: "Page 26 & 58 & 39",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 26 -->\n \n“Hey, wait up!” you yell to Brad and Patty as you sprint through the Space Coaster gate.\n \nThey both ignore you and charge straight ahead. You follow them into a narrow tunnel that leads to the boarding area.\n \nYou gaze down at the floor. Black rubber. It makes you walk with a strange bounce.\n \nEvery few feet there is a round porthole window. When you glance out one, you see astronauts planting flags on the moon. You peer out another. Now they’re seated in their capsule. This is amazing, you think. The figures look real. Totally real.\n \nAfter a long climb, you and Patty and Brad finally arrive at the loading area.\n\n<!-- Insert whoosh sound fx -->\n \nA sleek bullet-shaped capsule whooshes up and stops right beside you. It has three sections. Brad climbs defiantly into the last section. You leap into the front. Patty’s left with the middle section.\n \nAnd suddenly you’re trapped!\n \n<!-- Page 58 -->\n \n<!--Insert steel bar sound Fx --> \n\nSteel bars plunge down from above and drop across your lap and chest, pinning you in place. You can’t move at all. Even your head is held by superstrong headphones that clamp over your ears. A voice comes through them announcing: “Five, four, three, two, one, BLAST OFF!”\n \n<!--Insert bang sound Fx -->  \n\nYou hear a huge bang. Smoke and fireworks fill the air as your car starts up the first big hill. Your head presses back against the seat as you climb higher and higher. That first hill is endless, but the view is awesome. From the top, you can see the midway, the haunted house, and a shadowy swamp. You can’t believe how big the carnival is!\n \n“Neat!” Patty yells. “There’s AHHHH —”\n \nWhatever she was going to say turns into a wild scream as the rocket plunges down the other side of the hill. The wind whips at your face. You are pressed back so hard, you feel like a pancake. Everything passes in a fantastic blur.\n \nAs your car shoots up to the top of the next hill, you’re laughing and screaming at the same time. This is great, you think! But then you make a big mistake.\n \n<!-- Page 39 -->\n \nYou close your eyes. When you open them, your car lunges forward with a burst of speed.\n \nWhat is the scariest thing you can think of?"
                    },
                    reprompt: {
                        ssml: "What is the scariest thing you can think of?"
                    }
                }
            ]
        },
        forward: {
            "^((?!(StopIntent|HelpIntent|CancelIntent)).)*$": [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageThirthyNineAndNinetyFourHandlerIntent"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-09T19:49:38.401Z",
        name: "Page 26 & 58",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageTwentysixHandlerIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.877001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageTwentytwoHandler: [
                {
                    name: "Page 22",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 22 -->\n \nYou missed! How will you ever escape now?\n \nYou look at the huge guards standing over you. They don’t move.\n \nThe space lady looks at you sadly. “I’m sorry but you lost Mission to Mars. Unfortunately, you won’t be getting to go to Mars. Take this to sweeten up being a loser and be on your way.”\n \nShe hands you a huge chocolate bar.\n \nYou take a big bite out of it and stuff the rest in your pocket. None of this makes sense.\n \nYou gaze around. The coast is clear. Maybe you can find Patty and Brad and get out of here.\n \nYou walk a few steps forward. But a heavy hand clamps down on your shoulder from behind.\n \nIt’s Big Al.\n \n“It’s time to play another game,” he says, grinning.\n \nAre you ready for the wheel of chance now?"
                    },
                    reprompt: {
                        ssml: "Are you ready for the wheel of chance now?"
                    }
                }
            ]
        },
        forward: {
            NoIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageSeventeenAndEightyFourAndOneTwentyThreeAndTwentyFiveHandler"
                }
            ],
            YesIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "WheelOfChancePageEightHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-09T20:19:52.053Z",
        name: "Page 22",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageTwentytwoHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.879001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PagefiftynineHandler: [
                {
                    outputSpeech: {
                        ssml:
                            "Blue is your favorite color. You turn the blue card over.\n \nThere is a message: Help us! You are our only hope. Hurry to the back door of the freak show. Signed, The Freaks.\n \n“What does this mean?” you ask Madame Zeno. She stares deep into your eyes. Her lips tremble. She leans forward. She’s about to speak.\n \nAnd then the lights go out —\n\n<!-- Insert scream sound fx --> \n\n and a blood-curdling scream rips through the dark!\n \nYou start to bolt for the door when a dim light suddenly flickers. You stare across the table. Madame Zeno is gone!\n \nYou reach out to take the card. And it bursts into red-hot flames! In seconds, the entire tent fills with thick smoke. Flames shoot across the floor. You run for the door.\n \nOutside, you gulp the fresh air. Whew! You made it.\n \nYou glance back. No smoke. No fire. No tent! Everything has disappeared!\n \nWhat should you do now, do you help the freaks?"
                    },
                    reprompt: {
                        ssml: "What should you do now, do you help the freaks?"
                    }
                }
            ]
        },
        forward: {
            NoIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageOneThirteenAndSixteenHandler"
                }
            ],
            YesIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageElevenAndThirtyFiveAndThirteenHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-02T15:33:41.875Z",
        name: "Page 59 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PagefiftynineHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.877001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PageseventysevenAndseventyeightHandler: [
                {
                    name: "Page 77 and 78",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 77 -->\n \n“Let’s head for the midway and play some games!” you say.\n \nYou, Patty, and Brad jog down a wide avenue. Tents of every color line the street. \n\n<!-- Insert carinval music sound Fx -->]\n\nCarnival music blares from loudspeakers.\n \nYou spot a green neon sign flashing above a yellow-striped tent. The sign reads: MADAME ZENO — FORTUNE-TELLER.\n \n“Excellent!” you exclaim. “I’m going in!”\n \nYou tell your friends you’ll catch up with them in a minute.\n \nYou lift the tent flap. Inside, one small candle flickers in the dark. You hear a low voice call out, “Enter my chamber.”\n \nThere is Madame Zeno, sitting in the shadows. She wears a long red dress dotted with brightly colored gems. They shimmer in the candlelight. Her black hair tumbles to her shoulders as she bends over a large crystal ball.\n \n“Welcome,” she whispers. Then she reaches out and gently lifts your hand. “Let me tell you your future.”\n \n<!-- Page 78 -->\n \nMadame Zeno studies your hand closely. She traces the lines in your hand with her soft fingers.\n \n“I see horror in your future. In your immediate future,” she warns.\n \n“Wh-what kind of horror?” you stammer. “What do you mean?”\n \nMadame Zeno releases your hand. She picks up a strange deck of cards. She spreads them out on the table. You notice the cards have pictures — a headless man, a bloody sword, a large, evil eye.\n \nShe gathers up all the cards and flips the deck over. Then she deals out a red card and a blue card.\n \n“Turn one over,” she commands. “Learn your fate.”\n \nDo you choose red or blue?"
                    },
                    reprompt: {
                        ssml: "Do you choose red or blue?"
                    }
                }
            ]
        },
        forward: {
            BlueCardIntent: [
                {
                    type: "START",
                    intentId: "PageFiftyNineHandler"
                }
            ],
            RedCardIntent: [
                {
                    type: "START",
                    intentId: "PageFourteenAndFortyOneHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-06-28T19:37:10.719Z",
        name: "Page 77 and 78 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PageseventysevenAndseventyeightHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.879001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        content: {
            PagethirtyfourAndfourtysevenHandler: [
                {
                    name: "Page 34 and 47 Handler",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 34 -->\n \n“Let’s go on the rides first!” you say. “That roller coaster looked awesome!”\n \n“Okay,” Patty agrees. “Over this way!” she yells as she charges over to it.\n\n<!-- Insert carnival sound fx -->\n \nWhen you reach the rides, you can only stare in amazement. These are the most fantastic rides you’ve ever seen. The towering roller coaster … the soaring speedboats … the twisty slides! Every one is in motion. Whizzing, whirling, doing loop-the-loops. And they’re all empty! No riders. No people in line!\n \n“Cool!” Patty exclaims. “We have the whole place to ourselves.”\n \nBrad’s face turns a little green as his gaze swings from the Supersonic Space Coaster to the Doom Slide. “Do you think they have rides that don’t go upside down?” he asks.\n \n“Come on! Let’s check out the coaster!” Patty calls to you and Brad. Then they run off to its starting gate.\n \nYou stop and crane your neck to gaze up at the coaster’s first hill. And you gasp!\n \n<!-- Page 47 -->\n \nThe tracks stretch up so high that they seem to touch the clouds. Your gaze follows one of the cars speeding around a sharp curve. It looks like the space shuttle. You notice that it has a safety harness that locks over your body — you’ve seen those before. They keep you in when the ride turns upside down. You didn’t want to admit it before, but, like Brad, riding upside down is not your favorite thing.\n \nStill, the coaster does look amazing — one part enters a tunnel — and you can see that the cars go fast. Really Fast!\n \n<!-- Insert organ sound Fx --> \n\nYou’re just about to walk through the Space Coaster gate when you hear spooky organ music coming from behind you. You turn around. Looming in the distance is a dark and creepy haunted house.\n \nYou gaze down at your map. It’s called the House of Horrors. Hmmm. You love haunted houses. And this one really looks scary.\n \nNow you’re not sure what to do. You won’t have time for everything.  Patty and Brad are going to the Space Coaster and you would be going alone to the House of Horrors.\n \nDo you pick the coaster or the haunted house?"
                    },
                    reprompt: {
                        ssml: "The coaster or the haunted house, which do you choose?"
                    }
                }
            ]
        },
        forward: {
            SpaceCoasterIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageTwentysixHandlerIntent"
                }
            ],
            HauntedHouseIntent: [
                {
                    type: "START",
                    actions: [
                        {
                            type: "SET",
                            store: "SESSION"
                        }
                    ],
                    intentId: "PageSixtyFourHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-06-28T19:33:09.170Z",
        name: "Page 34 and 47 Handler",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "PagethirtyfourAndfourtysevenHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.882001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: ["shortcut rides"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-17T16:52:19.622Z",
        name: "QuitWhileAhead",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "QuitWhileAheadIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.878001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["quit while i'm ahead", "quit while ahead"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-06T13:33:50.190Z",
        name: "Real Monster",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "RealMonsterIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.882001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["{it's a|} {real|} monster", "{i think it's a|} {real|} monster"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T18:50:46.147Z",
        name: "Red Card",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "RedCardIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.881001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["{I choose|I want|} {the|} red {card|}"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-02T18:36:31.282Z",
        name: "RedDoor",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "RedDoorIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.882001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["{pick|} {the|} red {door|}"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-06-28T14:22:01.376Z",
        name: "RepeatIntent",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "RepeatIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.883001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["repeat", "repeat that please", "say that again"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-06T13:28:15.594Z",
        name: "Robot",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "RobotIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.878001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["{it's a|} robot", "{I think it's a|} robot"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T17:07:41.237Z",
        name: "RunDownADifferentPath",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "RunDownADifferentPathIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.885001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["run down {a different path|}", "{a|} different path"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [
            {
                name: "number",
                type: "STENTOR.NUMBER"
            }
        ],
        createdAt: "2018-07-15T17:58:02.156Z",
        name: "SlideNumberIntent",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "SlideNumberIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.883001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["i choose slide {-|number}", "slide {-|number}", "let's go with slide {-|number}"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-06T17:58:24.208Z",
        name: "Snake Lady Is Telling The Truth",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "SnakeLadyIsTellingTheTruthIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.883001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["snake lady {is telling the truth|}", "snake lady truth"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-11T14:58:24.349Z",
        name: "Sneak by the Axes",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "SneakByTheAxesIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.880001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["sneak by the axes", "try to sneak by the axes"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-02T15:54:59.585Z",
        name: "Space Coaster",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "SpaceCoasterIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.882001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: [
            "Space Coaster",
            "Join Patty and Brad on the space coaster",
            "Patty and Brad",
            "Go to space coaster"
        ]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-17T16:47:29.572Z",
        name: "Spin Again",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "SpinAgainIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.880001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["spin again", "i want to spin again", "spin", "spin again please"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [
            {
                name: "speed",
                type: "SPEED"
            }
        ],
        createdAt: "2018-07-17T17:08:24.492Z",
        name: "SpinSpeed",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "SpinSpeedIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.880001,
        langCode: "en-US",
        slotTypes: {
            SPEED: {
                name: "SPEED",
                values: [
                    {
                        name: "fast",
                        data: {}
                    },
                    {
                        name: "slow",
                        data: {}
                    }
                ]
            }
        },
        exitData: [],
        utterancePatterns: ["spin {-|speed} ", "i want to spin {-|speed}"]
    },
    {
        content: {
            StartOverIntent: [
                {
                    name: "Start Over Prompt",
                    outputSpeech: {
                        ssml: "Too scared? Are you sure you want to start over?"
                    },
                    reprompt: {
                        ssml: "Too scared? Are you sure you want to start over?"
                    }
                }
            ]
        },
        forward: {
            YesIntent: [
                {
                    type: "START",
                    intentId: "PageOneAndPageTwoHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-06-28T19:52:01.397Z",
        name: "StartOver",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "StartOverIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.884001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: ["Start over", "start from {the|} beginning", "restart"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-06-28T14:59:08.654Z",
        name: "Stop",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "StopIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.883001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["stop please"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T17:44:57.252Z",
        name: "Take The Back Way Out",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "TakeTheBackWayOutIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.883001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["{Take the|} back way out", "Back out", "Way out"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T20:16:55.220Z",
        name: "Talk to Big Al",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "TalkToBigAlIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.884001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["{stay|} {and|} talk to {big|} Al"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-06-28T19:28:29.069Z",
        name: "TheRidesIntent",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "TheRidesIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.884001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["The rides", "rides", "go on rides", "rides please", "the rides please"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T17:00:06.571Z",
        name: "TuesdayThursdaySunday",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "TuesdayThursdaySundayIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.885001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["Tuesday", "Thursday", "Sunday"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T17:36:14.585Z",
        name: "Turn Left",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "TurnLeftIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.884001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["{turn|} Left"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-03T17:36:19.494Z",
        name: "Turn Right",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "TurnRightIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.885001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["{turn|} right"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-02T20:05:26.048Z",
        name: "Two, Seven or Nine",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "TwoSevenOrNineIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.885001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["Two", "Seven", "Nine"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-02T18:13:21.073Z",
        name: "Wait For Help To Come",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "WaitForHelpToComeIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.900001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["{|Wait} for help {to come|}", "Help", "Wait"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T20:45:19.685Z",
        name: "Wait Until Monster Leaves",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "WaitUntilMonsterLeavesIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.898001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: [
            "{wait until one of the|wait for the|} monster {leaves| to leave|}",
            "wait",
            "better your odds",
            "wait for the monster to leave "
        ]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-06-28T14:21:52.168Z",
        name: "WhatIntent",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "WhatIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.913001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["what", "what was that", "what are my options"]
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-10T13:29:16.786Z",
        name: "Wheel of Chance",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "WheelOfChanceIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.898001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["wheel of chance", "i choose wheel of chance"]
    },
    {
        content: {
            WheelOfChancePageEightHandler: [
                {
                    name: "Page 8 and 9",
                    outputSpeech: {
                        ssml:
                            "<!-- Page 8 -->\n \nYou wander over to the Wheel of Chance and immediately notice two strange things.\n \nFirst, you read the sign on the booth. It says “Wheel of No Chance.” Then you hear the barker’s voice calling, “Step right up!” But there’s no one there.\n \nNo one but a green-and-yellow parrot.\n \n“Excuse me,” you say, hoping someone will answer. “Is this game open?”\n \n“No, I’m standing by this wheel for my health,” the parrot cracks. “Now, do you want to spin or what?”\n \nThe parrot is obviously annoyed. “Mammals,” he mutters. “Can’t live with them, can’t live without them.”\n \nYou steal a glance around. Maybe you should skip this game. But Big Al sneaks up behind you.\n \n“Spin,” he says. “You must earn enough points to win.”\n \n“But how will I know if I have enough points?” you ask.\n \n“Spin!” It’s his final word.\n \n<!-- Page 9 -->\n \nYou stand in front of the wheel examining the options: free spin, no chance, double or nothing, and prize.  You close your eyes and get ready to spin the wheel.\n \nDo you spin the wheel slow or fast?"
                    },
                    reprompt: {
                        ssml: "Do you spin the wheel slow or fast?"
                    }
                }
            ]
        },
        forward: {
            SpinSpeedIntent: [
                {
                    type: "START",
                    intentId: "PageThirtyEightHandler"
                },
                {
                    type: "START",
                    intentId: "PageNineteenHandler"
                },
                {
                    type: "START",
                    intentId: "PageFifteenHandler"
                },
                {
                    type: "START",
                    intentId: "PageFortyNineAndFiftyHandler"
                }
            ]
        },
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-07-05T19:45:33.873Z",
        name: "Page 8 and 9 Wheel of Chance",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "WheelOfChancePageEightHandler",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.900001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        type: "InSessionIntent",
        utterancePatterns: []
    },
    {
        action: [],
        helpData: [],
        responseData: [],
        slots: [],
        createdAt: "2018-06-28T14:28:03.203Z",
        name: "YesIntent",
        "aws:rep:deleting": false,
        data: {},
        organizationId: "Scholastic-Inc",
        intentId: "YesIntent",
        appId: "goosebumps-tts",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714154.909001,
        langCode: "en-US",
        slotTypes: {},
        exitData: [],
        utterancePatterns: ["yes", "yes please"]
    }
];
