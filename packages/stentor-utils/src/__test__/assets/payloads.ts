/*! Copyright (c) 2021, XAPP AI */
import { KnowledgeBaseResult, Request, IntentRequest } from "stentor-models";

export const REQUEST_KNOWLEDGEBASE_NO_SUGGEST_OR_FAQ: IntentRequest & { requestAttributes: object; sessionAttributes: object } = {
    "type": "INTENT_REQUEST",
    "anonymous": false,
    "platform": "lex-connect",
    "channel": "widget",
    "intentId": "OCSearch",
    "isHealthCheck": false,
    "isNewSession": false,
    "matchConfidence": null,
    "rawQuery": "hot dogs",
    "requestAttributes": {
        "channel": "widget",
        "type": "INTENT_REQUEST",
        "userId": "stentor-widget-user-5ae302cf-58ad-656b-a0f3-7c53320a71bb",
        "platform": "stentor-platform",
        "x-amz-lex:kendra-search-response-document-link-2": "https://www.travelers.com/tools-resources/home/moving/moving-from-an-apartment-to-a-house-checklist",
        "x-amz-lex:kendra-search-response-document-link-1": "https://www.travelers.com/resources/home/moving/moving-from-an-apartment-to-a-house-checklist",
        "x-amz-lex:kendra-search-response-document-5": "...an extinguisher nearby is important, but you also need to have the correct type of extinguisher and know how to properly use it.\n\tNever throw hot grease in the garbage as it can ignite combustible materials. Be sure to let grease cool and consider disposing it in an old can, such as a metal...",
        "x-amz-lex:kendra-search-response-document-4": "...Because a wood stove generates very hot combustion gases, its chimney must be either masonry (with flue tiles intact and in good condition) or manufactured specifically for burning wood...",
        "x-amz-lex:kendra-search-response-document-link-5": "https://www.travelers.com/resources/home/fire-safety/cooking-fire-safety",
        "x-amz-lex:kendra-search-response-document-link-4": "https://www.travelers.com/resources/home/fire-safety/wood-stove-safety-tips",
        "x-amz-lex:kendra-search-response-document-link-3": "https://www.travelers.com/resources/home/safety/grilling-safety-tips",
        "x-amz-lex:kendra-search-response-document-3": "...was leaving or placing an object that could burn too close to the grill, according to the NFPA study.\n\n\n\tCharcoal grills can continue to remain hot for many hours after the flames extinguish. Avoid placing any burnable objects near the grill or moving the grill while the coals are hot. Keep...",
        "x-amz-lex:kendra-search-response-document-2": "...7 Tips for Moving With a Pet\n\n\n\n\n\n\n\n\n\n\n            Get tips on how to ease moving stress and anxiety for dogs and cats.\n\n\n\n                \t\n                    Learn more\n\n    \n\n\n\n\n        \n\n\n    \n\n\n\n\n                \n\n\n    \n\n\n        \n\n            Related...",
        "x-amz-lex:kendra-search-response-document-1": "...7 Tips for Moving With a Pet\n\n\n\n\n\n\n\n\n\n\n            Get tips on how to ease moving stress and anxiety for dogs and cats.\n\n\n\n                \t\n                    Learn more\n\n    \n\n\n\n\n        \n\n\n    \n\n\n\n\n                \n\n\n    \n\n\n        \n\n            Related...",
        "rawQuery": "hot dogs"
    },
    "sessionAttributes": {
        "channel": "widget",
        "sessionId": "stentor-widget-session-5dc4da17-e499-65c5-9810-6743ec525c6c",
        "userId": "stentor-widget-user-5ae302cf-58ad-656b-a0f3-7c53320a71bb",
        "platform": "stentor-platform"
    },
    "sessionId": "stentor-widget-session-5dc4da17-e499-65c5-9810-6743ec525c6c",
    "slots": {},
    "userId": "stentor-widget-user-5ae302cf-58ad-656b-a0f3-7c53320a71bb",
    "knowledgeBaseResult": {
        "suggested": [],
        "faqs": [],
        "documents": [
            {
                "title": "Moving from an Apartment to a House Checklist | Travelers Insurance",
                "uri": "https://www.travelers.com/resources/home/moving/moving-from-an-apartment-to-a-house-checklist",
                "document": "...7 Tips for Moving With a Pet\n\n\n\n\n\n\n\n\n\n\n            Get tips on how to ease moving stress and anxiety for dogs and cats.\n\n\n\n                \t\n                    Learn more\n\n    \n\n\n\n\n        \n\n\n    \n\n\n\n\n                \n\n\n    \n\n\n        \n\n            Related..."
            },
            {
                "title": "Moving from an Apartment to a House Checklist | Travelers Insurance",
                "uri": "https://www.travelers.com/tools-resources/home/moving/moving-from-an-apartment-to-a-house-checklist",
                "document": "...7 Tips for Moving With a Pet\n\n\n\n\n\n\n\n\n\n\n            Get tips on how to ease moving stress and anxiety for dogs and cats.\n\n\n\n                \t\n                    Learn more\n\n    \n\n\n\n\n        \n\n\n    \n\n\n\n\n                \n\n\n    \n\n\n        \n\n            Related..."
            },
            {
                "title": "Grilling Safety Tips | Travelers Insurance",
                "uri": "https://www.travelers.com/resources/home/safety/grilling-safety-tips",
                "document": "...was leaving or placing an object that could burn too close to the grill, according to the NFPA study.\n\n\n\tCharcoal grills can continue to remain hot for many hours after the flames extinguish. Avoid placing any burnable objects near the grill or moving the grill while the coals are hot. Keep..."
            },
            {
                "title": "Wood Stove Safety Tips | Travelers Insurance",
                "uri": "https://www.travelers.com/resources/home/fire-safety/wood-stove-safety-tips",
                "document": "...Because a wood stove generates very hot combustion gases, its chimney must be either masonry (with flue tiles intact and in good condition) or manufactured specifically for burning wood..."
            },
            {
                "title": "Cooking Fire Safety | Travelers Insurance",
                "uri": "https://www.travelers.com/resources/home/fire-safety/cooking-fire-safety",
                "document": "...an extinguisher nearby is important, but you also need to have the correct type of extinguisher and know how to properly use it.\n\tNever throw hot grease in the garbage as it can ignite combustible materials. Be sure to let grease cool and consider disposing it in an old can, such as a metal..."
            },
            {
                "title": "Electrical Safety in the Home | Travelers Insurance",
                "uri": "https://www.travelers.com/resources/home/fire-safety/electrical-safety-in-the-home",
                "document": "...built before 1965 typically have ungrounded two-pronged outlets, while newer construction will usually have three-pronged outlets, which include a hot, neutral and ground wire. Homeowners may want to consider upgrading their wiring to accept three-pronged outlets, particularly if you are replacing..."
            },
            {
                "title": "5 Tips for Childproofing Your Home | Travelers Insurance",
                "uri": "https://www.travelers.com/resources/home/renovation/5-tips-for-childproofing-your-home",
                "document": "...covers on outlets.\n\tChildproof window guards and safety nettings on windows to help prevent falls from windows.\n\tProtective material on radiator, hot pipes and other burn hazards.\n\tShields on light fixtures. \n\n\n\n2. Gear up..."
            },
            {
                "title": "Generator Safety | Travelers Insurance",
                "uri": "https://www.travelers.com/resources/home/safety/generator-safety",
                "document": "...extension cords with the proper amperage rating for the intended use.\n\tBe aware that portable generators become hot while running and remain hot for a significant amount of time after they are shut down, creating a potential fire hazard..."
            },
            {
                "title": "How to Make Your Home More Energy Efficient | Travelers Insurance",
                "uri": "https://www.travelers.com/resources/home/renovation/how-to-make-your-home-more-energy-efficient",
                "document": "...a detailed work proposal following the evaluation. The contractor may have other recommendations, such as installing solar panels or a solar hot water system. Homeowners can expect to save 20 percent or more on the annual utility bill, depending on the type of improvements. For more details..."
            },
            {
                "title": "7 Tips for Moving With a Pet | Travelers Insurance",
                "uri": "https://www.travelers.com/tools-resources/home/moving/7-tips-for-moving-with-a-pet",
                "document": "...the idea of new trees to sniff and fire hydrants to investigate. Just as moving can be stressful for you, it can also create stress and anxiety for dogs and cats.\n\n\nFor Spencer, a six-year-old Lhasa Apso, the clues had been there for weeks. The boxes, the packing, the unfamiliar visitors coming to..."
            }
        ]
    },
    "locale": "en-US"
}

export const REQUEST_KB_NO_SUGGEST_OR_FAQ_2: IntentRequest & { requestAttributes: object; sessionAttributes: object } = {
    "platform": "lex-connect",
    "type": "INTENT_REQUEST",
    "anonymous": false,
    "channel": "console",
    "intentId": "OCSearch",
    "isHealthCheck": false,
    "isNewSession": false,
    "matchConfidence": null,
    "rawQuery": "hot dog",
    "requestAttributes": {
        "x-amz-lex:kendra-search-response-document-link-2": "https://www.travelers.com/resources/home/moving/7-tips-for-moving-with-a-pet",
        "x-amz-lex:kendra-search-response-document-link-1": "https://www.travelers.com/tools-resources/home/moving/7-tips-for-moving-with-a-pet",
        "x-amz-lex:kendra-search-response-document-5": "...Will Owning a Dog Affect my Renters Coverage?\n\n\nSome policies provide coverage if your dog injures someone, and some insurers exclude or limit coverage for customers who own a dog. It’s best to discuss this with your insurance representative when...",
        "x-amz-lex:kendra-search-response-document-4": "...was leaving or placing an object that could burn too close to the grill, according to the NFPA study.\n\n\n\tCharcoal grills can continue to remain hot for many hours after the flames extinguish. Avoid placing any burnable objects near the grill or moving the grill while the coals are hot. Keep...",
        "x-amz-lex:kendra-search-response-document-link-5": "https://www.travelers.com/resources/renters/5-questions-to-ask-your-insurance-rep-about-renters-insurance",
        "x-amz-lex:kendra-search-response-document-link-4": "https://www.travelers.com/resources/home/safety/grilling-safety-tips",
        "x-amz-lex:kendra-search-response-document-link-3": "https://www.travelers.com/resources/home/working-remotely/7-family-activities-you-can-do-while-working-from-home",
        "x-amz-lex:kendra-search-response-document-3": "...hamster cage or fishbowl, or even brush their pets. These can be especially great lessons if you’re one of the many families bringing home a new dog or animal to foster during this time.\n\tMaintain their bikes. If your children have a garage full of bikes, scooters and other ride-on toys, give...",
        "x-amz-lex:kendra-search-response-document-2": "...could trip up your dog or cat. Install fencing if you plan to let your dog roam outside.\n\n\n7. Settling In\n\n\nMake the adjustment easier for your dog or cat by having their water and food bowls and a favorite toy or two waiting for them before you let them inside. A few familiar items can help...",
        "x-amz-lex:kendra-search-response-document-1": "...could trip up your dog or cat. Install fencing if you plan to let your dog roam outside.\n\n\n7. Settling In\n\n\nMake the adjustment easier for your dog or cat by having their water and food bowls and a favorite toy or two waiting for them before you let them inside. A few familiar items can help..."
    },
    "sessionAttributes": {
        "channel": "console",
        "sessionId": "87ba1d9c-9d57-64c9-8###-#######19847",
        "userId": "0lj0zh85ke307d7qxz5wya6ouzze9kbi"
    },
    "sessionId": "87ba1d9c-9d57-64c9-8###-#######19847",
    "slots": {},
    "userId": "0lj0zh85ke307d7qxz5wya6ouzze9kbi",
    "knowledgeBaseResult": {
        "suggested": [],
        "faqs": [],
        "documents": [
            {
                "title": "7 Tips for Moving With a Pet | Travelers Insurance",
                "uri": "https://www.travelers.com/tools-resources/home/moving/7-tips-for-moving-with-a-pet",
                "document": "...could trip up your dog or cat. Install fencing if you plan to let your dog roam outside.\n\n\n7. Settling In\n\n\nMake the adjustment easier for your dog or cat by having their water and food bowls and a favorite toy or two waiting for them before you let them inside. A few familiar items can help..."
            },
            {
                "title": "7 Tips for Moving With a Pet | Travelers Insurance",
                "uri": "https://www.travelers.com/resources/home/moving/7-tips-for-moving-with-a-pet",
                "document": "...could trip up your dog or cat. Install fencing if you plan to let your dog roam outside.\n\n\n7. Settling In\n\n\nMake the adjustment easier for your dog or cat by having their water and food bowls and a favorite toy or two waiting for them before you let them inside. A few familiar items can help..."
            },
            {
                "title": "7 Family Activities You Can Do While Working from Home During COVID-19 | Travelers Insurance",
                "uri": "https://www.travelers.com/resources/home/working-remotely/7-family-activities-you-can-do-while-working-from-home",
                "document": "...hamster cage or fishbowl, or even brush their pets. These can be especially great lessons if you’re one of the many families bringing home a new dog or animal to foster during this time.\n\tMaintain their bikes. If your children have a garage full of bikes, scooters and other ride-on toys, give..."
            },
            {
                "title": "Grilling Safety Tips | Travelers Insurance",
                "uri": "https://www.travelers.com/resources/home/safety/grilling-safety-tips",
                "document": "...was leaving or placing an object that could burn too close to the grill, according to the NFPA study.\n\n\n\tCharcoal grills can continue to remain hot for many hours after the flames extinguish. Avoid placing any burnable objects near the grill or moving the grill while the coals are hot. Keep..."
            },
            {
                "title": "5 Questions to Ask Your Insurance Rep About Your Renters Insurance | Travelers",
                "uri": "https://www.travelers.com/resources/renters/5-questions-to-ask-your-insurance-rep-about-renters-insurance",
                "document": "...Will Owning a Dog Affect my Renters Coverage?\n\n\nSome policies provide coverage if your dog injures someone, and some insurers exclude or limit coverage for customers who own a dog. It’s best to discuss this with your insurance representative when..."
            },
            {
                "title": "10 Tips for Staying Productive When Working From Home | Travelers Insurance",
                "uri": "https://www.travelers.com/resources/home/working-remotely/10-tips-for-staying-productive-when-working-from-home",
                "document": "...While You Can\n\n\nYou’re going to have other tasks to tend to throughout the day when working from home. You might have to feed and walk the dog, do dishes, run laundry and more. To keep on top of these, find opportunities to multitask where you can.\n\n\nNeed to get up and refill your coffee..."
            },
            {
                "title": "5 Questions to Ask Your Insurance Rep About Your Renters Insurance | Travelers",
                "uri": "https://www.travelers.com/tools-resources/insurance-101/5-questions-to-ask-your-insurance-rep-about-renters-insurance",
                "document": "...Will Owning a Dog Affect my Renters Coverage?\n\n\nSome policies provide coverage if your dog injures someone, and some insurers exclude or limit coverage for customers who own a dog. It’s best to discuss this with your insurance representative when..."
            },
            {
                "title": "Wood Stove Safety Tips | Travelers Insurance",
                "uri": "https://www.travelers.com/resources/home/fire-safety/wood-stove-safety-tips",
                "document": "...Because a wood stove generates very hot combustion gases, its chimney must be either masonry (with flue tiles intact and in good condition) or manufactured specifically for burning wood..."
            },
            {
                "title": "How Smart Thermostats Can Help Protect Your Home | Travelers Insurance",
                "uri": "https://www.travelers.com/resources/home/smart-home/how-smart-thermostats-help-protect-your-home",
                "document": "...Or head out for a day trip in the middle of summer without dialing down the air conditioning for your dog? A smart thermostat can help you heat and cool your home more efficiently, monitor your energy consumption and let you control your home’s heating..."
            },
            {
                "title": "Cooking Fire Safety | Travelers Insurance",
                "uri": "https://www.travelers.com/resources/home/fire-safety/cooking-fire-safety",
                "document": "...an extinguisher nearby is important, but you also need to have the correct type of extinguisher and know how to properly use it.\n\tNever throw hot grease in the garbage as it can ignite combustible materials. Be sure to let grease cool and consider disposing it in an old can, such as a metal..."
            }
        ]
    },
    "locale": "en-US"
}

export const RESULT_WITH_RAG_RESULT: KnowledgeBaseResult = {
    generated: [
        {
            type: "retrieval-augmented-generation",
            hasAnswer: true,
            generated: "Generated Response",
            document: "Generated Response"
        }
    ]
}

export const RESULT_WITH_NEWLINES: KnowledgeBaseResult = {
    suggested:
        [{
            title:
                'Financial Terms Glossary | Consumer Financial Protection Bureau',
            uri:
                'https://www.consumerfinance.gov/consumer-tools/educator-tools/youth-financial-education/glossary',
            document:
                'Overdraft\n\nAn overdraft occurs when you don’t have enough money in your account to cover a transaction, but the bank pays the transaction anyway.\n\n\n\nBack to top\n\n\nP\n\nPaper check\n\nA paper order to a bank or credit union to pay someone from a checking account.\n\nPay period\n\nThe amount of time that an employee works before being paid — for example, a week or a month.\n\nPaycheck\n\nA check for your salary or wages made out to you.\n\nPayroll card\n\nA type of prepaid card you get from your employer that you receive your paycheck on.',
            topAnswer: undefined
        }],
    faqs: [],
    documents:
        [{
            title:
                'CFPB data point: Frequent overdrafters | Consumer Financial Protection Bureau',
            uri:
                'https://www.consumerfinance.gov/data-research/research-reports/cfpb-data-point-frequent-overdrafters',
            document:
                '...consumer behavior,\nand regulations to inform the public discourse. This sixth data point focuses on \n“frequent overdrafters,” defined here as accounts with more than 10\noverdrafts and non-sufficient funds (NSFs) combined in a 12-month period.\n\nFull report\n\nRead the full report...'
        },
        {
            title:
                'What is the difference between a prepaid card, a credit card, and a debit card?',
            uri:
                'https://www.consumerfinance.gov/ask-cfpb/my-prepaid-card-says-i-may-lose-up-to-50-or-even-500-if-i-dont-report-my-lost-or-stolen-card-or-card-pin-what-does-that-mean-en-535',
            document:
                '...Overspending can occur with a checking account for some\ntypes of uses, and with a bank account debit card if you have “opted in” to\nyour bank’s overdraft program. This means that your bank may charge you a fee\nfor covering the cost of a purchase or ATM withdrawal that exceeds what you\nhave in your...'
        },
        {
            title:
                'What is the difference between a prepaid card, a credit card, and a debit card?',
            uri:
                'https://www.consumerfinance.gov/ask-cfpb/what-are-some-types-of-prepaid-cards-en-381',
            document:
                '...Overspending can occur with a checking account for some\ntypes of uses, and with a bank account debit card if you have “opted in” to\nyour bank’s overdraft program. This means that your bank may charge you a fee\nfor covering the cost of a purchase or ATM withdrawal that exceeds what you\nhave in your...'
        },
        {
            title:
                'What is the difference between a prepaid card, a credit card, and a debit card?',
            uri:
                'https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-prepaid-card-a-credit-card-and-a-debit-card-en-433',
            document:
                '...Overspending can occur with a checking account for some\ntypes of uses, and with a bank account debit card if you have “opted in” to\nyour bank’s overdraft program. This means that your bank may charge you a fee\nfor covering the cost of a purchase or ATM withdrawal that exceeds what you\nhave in your...'
        },
        {
            title:
                'What is the difference between a prepaid card, a credit card, and a debit card?',
            uri:
                'https://www.consumerfinance.gov/ask-cfpb/can-i-overdraft-my-prepaid-card-en-525',
            document:
                '...Overspending can occur with a checking account for some\ntypes of uses, and with a bank account debit card if you have “opted in” to\nyour bank’s overdraft program. This means that your bank may charge you a fee\nfor covering the cost of a purchase or ATM withdrawal that exceeds what you\nhave in your...'
        },
        {
            title:
                'Bank accounts key terms | Consumer Financial Protection Bureau',
            uri:
                'https://www.consumerfinance.gov/consumer-tools/bank-accounts/answers/key-terms',
            document:
                '...Overdraft\n                    \n\n                \n\t\n                    An overdraft occurs when you don’t have enough money in your account to cover a transaction, but the bank pays the...'
        },
        {
            title:
                'Choose the Right Card for Your Situation | Consumer Financial Protection Bureau',
            uri:
                'https://www.consumerfinance.gov/consumer-tools/prepaid-cards/choose-the-right-card',
            document:
                '...for covering the cost of a purchase or ATM withdrawal that exceeds what you have in your account. Your bank will also require you to repay the overdraft...'
        },
        {
            title:
                'Bank accounts and services | Consumer Financial Protection Bureau',
            uri:
                'https://www.consumerfinance.gov/consumer-tools/bank-accounts',
            document:
                '...time a bank or credit union can make you wait. Read more\n\nUnderstand what it means to “opt-in” to overdraft coverage\n\n\n\n\n\nYou could be charged overdraft fees in connection with checks, electronic payments, or debit cards. There are steps you can take to reduce or eliminate overdraft fees...'
        },
        {
            title: 'David Low | Consumer Financial Protection Bureau',
            uri:
                'https://www.consumerfinance.gov/data-research/cfpb-researchers/david-low',
            document:
                '...Bureau Publications\n\n\n    \n\n    \n\n    \n        \n        \n            \n                \n\n\n\n\n    \n\n\n\n    \n        \n            Frequent Overdrafters\n        \n        \n            \n                \n                    Show...'
        }]
}

export const RESULT_WITH_NEWLINES_SPACES: KnowledgeBaseResult = {
    suggested:
        [{
            title: 'Mortgages key terms | Consumer Financial Protection Bureau',
            uri:
                'https://www.consumerfinance.gov/consumer-tools/mortgages/answers/key-terms',
            document:
                'Learn more about second mortgages.\n\n\n                    \n                \n\n\n\n\n        \n            \n                \t\n                    Security interest\n                    \n\n                \n\t\n                    The security interest is what lets the lender foreclose if you don\'t pay back the money you borrowed.\n\n\n                    Read more\n                \n\n\n\n\n        \n            \n                \t\n                    Seller financing\n                    \n\n                \n\t\n                    Seller financing is a loan that the seller of your home makes to you. \n\n\n                    Read more\n                \n\n\n\n\n        \n            \n                \t\n                    Servicer\n                    \n\n                \n\t\n                    Your mortgage servicer is the company that sends you your mortgage statements. Your servicer also handles the day-to-day tasks of managing your loan.',
            topAnswer: undefined
        },
        {
            title:
                'Understand loan options | Consumer Financial Protection Bureau',
            uri: 'https://www.consumerfinance.gov/owning-a-home/loan-options',
            document:
                'Mortgage insurance protects the lender if you fall behind on your payments. It does not protect you.\n\nYour credit score will suffer and you may face foreclosure if you don’t pay your mortgage on time.\n\nLearn more about mortgage insurance\n\n\n\n\n        \n    \n\n\n    \n\n\n        \n\n\n\n\n\n\n    \n        \n            \n                \n\n  \n  \n\n  \n    \n  \n\n  \n      \n      \n      \n\n  \n\n\n\n            \n        \n\n        \n        \n        \n        \n\n        \n        \n            \n                Was this page helpful to you?\n            \n\n\n            \n                \t\n                        \n                            \n                            \n                                Yes\n                            \n                        \n\n                    \n\t\n                        \n                                \n                                \n                                    No\n                                \n                        \n\n                    \n\n\n\n\n            \n\n        \n\n        \n\n        \n            \n                \n                    \n                        Additional comment\n                        (optional)\n                    \n                \n                \n                    Please do not share any personally identifiable information (PII), including, but not limited to: your name, address, phone number, email address, Social Security number, account information, or any other information of a sensitive nature.',
            topAnswer: undefined
        }],
    faqs: [],
    documents:
        [{
            title: 'Mortgages key terms | Consumer Financial Protection Bureau',
            uri:
                'https://www.consumerfinance.gov/consumer-tools/mortgages/answers/key-terms',
            document:
                '...about second mortgages.\n\n\n                    \n                \n\n\n\n\n        \n            \n                \t\n                    Security interest\n                    \n\n                \n\t\n                    The security interest is what lets the lender foreclose if you don\'t pay back the money you...'
        },
        {
            title: 'Mortgages key terms | Consumer Financial Protection Bureau',
            uri:
                'https://www.consumerfinance.gov/consumer-tools/mortgages/key-terms',
            document:
                '...about second mortgages.\n\n\n                    \n                \n\n\n\n\n        \n            \n                \t\n                    Security interest\n                    \n\n                \n\t\n                    The security interest is what lets the lender foreclose if you don\'t pay back the money you...'
        },
        {
            title: 'What is a reverse mortgage?',
            uri:
                'https://www.consumerfinance.gov/ask-cfpb/how-is-a-reverse-mortgage-different-from-a-traditional-mortgage-en-225',
            document:
                '...mortgage loan, like a traditional mortgage, allows homeowners to borrow money using their home as security for the loan.  Also like a traditional mortgage, when you take out a reverse mortgage loan, the title to your home remains in your name. However, unlike a traditional mortgage, with a...'
        },
        {
            title: 'What is a reverse mortgage?',
            uri:
                'https://www.consumerfinance.gov/ask-cfpb/what-is-a-reverse-mortgage-en-224',
            document:
                '...mortgage loan, like a traditional mortgage, allows homeowners to borrow money using their home as security for the loan.  Also like a traditional mortgage, when you take out a reverse mortgage loan, the title to your home remains in your name. However, unlike a traditional mortgage, with a...'
        },
        {
            title: 'When do I have to pay back a reverse mortgage loan?',
            uri:
                'https://www.consumerfinance.gov/ask-cfpb/when-do-i-have-to-pay-back-a-reverse-mortgage-loan-en-236',
            document:
                '...What happens to my reverse mortgage when I die?\n                            \n                        \n\t\n                            \n                                \n                                    Learn more about\n                                    reverse mortgages...'
        },
        {
            title: 'What is mortgage insurance and how does it work?',
            uri:
                'https://www.consumerfinance.gov/ask-cfpb/what-is-mortgage-insurance-and-how-does-it-work-en-1953',
            document:
                '...Learn more about\n                                    mortgages...'
        },
        {
            title:
                'What should I think about before applying for a reverse mortgage loan and what should I ask a reverse mortgage counselor?',
            uri:
                'https://www.consumerfinance.gov/ask-cfpb/what-should-i-think-about-before-applying-for-reverse-mortgage-en-228',
            document:
                '...Can anyone take out a reverse mortgage loan?\n                            \n                        \n\t\n                            \n                                \n                                    Learn more about\n                                    reverse mortgages...'
        },
        {
            title:
                'For an adjustable-rate mortgage (ARM), what are the index and margin, and how do they work?',
            uri:
                'https://www.consumerfinance.gov/ask-cfpb/for-an-adjustable-rate-mortgage-arm-what-are-the-index-and-margin-and-how-do-they-work-en-1949',
            document:
                '...fixed-rate and adjustable-rate mortgage (ARM) loan?\n                            \n                        \n\t\n                            \n                                \n                                    Learn more about\n                                    mortgages...'
        }]
}

// This has a really nice answer that isn't the top but good and long highlight
export const REQUEST_WITH_GOOD_HIGHLIGHTED_ANSWER: IntentRequest & { requestAttributes: object; sessionAttributes: object } = {
    "platform": "lex-connect",
    "type": "INTENT_REQUEST",
    "anonymous": false,
    "channel": "widget",
    "intentId": "OCSearch",
    "isHealthCheck": false,
    "isNewSession": false,
    "matchConfidence": null,
    "rawQuery": "what is inflation",
    "requestAttributes": {
        "channel": "widget",
        "type": "INTENT_REQUEST",
        "userId": "stentor-widget-user-41b48e67-5d44-65c8-971e-0d552aa1a627",
        "platform": "stentor-platform",
        "x-amz-lex:kendra-search-response-document-link-2": "https://investor.gov/introduction-investing/basics/investment-products/bonds",
        "x-amz-lex:kendra-search-response-document-link-1": "https://www.investor.gov/introduction-investing/investing-basics/investment-products/bonds-or-fixed-income-products/bonds",
        "x-amz-lex:kendra-search-response-document-5": "...Inflation is a general upward movement of prices.  Inflation reduces purchasing power, which is a risk for investors receiving a fixed rate of interest.  The principal concern for individuals investing in cash equivalents is that inflation will erode returns.\n\n\n\nInterest Rate Risk\n\n\n\nInterest...",
        "x-amz-lex:kendra-search-response-document-4": "...Municipal Market Access (EMMA®) website\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.\n\tInflation risk. Inflation is a general upward movement in prices.  Inflation reduces purchasing power, which is a risk for investors receiving a fixed rate of interest.  It also can lead to higher interest rates and lower...",
        "x-amz-lex:kendra-search-response-answer-1": "Inflation is a general upward movement in prices. Inflation reduces purchasing power, which is a risk for investors receiving a fixed rate of interest.\n\n\n\nLiquidity risk. This refers to the risk that investors won’t find a market for the bond, potentially preventing them from buying or selling when they want.\n\n\n\nCall risk. The possibility that a bond issuer retires a bond before its maturity date, something an issuer might do if interest rates decline, much like a homeowner might refinance a mortgage to benefit from lower interest rates.\n\n\n\nAvoiding fraud\n\n\n\nCorporate bonds are securities and, if publicly offered, must be registered with the SEC.",
        "x-amz-lex:kendra-search-response-document-link-5": "https://www.investor.gov/introduction-investing/basics/what-risk",
        "x-amz-lex:kendra-search-response-document-link-4": "https://www.investor.gov/additional-resources/news-alerts/alerts-bulletins/investor-bulletin-municipal-bonds-asset",
        "x-amz-lex:kendra-search-response-document-link-3": "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/municipal",
        "x-amz-lex:kendra-search-response-document-3": "...rate municipal bond and try to sell it before it matures could lose money because of the lower market value of the bond. \n\n\n\nInflation risk. Inflation is a general upward movement in prices. Inflation reduces purchasing power, which is a risk for investors receiving a fixed rate of interest...",
        "x-amz-lex:kendra-search-response-document-2": "...rate of interest than older ones. To sell an older bond with a lower interest rate, you might have to sell it at a discount.\n\n\n\nInflation risk. Inflation is a general upward movement in prices. Inflation reduces purchasing power, which is a risk for investors receiving a fixed rate of interest...",
        "x-amz-lex:kendra-search-response-document-1": "...rate of interest than older ones. To sell an older bond with a lower interest rate, you might have to sell it at a discount.\n\n\n\nInflation risk. Inflation is a general upward movement in prices. Inflation reduces purchasing power, which is a risk for investors receiving a fixed rate of interest...",
        "rawQuery": "what is inflation"
    },
    "sessionAttributes": {
        "channel": "widget",
        "sessionId": "stentor-widget-session-03d183c3-951b-654a-90dc-683b70a8ab52",
        "userId": "stentor-widget-user-41b48e67-5d44-65c8-971e-0d552aa1a627",
        "platform": "stentor-platform"
    },
    "sessionId": "stentor-widget-session-03d183c3-951b-654a-90dc-683b70a8ab52",
    "slots": {},
    "userId": "stentor-widget-user-41b48e67-5d44-65c8-971e-0d552aa1a627",
    "knowledgeBaseResult": {
        "suggested": [
            {
                "title": "Bonds | Investor.gov",
                "uri": "https://investor.gov/introduction-investing/basics/investment-products/bonds",
                "document": "Inflation is a general upward movement in prices. Inflation reduces purchasing power, which is a risk for investors receiving a fixed rate of interest.\n\n\n\nLiquidity risk. This refers to the risk that investors won’t find a market for the bond, potentially preventing them from buying or selling when they want.\n\n\n\nCall risk. The possibility that a bond issuer retires a bond before its maturity date, something an issuer might do if interest rates decline, much like a homeowner might refinance a mortgage to benefit from lower interest rates.\n\n\n\nAvoiding fraud\n\n\n\nCorporate bonds are securities and, if publicly offered, must be registered with the SEC.",
                "highlights": [
                    {
                        "beginOffset": 0,
                        "endOffset": 48,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 0,
                        "endOffset": 9,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 50,
                        "endOffset": 59,
                        "topAnswer": false
                    }
                ]
            }
        ],
        "faqs": [],
        "documents": [
            {
                "title": "Bonds | Investor.gov",
                "uri": "https://www.investor.gov/introduction-investing/investing-basics/investment-products/bonds-or-fixed-income-products/bonds",
                "document": "...rate of interest than older ones. To sell an older bond with a lower interest rate, you might have to sell it at a discount.\n\n\n\nInflation risk. Inflation is a general upward movement in prices. Inflation reduces purchasing power, which is a risk for investors receiving a fixed rate of interest...",
                "highlights": [
                    {
                        "beginOffset": 131,
                        "endOffset": 140,
                        "topAnswer": false,

                    },
                    {
                        "beginOffset": 147,
                        "endOffset": 156,
                        "topAnswer": false,

                    },
                    {
                        "beginOffset": 197,
                        "endOffset": 206,
                        "topAnswer": false,

                    }
                ]
            },
            {
                "title": "Bonds | Investor.gov",
                "uri": "https://investor.gov/introduction-investing/basics/investment-products/bonds",
                "document": "...rate of interest than older ones. To sell an older bond with a lower interest rate, you might have to sell it at a discount.\n\n\n\nInflation risk. Inflation is a general upward movement in prices. Inflation reduces purchasing power, which is a risk for investors receiving a fixed rate of interest...",
                "highlights": [
                    {
                        "beginOffset": 131,
                        "endOffset": 140,
                        "topAnswer": false,

                    },
                    {
                        "beginOffset": 147,
                        "endOffset": 156,
                        "topAnswer": false,

                    },
                    {
                        "beginOffset": 197,
                        "endOffset": 206,
                        "topAnswer": false,

                    }
                ]
            },
            {
                "title": "Municipal Bonds | Investor.gov",
                "uri": "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/municipal",
                "document": "...rate municipal bond and try to sell it before it matures could lose money because of the lower market value of the bond. \n\n\n\nInflation risk. Inflation is a general upward movement in prices. Inflation reduces purchasing power, which is a risk for investors receiving a fixed rate of interest...",
                "highlights": [
                    {
                        "beginOffset": 128,
                        "endOffset": 137,
                        "topAnswer": false,

                    },
                    {
                        "beginOffset": 144,
                        "endOffset": 153,
                        "topAnswer": false,

                    },
                    {
                        "beginOffset": 194,
                        "endOffset": 203,
                        "topAnswer": false,

                    }
                ]
            },
            {
                "title": "Investor Bulletin: Municipal Bonds – Asset Allocation, Diversification, and Risk | Investor.gov",
                "uri": "https://www.investor.gov/additional-resources/news-alerts/alerts-bulletins/investor-bulletin-municipal-bonds-asset",
                "document": "...Municipal Market Access (EMMA®) website\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.\n\tInflation risk. Inflation is a general upward movement in prices.  Inflation reduces purchasing power, which is a risk for investors receiving a fixed rate of interest.  It also can lead to higher interest rates and lower...",
                "highlights": [
                    {
                        "beginOffset": 78,
                        "endOffset": 87,
                        "topAnswer": false,

                    },
                    {
                        "beginOffset": 94,
                        "endOffset": 103,
                        "topAnswer": false,

                    },
                    {
                        "beginOffset": 145,
                        "endOffset": 154,
                        "topAnswer": false,

                    }
                ]
            },
            {
                "title": "What is Risk? | Investor.gov",
                "uri": "https://www.investor.gov/introduction-investing/basics/what-risk",
                "document": "...Inflation is a general upward movement of prices.  Inflation reduces purchasing power, which is a risk for investors receiving a fixed rate of interest.  The principal concern for individuals investing in cash equivalents is that inflation will erode returns.\n\n\n\nInterest Rate Risk\n\n\n\nInterest...",
                "highlights": [
                    {
                        "beginOffset": 3,
                        "endOffset": 12,
                        "topAnswer": false,

                    },
                    {
                        "beginOffset": 54,
                        "endOffset": 63,
                        "topAnswer": false,

                    },
                    {
                        "beginOffset": 233,
                        "endOffset": 242,
                        "topAnswer": false,

                    }
                ]
            },
            {
                "title": "What is Risk? | Investor.gov",
                "uri": "https://www.investor.gov/introduction-investing/investing-basics/what-risk",
                "document": "...Inflation is a general upward movement of prices.  Inflation reduces purchasing power, which is a risk for investors receiving a fixed rate of interest.  The principal concern for individuals investing in cash equivalents is that inflation will erode returns.\n\n\n\nInterest Rate Risk\n\n\n\nInterest...",
                "highlights": [
                    {
                        "beginOffset": 3,
                        "endOffset": 12,
                        "topAnswer": false,

                    },
                    {
                        "beginOffset": 54,
                        "endOffset": 63,
                        "topAnswer": false,

                    },
                    {
                        "beginOffset": 233,
                        "endOffset": 242,
                        "topAnswer": false,

                    }
                ]
            },
            {
                "title": "Investor Bulletin: Municipal Bonds – Asset Allocation, Diversification, and Risk | Investor.gov",
                "uri": "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-35",
                "document": "...Municipal Market Access (EMMA®) website\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.\n\tInflation risk. Inflation is a general upward movement in prices.  Inflation reduces purchasing power, which is a risk for investors receiving a fixed rate of interest.  It also can lead to higher interest rates and lower...",
                "highlights": [
                    {
                        "beginOffset": 78,
                        "endOffset": 87,
                        "topAnswer": false,

                    },
                    {
                        "beginOffset": 94,
                        "endOffset": 103,
                        "topAnswer": false,

                    },
                    {
                        "beginOffset": 145,
                        "endOffset": 154,
                        "topAnswer": false,

                    }
                ]
            },
            {
                "title": "Financial Terms Glossary | Consumer Financial Protection Bureau",
                "uri": "https://www.consumerfinance.gov/consumer-tools/educator-tools/youth-financial-education/glossary",
                "document": "...dividends). Includes both personal and business or corporate income taxes. Not all states and localities have income taxes.\n\nInflation\n\nInflation occurs when the prices of goods and services increase over time.\n\nInsurance\n\nThe practice or arrangement in which a company or government agency...",
                "highlights": [
                    {
                        "beginOffset": 128,
                        "endOffset": 137,
                        "topAnswer": false,

                    },
                    {
                        "beginOffset": 139,
                        "endOffset": 148,
                        "topAnswer": false,

                    }
                ]
            },
            {
                "title": "Municipal Bonds | Investor.gov",
                "uri": "https://www.investor.gov/introduction-investing/investing-basics/investment-products/bonds-or-fixed-income-products-0",
                "document": "...it matures could lose money because of the lower market value of the bond. \n\n\n\nInflation risk. Inflation is a general upward movement in prices. Inflation reduces purchasing power, which is a risk for investors receiving a fixed rate of interest. It also can lead to higher interest rates and, in...",
                "highlights": [
                    {
                        "beginOffset": 82,
                        "endOffset": 91,
                        "topAnswer": false,

                    },
                    {
                        "beginOffset": 98,
                        "endOffset": 107,
                        "topAnswer": false,

                    },
                    {
                        "beginOffset": 148,
                        "endOffset": 157,
                        "topAnswer": false,

                    }
                ]
            }
        ]
    },
    "locale": "en-US"
}

export const REQUEST_KBR_WITH_GOOD_HIGHLIGHTED_ANSWER: Request & { requestAttributes: object; sessionAttributes: object } = {
    "platform": "lex-connect",
    "type": "INTENT_REQUEST",
    "anonymous": false,
    "channel": "widget",
    "intentId": "OCSearch",
    "isHealthCheck": false,
    "isNewSession": false,
    "matchConfidence": null,
    "rawQuery": "do you provide commercial roofing services",
    "requestAttributes": {
        "channel": "widget",
        "type": "INTENT_REQUEST",
        "userId": "stentor-widget-user-4f22818e-dd57-6501-8a78-e4d975f19df7",
        "platform": "stentor-platform",
        "x-amz-lex:kendra-search-response-document-link-2": "https://www.hinkleroofing.com/roofing/commercial-roof-maintenance-how-to-get-started",
        "x-amz-lex:kendra-search-response-document-link-1": "https://www.hinkleroofing.com/commercial-roofing",
        "x-amz-lex:kendra-search-response-document-5": "...Roofing, we provide top-notch roofing services for property owners and facilities managers. Call (205) 352-1940 to learn more. You can also fill out our contact form to request a free estimate. We serve Hoover and Calera, AL, businesses.\n\n\n\nFiled Under: Roofing Tagged With: commercial roofing...",
        "x-amz-lex:kendra-search-response-document-4": "...Commercial roofing\n\n\nWe focus on giving fast services without compromising quality. We are a roofing contractor in Tuscaloosa, AL that specializes on all kinds of commercial and flat roofing.\n\nWhat Sets Us Apart\n\nHinkle Roofing has built a reputation for roofing and other home...",
        "x-amz-lex:kendra-search-response-answer-2": "If you want fast, high-quality work, then Hinkle Roofing is your go-to contractor for both commercial and flat roofing jobs.\n\nOur Commercial Services\n\nHinkle Roofing provides free on-site evaluations and estimates. We use only the highest quality products for our commercial services, and everything is installed to the specifications of the manufacturer. You can trust us to repair your commercial roof quickly and correctly. We always inspect our completed work to ensure that it is up to our standards and that you are satisfied with the job.\n\nWe work hard to keep our prices fair and affordable, and we are transparent in every transaction.",
        "x-amz-lex:kendra-search-response-answer-1": "We can resolve the issue if you decide you need a new roof. We will add roof drains or use tapered roof insulation to address poor drainage. We’ll also ensure proper flashing as they can be a source of leaks.\n\nHinkle Roofing provides residential and commercial roofing services. We are also experts in vinyl siding installation. You can count on us to put a good roof over your head. We serve homeowners and businesses in Tuscaloosa, AL and nearby areas.",
        "x-amz-lex:kendra-search-response-document-link-5": "https://www.hinkleroofing.com/roofing/important-questions-to-ask-commercial-roof-inspection-pros",
        "x-amz-lex:kendra-search-response-document-link-4": "https://www.hinkleroofing.com/roofing/quality-home-improvement-services-by-hinkle-roofing",
        "x-amz-lex:kendra-search-response-document-link-3": "https://www.hinkleroofing.com/roofing/the-advantages-of-working-with-a-local-roofer",
        "x-amz-lex:kendra-search-response-document-3": "...Personalized Service\n\n\n\n\nLocal roofers serve a relatively smaller customer base. Chances are, local roofing companies are owned by someone you know, or have installed or repaired the roofs of people that you know. These companies can provide warm, personalized service and a better customer...",
        "x-amz-lex:kendra-search-response-document-2": "...AL\n\tHoover, AL\n\tJasper, AL\n\tMountain Brook, AL\n\tTuscaloosa, AL\n\tVestavia Hills, AL\n\tBirmingham, AL\n\tCullman, AL\n\n\n\n\n\n\t\tServices\n\n\tResidential Roofing\n\tCommercial Roofing\n\tWindows\n\tSiding\n\tGutters\n\n\n\n\n\n \t\t\n\n\nCopyright © 2021 Hinkle Roofing. All Rights Reserved.\nFollow Us...",
        "x-amz-lex:kendra-search-response-document-1": "...Roofing is your go-to contractor for both commercial and flat roofing jobs.\n\nOur Commercial Services\n\nHinkle Roofing provides free on-site evaluations and estimates. We use only the highest quality products for our commercial services, and everything is installed to the specifications of the...",
        "rawQuery": "do you provide commercial roofing services"
    },
    "sessionAttributes": {
        "channel": "widget",
        "sessionId": "stentor-widget-session-7160af8b-9b26-65a2-a5aa-de132ccb2db2",
        "userId": "stentor-widget-user-4f22818e-dd57-6501-8a78-e4d975f19df7",
        "platform": "stentor-platform"
    },
    "sessionId": "stentor-widget-session-7160af8b-9b26-65a2-a5aa-de132ccb2db2",
    "slots": {},
    "userId": "stentor-widget-user-4f22818e-dd57-6501-8a78-e4d975f19df7",
    "knowledgeBaseResult": {
        "suggested": [
            {
                "title": "Dealing With Common Commercial Roofing Problems - Hinkle Roofing",
                "uri": "https://www.hinkleroofing.com/roofing/dealing-with-common-commercial-roofing-problems",
                "document": "We can resolve the issue if you decide you need a new roof. We will add roof drains or use tapered roof insulation to address poor drainage. We’ll also ensure proper flashing as they can be a source of leaks.\n\nHinkle Roofing provides residential and commercial roofing services. We are also experts in vinyl siding installation. You can count on us to put a good roof over your head. We serve homeowners and businesses in Tuscaloosa, AL and nearby areas.",
                "highlights": [
                    {
                        "beginOffset": 54,
                        "endOffset": 58,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 72,
                        "endOffset": 76,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 99,
                        "endOffset": 103,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 217,
                        "endOffset": 224,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 225,
                        "endOffset": 233,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 250,
                        "endOffset": 260,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 261,
                        "endOffset": 268,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 269,
                        "endOffset": 277,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 363,
                        "endOffset": 367,
                        "topAnswer": false
                    }
                ]
            },
            {
                "title": "Commercial Roofing | Hinkle Roofing | Birmingham, AL",
                "uri": "https://www.hinkleroofing.com/commercial-roofing",
                "document": "If you want fast, high-quality work, then Hinkle Roofing is your go-to contractor for both commercial and flat roofing jobs.\n\nOur Commercial Services\n\nHinkle Roofing provides free on-site evaluations and estimates. We use only the highest quality products for our commercial services, and everything is installed to the specifications of the manufacturer. You can trust us to repair your commercial roof quickly and correctly. We always inspect our completed work to ensure that it is up to our standards and that you are satisfied with the job.\n\nWe work hard to keep our prices fair and affordable, and we are transparent in every transaction.",
                "highlights": [
                    {
                        "beginOffset": 49,
                        "endOffset": 56,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 91,
                        "endOffset": 101,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 111,
                        "endOffset": 118,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 130,
                        "endOffset": 140,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 141,
                        "endOffset": 149,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 158,
                        "endOffset": 165,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 166,
                        "endOffset": 174,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 264,
                        "endOffset": 274,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 275,
                        "endOffset": 283,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 388,
                        "endOffset": 398,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 399,
                        "endOffset": 403,
                        "topAnswer": false
                    }
                ]
            }
        ],
        "faqs": [],
        "documents": [
            {
                "title": "Commercial Roofing | Hinkle Roofing | Birmingham, AL",
                "uri": "https://www.hinkleroofing.com/commercial-roofing",
                "document": "...Roofing is your go-to contractor for both commercial and flat roofing jobs.\n\nOur Commercial Services\n\nHinkle Roofing provides free on-site evaluations and estimates. We use only the highest quality products for our commercial services, and everything is installed to the specifications of the...",
                "highlights": [
                    {
                        "beginOffset": 3,
                        "endOffset": 10,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 45,
                        "endOffset": 55,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 65,
                        "endOffset": 72,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 84,
                        "endOffset": 94,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 95,
                        "endOffset": 103,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 112,
                        "endOffset": 119,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 120,
                        "endOffset": 128,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 218,
                        "endOffset": 228,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 229,
                        "endOffset": 237,
                        "topAnswer": false
                    }
                ]
            },
            {
                "title": "Commercial Roof Maintenance: How to Get Started",
                "uri": "https://www.hinkleroofing.com/roofing/commercial-roof-maintenance-how-to-get-started",
                "document": "...AL\n\tHoover, AL\n\tJasper, AL\n\tMountain Brook, AL\n\tTuscaloosa, AL\n\tVestavia Hills, AL\n\tBirmingham, AL\n\tCullman, AL\n\n\n\n\n\n\t\tServices\n\n\tResidential Roofing\n\tCommercial Roofing\n\tWindows\n\tSiding\n\tGutters\n\n\n\n\n\n \t\t\n\n\nCopyright © 2021 Hinkle Roofing. All Rights Reserved.\nFollow Us...",
                "highlights": [
                    {
                        "beginOffset": 122,
                        "endOffset": 130,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 145,
                        "endOffset": 152,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 154,
                        "endOffset": 164,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 165,
                        "endOffset": 172,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 234,
                        "endOffset": 241,
                        "topAnswer": false
                    }
                ]
            },
            {
                "title": "The Advantages of Working With a Local Roofer",
                "uri": "https://www.hinkleroofing.com/roofing/the-advantages-of-working-with-a-local-roofer",
                "document": "...Personalized Service\n\n\n\n\nLocal roofers serve a relatively smaller customer base. Chances are, local roofing companies are owned by someone you know, or have installed or repaired the roofs of people that you know. These companies can provide warm, personalized service and a better customer...",
                "highlights": [
                    {
                        "beginOffset": 16,
                        "endOffset": 23,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 103,
                        "endOffset": 110,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 186,
                        "endOffset": 191,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 237,
                        "endOffset": 244,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 264,
                        "endOffset": 271,
                        "topAnswer": false
                    }
                ]
            },
            {
                "title": "Quality Home Improvement Services by Hinkle Roofing",
                "uri": "https://www.hinkleroofing.com/roofing/quality-home-improvement-services-by-hinkle-roofing",
                "document": "...Commercial roofing\n\n\nWe focus on giving fast services without compromising quality. We are a roofing contractor in Tuscaloosa, AL that specializes on all kinds of commercial and flat roofing.\n\nWhat Sets Us Apart\n\nHinkle Roofing has built a reputation for roofing and other home...",
                "highlights": [
                    {
                        "beginOffset": 3,
                        "endOffset": 13,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 14,
                        "endOffset": 21,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 48,
                        "endOffset": 56,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 96,
                        "endOffset": 103,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 166,
                        "endOffset": 176,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 186,
                        "endOffset": 193,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 223,
                        "endOffset": 230,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 258,
                        "endOffset": 265,
                        "topAnswer": false
                    }
                ]
            },
            {
                "title": "Important Questions to Ask Commercial Roof Inspection Pros - Hinkle Roofing",
                "uri": "https://www.hinkleroofing.com/roofing/important-questions-to-ask-commercial-roof-inspection-pros",
                "document": "...Roofing, we provide top-notch roofing services for property owners and facilities managers. Call (205) 352-1940 to learn more. You can also fill out our contact form to request a free estimate. We serve Hoover and Calera, AL, businesses.\n\n\n\nFiled Under: Roofing Tagged With: commercial roofing...",
                "highlights": [
                    {
                        "beginOffset": 3,
                        "endOffset": 10,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 15,
                        "endOffset": 22,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 33,
                        "endOffset": 40,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 41,
                        "endOffset": 49,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 257,
                        "endOffset": 264,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 278,
                        "endOffset": 288,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 289,
                        "endOffset": 296,
                        "topAnswer": false
                    }
                ]
            },
            {
                "title": "3 Useful Tips on Choosing Your Commercial Roofing Company",
                "uri": "https://www.hinkleroofing.com/roofing/3-useful-tips-on-choosing-your-commercial-roofing-company",
                "document": "...AL\n\tHoover, AL\n\tJasper, AL\n\tMountain Brook, AL\n\tTuscaloosa, AL\n\tVestavia Hills, AL\n\tBirmingham, AL\n\tCullman, AL\n\n\n\n\n\n\t\tServices\n\n\tResidential Roofing\n\tCommercial Roofing\n\tWindows\n\tSiding\n\tGutters\n\n\n\n\n\n \t\t\n\n\nCopyright © 2021 Hinkle Roofing. All Rights Reserved.\nFollow Us...",
                "highlights": [
                    {
                        "beginOffset": 122,
                        "endOffset": 130,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 145,
                        "endOffset": 152,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 154,
                        "endOffset": 164,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 165,
                        "endOffset": 172,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 234,
                        "endOffset": 241,
                        "topAnswer": false
                    }
                ]
            },
            {
                "title": "The 3 Main Differences Between Residential and Commercial Roofing",
                "uri": "https://www.hinkleroofing.com/roofing/the-3-main-differences-between-residential-and-commercial-roofing",
                "document": "...Both roofing systems require regular maintenance and repairs performed by professionals.\n\nHinkle Roofing is one of the few roofers who offer both residential and commercial roofing services. Call us today at (205) 352-1940 or fill out our contact form to schedule a free consultation. We serve...",
                "highlights": [
                    {
                        "beginOffset": 8,
                        "endOffset": 15,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 100,
                        "endOffset": 107,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 165,
                        "endOffset": 175,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 176,
                        "endOffset": 183,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 184,
                        "endOffset": 192,
                        "topAnswer": false
                    }
                ]
            },
            {
                "title": "Part 3: Your Commercial Roofing Contractor",
                "uri": "https://www.hinkleroofing.com/3-part-blog/top-3-considerations-for-a-hassle-free-commercial-roof-upgrade-part-3-your-commercial-roofing-contractor",
                "document": "...roofers that pass their stringent requirements. These certifications give contractors the exclusive permission to offer, install and service the manufacturer’s roofing systems...",
                "highlights": [
                    {
                        "beginOffset": 136,
                        "endOffset": 143,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 163,
                        "endOffset": 170,
                        "topAnswer": false
                    }
                ]
            }
        ]
    },
    "locale": "en-US"
}

export const STRONG_FAQ: KnowledgeBaseResult = {
    suggested:
        [{
            title:
                'Money transfers key terms | Consumer Financial Protection Bureau',
            uri:
                'https://www.consumerfinance.gov/consumer-tools/money-transfers/answers/key-terms',
            document:
                ')\n                    \n\n                \n\t\n                    An ACH is an electronic fund transfer made between banks and credit unions across what is called the Automated Clearing House network.\n\nACH is used for all kinds of fund transfer transactions, including direct deposit of paychecks and monthly debits for routine payments. Merchants often enable consumers to pay bills via ACH by providing an account number and bank routing number. A number of online payment services also conduct transactions via ACH, including most banks and credit unions’ online bill payment services.\n\n\n                    Read more\n                \n\n\n\n\n        \n            \n                \t\n                    Remittance transfer\n                    \n\n                \n\t\n                    Federal law defines “remittance transfers” as most electronic money transfers from consumers in the United States through “remittance transfer providers” to recipients abroad.',
            topAnswer: undefined
        },
        {
            title:
                'Bank accounts key terms | Consumer Financial Protection Bureau',
            uri:
                'https://www.consumerfinance.gov/consumer-tools/bank-accounts/answers/key-terms',
            document:
                '(ACH)\n                    \n\n                \n\t\n                    An Automated Clearing House (ACH) authorization is a payment authorization that gives the lender permission to electronically take money from your bank, credit union, or prepaid card account when your payment is due. You can revoke this authorization.\n\n\n                    \n                \n\n\n\n\n        \n            \n                \t\n                    Automatic debit payment\n                    \n\n                \n\t\n                    With automatic debits, you give your permission to the company to take the payments directly from your bank account. This is different than the recurring bill-pay feature offered by your bank. In recurring bill-pay, you give permission to your bank or credit union to send the payments to the company.',
            topAnswer: undefined
        }],
    faqs:
        [{
            question: 'What is ACH?',
            document:
                'An ACH is an electronic fund transfer made between banks and credit unions across what is called the Automated Clearing House network.\n\nACH is used for all kinds of fund transfer transactions, including direct deposit of paychecks and monthly debits for routine payments. Merchants often enable consumers to pay bills via ACH by providing an account number and bank routing number. A number of online payment services also conduct transactions via ACH, including most banks and credit unions’ online bill payment services.',
            uri:
                'https://www.consumerfinance.gov/consumer-tools/money-transfers/answers/key-terms/#automated-clearing-house-ach'
        }],
    documents:
        [{
            title:
                'Money transfers key terms | Consumer Financial Protection Bureau',
            uri:
                'https://www.consumerfinance.gov/consumer-tools/money-transfers/answers/key-terms',
            document:
                '...An ACH is an electronic fund transfer made between banks and credit unions across what is called the Automated Clearing House network.\n\nACH is used for all kinds of fund transfer transactions, including direct deposit of paychecks and monthly debits for routine payments. Merchants often...'
        },
        {
            title:
                'Bank accounts key terms | Consumer Financial Protection Bureau',
            uri:
                'https://www.consumerfinance.gov/consumer-tools/bank-accounts/answers/key-terms',
            document:
                '...ACH)\n                    \n\n                \n\t\n                    An Automated Clearing House (ACH) authorization is a payment authorization that gives the lender permission to electronically take money from your bank, credit union, or prepaid...'
        },
        {
            title: 'How do I repay a payday loan?',
            uri:
                'https://www.consumerfinance.gov/ask-cfpb/how-do-i-repay-a-payday-loan-en-1599',
            document:
                '...If you have taken out a loan online, you likely provided an ACH authorization for the lender to electronically access your checking account for repayment on the loan due date. So, while the way you repay a loan...'
        },
        {
            title:
                'Payday loans key terms | Consumer Financial Protection Bureau',
            uri:
                'https://www.consumerfinance.gov/consumer-tools/payday-loans/answers/key-terms',
            document:
                '...ACH debit. Payday loans are typically a single payment loan, but if the loan requires multiple payments, the online lender will need to obtain an ACH authorization from you and provide you with a copy of terms of the authorization...'
        },
        {
            title: 'Money transfers | Consumer Financial Protection Bureau',
            uri:
                'https://www.consumerfinance.gov/consumer-tools/money-transfers',
            document:
                '...Key terms\n\n\n        \n\n        \n\n        \n            \t\n                    Automated Clearing House (ACH)\n                \n\t\n                    Remittance transfer\n                \n\t\n                    Remittance transfer provider...'
        },
        {
            title:
                'Payday loans how-to guides | Consumer Financial Protection Bureau',
            uri:
                'https://www.consumerfinance.gov/consumer-tools/payday-loans/answers/how-to-guides',
            document:
                '...I tell if a payday lender is licensed to do business in my state?\n\n            \n            \n            \n                I was asked to sign an “ACH  authorization” to allow electronic access to my account in order to repay a payday loan. What is that...'
        },
        {
            title:
                'Bank accounts and services | Consumer Financial Protection Bureau',
            uri:
                'https://www.consumerfinance.gov/consumer-tools/bank-accounts',
            document:
                '...Key terms\n\n\n        \n\n        \n\n        \n            \t\n                    Automated Clearing House (ACH)\n                \n\t\n                    Automatic debit payment\n                \n\t\n                    Deposit hold...'
        }]
}

export const NO_SUGGEST_OR_FAQ: KnowledgeBaseResult = {
    suggested: [],
    faqs: [],
    documents:
        [{
            title: 'What is a credit card interest rate? What does APR mean?',
            uri:
                'https://www.consumerfinance.gov/ask-cfpb/what-is-a-credit-card-interest-rate-what-does-apr-mean-en-44',
            document:
                '...last reviewed: JUL 12, 2017\n            \n        \n        \n            What is a credit card interest rate? What does APR mean?\n        \n\n\n    \n\n    \n        \n            \n                A credit card’s interest rate is the price you pay for borrowing money...'
        },
        {
            title: 'What is a "daily periodic rate" on a credit card?',
            uri:
                'https://www.consumerfinance.gov/ask-cfpb/what-is-a-daily-periodic-rate-on-a-credit-card-en-46',
            document:
                '...What is a credit card interest rate?  What does APR mean...'
        },
        {
            title:
                'When does a credit card company decide what interest rate to offer me on a credit card?',
            uri:
                'https://www.consumerfinance.gov/ask-cfpb/when-does-a-credit-card-company-decide-what-interest-rate-to-offer-me-on-a-credit-card-en-9',
            document:
                '...related questions \n\n\n                    \t\n                            \n                                What is a credit card interest rate?  What does APR mean?\n                            \n                        \n\t\n                            \n                                Why did I get a...'
        },
        {
            title:
                'What does it mean to "default" on my private student loans?',
            uri:
                'https://www.consumerfinance.gov/ask-cfpb/what-does-it-mean-to-default-on-my-private-student-loans-en-665',
            document:
                '...payments from me?\n                            \n                        \n\t\n                            \n                                What does it mean to "default" on my federal student loans...'
        },
        {
            title:
                'Six months ago the interest rate on my account was increased. I have noticed that the interest rate has been reduced, but is still not going back to my original rate. Can they do that?',
            uri:
                'https://www.consumerfinance.gov/ask-cfpb/six-months-ago-the-interest-rate-on-my-account-was-increased-i-have-noticed-that-the-interest-rate-has-been-reduced-but-is-still-not-going-back-to-my-original-rate-can-they-do-that-en-71',
            document:
                '...charged with the rate the card issuer would charge you today if you applied for a new card, based on the issuer\'s pricing for new accounts. If your rate is higher than what you would be charged as a new customer, the card issuer must reduce your rate to the rate charged for new customers. However...'
        },
        {
            title: 'What does it mean to renew or roll over a payday loan?',
            uri:
                'https://www.consumerfinance.gov/ask-cfpb/what-does-it-mean-to-renew-or-roll-over-a-payday-loan-en-1573',
            document:
                '...JUN 07, 2017\n            \n        \n        \n            What does it mean to renew or roll over a payday loan?\n        \n\n\n    \n\n    \n        \n            \n                Generally, renewing or rolling over a payday loan means you pay a fee to delay paying back the loan. This fee does not reduce...'
        },
        {
            title:
                'Know Before You Owe: Credit cards | Consumer Financial Protection Bureau',
            uri:
                'https://www.consumerfinance.gov/data-research/credit-card-data/know-you-owe-credit-cards',
            document:
                '...card agreement. You may also have your interest rates raised to the penalty APR for all new purchases. One missed or late minimum payment also could mean that you lose your introductory APR and have to start paying the higher long term rate on your existing balance...'
        },
        {
            title:
                'The card issuer increased my interest rate on my existing balance. Can they do that? What can I do to get the rate back down?',
            uri:
                'https://www.consumerfinance.gov/ask-cfpb/the-card-issuer-increased-my-interest-rate-on-my-existing-balance-can-they-do-that-what-can-i-do-to-get-the-rate-back-down-en-72',
            document:
                '...What can I do to get the rate back down?\n        \n\n\n    \n\n    \n        \n            \n                A card issuer can increase the interest rate on existing balances only if you are at least 60 days late in paying your required minimum amount unless an exception applies (for example, the...'
        },
        {
            title:
                'Money transfers basics | Consumer Financial Protection Bureau',
            uri:
                'https://www.consumerfinance.gov/consumer-tools/money-transfers/answers/basics',
            document:
                '...I will be charged fees and taxes other than those on the receipt. What does this mean?\n\n            \n            \n            \n                When I send money out of the country, can I get fee and exchange rate information in my language...'
        },
        {
            title:
                'Learn about loan costs | Consumer Financial Protection Bureau',
            uri:
                'https://www.consumerfinance.gov/owning-a-home/process/explore/learn-about-loan-costs',
            document:
                '...In some cases, the increased loan amount can mean you pay a higher interest rate as well.\n\nThe costs are rolled into the interest rate\n\nThe lender is providing a rebate, known as a lender credit, to cover the closing costs. You pay a...'
        }]
}

export const ANSWER_WITH_MENU_ITEMS = "...Careers\n\n\n\tSustainability\n\n\n\tCommunity\n\n\n\tBusiness partners\n\n\n\n\n\n\n\n\n\n\n   \n\n\n\n\n\tServices you'll love\n\n \tGift cards\n\n\n\tSpecial item requests\n\n\n\tPresto! ATM\n\n\n\tAprons Recipes\n\n\n\tPublix Catering\n\n\n\tAprons Cooking School\n\n\n\tHealth & wellness\n\n\n\tShelf tags & icons...";

// No highlights!  Old
export const MOSTLY_CLEAN_SUGGESTED: KnowledgeBaseResult = {
    suggested:
        [{
            title:
                'Request multiple Loan Estimates | Consumer Financial Protection Bureau',
            uri:
                'https://www.consumerfinance.gov/owning-a-home/process/compare/request-multiple-loan-estimates',
            document:
                'Don’t make any decisions until you feel confident you understand the pros and cons of all of the options you are considering.\n\n\n\nGetting multiple Loan Estimates won’t hurt your credit, so long as you get them all within the same 45-day window\n\nLearn why, and what happens when a lender checks your credit.\n\nLoans for some types of property may cost more\n\nLenders usually charge somewhat more for loans to buy a condo, a home with more than one unit (for example, a duplex), or a manufactured home.',
            topAnswer: undefined
        },
        {
            title:
                'Request multiple Loan Estimates | Consumer Financial Protection Bureau',
            uri:
                'https://www.consumerfinance.gov/owning-a-home/process/compare/request-multiple-loan-estimates',
            document:
                'Getting multiple Loan Estimates won’t hurt your credit, so long as you get them all within the same 45-day window\n\nLearn why, and what happens when a lender checks your credit.\n\nLoans for some types of property may cost more\n\nLenders usually charge somewhat more for loans to buy a condo, a home with more than one unit (for example, a duplex), or a manufactured home. Compared to loans to buy a single family home, loans for these property types may cost more.\n\n\n\n\n\n\n\n\n\n            \n\n        \n    \n        \n        \n            \n                \n\n\n\n\n\n\n\n    \n        \n            Buying a house?\n        \n\n\n    \n\n\n    \n        Sign up for our 2-week Get Homebuyer Ready boot camp.',
            topAnswer: undefined
        }],
    faqs: [],
    documents:
        [{
            title:
                'What exactly happens when a mortgage lender checks my credit?',
            uri:
                'https://www.consumerfinance.gov/ask-cfpb/what-exactly-happens-when-a-mortgage-lender-checks-my-credit-en-2005',
            document:
                '...to be smart about them. As a general rule, apply for credit only when you need it. Applying for a credit card, car loan, or other type of loan also results in an inquiry that can lower your score, so try to avoid applying for these other types of credit right before getting a mortgage or during...'
        },
        {
            title:
                'Request multiple Loan Estimates | Consumer Financial Protection Bureau',
            uri:
                'https://www.consumerfinance.gov/owning-a-home/process/compare/request-multiple-loan-estimates',
            document:
                '...Getting multiple Loan Estimates won’t hurt your credit, so long as you get them all within the same 45-day window\n\nLearn why, and what happens when a lender checks your credit.\n\nLoans for some types of property may cost more\n\nLenders usually charge somewhat more for loans to buy a condo, a...'
        },
        {
            title:
                'Learn to Explore Loan Choices | Consumer Financial Protection Bureau',
            uri:
                'https://www.consumerfinance.gov/consumer-tools/getting-an-auto-loan/learn-to-explore-loan-choices',
            document:
                '...with the bank or other lender to get a preapproval. Generally, you do need to be or become a member of a credit union in order to apply for an auto loan.\n\nThe preapproval will give you a loan quote with an interest rate, loan length, and maximum loan amount based on factors such as your...'
        },
        {
            title:
                'What should I do if I can\'t afford my student loan payment?',
            uri:
                'https://www.consumerfinance.gov/ask-cfpb/what-should-i-do-cant-afford-student-loan-payment-en-639',
            document:
                '...be serious consequences, including:\n\n\n\n\tYour lender or servicer will report the missed\npayments to credit\nreporting companies, hurting your credit rating.\n\n\tIf your loan goes into default, your lender or\nservicer may attempt to collect on your debt directly or through a collection\nagency...'
        },
        {
            title:
                'What should I do if I can\'t afford my student loan payment?',
            uri:
                'https://www.consumerfinance.gov/ask-cfpb/what-are-my-options-if-i-am-worried-about-not-being-able-to-make-payments-on-my-federal-student-loans-en-627',
            document:
                '...be serious consequences, including:\n\n\n\n\tYour lender or servicer will report the missed\npayments to credit\nreporting companies, hurting your credit rating.\n\n\tIf your loan goes into default, your lender or\nservicer may attempt to collect on your debt directly or through a collection\nagency...'
        },
        {
            title:
                'What should I do if I can\'t afford my student loan payment?',
            uri:
                'https://www.consumerfinance.gov/ask-cfpb/do-i-need-to-pay-my-student-loans-if-i-lose-my-job-en-639',
            document:
                '...be serious consequences, including:\n\n\n\n\tYour lender or servicer will report the missed\npayments to credit\nreporting companies, hurting your credit rating.\n\n\tIf your loan goes into default, your lender or\nservicer may attempt to collect on your debt directly or through a collection\nagency...'
        },
        {
            title:
                'Will my credit score be damaged by card issuers getting my name from a credit reporting agency and sending me an offer?',
            uri:
                'https://www.consumerfinance.gov/ask-cfpb/will-my-credit-score-be-damaged-by-card-issuers-getting-my-name-from-a-credit-reporting-agency-and-sending-me-an-offer-en-4',
            document:
                '...or your credit score and the credit reporting agency file will then reflect that you applied for a credit card. Your credit score can be affected by the number of cards or other loans for which you apply.\n\n\n    \n    \n    \n\n    \n\n                \n\n\n                \n                    Read full...'
        },
        {
            title:
                'Student loans know your rights | Consumer Financial Protection Bureau',
            uri:
                'https://www.consumerfinance.gov/consumer-tools/student-loans/answers/know-your-rights',
            document:
                '...Does a creditor have to consider my part-time or retirement income?\n\n            \n            \n            \n                I want to apply for a student loan.  Can a creditor ask me about my children or dependents or about the children or dependents of my co-signer...'
        }]
}

// This is an example where we don't have a top answer and the highlighted sections aren't very good
// ends up being just HEL
export const SUGGESTED_WITH_HIGHLIGHTS_NOT_TOP = {
    "platform": "lex-connect",
    "type": "INTENT_REQUEST",
    "anonymous": false,
    "channel": "widget",
    "intentId": "OCSearch",
    "isHealthCheck": false,
    "isNewSession": false,
    "rawQuery": "what is a HEL",
    "requestAttributes": {
        "channel": "widget",
        "type": "INTENT_REQUEST",
        "userId": "stentor-widget-user-1d50f8e6-d019-65fa-a8c6-3bbef7adf5b4",
        "platform": "stentor-platform",
        "x-amz-lex:kendra-search-response-document-link-2": "https://www.consumerfinance.gov/consumer-tools/mortgages/answers/key-terms",
        "x-amz-lex:kendra-search-response-document-link-1": "https://www.consumerfinance.gov/ask-cfpb/what-is-a-home-equity-loan-en-106",
        "x-amz-lex:kendra-search-response-document-5": "...Get Answers to Your Banking Questions\n\n\n\nSearch \n\t\t\t×\n\n\n\n\n\n\n\t\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\t \n\n\n\n\n\n\n\nCustom Search\n\n \n\n\n\n\n\n\n\n\t\n\n\tSort by:\n\nRelevance\n\n\n\n\n\nRelevance\n\n\n\nDate...",
        "x-amz-lex:kendra-search-response-document-4": "...mortgage loan work? \n\tHow is a reverse mortgage loan different from a traditional mortgage?\n\tWhat are the upfront costs and fees in taking out a reverse mortgage loan...",
        "x-amz-lex:kendra-search-response-answer-2": "If you cannot pay back the HELOC, the lender could foreclose on your home. \n\n\n\n\n                    \n                \n\n\n\n\n\n        \n            \n                \t\n                    Home equity loan\n                    \n\n\n                \n\t\n                    A home equity loan (sometimes called a HEL) allows you to borrow money using the equity in your home as collateral. Equity is the amount your property is currently worth, minus the amount of any existing mortgage on your property.  You receive the money from a home equity loan as a lump sum. A home equity loan usually has a fixed interest rate – one that will not change. If you cannot pay back the HEL, the lender could foreclose on your home.",
        "x-amz-lex:kendra-search-response-answer-1": "한국어\n                        \n                    \n\t\n                        \n                            Tagalog\n                        \n                    \n\t\n                        \n                            Pусский\n                        \n                    \n\t\n                        \n                            العربية\n                        \n                    \n\t\n                        \n                            Kreyòl Ayisyen\n                        \n                    \n\n\n\n                \n                    (855) 411-2372\n                \n            \n\n\n        \n\n\n    \n\n\n\n    \n\n\n\n\nCollapse\n\n            \n        \n\n\n\n    \n\n\n    \n      \n      \n\n    \n\n\n\n    \n\n    \n        \n        \n    \n\n    \n        \n    \n\n    \n    \n    \n        \n        \n    \n        \n        \n            \n    \n        \n        \n            \n                \n                    Mortgages\n                \n            \n        \n        \n    \n\n            \n\n\n        \n    \n        \n\n    \n            \n    \n        \n            \n                last reviewed: SEP 25, 2017\n            \n        \n        \n            What is a home equity loan?\n        \n\n\n    \n\n\n    \n\n        \n            \n                A home equity loan (sometimes called a HEL) allows you to borrow money using the equity in your home as collateral. \n\n\n            \n\n\n        \n\n        \n\n        \n\n        \n\n            \n                \n                    \n\n\n    \n    \n    \n    \n    \n        Equity is the amount your property is currently worth, minus the amount of any existing mortgage on your property. You receive the money from a home equity loan as a lump sum.",
        "x-amz-lex:kendra-search-response-document-link-5": "https://www.helpwithmybank.gov/help-topics/mortgages-home-equity/reverse-mortgages/reverse-mortgage.html",
        "x-amz-lex:kendra-search-response-document-link-4": "https://www.consumerfinance.gov/ask-cfpb/what-should-i-think-about-before-applying-for-reverse-mortgage-en-228",
        "x-amz-lex:kendra-search-response-document-link-3": "https://www.consumerfinance.gov/consumer-tools/mortgages/key-terms",
        "x-amz-lex:kendra-search-response-document-3": "...Home equity loan\n                    \n\n\n                \n\t\n                    A home equity loan (sometimes called a HEL) allows you to borrow money using the equity in your home as collateral. Equity is the amount your property is currently worth, minus the amount of...",
        "x-amz-lex:kendra-search-response-document-2": "...Home equity loan\n                    \n\n\n                \n\t\n                    A home equity loan (sometimes called a HEL) allows you to borrow money using the equity in your home as collateral. Equity is the amount your property is currently worth, minus the amount of...",
        "x-amz-lex:kendra-search-response-document-1": "...from a home equity loan as a lump sum. A home equity loan usually has a fixed interest rate–one that will not change. If you cannot pay back the HEL, the lender could foreclose on your home. If you are considering taking out a HEL to pay off your debts, you should explore alternatives with a...",
        "rawQuery": "what is a HEL"
    },
    "sessionAttributes": {
        "channel": "widget",
        "sessionId": "stentor-widget-session-60479441-f8b8-65de-bd35-cba8361bffaf",
        "userId": "stentor-widget-user-1d50f8e6-d019-65fa-a8c6-3bbef7adf5b4",
        "platform": "stentor-platform"
    },
    "sessionId": "stentor-widget-session-60479441-f8b8-65de-bd35-cba8361bffaf",
    "slots": {},
    "userId": "stentor-widget-user-1d50f8e6-d019-65fa-a8c6-3bbef7adf5b4",
    "knowledgeBaseResult": {
        "suggested": [
            {
                "title": "What is a home equity loan? | Consumer Financial Protection Bureau",
                "uri": "https://www.consumerfinance.gov/ask-cfpb/what-is-a-home-equity-loan-en-106",
                "document": "한국어\n                        \n                    \n\t\n                        \n                            Tagalog\n                        \n                    \n\t\n                        \n                            Pусский\n                        \n                    \n\t\n                        \n                            العربية\n                        \n                    \n\t\n                        \n                            Kreyòl Ayisyen\n                        \n                    \n\n\n\n                \n                    (855) 411-2372\n                \n            \n\n\n        \n\n\n    \n\n\n\n    \n\n\n\n\nCollapse\n\n            \n        \n\n\n\n    \n\n\n    \n      \n      \n\n    \n\n\n\n    \n\n    \n        \n        \n    \n\n    \n        \n    \n\n    \n    \n    \n        \n        \n    \n        \n        \n            \n    \n        \n        \n            \n                \n                    Mortgages\n                \n            \n        \n        \n    \n\n            \n\n\n        \n    \n        \n\n    \n            \n    \n        \n            \n                last reviewed: SEP 25, 2017\n            \n        \n        \n            What is a home equity loan?\n        \n\n\n    \n\n\n    \n\n        \n            \n                A home equity loan (sometimes called a HEL) allows you to borrow money using the equity in your home as collateral. \n\n\n            \n\n\n        \n\n        \n\n        \n\n        \n\n            \n                \n                    \n\n\n    \n    \n    \n    \n    \n        Equity is the amount your property is currently worth, minus the amount of any existing mortgage on your property. You receive the money from a home equity loan as a lump sum.",
                "highlights": [
                    {
                        "beginOffset": 1120,
                        "endOffset": 1136,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 1239,
                        "endOffset": 1242,
                        "topAnswer": false
                    }
                ]
            },
            {
                "title": "Mortgages key terms | Consumer Financial Protection Bureau",
                "uri": "https://www.consumerfinance.gov/consumer-tools/mortgages/answers/key-terms",
                "document": "If you cannot pay back the HELOC, the lender could foreclose on your home. \n\n\n\n\n                    \n                \n\n\n\n\n\n        \n            \n                \t\n                    Home equity loan\n                    \n\n\n                \n\t\n                    A home equity loan (sometimes called a HEL) allows you to borrow money using the equity in your home as collateral. Equity is the amount your property is currently worth, minus the amount of any existing mortgage on your property.  You receive the money from a home equity loan as a lump sum. A home equity loan usually has a fixed interest rate – one that will not change. If you cannot pay back the HEL, the lender could foreclose on your home.",
                "highlights": [
                    {
                        "beginOffset": 301,
                        "endOffset": 304,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 663,
                        "endOffset": 666,
                        "topAnswer": false
                    }
                ]
            }
        ],
        "documents": [
            {
                "title": "What is a home equity loan? | Consumer Financial Protection Bureau",
                "uri": "https://www.consumerfinance.gov/ask-cfpb/what-is-a-home-equity-loan-en-106",
                "document": "...from a home equity loan as a lump sum. A home equity loan usually has a fixed interest rate–one that will not change. If you cannot pay back the HEL, the lender could foreclose on your home. If you are considering taking out a HEL to pay off your debts, you should explore alternatives with a...",
                "highlights": [
                    {
                        "beginOffset": 148,
                        "endOffset": 151,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 230,
                        "endOffset": 233,
                        "topAnswer": false
                    }
                ]
            },
            {
                "title": "Mortgages key terms | Consumer Financial Protection Bureau",
                "uri": "https://www.consumerfinance.gov/consumer-tools/mortgages/answers/key-terms",
                "document": "...Home equity loan\n                    \n\n\n                \n\t\n                    A home equity loan (sometimes called a HEL) allows you to borrow money using the equity in your home as collateral. Equity is the amount your property is currently worth, minus the amount of...",
                "highlights": [
                    {
                        "beginOffset": 121,
                        "endOffset": 124,
                        "topAnswer": false
                    }
                ]
            },
            {
                "title": "Mortgages key terms | Consumer Financial Protection Bureau",
                "uri": "https://www.consumerfinance.gov/consumer-tools/mortgages/key-terms",
                "document": "...Home equity loan\n                    \n\n\n                \n\t\n                    A home equity loan (sometimes called a HEL) allows you to borrow money using the equity in your home as collateral. Equity is the amount your property is currently worth, minus the amount of...",
                "highlights": [
                    {
                        "beginOffset": 121,
                        "endOffset": 124,
                        "topAnswer": false
                    }
                ]
            },
            {
                "title": "What should I think about before applying for a reverse mortgage loan and what should I ask a reverse mortgage counselor? | Consumer Financial Protection Bureau",
                "uri": "https://www.consumerfinance.gov/ask-cfpb/what-should-i-think-about-before-applying-for-reverse-mortgage-en-228",
                "document": "...mortgage loan work? \n\tHow is a reverse mortgage loan different from a traditional mortgage?\n\tWhat are the upfront costs and fees in taking out a reverse mortgage loan...",
                "highlights": []
            },
            {
                "title": "What are the risks of a reverse mortgage and what should I consider?",
                "uri": "https://www.helpwithmybank.gov/help-topics/mortgages-home-equity/reverse-mortgages/reverse-mortgage.html",
                "document": "...Get Answers to Your Banking Questions\n\n\n\nSearch \n\t\t\t×\n\n\n\n\n\n\n\t\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\t \n\n\n\n\n\n\n\nCustom Search\n\n \n\n\n\n\n\n\n\n\t\n\n\tSort by:\n\nRelevance\n\n\n\n\n\nRelevance\n\n\n\nDate...",
                "highlights": []
            },
            {
                "title": "Can the bank charge a higher rate than what I was quoted?",
                "uri": "https://www.helpwithmybank.gov/help-topics/credit-cards/pre-approvals-solicitations/solicitation-rate.html",
                "document": "...Banks may offer you a card before they have determined whether you meet the criteria for the offered interest rate. If this is the case, the representative must tell you that the rate you actually qualify for will depend on your credit standing or other factors.\n\n\n\nThe only exceptions to this...",
                "highlights": []
            },
            {
                "title": "On an account with a POA, what happens after the account holder dies?",
                "uri": "https://www.helpwithmybank.gov/help-topics/bank-accounts/opening-closing-inactive-bank-accounts/closing-a-bank-account/closing-poa.html",
                "document": "...Get Answers to Your Banking Questions\n\n\n\nSearch \n\t\t\t×\n\n\n\n\n\n\n\t\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\t \n\n\n\n\n\n\n\nCustom Search\n\n \n\n\n\n\n\n\n\n\t\n\n\tSort by:\n\nRelevance\n\n\n\n\n\nRelevance\n\n\n\nDate...",
                "highlights": []
            },
            {
                "title": "Mortgage forbearance during COVID-19: What to know and what to do | Consumer Financial Protection Bureau",
                "uri": "https://www.consumerfinance.gov/coronavirus/mortgage-and-housing-assistance/mortgage-forbearance-during-covid-19-what-know-what-do",
                "document": "...Reverse Mortgages\n\n        \n\n        \n    \n\n    \n\n\t\n\n    \n        \n\n        \n\n        Savings\n\n        \n\n        \n    \n\n    \n\n\t\n\n    \n        \n\n        \n\n        Student Loans...",
                "highlights": []
            }
        ]
    },
    "locale": "en-US"
}

export const SUGGESTED_WITH_TOP_ANSWER = {
    "type": "INTENT_REQUEST",
    "anonymous": false,
    "platform": "lex-connect",
    "channel": "console",
    "intentId": "OCSearch",
    "isHealthCheck": false,
    "isNewSession": false,
    "rawQuery": "what is dwelling coverage",
    "requestAttributes": {
        "x-amz-lex:kendra-search-response-document-link-2": "https://www.travelers.com/tools-resources/insurance-101/4-things-every-renter-needs-to-know-about-renters-insurance",
        "x-amz-lex:kendra-search-response-document-link-1": "https://www.travelers.com/tools-resources/insurance-101/understanding-your-insurance",
        "x-amz-lex:kendra-search-response-document-5": "...a complete description of coverage. Coverage options, limits, discounts, deductibles and other features are subject to individuals meeting our underwriting criteria and state availability. Not all features available in all states. Discounts may not apply to all coverages and/or vehicles...",
        "x-amz-lex:kendra-search-response-document-4": "...need additional coverage.\n\n\n            \n\n\n\n\n    \n\n                  \n                      \n\n\nTravelers Insurance allows you to customize your coverage to fit your unique needs. We'll help you understand the risks you face and get the coverage to help prepare you for the unexpected...",
        "x-amz-lex:kendra-search-response-answer-1": "Home Insurance\n\n\n                    \n                    \n    \n                    \n                    \n\n            \n\n        \n            \n                        What Is Dwelling Coverage? [Video]\n\n\n\n\n\n\n\n\n\n\n            This coverage can help pay to repair or rebuild the physical structure of your home in the event of a fire or other covered cause of loss.\n\n\n        \n\n    \n\n\n\n\n\n                    \n\n                    \n    \n                    \n                    \n\n            \n\n        \n            \n                        What Is Liability Coverage? [Video]\n\n\n\n\n\n\n\n\n\n\n            If others are hurt or have damaged property for which you or covered residents of your household are legally responsible, then this can help protect you.\n\n\n        \n\n    \n\n\n\n\n\n                    \n\n                    \n    \n                    \n                    \n\n            \n\n        \n            \n                        What Is Loss of Use Coverage? [Video]\n\n\n\n\n\n\n\n\n\n\n            If your home is damaged by a covered loss, loss of use coverage can help pay for your additional housing and living expenses while your home is being repaired or rebuilt.",
        "x-amz-lex:kendra-search-response-document-link-5": "https://www.travelers.com/tools-resources/home/insuring/8-steps-to-buying-and-insuring-your-new-home",
        "x-amz-lex:kendra-search-response-document-link-4": "https://www.travelers.com/resources/home/insuring/5-tips-to-protect-your-possessions-with-a-valuable-items-insurance-rider",
        "x-amz-lex:kendra-search-response-document-link-3": "https://www.travelers.com/tools-resources/home/insuring/5-tips-to-protect-your-possessions-with-a-valuable-items-insurance-rider",
        "x-amz-lex:kendra-search-response-document-3": "...need additional coverage.\n\n\n            \n\n\n\n\n    \n\n                  \n                      \n\n\nTravelers Insurance allows you to customize your coverage to fit your unique needs. We'll help you understand the risks you face and get the coverage to help prepare you for the unexpected...",
        "x-amz-lex:kendra-search-response-document-2": "...Renters Insurance Provides Off-Premises Coverage\n\n\nRenters insurance does more than cover the cost of lost or damaged possessions in your home. There is coverage if your bicycle is stolen from a bike rack at the park, or if your laptop is taken from...",
        "x-amz-lex:kendra-search-response-document-1": "...What Is Dwelling Coverage? [Video]\n\n\n\n\n\n\n\n\n\n\n            This coverage can help pay to repair or rebuild the physical structure of your home in the event of a fire or other covered cause of..."
    },
    "sessionAttributes": {
        "channel": "console",
        "sessionId": "dfad52d8-3fff-64e0-b288-aaa9e87b51f3",
        "userId": "i00tgwqpd477g9mvp00uwylvlp016jx5"
    },
    "sessionId": "dfad52d8-3fff-64e0-b288-aaa9e87b51f3",
    "slots": {},
    "userId": "i00tgwqpd477g9mvp00uwylvlp016jx5",
    "knowledgeBaseResult": {
        "suggested": [
            {
                "title": "Understanding Your Insurance [Videos] | Travelers Insurance",
                "uri": "https://www.travelers.com/tools-resources/insurance-101/understanding-your-insurance",
                "document": "Home Insurance\n\n\n                    \n                    \n    \n                    \n                    \n\n            \n\n        \n            \n                        What Is Dwelling Coverage? [Video]\n\n\n\n\n\n\n\n\n\n\n            This coverage can help pay to repair or rebuild the physical structure of your home in the event of a fire or other covered cause of loss.\n\n\n        \n\n    \n\n\n\n\n\n                    \n\n                    \n    \n                    \n                    \n\n            \n\n        \n            \n                        What Is Liability Coverage? [Video]\n\n\n\n\n\n\n\n\n\n\n            If others are hurt or have damaged property for which you or covered residents of your household are legally responsible, then this can help protect you.\n\n\n        \n\n    \n\n\n\n\n\n                    \n\n                    \n    \n                    \n                    \n\n            \n\n        \n            \n                        What Is Loss of Use Coverage? [Video]\n\n\n\n\n\n\n\n\n\n\n            If your home is damaged by a covered loss, loss of use coverage can help pay for your additional housing and living expenses while your home is being repaired or rebuilt.",
                "topAnswer": "This coverage can help pay to repair or rebuild the physical structure of your home in the event of a fire or other covered cause of loss",
                "highlights": [
                    {
                        "beginOffset": 224,
                        "endOffset": 361,
                        "topAnswer": true
                    },
                    {
                        "beginOffset": 175,
                        "endOffset": 183,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 184,
                        "endOffset": 192,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 229,
                        "endOffset": 237,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 554,
                        "endOffset": 562,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 941,
                        "endOffset": 949,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 1036,
                        "endOffset": 1044,
                        "topAnswer": false
                    }
                ]
            }
        ],
        "documents": [
            {
                "title": "Understanding Your Insurance [Videos] | Travelers Insurance",
                "uri": "https://www.travelers.com/tools-resources/insurance-101/understanding-your-insurance",
                "document": "...What Is Dwelling Coverage? [Video]\n\n\n\n\n\n\n\n\n\n\n            This coverage can help pay to repair or rebuild the physical structure of your home in the event of a fire or other covered cause of...",
                "highlights": [
                    {
                        "beginOffset": 11,
                        "endOffset": 19,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 20,
                        "endOffset": 28,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 65,
                        "endOffset": 73,
                        "topAnswer": false
                    }
                ]
            },
            {
                "title": "4 Things Every Renter Needs to Know About Renters Insurance | Travelers Insurance",
                "uri": "https://www.travelers.com/tools-resources/insurance-101/4-things-every-renter-needs-to-know-about-renters-insurance",
                "document": "...Renters Insurance Provides Off-Premises Coverage\n\n\nRenters insurance does more than cover the cost of lost or damaged possessions in your home. There is coverage if your bicycle is stolen from a bike rack at the park, or if your laptop is taken from...",
                "highlights": [
                    {
                        "beginOffset": 43,
                        "endOffset": 51,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 156,
                        "endOffset": 164,
                        "topAnswer": false
                    }
                ]
            },
            {
                "title": "5 Tips to Protect Your Possessions with Valuable Items Coverage | Travelers Insurance",
                "uri": "https://www.travelers.com/tools-resources/home/insuring/5-tips-to-protect-your-possessions-with-a-valuable-items-insurance-rider",
                "document": "...need additional coverage.\n\n\n            \n\n\n\n\n    \n\n                  \n                      \n\n\nTravelers Insurance allows you to customize your coverage to fit your unique needs. We'll help you understand the risks you face and get the coverage to help prepare you for the unexpected...",
                "highlights": [
                    {
                        "beginOffset": 19,
                        "endOffset": 27,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 149,
                        "endOffset": 157,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 241,
                        "endOffset": 249,
                        "topAnswer": false
                    }
                ]
            },
            {
                "title": "5 Tips to Protect Your Possessions with Valuable Items Coverage | Travelers Insurance",
                "uri": "https://www.travelers.com/resources/home/insuring/5-tips-to-protect-your-possessions-with-a-valuable-items-insurance-rider",
                "document": "...need additional coverage.\n\n\n            \n\n\n\n\n    \n\n                  \n                      \n\n\nTravelers Insurance allows you to customize your coverage to fit your unique needs. We'll help you understand the risks you face and get the coverage to help prepare you for the unexpected...",
                "highlights": [
                    {
                        "beginOffset": 19,
                        "endOffset": 27,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 149,
                        "endOffset": 157,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 241,
                        "endOffset": 249,
                        "topAnswer": false
                    }
                ]
            },
            {
                "title": "8 Steps to Buying and Insuring Your New Home | Travelers Insurance",
                "uri": "https://www.travelers.com/tools-resources/home/insuring/8-steps-to-buying-and-insuring-your-new-home",
                "document": "...a complete description of coverage. Coverage options, limits, discounts, deductibles and other features are subject to individuals meeting our underwriting criteria and state availability. Not all features available in all states. Discounts may not apply to all coverages and/or vehicles...",
                "highlights": [
                    {
                        "beginOffset": 29,
                        "endOffset": 37,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 39,
                        "endOffset": 47,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 265,
                        "endOffset": 274,
                        "topAnswer": false
                    }
                ]
            },
            {
                "title": "8 Steps to Buying and Insuring Your New Home | Travelers Insurance",
                "uri": "https://www.travelers.com/resources/home/insuring/8-steps-to-buying-and-insuring-your-new-home",
                "document": "...a complete description of coverage. Coverage options, limits, discounts, deductibles and other features are subject to individuals meeting our underwriting criteria and state availability. Not all features available in all states. Discounts may not apply to all coverages and/or vehicles...",
                "highlights": [
                    {
                        "beginOffset": 29,
                        "endOffset": 37,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 39,
                        "endOffset": 47,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 265,
                        "endOffset": 274,
                        "topAnswer": false
                    }
                ]
            },
            {
                "title": "Insurance 101 - Insurance Education | Travelers Insurance",
                "uri": "https://www.travelers.com/tools-resources/insurance-101",
                "document": "...What Is Medical Payments Coverage? [Video]\n\n\n\n\n\n\n\n\n\n\n            Medical payments coverage protects passengers in your vehicle who may be injured in an accident, no matter who is at fault...",
                "highlights": [
                    {
                        "beginOffset": 28,
                        "endOffset": 36,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 85,
                        "endOffset": 93,
                        "topAnswer": false
                    }
                ]
            },
            {
                "title": "Should I File a Property Damage Claim? Three Questions to Help You Decide | Travelers Insurance",
                "uri": "https://www.travelers.com/tools-resources/home/insuring/should-i-file-a-property-damage-claim",
                "document": "...5 Tips to Protect Your Possessions with Valuable Items Insurance Coverage\n\n\n\n\n\n\n\n\n\n\n            Help protect personal items that may have limited coverage amounts or no coverage under the homeowners, condo or renters insurance policy...",
                "highlights": [
                    {
                        "beginOffset": 68,
                        "endOffset": 76,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 149,
                        "endOffset": 157,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 172,
                        "endOffset": 180,
                        "topAnswer": false
                    }
                ]
            },
            {
                "title": "Car Insurance Questions | Travelers Insurance",
                "uri": "https://www.travelers.com/car-insurance/faqs",
                "document": "...Be sure to discuss the following popular coverage options with your agent. Our Car Coverage Guide can help, too.\n\n\n            \n\n            \n            \n                \n\n\n\n\n\nTo Cover:\n\n\nRepair or replacement of...",
                "highlights": [
                    {
                        "beginOffset": 44,
                        "endOffset": 52,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 86,
                        "endOffset": 94,
                        "topAnswer": false
                    }
                ]
            }
        ]
    },
    "locale": "en-US"
}

// This was generating <pre> tags
//     "html": "<p>Here is what I found...<br />\"Brokerage firms generally offer at least two types of brokerage accounts - a cash account and a margin account:</p>\n<pre><code>In a cash account, you must pay the full amount for securities purchased. You may not borrow funds from your brokerage firm in order to pay for transactions in the account.\nIn a margin account, you can borrow funds from your brokerage firm to purchase securities (this is called buying securities \"on margin\"). The brokerage firm uses the securities in your margin account as collateral for the money it lends to you to purchase these securities and you pay interest on the money you borrow.\"\n</code></pre>\n<p>Any other questions?</p>\n"
//
export const SUGGESTED_WITH_INTERESTING_GENERATED_HTML = {
    "platform": "lex-connect",
    "type": "INTENT_REQUEST",
    "anonymous": false,
    "channel": "widget",
    "intentId": "OCSearch",
    "isHealthCheck": false,
    "isNewSession": false,
    "rawQuery": "which brokerage account should i use",
    "requestAttributes": {
        "x-amz-lex:kendra-search-response-question_answer-question-1": "Through which channel can I get my credit score?",
        "x-amz-lex:kendra-search-response-question_answer-answer-1": "There are four main ways to get your credit score, including from a credit card or other loan statement, through a non-profit counselor or credit score service, or for a fee from a credit reporting agency. You actually have more than one credit score. Credit scores are calculated based on the information in your credit reports. If the information about you in the credit reports of the three large consumer reporting companies is different, your credit score from each of the companies will be different. Lenders also use slightly different credit scores for different types of loans.",
        "channel": "widget",
        "type": "INTENT_REQUEST",
        "userId": "stentor-widget-user-66652d16-7651-65e2-9af0-3bb336db8b6f",
        "platform": "stentor-platform",
        "x-amz-lex:kendra-search-response-document-link-2": "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-43",
        "x-amz-lex:kendra-search-response-document-link-1": "https://www.investor.gov/additional-resources/news-alerts/alerts-bulletins/investor-bulletin-how-open-brokerage-account",
        "x-amz-lex:kendra-search-response-document-5": "...What should I do if I am informed of a high volume of trade activity in my account?\n\n\n\nIf your brokerage account has a high volume of trade activity, your brokerage firm may contact you and ask you to acknowledge the trading or to confirm that...",
        "x-amz-lex:kendra-search-response-document-4": "...using the account as collateral, to purchase securities (known as “margin securities”).  Brokerage firms may allow you to have both a margin account and a cash account at the same time.\n\n\n\nIMPORTANT: WHEN OPENING A BROKERAGE ACCOUNT, SOME BROKERAGE ACCOUNT APPLICATIONS MAKE MARGIN ACCOUNTS THE...",
        "x-amz-lex:kendra-search-response-answer-2": "In a margin account, you can borrow funds from your brokerage firm to purchase securities (this is called buying securities \"on margin\"). The brokerage firm uses the securities in your margin account as collateral for the money it lends to you to purchase these securities and you pay interest on the money you borrow. Margin accounts can offer you greater purchasing power, but also expose you to the potential for larger losses.\n\n\nFor additional information on margin accounts and cash accounts, please review the SEC Investor Bulletins \"Understanding Margin Accounts\" and \"Trading in Cash Accounts.\"\n\n\n\n\tWho will make decisions for your account?",
        "x-amz-lex:kendra-search-response-answer-1": "Brokerage firms generally offer at least two types of brokerage accounts - a cash account and a margin account:\n\n\n\n\tIn a cash account, you must pay the full amount for securities purchased. You may not borrow funds from your brokerage firm in order to pay for transactions in the account.\n\tIn a margin account, you can borrow funds from your brokerage firm to purchase securities (this is called buying securities \"on margin\"). The brokerage firm uses the securities in your margin account as collateral for the money it lends to you to purchase these securities and you pay interest on the money you borrow.",
        "x-amz-lex:kendra-search-response-document-link-5": "https://www.investor.gov/additional-resources/news-alerts/alerts-bulletins/investor-alert-excessive-trading-investors",
        "x-amz-lex:kendra-search-response-document-link-4": "https://www.investor.gov/additional-resources/news-alerts/alerts-bulletins/investor-bulletin-understanding-margin-accounts",
        "x-amz-lex:kendra-search-response-document-link-3": "https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work/types-brokerage-accounts",
        "x-amz-lex:kendra-search-response-document-3": "...Glossary\n              \n\n\n\n  \n\n\n  \n\n      \n\n\n    \n          \n        \n  \n    \n      Types of Brokerage Accounts\n\n  \n\n\n\n  \n    \n      \n            A cash account is a type of brokerage account in which the investor must pay the full amount for securities purchased. In a cash account, you are...",
        "x-amz-lex:kendra-search-response-document-2": "...Brokerage firms generally offer at least two types of brokerage accounts - a cash account and a margin account:\n\n\n\n\tIn a cash account, you must pay the full amount for securities purchased. You may not...",
        "x-amz-lex:kendra-search-response-document-1": "...Brokerage firms generally offer at least two types of brokerage accounts - a cash account and a margin account:\n\n\n\n\tIn a cash account, you must pay the full amount for securities purchased. You may not...",
        "rawQuery": "which brokerage account should i use"
    },
    "sessionAttributes": {
        "channel": "widget",
        "sessionId": "stentor-widget-session-498b5e7c-0bc0-65cd-a1f6-3ab47840a5fe",
        "userId": "stentor-widget-user-66652d16-7651-65e2-9af0-3bb336db8b6f",
        "platform": "stentor-platform"
    },
    "sessionId": "stentor-widget-session-498b5e7c-0bc0-65cd-a1f6-3ab47840a5fe",
    "slots": {},
    "userId": "stentor-widget-user-66652d16-7651-65e2-9af0-3bb336db8b6f",
    "knowledgeBaseResult": {
        "suggested": [
            {
                "title": "Investor Bulletin: How to Open a Brokerage Account | Investor.gov",
                "uri": "https://www.investor.gov/additional-resources/news-alerts/alerts-bulletins/investor-bulletin-how-open-brokerage-account",
                "document": "Brokerage firms generally offer at least two types of brokerage accounts - a cash account and a margin account:\n\n\n\n\tIn a cash account, you must pay the full amount for securities purchased. You may not borrow funds from your brokerage firm in order to pay for transactions in the account.\n\tIn a margin account, you can borrow funds from your brokerage firm to purchase securities (this is called buying securities \"on margin\"). The brokerage firm uses the securities in your margin account as collateral for the money it lends to you to purchase these securities and you pay interest on the money you borrow.",
                "highlights": [
                    {
                        "beginOffset": 0,
                        "endOffset": 9,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 54,
                        "endOffset": 63,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 64,
                        "endOffset": 72,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 82,
                        "endOffset": 89,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 103,
                        "endOffset": 110,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 126,
                        "endOffset": 133,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 225,
                        "endOffset": 234,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 280,
                        "endOffset": 287,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 302,
                        "endOffset": 309,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 342,
                        "endOffset": 351,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 432,
                        "endOffset": 441,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 447,
                        "endOffset": 451,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 482,
                        "endOffset": 489,
                        "topAnswer": false
                    }
                ]
            },
            {
                "title": "Investor Bulletin: How to Open a Brokerage Account | Investor.gov",
                "uri": "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-43",
                "document": "In a margin account, you can borrow funds from your brokerage firm to purchase securities (this is called buying securities \"on margin\"). The brokerage firm uses the securities in your margin account as collateral for the money it lends to you to purchase these securities and you pay interest on the money you borrow. Margin accounts can offer you greater purchasing power, but also expose you to the potential for larger losses.\n\n\nFor additional information on margin accounts and cash accounts, please review the SEC Investor Bulletins \"Understanding Margin Accounts\" and \"Trading in Cash Accounts.\"\n\n\n\n\tWho will make decisions for your account?",
                "highlights": [
                    {
                        "beginOffset": 12,
                        "endOffset": 19,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 52,
                        "endOffset": 61,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 142,
                        "endOffset": 151,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 157,
                        "endOffset": 161,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 192,
                        "endOffset": 199,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 326,
                        "endOffset": 334,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 470,
                        "endOffset": 478,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 488,
                        "endOffset": 496,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 561,
                        "endOffset": 569,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 592,
                        "endOffset": 600,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 640,
                        "endOffset": 647,
                        "topAnswer": false
                    }
                ]
            }
        ],
        "faqs": [
            {
                "question": "Through which channel can I get my credit score?",
                "document": "There are four main ways to get your credit score, including from a credit card or other loan statement, through a non-profit counselor or credit score service, or for a fee from a credit reporting agency. You actually have more than one credit score. Credit scores are calculated based on the information in your credit reports. If the information about you in the credit reports of the three large consumer reporting companies is different, your credit score from each of the companies will be different. Lenders also use slightly different credit scores for different types of loans.",
                "uri": "https://www.consumerfinance.gov/ask-cfpb/where-can-i-get-my-credit-score-en-316/",
                "highlights": [
                    {
                        "beginOffset": 0,
                        "endOffset": 300,
                        "topAnswer": false
                    }
                ]
            }
        ],
        "documents": [
            {
                "title": "Investor Bulletin: How to Open a Brokerage Account | Investor.gov",
                "uri": "https://www.investor.gov/additional-resources/news-alerts/alerts-bulletins/investor-bulletin-how-open-brokerage-account",
                "document": "...Brokerage firms generally offer at least two types of brokerage accounts - a cash account and a margin account:\n\n\n\n\tIn a cash account, you must pay the full amount for securities purchased. You may not...",
                "highlights": [
                    {
                        "beginOffset": 3,
                        "endOffset": 12,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 57,
                        "endOffset": 66,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 67,
                        "endOffset": 75,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 85,
                        "endOffset": 92,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 106,
                        "endOffset": 113,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 129,
                        "endOffset": 136,
                        "topAnswer": false
                    }
                ]
            },
            {
                "title": "Investor Bulletin: How to Open a Brokerage Account | Investor.gov",
                "uri": "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-43",
                "document": "...Brokerage firms generally offer at least two types of brokerage accounts - a cash account and a margin account:\n\n\n\n\tIn a cash account, you must pay the full amount for securities purchased. You may not...",
                "highlights": [
                    {
                        "beginOffset": 3,
                        "endOffset": 12,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 57,
                        "endOffset": 66,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 67,
                        "endOffset": 75,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 85,
                        "endOffset": 92,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 106,
                        "endOffset": 113,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 129,
                        "endOffset": 136,
                        "topAnswer": false
                    }
                ]
            },
            {
                "title": "Types of Brokerage Accounts | Investor.gov",
                "uri": "https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work/types-brokerage-accounts",
                "document": "...Glossary\n              \n\n\n\n  \n\n\n  \n\n      \n\n\n    \n          \n        \n  \n    \n      Types of Brokerage Accounts\n\n  \n\n\n\n  \n    \n      \n            A cash account is a type of brokerage account in which the investor must pay the full amount for securities purchased. In a cash account, you are...",
                "highlights": [
                    {
                        "beginOffset": 96,
                        "endOffset": 105,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 106,
                        "endOffset": 114,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 156,
                        "endOffset": 163,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 177,
                        "endOffset": 186,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 187,
                        "endOffset": 194,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 278,
                        "endOffset": 285,
                        "topAnswer": false
                    }
                ]
            },
            {
                "title": "Investor Bulletin: Understanding Margin Accounts | Investor.gov",
                "uri": "https://www.investor.gov/additional-resources/news-alerts/alerts-bulletins/investor-bulletin-understanding-margin-accounts",
                "document": "...using the account as collateral, to purchase securities (known as “margin securities”).  Brokerage firms may allow you to have both a margin account and a cash account at the same time.\n\n\n\nIMPORTANT: WHEN OPENING A BROKERAGE ACCOUNT, SOME BROKERAGE ACCOUNT APPLICATIONS MAKE MARGIN ACCOUNTS THE...",
                "highlights": [
                    {
                        "beginOffset": 3,
                        "endOffset": 8,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 13,
                        "endOffset": 20,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 92,
                        "endOffset": 101,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 144,
                        "endOffset": 151,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 163,
                        "endOffset": 170,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 218,
                        "endOffset": 227,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 228,
                        "endOffset": 235,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 242,
                        "endOffset": 251,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 252,
                        "endOffset": 259,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 285,
                        "endOffset": 293,
                        "topAnswer": false
                    }
                ]
            },
            {
                "title": "Investor Alert: Excessive Trading at Investors’ Expense | Investor.gov",
                "uri": "https://www.investor.gov/additional-resources/news-alerts/alerts-bulletins/investor-alert-excessive-trading-investors",
                "document": "...What should I do if I am informed of a high volume of trade activity in my account?\n\n\n\nIf your brokerage account has a high volume of trade activity, your brokerage firm may contact you and ask you to acknowledge the trading or to confirm that...",
                "highlights": [
                    {
                        "beginOffset": 78,
                        "endOffset": 85,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 98,
                        "endOffset": 107,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 108,
                        "endOffset": 115,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 158,
                        "endOffset": 167,
                        "topAnswer": false
                    }
                ]
            },
            {
                "title": "Investor Alert: Excessive Trading at Investors’ Expense | Investor.gov",
                "uri": "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-alerts/investor-42",
                "document": "...What should I do if I am informed of a high volume of trade activity in my account?\n\n\n\nIf your brokerage account has a high volume of trade activity, your brokerage firm may contact you and ask you to acknowledge the trading or to confirm that...",
                "highlights": [
                    {
                        "beginOffset": 78,
                        "endOffset": 85,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 98,
                        "endOffset": 107,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 108,
                        "endOffset": 115,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 158,
                        "endOffset": 167,
                        "topAnswer": false
                    }
                ]
            },
            {
                "title": "Investor Bulletin: Please Consider Adding a Trusted Contact to Your Account | Investor.gov",
                "uri": "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-trusted-contact",
                "document": "...a “trusted contact person” to your brokerage account?\n\n\n\n\tIf your brokerage firm cannot reach you, adding a trusted contact person to your brokerage account may help your firm ensure that your current address and contact information are correct.\n\tAdding a trusted contact person to your brokerage...",
                "highlights": [
                    {
                        "beginOffset": 38,
                        "endOffset": 47,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 48,
                        "endOffset": 55,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 69,
                        "endOffset": 78,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 142,
                        "endOffset": 151,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 152,
                        "endOffset": 159,
                        "topAnswer": false
                    },
                    {
                        "beginOffset": 290,
                        "endOffset": 299,
                        "topAnswer": false
                    }
                ]
            }
        ]
    },
    "locale": "en-US"
}

export const ANSWER_WITH_TABS = "Overdraft protection is an agreement with the bank or financial institution to cover overdrafts on a checking account. This service typically involves a fee and is generally limited to a preset maximum amount. Banks are not required to offer any overdraft protection programs, and even when they do, they may retain discretion to pay or not pay a particular overdraft transaction. You should review your deposit account agreement and check with your bank to find out the terms and conditions of any overdraft protection programs that it may offer.\n\n\n\t\t\t\t\tLast Reviewed: October 2020\n\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\n\t\n\t\t\n\nPlease note: The terms \"bank\" and \"banks\" used in these answers generally refer to national banks, federal savings associations, and federal branches or";

export const ANSWER_WITH_SPORADIC_NEWLINES = "An HMO is a type of health plan that requires you to select a family doctor, often called a primary care physician or PCP. You need a referral from your PCP to see a specialist in the HMO network, such as a cardiologist (heart doctor). Typically, only emergency services are covered if you go outside the HMO’s network of participating providers. You do not have the option to see out-of-network providers when you have an HMO.\n\n\n      \n\n\n    \n\n\n  \n\n\n  \n  \n    \n      \n        How do Independence Blue Cross Keystone HMO plans work?\n      \n\n\n    \n\n\n\n    \n      With a Keystone Health Plan East HMO from Independence Blue Cross, you can see any doctor or visit any hospital in the Keystone Health Plan East network.";

//  This answer results in an odd html with scrolling.
export const KB_RESULT_WITH_ODD_SCROLLING: KnowledgeBaseResult = {
    "suggested": [
        {
            "title": "What should I do if the house or apartment I’m renting goes into foreclosure? | Consumer Financial Protection Bureau",
            "uri": "https://www.consumerfinance.gov/ask-cfpb/what-should-i-do-if-the-house-or-apartment-im-renting-goes-into-foreclosure-en-1545",
            "document": "You may be able to avoid the shut-off by contacting the utility and directly paying them, even if the utilities are in the landlord’s name.\n\n\n\n\tMove. Once a foreclosure sale occurs, you may be required to move, often in as little as thirty days or less. You should remove all of your belongings when you move so the new property owner does not take or destroy them.\n\n\n\n\tProtect yourself. If someone contacts you claiming to be the new property owner, ask to see documents that show ownership.",
            "highlights": [
                {
                    "beginOffset": 211,
                    "endOffset": 252,
                    "topAnswer": false
                },
                {
                    "beginOffset": 220,
                    "endOffset": 252,
                    "topAnswer": false
                },
                {
                    "beginOffset": 150,
                    "endOffset": 252,
                    "topAnswer": false
                },
                {
                    "beginOffset": 144,
                    "endOffset": 148,
                    "topAnswer": false
                },
                {
                    "beginOffset": 157,
                    "endOffset": 168,
                    "topAnswer": false
                },
                {
                    "beginOffset": 205,
                    "endOffset": 209,
                    "topAnswer": false
                },
                {
                    "beginOffset": 304,
                    "endOffset": 308,
                    "topAnswer": false
                }
            ]
        }
    ],
    "faqs": [
        {
            "question": "How do I avoid foreclosure?",
            "document": "If you can’t pay your mortgage or are worried about missing a mortgage payment, call your mortgage servicer right away. You should also contact a HUD-approved housing counselor to get free, expert assistance on avoiding foreclosure.",
            "uri": "https://www.consumerfinance.gov/ask-cfpb/if-i-cant-pay-my-mortgage-loan-what-are-my-options-en-268/",
            "highlights": [
                {
                    "beginOffset": 0,
                    "endOffset": 232,
                    "topAnswer": false
                }
            ]
        }
    ],
    "documents": [
        {
            "title": "What should I do if the house or apartment I’m renting goes into foreclosure? | Consumer Financial Protection Bureau",
            "uri": "https://www.consumerfinance.gov/ask-cfpb/what-should-i-do-if-the-house-or-apartment-im-renting-goes-into-foreclosure-en-1545",
            "document": "...shut-off by contacting the utility and directly paying them, even if the utilities are in the landlord’s name.\n\n\n\n\tMove. Once a foreclosure sale occurs, you may be required to move, often in as little as thirty days or less. You should remove all of your belongings when you move so the new...",
            "highlights": [
                {
                    "beginOffset": 118,
                    "endOffset": 122,
                    "topAnswer": false
                },
                {
                    "beginOffset": 131,
                    "endOffset": 142,
                    "topAnswer": false
                },
                {
                    "beginOffset": 179,
                    "endOffset": 183,
                    "topAnswer": false
                },
                {
                    "beginOffset": 278,
                    "endOffset": 282,
                    "topAnswer": false
                }
            ]
        },
        {
            "title": "How long after foreclosure starts will I have to leave my home? | Consumer Financial Protection Bureau",
            "uri": "https://www.consumerfinance.gov/ask-cfpb/how-long-after-foreclosure-starts-will-i-have-to-leave-my-home-en-1853",
            "document": "...some states you may be required to leave your home a few days after your foreclosure sale. In others, you may not be required to move for months after the foreclosure.\n\n\nTip: You may want to check with your county clerk’s office or legal services provider to find out more details on how...",
            "highlights": [
                {
                    "beginOffset": 76,
                    "endOffset": 87,
                    "topAnswer": false
                },
                {
                    "beginOffset": 132,
                    "endOffset": 136,
                    "topAnswer": false
                },
                {
                    "beginOffset": 158,
                    "endOffset": 169,
                    "topAnswer": false
                }
            ]
        },
        {
            "title": "I can’t make my mortgage payments. How long will it take before I’ll face foreclosure? | Consumer Financial Protection Bureau",
            "uri": "https://www.consumerfinance.gov/ask-cfpb/i-cant-make-my-mortgage-payments-how-long-will-it-take-before-ill-face-foreclosure-en-1849",
            "document": "...days after you’re behind on your mortgage. After that, once your servicer begins the legal process, the amount of time you have until an actual foreclosure sale varies by state...",
            "highlights": [
                {
                    "beginOffset": 147,
                    "endOffset": 158,
                    "topAnswer": false
                }
            ]
        },
        {
            "title": "What happens after I complete an application to determine my options to avoid foreclosure? | Consumer Financial Protection Bureau",
            "uri": "https://www.consumerfinance.gov/ask-cfpb/what-happens-after-i-complete-an-application-to-determine-my-options-to-avoid-foreclosure-en-1851",
            "document": "...servicer what it asks for as soon as possible to make sure you have all possible foreclosure protections.\n\n\n\nForeclosure\n\nExcept in rare cases, your servicer can’t start the foreclosure process until at least 120 days after you become delinquent on your loan.  After that, if you aren’t eligible...",
            "highlights": [
                {
                    "beginOffset": 84,
                    "endOffset": 95,
                    "topAnswer": false
                },
                {
                    "beginOffset": 112,
                    "endOffset": 123,
                    "topAnswer": false
                },
                {
                    "beginOffset": 177,
                    "endOffset": 188,
                    "topAnswer": false
                }
            ]
        },
        {
            "title": "What should I do if I have a reverse mortgage loan and I received a notice of default or foreclosure? | Consumer Financial Protection Bureau",
            "uri": "https://www.consumerfinance.gov/ask-cfpb/what-should-i-do-if-i-have-a-reverse-mortgage-and-i-received-a-notice-that-i-am-delinquent-in-default-or-behind-on-my-property-taxes-and-insurance-en-1511",
            "document": "...Act\nquickly. If you delay or ignore the notice, you could lose your home to\nforeclosure...",
            "highlights": [
                {
                    "beginOffset": 79,
                    "endOffset": 90,
                    "topAnswer": false
                }
            ]
        },
        {
            "title": "If I lose my home to foreclosure, can I ever buy a home again? What impact will a foreclosure have on my credit report? | Consumer Financial Protection Bureau",
            "uri": "https://www.consumerfinance.gov/ask-cfpb/if-i-lose-my-home-to-foreclosure-can-i-ever-buy-a-home-again-what-impact-will-a-foreclosure-have-on-my-credit-report-en-326",
            "document": "...Foreclosure information generally remains in your credit report for seven years from the date of the foreclosure. Even if you have a bad credit history or a low credit score, you may qualify for an Federal...",
            "highlights": [
                {
                    "beginOffset": 3,
                    "endOffset": 14,
                    "topAnswer": false
                },
                {
                    "beginOffset": 104,
                    "endOffset": 115,
                    "topAnswer": false
                }
            ]
        },
        {
            "title": "Worried about mortgage payments? Get the help you’re entitled to. | Consumer Financial Protection Bureau",
            "uri": "https://www.consumerfinance.gov/coronavirus/worried-about-mortgage-payments-get-the-help-entitled-to",
            "document": "...is calling you—pick up the phone. Tell your servicer you can’t make your monthly payment because of COVID-19 and ask them for help avoiding foreclosure...",
            "highlights": [
                {
                    "beginOffset": 143,
                    "endOffset": 154,
                    "topAnswer": false
                }
            ]
        },
        {
            "title": "I applied for a loan modification or other options to avoid foreclosure, but was denied help. My lender said I didn’t meet the qualifications for help. Can I appeal? | Consumer Financial Protection Bu",
            "uri": "https://www.consumerfinance.gov/ask-cfpb/i-applied-for-a-loan-modification-or-other-options-to-avoid-foreclosure-but-was-denied-help-my-lender-said-i-didnt-meet-the-qualifications-for-help-can-i-appeal-en-1841",
            "document": "...I got a letter from my mortgage servicer about my application for help to prevent foreclosure of my mortgage. Can you help me understand some of the terms...",
            "highlights": [
                {
                    "beginOffset": 85,
                    "endOffset": 96,
                    "topAnswer": false
                }
            ]
        }
    ]
}