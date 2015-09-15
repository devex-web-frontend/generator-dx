'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var CREATE_ENTITY = {
	value: 'createEntity',
	name: 'Create one of project entity'
};

module.exports = yeoman.generators.Base.extend({
	prompting: function () {
		var done = this.async();
		var prompts = [
			{
				type: 'list',
				name: 'action',
				message: 'What you want to do?',
				choices: [CREATE_ENTITY],
				default: CREATE_ENTITY.value
			}
		];

		this.log(require('../logo.js'));

		this.prompt(prompts, function(props) {
			this.props = props;
			done();
		}.bind(this));
	},
	end: function() {
		if (this.props.action === CREATE_ENTITY.value) {
			this.composeWith('dx:entity');
		}
	}
});

