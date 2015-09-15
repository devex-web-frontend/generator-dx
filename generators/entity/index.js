var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var glob = require('glob');

var CONSTANTS = require('../constants.js');


function capitalizeFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = yeoman.generators.Base.extend({
	prompting: function() {
		var entities = this.config.get(CONSTANTS.CFG_SECTION);
		var done = this.async();

		var prompts = [
			{
				type: 'list',
				name: 'entity',
				message: 'Which entity needs to be created?',
				choices: entities.map(function(entity) {
					return {
						name: entity[CONSTANTS.CFG_NAME],
						value: JSON.stringify(entity)
					}
				})
			},
			{
				type: 'input',
				name: 'entityName',
				message: 'Entity name well be?',
				required: true
			}
		];

		this.log('Ok, lets create entity');
		this.prompt(prompts, function(props) {
			this.props = props;
			done();
		}.bind(this));
	},
	writing: function() {
		var entityCfg = JSON.parse(this.props.entity);
		var srcFolder = path.join(this.destinationRoot(), entityCfg[CONSTANTS.CFG_TEMPLATE_SRC_FOLDER]);
		var destFolder = path.join(this.destinationRoot(), entityCfg[CONSTANTS.CFG_DESTINATION_FOLDER]);
		var entityName = this.props.entityName;

		var data = {
			entityName: entityName,
			capitalizedEntityName: capitalizeFirstLetter(entityName)
		};

		var templates = glob.sync(path.join(srcFolder, '/**/*'));

		templates.forEach(function(tplFile) {
			var baseName = path.basename(tplFile);

			this.fs.copyTpl(tplFile, path.join(destFolder, entityName, baseName.replace('entity', entityName)), data);
		}.bind(this));
		//var overridesFolder = this.config.get(CONSTANTS.CFG_TPL_OVERRIDES_FOLDER) ? path.join(
		//	this.destinationRoot(),
		//	this.config.get(CONSTANTS.CFG_TPL_OVERRIDES_FOLDER),
		//	'component'
		//) : this.destinationRoot();
		//var componentsFolder = path.join(this.destinationRoot(), this.config.get(CONSTANTS.CFG_COMPONENTS_FOLDER));
		//var componentName = this.props.componentName;
		//
		//var data = {
		//	componentName: componentName,
		//	componentTag: capitalizeFirstLetter(componentName)
		//};
		//
		//var templates
		//
		//templates.forEach(function(templateFile) {
		//	var baseName = path.basename(templateFile);
		//
		//	this.fs.copyTpl(templateFile, path.join(componentsFolder, componentName, baseName.replace('component', componentName)), data);
		//}.bind(this))
	}
});
