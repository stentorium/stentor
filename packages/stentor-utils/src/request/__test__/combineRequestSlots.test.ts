/*! Copyright (c) 2020, XAPPmedia */
import { expect } from 'chai';
import { combineRequestSlots } from '../combineRequestSlots';

describe(`#${combineRequestSlots.name}()`, () => {
    describe('when current and incoming are undefined', () => {
        it('returns undefined', () => {
            expect(combineRequestSlots(undefined, undefined)).to.deep.equal({});
        });
    });
    describe('when current is undefined', () => {
        it('returns in the incoming', () => {
            expect(combineRequestSlots(undefined, {
                foo: {
                    name: "foo",
                    value: 4
                }
            })).to.deep.equal({
                foo: {
                    name: "foo",
                    value: 4
                }
            });
        });
    });
    describe('when incoming is undefined', () => {
        it('returns the current', () => {
            expect(combineRequestSlots({
                foo: {
                    name: "foo",
                    value: 4
                }
            }, undefined)).to.deep.equal({
                foo: {
                    name: "foo",
                    value: 4
                }
            });
        });
    });
    describe('when current value exists but incoming does not exist', () => {
        it("doesn't override", () => {
            expect(
                combineRequestSlots(
                    {
                        foo: {
                            name: 'foo',
                            value: 'bar',
                        },
                    },
                    {
                        foo: {
                            name: 'foo',
                            value: '',
                        },
                    },
                ),
            ).to.deep.equal({
                foo: {
                    name: 'foo',
                    value: 'bar',
                },
            });
            expect(
                combineRequestSlots(
                    {
                        foo: {
                            name: 'foo',
                            value: 'bar',
                        },
                    },
                    {
                        foo: {
                            name: 'foo',
                            value: null,
                        },
                    },
                ),
            ).to.deep.equal({
                foo: {
                    name: 'foo',
                    value: 'bar',
                },
            });
            expect(
                combineRequestSlots(
                    {
                        foo: {
                            name: 'foo',
                            value: 'bar',
                        },
                    },
                    {
                        foo: {
                            name: 'foo',
                            value: undefined,
                        },
                    },
                ),
            ).to.deep.equal({
                foo: {
                    name: 'foo',
                    value: 'bar',
                },
            });
        });
    });
    describe('when both exist', () => {
        it('overrides', () => {
            expect(
                combineRequestSlots(
                    {
                        foo: {
                            name: 'foo',
                            value: '',
                        },
                    },
                    {
                        foo: {
                            name: 'foo',
                            value: 'bar',
                        },
                    },
                ),
            ).to.deep.equal({
                foo: {
                    name: 'foo',
                    value: 'bar',
                },
            });
            expect(
                combineRequestSlots(
                    {
                        foo: {
                            name: 'foo',
                            value: 'baz',
                        },
                    },
                    {
                        foo: {
                            name: 'foo',
                            value: 'bar',
                        },
                    },
                ),
            ).to.deep.equal({
                foo: {
                    name: 'foo',
                    value: 'bar',
                },
            });
        });
    });
});
