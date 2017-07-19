const Generator = require('yeoman-generator');
const path = require('path');

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
