import React from 'react';
import TestRenderer, { act } from 'react-test-renderer';
import CustomerHome from '../CustomerHome';

describe('CustomerHome', () => {
  it('renders navigation buttons', () => {
    const navigation = { navigate: jest.fn() };
    let renderer;
    
    act(() => {
      renderer = TestRenderer.create(<CustomerHome navigation={navigation} />);
    });
    
    const instance = renderer.root;
    
    // Test that the component renders without crashing
    expect(instance.findByType('Text')).toBeTruthy();
    expect(instance.findByType('View')).toBeTruthy();
  });

  it('has the correct button titles', () => {
    const navigation = { navigate: jest.fn() };
    let renderer;
    
    act(() => {
      renderer = TestRenderer.create(<CustomerHome navigation={navigation} />);
    });
    
    const instance = renderer.root;
    
    // Find all Button components and check their titles
    const buttons = instance.findAllByType('Button');
    const titles = buttons.map(button => button.props.title);
    
    expect(titles).toContain('Create New Shipment');
    expect(titles).toContain('Track My Shipments');
    expect(titles).toContain('Order History');
    expect(titles).toContain('Account / Profile');
  });
});
