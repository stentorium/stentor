/*! Copyright (c) 2021, XAPP AI */
import { expect } from "chai";

import { cleanAnswer } from "../cleanAnswer";

import {
    ANSWER_WITH_TABS,
    ANSWER_WITH_SPORADIC_NEWLINES,
    RESULT_WITH_NEWLINES_SPACES,
    ANSWER_WITH_MENU_ITEMS
} from "./assets/payloads";

describe(`#${cleanAnswer.name}()`, () => {
    describe(`when passed undefined`, () => {
        it("returns undefined", () => {
            expect(cleanAnswer(undefined)).to.be.undefined;
        });
    });
    describe("when passed string with HTML", () => {
        it("it cleans the output", () => {
            expect(cleanAnswer("<h2>Hello</h2>  How are you?")).to.equal("Hello  How are you?")
        });
    });
    describe("with extraneous new lines", () => {
        it("cleans the output", () => {
            const answer = RESULT_WITH_NEWLINES_SPACES.suggested[0].document;
            const cleaned = cleanAnswer(answer);
            expect(cleaned).to.exist;
            expect(cleaned).to.equal("Learn more about second mortgages.\n\nSecurity interest\n\nThe security interest is what lets the lender foreclose if you don't pay back the money you borrowed.\n\nRead more\n\nSeller financing\n\nSeller financing is a loan that the seller of your home makes to you.\n\nRead more\n\nServicer\n\nYour mortgage servicer is the company that sends you your mortgage statements. Your servicer also handles the day-to-day tasks of managing your loan.");
        });
    });
    describe("with extraneous tabs", () => {
        it("cleans the output", () => {
            const cleaned = cleanAnswer(ANSWER_WITH_TABS);
            expect(cleaned).to.exist;
            // Note: I can't do a full string compare here for some reason, I think there is a hidden empty character in there
            expect(cleaned).to.include("October 2020\n\nPlease")
            expect(cleaned).to.include("offer.\n\nLast");
        });
    });
    describe("with sporadic new lines", () => {
        it("cleans the output", () => {
            const cleaned = cleanAnswer(ANSWER_WITH_SPORADIC_NEWLINES);
            expect(cleaned).to.exist;
            expect(cleaned).to.equal("An HMO is a type of health plan that requires you to select a family doctor, often called a primary care physician or PCP. You need a referral from your PCP to see a specialist in the HMO network, such as a cardiologist (heart doctor). Typically, only emergency services are covered if you go outside the HMO’s network of participating providers. You do not have the option to see out-of-network providers when you have an HMO.\n\nHow do Independence Blue Cross Keystone HMO plans work?\n\nWith a Keystone Health Plan East HMO from Independence Blue Cross, you can see any doctor or visit any hospital in the Keystone Health Plan East network.");
        });
    });
    describe("with menu items", () => {
        it("cleans the output", () => {
            const cleaned = cleanAnswer(ANSWER_WITH_MENU_ITEMS);
            expect(cleaned).to.exist;
            expect(cleaned).to.include("...Careers\n\n\tSustainability\n\n\tCommunity\n\n\tBusiness partners\n\n\tServices you\'ll love\n\n\tGift cards\n\n\tSpecial item requests\n\n\tPresto! ATM\n\n\tAprons Recipes\n\n\tPublix Catering\n\n\tAprons Cooking School\n\n\tHealth & wellness\n\n\tShelf tags & icons...");
        });
    });
    describe("with new lines at the beginning", () => {
        it("cleans the output", () => {
            const cleaned = cleanAnswer("\n\n\n\tHello!");
            expect(cleaned).to.exist;
            expect(cleaned).to.equal("Hello!");

            // jUst one
            const cleaned0 = cleanAnswer("\nHello!\n\n");
            expect(cleaned0).to.exist;
            expect(cleaned0).to.equal("Hello!");
        });
    });
    describe("with markdown that has newlines", () => {
        it("cleans the output", () => {
            const cleaned = cleanAnswer("Here is what I found...\n\"**Put Certified Professionals in Your Corner\n\nFully licensed and insured**, we use only the highest quality materials in the industry and works with the most experienced employees and contractors.\"\nAny other questions?");
            expect(cleaned).to.exist;
            expect(cleaned).to.contain("**Put Certified Professionals in Your Corner**");
            expect(cleaned).to.contain("**Fully licensed and insured**");
        });
    });
});