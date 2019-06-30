const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path");
const fs = require("fs");
const zip = require("jszip");

module.exports = {
	plugins: [
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname,'src/images'),
				to: path.resolve(__dirname, "dist/package/images")
			},
			{
				from: path.resolve(__dirname,'src/integration'),
				to: path.resolve(__dirname, "dist/package")
			}
		]),
		{
			apply: (compiler) => {

				compiler.hooks.afterEmit.tapAsync("AfterEmitPlugin", (err, cb) => {

					const ensureFolder = (path) => {
						const locationBlocks = path.split(/(\\|\/)/i);
						const base = locationBlocks.shift();
						return locationBlocks
							.filter(block => !!block)
							.reduce((loc, block) => {
								const current = loc + "/" + block;
								if (!fs.existsSync(current)) {
									fs.mkdirSync(current);
								}
								return current;
							}, base);
					}

					const appendToArchive = (root, currentPath, archive) => {
						const files = fs.readdirSync(path.resolve(root, currentPath));
						return files.reduce((prev, current) => {
							return prev.then(() => {
								const subPath = (currentPath ? currentPath + "/" : "") + current;
								const filePath = path.resolve(root, subPath);
								return new Promise((resolve, reject) => {
									fs.open(filePath, "r", (err, fd) => {
										if (err) {
											reject(err);
											return;
										}

										const info = fs.fstatSync(fd);
										if (info.isDirectory()) {
											appendToArchive(root, subPath, archive)
												.then(() => resolve());
										} else {
											const contents = fs.readFileSync(filePath);
											archive.file(subPath, contents);
											resolve();
										}
									})
								});
							});
							
						}, Promise.resolve());
					}

					const copyAll = (source, target, pattern) => {
						let isChecked = false;
						const files = fs.readdirSync(source);
						files
							.forEach(file => {
								const fullName = path.resolve(target, file);
								if (!path.extname(file)) {
									copyAll(path.resolve(source, file), fullName, pattern);
								} else if (!pattern || file.match(pattern)) {
									if (!isChecked) {
										ensureFolder(target);
										isChecked = true;
									}
									
									fs.copyFileSync(source + "/" + file, fullName);
								}
							});
					}

					process.env.ENV_NAME = (process.env.ENV_NAME || "qa").trim();
					process.env.BUILD_ID = (process.env.BUILD_ID || "1").trim();

					const source = path.resolve(__dirname, "dist/sample-plugin");
					const target = path.resolve(__dirname, "dist/package/src");
					copyAll(source, target, /.+\.(js|json)$/i);

					const targetArtifacts = ensureFolder(path.resolve(__dirname, "dist/artifacts"));
					console.log("Creating archive");
					const archiver = new zip();
					appendToArchive(path.resolve(__dirname, "dist/package"), "", archiver)
						.then(() => {
							console.log("Compressing...");
							const archiveSettings = { type: "uint8array", compression: "DEFLATE", compressionOptions: { level: 9 } };
							return archiver.generateAsync(archiveSettings);
						}).then(contents => {
							const fileName = "sample.plugin.xdx";
							console.log(`Writing to ${fileName}...`);
							const filePath = path.resolve(targetArtifacts, fileName);
							fs.writeFileSync(filePath, contents);
							console.log("Done");
							cb();
						});
				})
			}
		}
	],
	externals: {
		scenegraph: "commonjs scenegraph",
		uxp: "commonjs uxp",
		application: "commonjs application",
		stream: "commonjs stream",
		os: "commonjs os",
		viewport: "commonjs viewport",
		clipboard: "commonjs clipboard",
		interactions: "commonjs interactions",
		assets: "commonjs assets"
	}
}