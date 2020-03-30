/*! Copyright (c) 2020, XAPPmedia */
import { expect } from "chai";

import { addDurations } from "../addDurations";

describe(`#${addDurations.name}()`, () => {
    it('it returns the correct duration', () => {
        expect(addDurations([{ amount: 15, format: "s" }], "s")).to.deep.equal({ amount: 15, format: "s" });
        expect(addDurations([{ amount: 15, format: "s" }], "seconds")).to.deep.equal({ amount: 15, format: "seconds" });
        expect(addDurations([{ amount: 15, format: "s" }, { amount: 1, format: "m" }], "seconds")).to.deep.equal({ amount: 75, format: "seconds" });
        expect(addDurations([{ amount: 1, format: "years" }, { amount: 6, format: "months" }], "months", true)).to.deep.equal({ amount: 18, format: "months" });
        expect(addDurations([{ amount: 1, format: "years" }, { amount: 1, format: "months" }], "years", true)).to.deep.equal({ amount: 1.08, format: "years" });
        expect(addDurations([{ amount: 1, format: "years" }, { amount: 6, format: "months" }], "years", true)).to.deep.equal({ amount: 1.5, format: "years" });
        expect(addDurations([{ amount: 2, format: "weeks" }, { amount: 3, format: "days" }], "weeks", true)).to.deep.equal({ amount: 2.43, format: "weeks" });
    });
});