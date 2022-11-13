const { defaultsESM: tsjPreset } = require('ts-jest/presets')

module.exports = {
  preset: 'ts-jest',
  transform: {
    ...tsjPreset.transform
  },
  moduleFileExtensions: ['tsx', 'ts', 'js']
}
