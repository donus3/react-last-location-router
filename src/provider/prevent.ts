import { Location } from 'react-router-dom'

type RRLocation = Location & { [key: string]: any }
type LiteLocation = Pick<RRLocation, Exclude<keyof RRLocation, 'state'>>

/**
 * I could only check `key` here but according to:
 * @see https://reacttraining.com/react-router/web/api/location
 * `key` property is not available when HashHistory is used.
 */
const props = ['key', 'pathname', 'search', 'hash']
const isEqual = (a: LiteLocation, b: LiteLocation): boolean => props.every((prop) => a[prop] === b[prop])

const prevented: LiteLocation[] = []

export const prevent = (location: RRLocation): void => {
  const { state, ...rest } = location
  prevented.push(rest)
}

export const hasBeenPrevented = (location: RRLocation): boolean =>
  prevented.some((preventedLocation) => isEqual(location, preventedLocation))

export const shouldPrevent = (location: RRLocation): boolean =>
  Boolean(location.state?.preventLastLocation)
