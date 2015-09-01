var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var glob = require('glob');

var COMPONENT_TEMPLATES_FOLDER = path.join(__dirname, './templates');
var CONSTANTS = require('../constants.js');

function templatesLookup(tplFolder, overridesFolder) {
	var defaults = glob.sync(path.join(tplFolder, '/**/*'));
	var overrides = glob.sync(path.join(overridesFolder, '/**/*'));

	return defaults.map(function(fileName) {
		var baseName = path.basename(fileName);
		var overridedFileName = overrides.filter(function(overrideFileName) {
			return path.basename(overrideFileName) === baseName;
		})[0];

		return overridedFileName || fileName;
	})
}

function capitalizeFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = yeoman.generators.Base.extend({
	prompting: function() {
		var done = this.async();
		var prompts = [
			{
				type: 'input',
				name: 'componentName',
				message: 'Component name well be?',
				required: true
			}
		];

		this.log('Ok, lets create component');

		this.prompt(prompts, function(props) {
			this.props = props;
			done();
		}.bind(this));
	},
	writing: function() {
		var overridesFolder = path.join(
			this.destinationRoot(),
			this.config.get(CONSTANTS.CFG_TPL_OVERRIDES_FOLDER),
			'component'
		);
		var componentsFolder = path.join(this.destinationRoot(), this.config.get(CONSTANTS.CFG_COMPONENTS_FOLDER));
		var componentName = this.props.componentName;

		var data = {
			componentName: componentName,
			componentTag: capitalizeFirstLetter(componentName)
		};

		var templates = templatesLookup(COMPONENT_TEMPLATES_FOLDER, overridesFolder);

		templates.forEach(function(templateFile) {
			var baseName = path.basename(templateFile);

			this.fs.copyTpl(templateFile, path.join(componentsFolder, componentName, baseName.replace('component', componentName)), data);
		}.bind(this))
	}
});
