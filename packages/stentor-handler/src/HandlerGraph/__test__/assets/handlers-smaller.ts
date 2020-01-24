/*! Copyright (c) 2019, XAPPmedia */
export const handlersSmaller: any = [
    {
        "content": {
            "CancelIntent": [
                {
                    "name": "Goodbye",
                    "outputSpeech": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/goodbye-alexassml.mp3\" />",
                        "displayText": "Okay, goodbye!"
                    }
                }
            ]
        },
        "forward": {},
        "action": [],
        "helpData": [],
        "responseData": [],
        "slots": [],
        "createdAt": "2018-06-05T15:58:28.474Z",
        "name": "CancelIntent",
        "aws:rep:deleting": false,
        "data": {},
        "organizationId": "Mattress-Firm",
        "intentId": "CancelIntent",
        "appId": "mattress-firm",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714145.882001,
        "langCode": "en-US",
        "slotTypes": {},
        "exitData": [],
        "type": "InSessionIntent",
        "utterancePatterns": []
    },
    {
        "content": {
            "DealsIntent": [
                {
                    "outputSpeech": {
                        "displayText": "\tGlad you asked. Through August fourteenth, take up to fifty percent off all your favorite brands. Save fifty percent on the Beautyrest Hybrid Greenmont - Only $799 with fifty percent off while supplies last.  Also, schools back in session! Save on Sleepy’s Basic twin mattress as the kids get back into their classes. Mattresses start at $78.  Shop today. Sleep better tonight. Now, would you like tips on how to buy a mattress or tips on how to sleep better?",
                        "ssml": "<audio src=\"https://s3.us-east-1.amazonaws.com/stentor-admin-resources-prod-assetsbucket-qvdxmvvj2iy1/prod/Mattress-Firm/mattress-firm/2018-07-31t130943-alexassml.mp3\" />",
                        "suggestions": [
                            "Find Your Mattress",
                            "Sleep Better"
                        ]
                    },
                    "reprompt": {
                        "ssml": "<audio src=\"https://s3.us-east-1.amazonaws.com/stentor-admin-resources-prod-assetsbucket-qvdxmvvj2iy1/prod/Mattress-Firm/mattress-firm/2018-07-31t131846-alexassml.mp3\" />",
                        "displayText": "Would you like tips on how to buy a mattress or tips on how to sleep better?",
                        "suggestions": []
                    }
                }
            ]
        },
        "forward": {
            "NoIntent": [
                {
                    "type": "START",
                    "intentId": "CancelIntent"
                }
            ]
        },
        "action": [],
        "helpData": [],
        "responseData": [],
        "slots": [],
        "createdAt": "2018-06-15T14:38:36.225Z",
        "name": "Deals",
        "aws:rep:deleting": false,
        "dialogflowId": "fbec4764-1f66-4cb6-847f-8e77268011fc",
        "data": {},
        "organizationId": "Mattress-Firm",
        "intentId": "DealsIntent",
        "appId": "mattress-firm",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1533043136.846001,
        "langCode": "en-US",
        "slotTypes": {},
        "exitData": [],
        "type": "InSessionIntent",
        "utterancePatterns": [
            "{hear|listen to|give me|what are|} {the|our|} {current|new|best|newest|} {deals|deal} {to help you save|}",
            "help me find deals on mattresses",
            "help me find a deal on a mattress",
            "what are some mattress deals",
            "give me mattress deals"
        ]
    },
    {
        "content": {
            "HelpIntent": [
                {
                    "name": "Help",
                    "outputSpeech": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/help-alexassml.mp3\" />",
                        "displayText": "I can help you find your new mattress AND tell you our newest deals to help you save. I can also give you tips on how to sleep better. What’ll it be today?",
                        "suggestions": [
                            "Deals",
                            "Find Your Mattress",
                            "Sleep Better"
                        ]
                    },
                    "reprompt": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/help-oNyo3vmdoB-alexassml.mp3\" />",
                        "displayText": "I can help you find your new mattress AND tell you our newest deals to help you save. I can also give you tips on how to sleep better. What’ll it be today?",
                        "suggestions": [
                            "Sleep Tips",
                            "How To Buy A Mattress",
                            "Deals"
                        ]
                    }
                }
            ]
        },
        "forward": {},
        "action": [],
        "helpData": [],
        "responseData": [],
        "slots": [],
        "createdAt": "2018-06-05T15:59:21.946Z",
        "name": "HelpIntent",
        "aws:rep:deleting": false,
        "data": {},
        "organizationId": "Mattress-Firm",
        "intentId": "HelpIntent",
        "appId": "mattress-firm",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714145.877001,
        "langCode": "en-US",
        "slotTypes": {},
        "exitData": [],
        "type": "InSessionIntent",
        "utterancePatterns": []
    },
    {
        "content": {
            "LaunchRequest": [
                {
                    "name": "Intro",
                    "reprompt": {
                        "displayText": "I can help you find your new mattress AND tell you our newest deals to help you save. I can also give you tips on how to sleep better. What’ll it be today?",
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/intro-AhQr5gLIin-alexassml.mp3\" />",
                        "suggestions": [
                            "Deals",
                            "Find Your Mattress",
                            "Sleep Better"
                        ]
                    },
                    "outputSpeech": {
                        "displayText": "Hello, there! Welcome to Mattress Firm Tips. I can help you find your new mattress AND tell you our newest deals to help you save. I can also give you tips on how to sleep better. What’ll it be today?",
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/intro-XNEYa85Ajg-alexassml.mp3\" />",
                        "suggestions": [
                            "Deals",
                            "Find Your Mattress",
                            "Sleep Better"
                        ]
                    }
                }
            ]
        },
        "forward": {},
        "action": [],
        "helpData": [],
        "responseData": [],
        "slots": [],
        "createdAt": "2018-06-01T19:26:24.630Z",
        "name": "LaunchRequest",
        "aws:rep:deleting": false,
        "dialogflowId": "80e568cf-f404-4a0b-9e15-d1ae1e277f40",
        "data": {},
        "organizationId": "Mattress-Firm",
        "intentId": "LaunchRequest",
        "appId": "mattress-firm",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714145.882001,
        "langCode": "en-US",
        "slotTypes": {},
        "exitData": [],
        "type": "InSessionIntent",
        "utterancePatterns": []
    },
    {
        "content": {
            "MattressTipsIntent": [
                {
                    "name": "Tip 1",
                    "reprompt": {
                        "displayText": "Would you like to hear another mattress buying tip, learn about deals, or listen to some sleep tips?",
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-1-NXxXuGAjCP-alexassml.mp3\" />",
                        "suggestions": [
                            "Find Your Mattress Tips",
                            "Deals",
                            "Sleep Better"
                        ]
                    },
                    "outputSpeech": {
                        "displayText": "The most common mistake people make when buying a mattress is choosing one that is too small. If you choose a mattress that is too small, you’re going to alternate between trading groggy elbows with your partner and rolling off onto the floor. When it comes to mattresses, bigger is usually better. Would you like to hear another mattress buying tip, learn about deals, or listen to some sleep tips?",
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-1-alexassml.mp3\" />",
                        "suggestions": [
                            "Find Your Mattress Tips",
                            "Deals",
                            "Sleep Better"
                        ]
                    }
                },
                {
                    "name": "Tip 2",
                    "reprompt": {
                        "displayText": "Would you like to hear another mattress buying tip, learn about deals, or listen to some sleep tips?",
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-1-NXxXuGAjCP-alexassml.mp3\" />",
                        "suggestions": [
                            "Find Your Mattress Tips",
                            "Deals",
                            "Sleep Better"
                        ]
                    },
                    "outputSpeech": {
                        "displayText": "Consider the size of the room that you’re buying a mattress for. Make sure the mattress you choose fills out the space — after all, it’s not called a BEDroom for nothing. Would you like to hear another mattress buying tip, learn about deals, or listen to some sleep tips?",
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-2-alexassml.mp3\" />",
                        "suggestions": [
                            "Find Your Mattress Tips",
                            "Deals",
                            "Sleep Better"
                        ]
                    }
                },
                {
                    "name": "Tip 3",
                    "reprompt": {
                        "displayText": "Would you like to hear another mattress buying tip, learn about deals, or listen to some sleep tips?",
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-1-NXxXuGAjCP-alexassml.mp3\" />",
                        "suggestions": [
                            "Find Your Mattress Tips",
                            "Deals",
                            "Sleep Better"
                        ]
                    },
                    "outputSpeech": {
                        "displayText": "Most people don’t realize just how small a queen-size mattress really is. A standard queen mattress is 60″ across, which leaves 30″ of width for each person. For comparison, a twin bed is 38″ inches wide — 8″ MORE per person than a queen! Would you like to hear another mattress buying tip, learn about deals, or listen to some sleep tips?",
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-3-alexassml.mp3\" />",
                        "suggestions": [
                            "Find Your Mattress Tips",
                            "Deals",
                            "Sleep Better"
                        ]
                    }
                },
                {
                    "name": "Tip 4",
                    "reprompt": {
                        "displayText": "Would you like to hear another mattress buying tip, learn about deals, or listen to some sleep tips?",
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-1-NXxXuGAjCP-alexassml.mp3\" />",
                        "suggestions": [
                            "Find Your Mattress Tips",
                            "Deals",
                            "Sleep Better"
                        ]
                    },
                    "outputSpeech": {
                        "displayText": "Did you know the average person moves more than 40 times a night, including a dozen full-body turns? It’s important to think about how much space each sleeper needs when deciding which size mattress to buy. Would you like to hear another mattress buying tip, learn about deals, or listen to some sleep tips?",
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-4-alexassml.mp3\" />",
                        "suggestions": [
                            "Find Your Mattress Tips",
                            "Deals",
                            "Sleep Better"
                        ]
                    }
                },
                {
                    "name": "Tip 5",
                    "reprompt": {
                        "displayText": "Would you like to hear another mattress buying tip, learn about deals, or listen to some sleep tips?",
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-1-NXxXuGAjCP-alexassml.mp3\" />",
                        "suggestions": [
                            "Find Your Mattress Tips",
                            "Deals",
                            "Sleep Better"
                        ]
                    },
                    "outputSpeech": {
                        "displayText": "When you visit a Mattress Firm store, try this: lie down on a mattress and fold your arms behind your head. Do your arms go beyond the edge of the mattress? If so, you probably don’t have enough room to really get comfortable. Would you like to hear another mattress buying tip, learn about deals, or listen to some sleep tips?",
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-5-alexassml.mp3\" />",
                        "suggestions": [
                            "Find Your Mattress Tips",
                            "Deals",
                            "Sleep Better"
                        ]
                    }
                },
                {
                    "name": "Tip 6",
                    "reprompt": {
                        "displayText": "Would you like to hear another mattress buying tip, learn about deals, or listen to some sleep tips?",
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-1-NXxXuGAjCP-alexassml.mp3\" />",
                        "suggestions": [
                            "Find Your Mattress Tips",
                            "Deals",
                            "Sleep Better"
                        ]
                    },
                    "outputSpeech": {
                        "displayText": "Do you have children or pets or are you planning to in the near future? Mattresses are a long-term purchase. It’s important to keep in mind that the bed you need today may not be the one you’ll need tomorrow, when little ones — or furry ones — want to join you for some snuggle time. Would you like to hear another mattress buying tip, learn about deals, or listen to some sleep tips?",
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-6-alexassml.mp3\" />",
                        "suggestions": [
                            "Find Your Mattress Tips",
                            "Deals",
                            "Sleep Better"
                        ]
                    }
                },
                {
                    "name": "Tip 7",
                    "reprompt": {
                        "displayText": "Would you like to hear another mattress buying tip, learn about deals, or listen to some sleep tips?",
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-1-NXxXuGAjCP-alexassml.mp3\" />",
                        "suggestions": [
                            "Find Your Mattress Tips",
                            "Deals",
                            "Sleep Better"
                        ]
                    },
                    "outputSpeech": {
                        "displayText": "Can you imagine moving sometime in the next few years? If you’re planning on moving into a larger bedroom space, then upgrading your mattress to a larger size may be the right move. On the other hand, if you’re staying in a smaller bedroom space, think through selecting a bed that fits the room and offers enough space to move around. Would you like to hear another mattress buying tip, learn about deals, or listen to some sleep tips?",
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-7-alexassml.mp3\" />",
                        "suggestions": [
                            "Find Your Mattress Tips",
                            "Deals",
                            "Sleep Better"
                        ]
                    }
                },
                {
                    "name": "Tip 8",
                    "reprompt": {
                        "displayText": "Would you like to hear another mattress buying tip, learn about deals, or listen to some sleep tips?",
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-1-NXxXuGAjCP-alexassml.mp3\" />",
                        "suggestions": [
                            "Find Your Mattress Tips",
                            "Deals",
                            "Sleep Better"
                        ]
                    },
                    "outputSpeech": {
                        "displayText": "Before visiting a Mattress Firm store, think about your sleep needs and what you’re looking for in a mattress. Having an idea of what you want and need before going shopping will help lead you and your sleep consultant in the right direction and save you more time. Would you like to hear another mattress buying tip, learn about deals, or listen to some sleep tips?",
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-8-alexassml.mp3\" />",
                        "suggestions": [
                            "Find Your Mattress Tips",
                            "Deals",
                            "Sleep Better"
                        ]
                    }
                },
                {
                    "name": "Tip 9",
                    "reprompt": {
                        "displayText": "Would you like to hear another mattress buying tip, learn about deals, or listen to some sleep tips?",
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-1-NXxXuGAjCP-alexassml.mp3\" />",
                        "suggestions": [
                            "Find Your Mattress Tips",
                            "Deals",
                            "Sleep Better"
                        ]
                    },
                    "outputSpeech": {
                        "displayText": "While shopping for a new mattress, it is important to test a few different mattresses by lying down on them in the position in which you normally sleep — whether it’s on your stomach, back or side — and wiggling around to different positions to make sure you can get comfortable. Would you like to hear another mattress buying tip, learn about deals, or listen to some sleep tips?",
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-9-alexassml.mp3\" />",
                        "suggestions": [
                            "Find Your Mattress Tips",
                            "Deals",
                            "Sleep Better"
                        ]
                    }
                },
                {
                    "name": "Tip 10",
                    "reprompt": {
                        "displayText": "Would you like to hear another mattress buying tip, learn about deals, or listen to some sleep tips?",
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-1-NXxXuGAjCP-alexassml.mp3\" />",
                        "suggestions": [
                            "Find Your Mattress Tips",
                            "Deals",
                            "Sleep Better"
                        ]
                    },
                    "outputSpeech": {
                        "displayText": "If you sleep with a partner, you should both test the mattress at the same time. Ensuring that you each have enough space and both agree on the comfort level of the mattress will help you both sleep happy in the long run. Would you like to hear another mattress buying tip, learn about deals, or listen to some sleep tips?",
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-10-alexassml.mp3\" />",
                        "suggestions": [
                            "Find Your Mattress Tips",
                            "Deals",
                            "Sleep Better"
                        ]
                    }
                },
                {
                    "name": "Tip 11",
                    "reprompt": {
                        "displayText": "Would you like to hear another mattress buying tip, learn about deals, or listen to some sleep tips?",
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-1-NXxXuGAjCP-alexassml.mp3\" />",
                        "suggestions": [
                            "Find Your Mattress Tips",
                            "Deals",
                            "Sleep Better"
                        ]
                    },
                    "outputSpeech": {
                        "displayText": "King-size mattresses are the same length as a queen-sized mattress, but a whopping 16 inches wider. Buying a king means that you can easily stretch out during the night without disturbing your sleep partner. You’ll even have enough room for your kids, your pets, and even a family movie night. Would you like to hear another mattress buying tip, learn about deals, or listen to some sleep tips?",
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-11-alexassml.mp3\" />",
                        "suggestions": [
                            "Find Your Mattress Tips",
                            "Deals",
                            "Sleep Better"
                        ]
                    }
                }
            ]
        },
        "forward": {
            "NoIntent": [
                {
                    "type": "START",
                    "intentId": "CancelIntent"
                }
            ],
            "YesIntent": [
                {
                    "type": "START",
                    "intentId": "MattressTipsIntent"
                }
            ]
        },
        "action": [],
        "helpData": [],
        "responseData": [],
        "slots": [],
        "createdAt": "2018-06-01T19:29:28.227Z",
        "name": "Mattress Tips",
        "aws:rep:deleting": false,
        "dialogflowId": "66ab5d57-9229-4947-bec5-096830fb5b47",
        "data": {},
        "organizationId": "Mattress-Firm",
        "intentId": "MattressTipsIntent",
        "appId": "mattress-firm",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532974963.438001,
        "langCode": "en-US",
        "slotTypes": {},
        "exitData": [],
        "type": "InSessionIntent",
        "utterancePatterns": [
            "{hear|listen to|learn|} {more|} mattress {buying|} {tips|tip|}",
            "{learn|listen|hear|} {how to|} {buy|} {a|} mattress {tip|tips|}",
            "find your {new|} mattress {tips|tip|}",
            "help me buy a mattress",
            "help me find a mattress"
        ]
    },
    {
        "action": [],
        "helpData": [],
        "responseData": [],
        "slots": [],
        "createdAt": "2018-06-13T13:07:16.870Z",
        "name": "NoIntent",
        "aws:rep:deleting": false,
        "data": {},
        "organizationId": "Mattress-Firm",
        "intentId": "NoIntent",
        "appId": "mattress-firm",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532982522.350001,
        "langCode": "en-US",
        "slotTypes": {},
        "exitData": [],
        "utterancePatterns": [
            "no"
        ]
    },
    {
        "content": {
            "SleepTipsIntent": [
                {
                    "name": "Tip 1",
                    "outputSpeech": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-1-3ejz2jtwgR-alexassml.mp3\" />",
                        "displayText": "Establish a bedtime routine and stick to it. At about the same time each evening, listen to soothing music, read a book or take a warm bath or shower to trigger your brain to prepare to wind down and relax. Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Tips",
                            "Deals"
                        ]
                    },
                    "reprompt": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-1-FOUAQpStI0-alexassml.mp3\" />",
                        "displayText": "Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Mattress Tips",
                            "Sleep Tips",
                            "Deals"
                        ]
                    }
                },
                {
                    "name": "Tip 2",
                    "outputSpeech": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-2-cLUcny0ESx-alexassml.mp3\" />",
                        "displayText": "Aim to get 7 to 9 hours of sleep each night. Going to bed and waking up at the same time each day can help you synchronize your internal clock. This will make it easier to fall asleep at night and wake up refreshed each morning. Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    },
                    "reprompt": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-1-FOUAQpStI0-alexassml.mp3\" />",
                        "displayText": "Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    }
                },
                {
                    "name": "Tip 3",
                    "outputSpeech": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-3-vrKxG2KBpw-alexassml.mp3\" />",
                        "displayText": "Try lowering the thermostat. Research says that sleeping in an environment between 60-67 degrees Fahrenheit promotes optimal rest. If you know you get hot during the night, get back a few hours from tossing and turning and set your fan on high and use light-weight blankets. Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    },
                    "reprompt": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-1-FOUAQpStI0-alexassml.mp3\" />",
                        "displayText": "Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    }
                },
                {
                    "name": "Tip 4",
                    "outputSpeech": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-4-b7SKieJ0LJ-alexassml.mp3\" />",
                        "displayText": "Avoid electronics at least 30 minutes before bed. There is a lot of research indicating that blue light emitted by electronic devices like phones and laptops may delay or disrupt your sleep. Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    },
                    "reprompt": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-1-FOUAQpStI0-alexassml.mp3\" />",
                        "displayText": "Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    }
                },
                {
                    "name": "Tip 5",
                    "outputSpeech": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-5-LAPFMJioVM-alexassml.mp3\" />",
                        "displayText": "It might be tempting to drink a glass of wine or other alcohol to induce sleep, but Mattress Firm’s sleep consultant Dr. Sujay Kansagra advises against drinking alcohol too late in the evening since it will likely affect the latter half of your sleep cycle. Would you like to hear another mattress buying tip, learn about deals, or listen to some sleep tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    },
                    "reprompt": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-1-FOUAQpStI0-alexassml.mp3\" />",
                        "displayText": "Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    }
                },
                {
                    "name": "Tip 6",
                    "outputSpeech": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-6-1Rbv524Qox-alexassml.mp3\" />",
                        "displayText": "If your partner stays up later than you, invest in a sleep mask. Even if you usually fall asleep before your partner, the glowing screen of the TV or the brightness of their reading lamp could be disrupting your sleep without you being fully conscious of it. If a sleep mask doesn’t help, ask your partner to finish their book or show before climbing into bed. Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    },
                    "reprompt": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-1-FOUAQpStI0-alexassml.mp3\" />",
                        "displayText": "Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    }
                },
                {
                    "name": "Tip 7",
                    "outputSpeech": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-7-vCkx89PPM4-alexassml.mp3\" />",
                        "displayText": "Avoid naps during the day if possible, but if one is required, limit it to 30 minutes or less and take it early in the afternoon. Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    },
                    "reprompt": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-1-FOUAQpStI0-alexassml.mp3\" />",
                        "displayText": "Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    }
                },
                {
                    "name": "Tip 8",
                    "outputSpeech": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-8-q7zFLoEykv-alexassml.mp3\" />",
                        "displayText": "Turn your bedroom into a sleep sanctuary. Remove the TV, computer, or other distractions from your bedroom so that your body knows it’s time to sleep. Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    },
                    "reprompt": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-1-FOUAQpStI0-alexassml.mp3\" />",
                        "displayText": "Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    }
                },
                {
                    "name": "Tip 9",
                    "outputSpeech": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-9-hdiwXRzf0a-alexassml.mp3\" />",
                        "displayText": "Drinking non-alcoholic liquids like water and milk could be part of a smart bedtime routine. But, limit the amount to prevent middle-of-the-night trips to the bathroom. Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    },
                    "reprompt": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-1-FOUAQpStI0-alexassml.mp3\" />",
                        "displayText": "Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    }
                },
                {
                    "name": "Tip 10",
                    "outputSpeech": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-10-nG9ZbLJXHo-alexassml.mp3\" />",
                        "displayText": "Good daytime habits promote better quality sleep at night. You’ll be rewarded with a great night’s sleep by exercising daily, eating a healthy, balanced diet, and being mindful of work-life balance and other stressors. Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    },
                    "reprompt": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-1-FOUAQpStI0-alexassml.mp3\" />",
                        "displayText": "Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    }
                },
                {
                    "name": "Tip 11",
                    "outputSpeech": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-11-rB9t6Sco6Q-alexassml.mp3\" />",
                        "displayText": "If your mattress shows signs of age, it may be the reason you have trouble falling asleep. There are several factors that determine the “shelf life” of your mattress, including quality and usage, so it’s important to evaluate your mattress regularly to make sure it’s still giving you the support you need for a good night’s sleep. Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    },
                    "reprompt": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-1-FOUAQpStI0-alexassml.mp3\" />",
                        "displayText": "Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    }
                },
                {
                    "name": "Tip 12",
                    "outputSpeech": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-12-alexassml.mp3\" />",
                        "displayText": "When traveling, bring your own pillow. Our bodies crave routine, so sleeping on a pillow that you’re used to will make a huge difference in the quality of your sleep. Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    },
                    "reprompt": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-1-FOUAQpStI0-alexassml.mp3\" />",
                        "displayText": "Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    }
                },
                {
                    "name": "Tip 13",
                    "outputSpeech": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-13-alexassml.mp3\" />",
                        "displayText": "Around bedtime, avoid sleep-disrupting substances like caffeine, nicotine and alcohol. Many medications can cause insomnia, and common medical disorders like allergies, sleep apnea, restless leg syndrome, heartburn, and other aches and pains can also disrupt sleep. Check with your doctor to determine if a medical problem or a medication may be the cause of your sleep issues. Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    },
                    "reprompt": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-1-FOUAQpStI0-alexassml.mp3\" />",
                        "displayText": "Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    }
                },
                {
                    "name": "Tip 14",
                    "outputSpeech": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-14-alexassml.mp3\" />",
                        "displayText": "Create a soothing sleep environment. Make sure your room is dark, quiet, cool and comfortable. If it’s not possible to completely darken your room, try installing dark-out curtains or wearing a sleep mask. Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    },
                    "reprompt": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-1-FOUAQpStI0-alexassml.mp3\" />",
                        "displayText": "Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    }
                },
                {
                    "name": "Tip 15",
                    "outputSpeech": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-15-alexassml.mp3\" />",
                        "displayText": "Consider using a white noise machine to help drown out any distracting sounds such as busy streets or rambunctious roommates. If that doesn’t help, you can always settle for some good old-fashioned ear plugs. Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    },
                    "reprompt": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-1-FOUAQpStI0-alexassml.mp3\" />",
                        "displayText": "Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    }
                },
                {
                    "name": "Tip 16",
                    "outputSpeech": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-16-alexassml.mp3\" />",
                        "displayText": "Use extra pillows to get comfortable. Arrange them to support your back, legs or any other areas of pain to reduce aches and keep you sleeping more soundly throughout the night. Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    },
                    "reprompt": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-1-FOUAQpStI0-alexassml.mp3\" />",
                        "displayText": "Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    }
                },
                {
                    "name": "Tip 17",
                    "outputSpeech": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-17-alexassml.mp3\" />",
                        "displayText": "Stay away from sweets at bedtime. It may be tempting to indulge in a sugar-filled late night snack, but sugar can give you an unexpected spike of energy, especially at night. Try sipping some herbal tea or a piece of fruit instead. Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    },
                    "reprompt": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-1-FOUAQpStI0-alexassml.mp3\" />",
                        "displayText": "Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    }
                },
                {
                    "name": "Tip 18",
                    "outputSpeech": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-18-alexassml.mp3\" />",
                        "displayText": "Take steps to decompress and reduce stress. A recent Mattress Firm study found that stress has a serious impact on your quality of sleep. It sometimes helps to write the day’s worries down in a journal or do something creative like write poetry or draw. The point is to remove the stressor from your mind and give yourself permission to not worry about it until the next day. Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    },
                    "reprompt": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-1-FOUAQpStI0-alexassml.mp3\" />",
                        "displayText": "Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    }
                },
                {
                    "name": "Tip 19",
                    "outputSpeech": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-19-alexassml.mp3\" />",
                        "displayText": "Try to get outside during the day to enjoy the benefits of natural light, which is a strong regulator of your biological clock. Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    },
                    "reprompt": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-1-FOUAQpStI0-alexassml.mp3\" />",
                        "displayText": "Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    }
                },
                {
                    "name": "Tip 20",
                    "outputSpeech": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-20-alexassml.mp3\" />",
                        "displayText": "When traveling, take your bedtime routine with you. Typical routines often include habits that you can easily perform anywhere, such as brushing your teeth, taking a shower, reading, etc. Studies show that routines help everyone sleep better – both kids and adults alike. Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    },
                    "reprompt": {
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/tip-1-FOUAQpStI0-alexassml.mp3\" />",
                        "displayText": "Would you like to hear another sleep tip, learn about deals, or listen to some mattress buying tips?",
                        "suggestions": [
                            "Sleep Better Tips",
                            "Find Your Mattress",
                            "Deals"
                        ]
                    }
                }
            ]
        },
        "forward": {
            "NoIntent": [
                {
                    "type": "START",
                    "intentId": "CancelIntent"
                }
            ],
            "YesIntent": [
                {
                    "type": "START",
                    "intentId": "SleepTipsIntent"
                }
            ]
        },
        "action": [],
        "helpData": [],
        "responseData": [],
        "slots": [],
        "createdAt": "2018-06-01T19:29:11.062Z",
        "name": "Sleep Tips",
        "aws:rep:deleting": false,
        "dialogflowId": "d84ee4c6-e544-4bbb-8370-41e919294ab9",
        "data": {},
        "organizationId": "Mattress-Firm",
        "intentId": "SleepTipsIntent",
        "appId": "mattress-firm",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532974903.448001,
        "langCode": "en-US",
        "slotTypes": {},
        "exitData": [],
        "type": "InSessionIntent",
        "utterancePatterns": [
            "{hear|listen to|} {more|} sleep {tips|tip|}",
            "sleep better {tip|tips|}",
            "can you help me sleep better",
            "help me get better sleep",
            "how do i sleep better"
        ]
    },
    {
        "content": {
            "StopIntent": [
                {
                    "outputSpeech": {
                        "displayText": "Okay, goodbye!",
                        "ssml": "<audio src=\"https://s3.amazonaws.com/xapp-stentor-assets/prod/Mattress-Firm/mattress-firm/goodbye-alexassml.mp3\" />"
                    }
                }
            ]
        },
        "forward": {},
        "action": [],
        "helpData": [],
        "responseData": [],
        "slots": [],
        "createdAt": "2018-06-26T15:47:22.617Z",
        "name": "StopIntent",
        "aws:rep:deleting": false,
        "data": {},
        "organizationId": "Mattress-Firm",
        "intentId": "StopIntent",
        "appId": "mattress-firm",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532714145.908001,
        "langCode": "en-US",
        "slotTypes": {},
        "exitData": [],
        "type": "InSessionIntent",
        "utterancePatterns": []
    },
    {
        "action": [],
        "helpData": [],
        "responseData": [],
        "slots": [],
        "createdAt": "2018-06-13T13:06:09.194Z",
        "name": "YesIntent",
        "aws:rep:deleting": false,
        "data": {},
        "organizationId": "Mattress-Firm",
        "intentId": "YesIntent",
        "appId": "mattress-firm",
        "aws:rep:updateregion": "us-east-1",
        "aws:rep:updatetime": 1532982537.354001,
        "langCode": "en-US",
        "slotTypes": {},
        "exitData": [],
        "utterancePatterns": [
            "yes",
            "okay",
            "sure"
        ]
    }
];