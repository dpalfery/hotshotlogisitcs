import React from 'react';
import { render } from '@testing-library/react-native';
import CustomerHome from '../CustomerHome';

describe('CustomerHome', () => {
  it('renders navigation buttons', () => {
    const { getByText } = render(<CustomerHome navigation={{ navigate: jest.fn() }} />);
    expect(getByText('Create New Shipment')).toBeTruthy();
    expect(getByText('Track My Shipments')).toBeTruthy();
    expect(getByText('Order History')).toBeTruthy();
    expect(getByText('Account / Profile')).toBeTruthy();
  });
});
