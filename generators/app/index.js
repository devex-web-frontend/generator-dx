const Generator = require('yeoman-generator');
const path = require('path');
const glob = require('glob');

const ROOT = path.resolve(__dirname);
const cwd = process.cwd();

module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts);

		this.argument('name', {
			type: String,
			required: true
		})
	}

	configuring() {
		this.destinationRoot(this.options.name);
		this.log(this.destinationRoot(), this.sourceRoot());
	}

	writing() {
		const dest = this.destinationRoot();
		const source = this.sourceRoot();
		this.log(source);
		const files = glob.sync(path.join(source, '**/*.*'), {
			dot: true
		});
		// files.forEach(file => {
		// 	this.fs.copy(file, dest);
		// });
		// this.log(files);
		const context = {
			name: this.options.name
		};
		this.fs.copyTpl(path.join(source, '**/*.*'), dest, context, {}, {
			globOptions: {
				dot: true
			}
		});
	}
};

// 'use strict';
//
// var yeoman = require('yeoman-generator');
// var chalk = require('chalk');
// var yosay = require('yosay');
//
// var CREATE_ENTITY = {
// 	value: 'createEntity',
// 	name: 'Create one of project entity'
// };
//
// module.exports = yeoman.generators.Base.extend({
// 	prompting: function () {
// 		var done = this.async();
// 		var prompts = [
// 			{
// 				type: 'list',
// 				name: 'action',
// 				message: 'What you want to do?',
// 				choices: [CREATE_ENTITY],
// 				default: CREATE_ENTITY.value
// 			}
// 		];
//
// 		this.log(require('../logo.js'));
//
// 		this.prompt(prompts, function(props) {
// 			this.props = props;
// 			done();
// 		}.bind(this));
// 	},
// 	end: function() {
// 		if (this.props.action === CREATE_ENTITY.value) {
// 			this.composeWith('dx:entity');
// 		}
// 	}
// });
//
