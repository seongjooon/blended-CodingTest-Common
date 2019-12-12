const update = require('./App');

describe('update', () => {
  describe('has a #$set method that', () => {
    var state;
    var commands;
    var nextState;
    beforeEach(() => {
      state = {
        a: {
          b: 22,
          c: 33
        },
        unChanged: {}
      };
      commands = { a: { c: { $set: 44 } } };
      nextState = update(state, commands);
    });

    it('changes the tree on the directive', () => {
      expect(state.a.c).not.toBe(nextState.a.c);
    });

    it('reuses state on different branches', () => {
      expect(state.unChanged).toBe(nextState.unChanged);
    });
  });

  describe("can pass react's test suite", () => {
    it('should support set', () => {
      expect(update({ a: 'b' }, { $set: { c: 'd' } })).toEqual({ c: 'd' });
    });

    it('should support push', () => {
      expect(update([1], { $push: [7] })).toEqual([1, 7]);
      expect(update([1], { $push: [7, 10, 99] })).toEqual([1, 7, 10, 99]);
    });

    it('should support unshift', () => {
      expect(update([1], { $unshift: [7] })).toEqual([7, 1]);
      expect(update([1], { $unshift: [33, 24, 7] })).toEqual([7, 24, 33, 1]);
    });

    it('should support merge', () => {
      expect(update({ a: 'b' }, { $merge: { c: 'd' } })).toEqual({
        a: 'b',
        c: 'd'
      });
      expect(update({ a: 'b' }, { $merge: { c: 'd', z: 'zero' } })).toEqual({
        a: 'b',
        c: 'd',
        z: 'zero'
      });
    });

    it('should support apply', () => {
      expect(
        update(2, {
          $apply: function(x) {
            return x * 2;
          }
        })
      ).toBe(4);
      expect(
        update(6, {
          $apply: function(x) {
            return x / 2;
          }
        })
      ).toBe(3);
    });

    it('should support deep updates', () => {
      expect(
        update({ a: 'b', c: { d: 'e' } }, { c: { d: { $set: 'f' } } })
      ).toEqual({
        a: 'b',
        c: { d: 'f' }
      });
    });

    it('should support splice', () => {
      expect(update([1, 4, 3], { $splice: [[1, 1, 2]] })).toEqual([1, 2, 3]);
      expect(update([1, 4, 3, 10], { $splice: [[2, 1, 99]] })).toEqual([
        1,
        4,
        99,
        10
      ]);
    });

    it('should support nothing', () => {
      expect(update({ a: 'b' }, undefined)).toEqual({ a: 'b' });
    });
  });
});
