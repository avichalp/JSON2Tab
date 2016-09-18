import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import Box from '../src/components/Box.js';
import List from '../src/components/List.js';
import Registration from '../src/components/Registration.js';

describe('<Box/>', function () {
    
    it('should have one h2 for dashboard title', function () {
	var url = 'https://api.grofers.com/v2/search/merchants';
	const wrapper = shallow(<Box location={{pathname: url}}/>);
	expect(wrapper.find('h2')).to.have.length(1);
    });

    it('should have three inputs for header key, header value and query string', function () {
	var url = 'https://api.grofers.com/v2/search/merchants';
	const wrapper = shallow(<Box location={{pathname: url}}/>);
	expect(wrapper.find('input')).to.have.length(3);
    });

    it('should have two buttons for add header and register', function () {
	var url = 'https://api.grofers.com/v2/search/merchants';
	const wrapper = shallow(<Box location={{pathname: url}}/>);
	expect(wrapper.find('button')).to.have.length(2);
    });

})


describe('<List/>', function () {
    
    it('should have one button for adding column', function () {
	var url = 'https://api.grofers.com/v2/search/merchants';
	const wrapper = shallow(<List location={{pathname: url}}/>);
	expect(wrapper.find('button')).to.have.length(1);
    });

    it('should have three inputs for column name, path and property', function () {
	var url = 'https://api.grofers.com/v2/search/merchants';
	const wrapper = shallow(<List location={{pathname: url}}/>);
	expect(wrapper.find('input')).to.have.length(3);
    });

})


describe('<Registration/>', function () {
    
    it('should have one button for adding column', function () {
	var url = 'https://api.grofers.com/v2/search/merchants';
	const wrapper = shallow(<Registration/>);
	expect(wrapper.find('button')).to.have.length(1);
    });

    it('should have two inputs for name and url', function () {
	var url = 'https://api.grofers.com/v2/search/merchants';
	const wrapper = shallow(<Registration/>);
	expect(wrapper.find('button')).to.have.length(1);
    });

})
