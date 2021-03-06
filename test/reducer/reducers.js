/* eslint-env jasmine */
/* global jest:false */

jest.disableAutomock()

import postJson from '../fixtures/wp-api-responses/post'

import {
  completeReducer,
  failReducer
} from '../../src/reducer'

describe('Reducers', () => {
  const id = 'bestIdEver'

  describe('completeAction', () => {
    const reducer = completeReducer('id')

    let store

    it('returns a function', () => {
      expect(typeof reducer).toEqual('function')
    })

    it('returns a new object', () => {
      const old = {}
      store = reducer({}, { id, data: postJson })
      expect(store === old).toEqual(false)
      expect(typeof store).toEqual('object')
    })

    it('sets entity ids from response in query object', () => {
      expect(store.queries[id].entities).toEqual([postJson.id])
    })

    it('sets complete to true in query object', () => {
      expect(store.queries[id].complete).toEqual(true)
    })

    it('sets OK to true in query object', () => {
      expect(store.queries[id].OK).toEqual(true)
    })
  })

  describe('failAction', () => {
    const error = 'Wuh-oh!'

    let store = {
      queries: {
        [id]: {
          id,
          complete: false
        }
      }
    }

    it('returns a new object', () => {
      const newStore = failReducer(store, { id, error })
      expect(newStore === store).toEqual(false)
      store = newStore
    })

    it('set error in the query object', () => {
      expect(store.queries[id].error).toEqual(error)
    })

    it('sets complete to true in query object', () => {
      expect(store.queries[id].complete).toEqual(true)
    })

    it('sets OK to false in query object', () => {
      expect(store.queries[id].OK).toEqual(false)
    })
  })
})
