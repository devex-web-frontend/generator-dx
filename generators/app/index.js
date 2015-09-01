'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var CREATE_COMPONENT = {
	value: 'createComponent',
	name: 'Create basic component structure'
};
var CREATE_PAGE = {
	value: 'createPage',
	name: 'Create new project page'
};

module.exports = yeoman.generators.Base.extend({
	prompting: function () {
		var done = this.async();
		var prompts = [
			{
				type: 'list',
				name: 'action',
				message: 'What you want to do?',
				choices: [CREATE_COMPONENT],
				default: CREATE_COMPONENT.value
			}
		];

		this.log(yosay(
			'Hi'
		));

		this.prompt(prompts, function(props) {
			this.props = props;
			done();
		}.bind(this));
	},
	end: function() {
		if (this.props.action === CREATE_COMPONENT.value) {
			this.composeWith('dx:component');
		}
	}
});

