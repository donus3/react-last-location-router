const { defaultsESM: tsjPreset } = require('ts-jest/presets')

module.exports = {
  preset: 'ts-jest',
  transform: {
    ...tsjPreset.transform
  },
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['example'],
  moduleFileExtensions: ['tsx', 'ts', 'js']
}
