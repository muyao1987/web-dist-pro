/**
 * gulp-javascript-obfuscator —— javascript-obfuscator 的 gulp 流插件（第三方代码，本地副本）
 *
 * 来源：https://github.com/javascript-obfuscator/gulp-javascript-obfuscator（MIT License）
 *
 * 说明：
 *   本文件为官方插件的本地副本（略有调整），供 gulpfile.js 以 `require('./gulp-javascript-obfuscator.js')`
 *   方式引入使用，对流中的 JS 文件内容执行 javascript-obfuscator 高级混淆，并支持 sourcemap 透传。
 *   属第三方插件代码，此处仅标明来源，不做逐行注释与修改。
 */
const through2 = require('through2');
const Vinyl = require('vinyl');
const JavaScriptObfuscator = require('javascript-obfuscator');
const PluginError = require('plugin-error');
const applySourceMap = require('vinyl-sourcemaps-apply');

module.exports = function gulpJavaScriptObfuscator(options = {}) {
	return through2.obj(function (file, enc, cb) {
		if (file.isNull()) return cb(null, file);
		if (!file.isBuffer()) throw new PluginError('gulp-javascript-obfuscator', 'Only Buffers are supported!');
		if (file.sourceMap) {
			options.sourceMap = true;
			options.inputFileName = file.relative;
			options.sourceMapMode = 'separate';
		}

		try {
			const obfuscationResult = JavaScriptObfuscator.obfuscate(String(file.contents), options);
			file.contents = Buffer.from(obfuscationResult.getObfuscatedCode());
			if (options.sourceMap && options.sourceMapMode !== 'inline') {
				if (file.sourceMap) {
					const sourceMap = JSON.parse(obfuscationResult.getSourceMap());
					sourceMap.file = file.sourceMap.file;
					applySourceMap(file, sourceMap);
				}
				else {
					this.push(new Vinyl({
						cwd: file.cwd,
						base: file.base,
						path: file.path + '.map',
						contents: Buffer.from(obfuscationResult.getSourceMap())
					}))
				}
			}
			return cb(null, file);
		} catch (err) {
			throw new PluginError('gulp-javascript-obfuscator', err);
		}
	});
};
