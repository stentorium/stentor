/*! Copyright (c) 2019, XAPPmedia */
import { expect } from "chai";
import { isPlayableHistoryData } from "../Guards";

describe("#isPlayableHistoryData()", () => {
    it("returns false when passed undefined", () => {
        expect(isPlayableHistoryData(undefined)).to.be.false;
    });
    it("returns true when passed PlayableHistoryData", () => {
        expect(
            isPlayableHistoryData({
                lastPlayed: 1,
                currentTime: 0
            })
        ).to.be.true;
    });
});
