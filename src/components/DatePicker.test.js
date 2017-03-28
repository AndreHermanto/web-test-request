import React from 'react';
import DatePicker from './DatePicker';
import renderer from 'react-test-renderer';
import TestUtils from 'react-addons-test-utils';

describe('DatePicker', function() {
  test('handleDateChange updates and parse the value to parent\'s date state correctly', async function() {
    var send;
    const component = TestUtils.renderIntoDocument(
      <DatePicker 
        name="dob" 
        onChange={(a)=>{send = a.target.value;}}
        formState={{}}
      />
    );
    component.state = {}; 
    component.handleDateChange({ currentTarget: { name: 'year', value: '1999' }});
    expect(send).toEqual('');
    component.handleDateChange({ currentTarget: { name: 'month', value: '12' }});
    expect(send).toEqual('');
    component.handleDateChange({ currentTarget: { name: 'day', value: '21' }});
    expect(send).toEqual('21-12-1999');
  });
});