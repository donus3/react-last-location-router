import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { withLastLocation, WithLastLocationProps } from './withLastLocation'
import { useLastLocation } from '../hooks/useLastLocation'

jest.mock('../hooks/useLastLocation')
jest.mock('../provider/LastLocationProvider')

const renderTest = () => {
  const TestComponent = () => <div>Test</div>
  const TestComponentWithLastLocation = withLastLocation(TestComponent)
  return render(
    <TestComponentWithLastLocation />
  )
}

describe('withLastLocation', () => {
  it('should be a function', () => {
    expect(typeof withLastLocation).toBe('function')
  })

  describe('When a react component is passed as a parameter', () => {
    beforeEach(() => {
      jest.clearAllMocks()
      jest.mocked(useLastLocation).mockReturnValue({
        lastLocation: null,
        setLastLocation: jest.fn()
      })
    })

    it('should render the wrapped component', () => {
      const { getByText } = renderTest()
      expect(getByText('Test')).toBeInTheDocument()
    })

    test('last location is null', () => {
      const TestComponent = ({ lastLocation }: WithLastLocationProps) => <div>{(lastLocation.lastLocation != null) ? lastLocation.lastLocation.pathname : 'null'}</div>
      const TestComponentWithLastLocation = withLastLocation(TestComponent)

      const { getByText } = render(
        <TestComponentWithLastLocation />
      )

      expect(getByText('null')).toBeInTheDocument()
    })

    test('lastLocation is not null', () => {
      const wantPathname = '/mock'
      jest.mocked(useLastLocation).mockReturnValue({
        lastLocation: { pathname: wantPathname, key: 'mockKey', hash: '', state: undefined, search: '' },
        setLastLocation: jest.fn()
      })
      const TestComponent = ({ lastLocation }: WithLastLocationProps) => <div>{(lastLocation.lastLocation != null) ? lastLocation.lastLocation.pathname : 'null'}</div>
      const TestComponentWithLastLocation = withLastLocation(TestComponent)

      const { getByText } = render(
        <TestComponentWithLastLocation />
      )

      expect(getByText(wantPathname)).toBeInTheDocument()
    })
  })
})
