/**
* @jest-environment jsdom
*/
import '@testing-library/jest-dom'
import { ReactNode } from 'react'

import { renderHook as rtlRenderHook, act } from '@testing-library/react'
import { MemoryRouter, useNavigate } from 'react-router-dom'

import {
  LastLocationType
} from '../context/lastLocation'
import {
  LastLocationProvider
} from '../provider/LastLocationProvider'

import { useLastLocation } from '../hooks/useLastLocation'

const renderHook = (watchOnlyPathname = false) => {
  return {
    ...rtlRenderHook(() => ({ lastLocation: useLastLocation(), navigate: useNavigate() }), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <MemoryRouter>
          <LastLocationProvider watchOnlyPathname={watchOnlyPathname}>
            {children}
          </LastLocationProvider>
        </MemoryRouter>
      )
    })
  }
}

describe('useLastLocation', () => {
  describe('useLastLocation', () => {
    it('should have no last location on the first visit', async () => {
      const { result } = renderHook()

      expect(result.current.lastLocation.lastLocation).toBe(null)
    })

    it('Home ► About, should show / as last location', () => {
      const { result } = renderHook()
      expect(result.current.lastLocation.lastLocation).toBe(null)

      act(() => {
        result.current.navigate('/about')
      })

      expect(result.current.lastLocation).not.toBe(null)
      expect(result.current.lastLocation?.lastLocation?.pathname).toBe('/')
    })

    it('Home ► About ► Contact, should show /about as last location', () => {
      const { result } = renderHook()
      expect(result.current.lastLocation.lastLocation).toBe(null)

      act(() => {
        result.current.navigate('/about')
      })
      expect(result.current.lastLocation?.lastLocation?.pathname).toBe('/')

      expect(result.current.lastLocation).not.toBe(null)
      expect(result.current.lastLocation?.lastLocation?.pathname).toBe('/')

      act(() => {
        result.current.navigate('/contact')
      })

      expect(result.current.lastLocation).not.toBe(null)
      expect(result.current.lastLocation?.lastLocation?.pathname).toBe('/about')
    })
  })

  describe('When watchOnlyPathname is true', () => {
    it('should set lastLocation each time when pathname in location is changed', () => {
      const { result } = renderHook(true)

      act(() => {
        result.current.navigate('/test-1')
      })
      expect(result.current.lastLocation?.lastLocation?.pathname).toBe('/')
      act(() => {
        result.current.navigate('/test-1?foo=bar')
      })
      expect(result.current.lastLocation?.lastLocation?.pathname).toBe('/')
      act(() => {
        result.current.navigate('/test-1?foo=zoo')
      })
      expect(result.current.lastLocation?.lastLocation?.pathname).toBe('/')
    })
  })

  it('should do nothing if application is rerendered and location is the same', () => {
    const { result, rerender } = renderHook()
    act(() => {
      result.current.navigate('/test-1')
      result.current.navigate('/test-2')
    })
    const getterLastPrev = result.current.lastLocation?.lastLocation as Exclude<LastLocationType, null>
    /**
     * This one is a bit tricky. I want to test case when `getDerivedStateFromProps` would be
     * called when location is not changing, e.g. any other prop is changing...
     * @see https://github.com/airbnb/enzyme/issues/1925#issuecomment-463248558
     */
    rerender()
    const getterLastNext = result.current.lastLocation?.lastLocation as Exclude<LastLocationType, null>

    expect(getterLastPrev.key).toBe(getterLastNext.key)
    expect(getterLastPrev.pathname).toBe(getterLastNext.pathname)
  })

  it('should NOT store redirected locations', () => {
    const { result } = renderHook()

    act(() => {
      result.current.navigate('/test-1')
    })
    expect(result.current.lastLocation?.lastLocation?.pathname).toBe('/')

    act(() => {
      result.current.navigate('/test-2', { state: { preventLastLocation: true }, replace: true })
    })
    expect(result.current.lastLocation?.lastLocation?.pathname).toBe('/')

    act(() => {
      result.current.navigate('/test-3', { state: { preventLastLocation: true }, replace: true })
    })
    expect(result.current.lastLocation?.lastLocation?.pathname).toBe('/')

    act(() => {
      result.current.navigate('/test-4', { replace: true })
    })
    expect(result.current.lastLocation?.lastLocation?.pathname).toBe('/test-3')
  })
})
