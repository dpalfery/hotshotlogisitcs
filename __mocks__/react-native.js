const React = require('react');

module.exports = {
  Alert: {
    alert: jest.fn(),
  },
  Linking: {
    openURL: jest.fn(),
  },
  Platform: {
    OS: 'ios',
    select: jest.fn((obj) => obj.ios),
  },
  Text: ({ children, ...props }) => React.createElement('Text', props, children),
  View: ({ children, ...props }) => React.createElement('View', props, children),
  Button: ({ title, onPress, ...props }) => React.createElement('Button', { ...props, title, onPress }, title),
  Image: (props) => React.createElement('Image', props),
  TouchableOpacity: ({ children, ...props }) => React.createElement('TouchableOpacity', props, children),
  TextInput: (props) => React.createElement('TextInput', props),
  ScrollView: ({ children, ...props }) => React.createElement('ScrollView', props, children),
  StyleSheet: {
    create: jest.fn((styles) => styles),
  },
  Dimensions: {
    get: jest.fn(() => ({ width: 375, height: 667 })),
  },
}; 