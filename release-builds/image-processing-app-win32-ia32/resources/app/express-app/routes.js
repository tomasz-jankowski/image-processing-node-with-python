const express = require("express"),
  router = express.Router(),
  fs = require('fs'),
  jsonfile = require('jsonfile');


const {PythonShell} = require('python-shell');
const formidable = require('formidable');

// Python variables
const jsonPath = __dirname + '/public/python/data/data_color.json';
let imagePath;
let options = {
	pythonOptions: ['-u'], // get print results in real-time
	scriptPath: __dirname + '/public/python/',
	args: []
};

//GET home page.
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/home", (req, res) => {
	res.render("home");
})

router.post('/imagePath', (req, res) => {
	const form = formidable ({ multiples: false });
	form.parse(req);
	form.on('fileBegin', (name, file) => {
		file.path = __dirname + '\\public\\python\\Image.' + file.name.split('.')[1];
		imagePath = file.path;
	});
	// res.sendStatus(200);
	res.render("pageThree", { data: imagePath });
});

router.post('/python', (req, res) => {

	options.args = ["removeFiles"];
	PythonShell.run('api.py', options, (err) => {

		const body = req.body;
		console.log(body)
		switch(body.operation) {
			case 'getImageParameters':
				options.args = ["getImageParameters", `${imagePath}`];
				break;
	
			case 'toGrayscale':
				options.args = ["toGrayscale", `${imagePath}`, `${body.toGrayscale.gray}`];
				break;
	
			case 'getBinaryzedImage':
				options.args = ["getBinaryzedImage", `${imagePath}`, `${body.getBinaryzedImage.threshold}`, `${body.getBinaryzedImage.numberOfInters}`];
				break;
	
			case 'getOtsuBinaryzedImage':
				options.args = ["getOtsuBinaryzedImage", `${imagePath}`, `${body.getOtsuBinaryzedImage.numberOfInters}`];
				break;
	
			case 'getDilate':
				options.args = ["getDilate", `${imagePath}`, `${body.getDilate.structElem}`, `${body.getDilate.size}`, `${body.getDilate.numberOfInters}`];
				break;
	
			case 'getErode':
				options.args = ["getErode", `${imagePath}`, `${body.getErode.structElem}`, `${body.getErode.size}`, `${body.getErode.numberOfInters}`];
				break;
	
			case 'getOpenly':
				options.args = ["getOpenly", `${imagePath}`, `${body.getOpenly.structElem}`, `${body.getOpenly.size}`, `${body.getOpenly.numberOfInters}`];
				break;
	
			case 'getClosely':
				options.args = ["getClosely", `${imagePath}`, `${body.getClosely.structElem}`, `${body.getClosely.size}`, `${body.getClosely.numberOfInters}`];
				break;
	
			case 'medianFiltergingImage':
				options.args = ["medianFiltergingImage", `${imagePath}`, `${body.medianFiltergingImage.structElem}`, `${body.medianFiltergingImage.size}`, `${body.medianFiltergingImage.numberOfInters}`];
				break;
	
			case 'filteringImage':
				options.args = ["filteringImage", `${imagePath}`, `${body.filteringImage.npMask}`, `${body.filteringImage.numberOfInters}`];
				break;
	
			case 'gammaCorrection':
				options.args = ["gammaCorrection", `${imagePath}`, `${body.gammaCorrection.gamma}`, `${body.gammaCorrection.numberOfInters}`];
				break;
	
			case 'addGaussianNoise':
				options.args = ["addGaussianNoise", `${imagePath}`, `${body.addGaussianNoise.stdDev}`, `${body.addGaussianNoise.mean}`, `${body.addGaussianNoise.numberOfInters}`];
				break;
				
			case 'addSaltPepperNoise':
				options.args = ["addSaltPepperNoise", `${imagePath}`, `${body.addSaltPepperNoise.propability}`, `${body.addSaltPepperNoise.saltPepperRatio}`, `${body.addSaltPepperNoise.numberOfInters}`];
				break;
	
			default:
				break;
		}

		PythonShell.run('api.py', options, (err) => {
			if(err) throw err;
			res.redirect('/images');
		});

	})
});

router.get('/images', (req, res) => {

	const imPath = __dirname + '\\public\\python\\images\\';
	const file0 = __dirname + '\\public\\python\\images\\0.png';
	const file1 = __dirname + '\\public\\python\\images\\placeholder.png';
	console.log(imPath, file0, file1);
	// Read files from images folder
	fs.readdir(imPath, (err, files) => {
		console.log("reading files done", files.length);
		// Get json data from data folder
		jsonfile.readFile(jsonPath, (err, json0) => {
			console.log("json0 obtained");
			// Rename original image
			fs.rename(file0, file1, (err) => {
				console.log("image renamed");
				// Generate json data for the last image in folder
				options.args = ["getImageParameters", `${__dirname}\\public\\python\\images\\${files.length-1}.png`, "False"];
				PythonShell.run('api.py', options, (err) => {
					console.log("Python function finished");
					// Get json data from data folder
					jsonfile.readFile(jsonPath, (err, json1) => {
						console.log("json1 obtained");
						// Remove 0.png and rename original image back on
						fs.unlink(file0, (err) => {
							//console.log("file removed");
							fs.rename(file1, file0, (err) => {
								console.log("file renamed");
								// Finally, render the page
								res.render("images", {originalImage: imagePath, filesCount: files.length, json0: json0, json1: json1});
							})
						})						
					})
				})
			})
		})
	})
})

router.get('/images', (req, res) => {
	jsonfile.readFile(jsonPath, (err, json0) => {
		if(err) console.log(err);
		fs.readdir(`${__dirname}\\public\\python\\images`, (err, files) => {
			res.render("images", {originalImage: imagePath, filesCount: files.length, json0: json0, json1: json0});
		});
	});
});

router.get('/back', (req, res) => {
	const imPath = __dirname + '\\public\\python\\images\\';
	const outPath = __dirname + '\\public\\python\\output\\';
	fs.readdir(imPath, (err, files) => {
		const imCount = files.length;
		fs.readdir(outPath, (err, files) => {
			const outCount = files.length;
			fs.copyFile(`${imPath}${imCount-1}.png`, `${outPath}${outCount}.png`, (err) => {
				if(err) throw err;
				res.redirect('/home');
			})
		})
	})
})

module.exports = router;
