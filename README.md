# image-processing-node-with-python
University project: window application to perform basic image operations.

[![Generic badge](https://img.shields.io/badge/python-3.7.7-blue.svg)](https://shields.io/) [![Generic badge](https://img.shields.io/badge/node-12.18.0-darkgreen.svg)](https://shields.io/)   [![Generic badge](https://img.shields.io/badge/npm-6.14.4-red.svg)](https://shields.io/) [![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

## Description
Project involves the window application used to demonstrate basic image processing operations that can be run on Windows platforms (for both 32- and 64-bit architecture). The application allows you to choose any .jpg, .jpeg oraz .png image and perform one of 13 different operations available. After the operation, several images are presented, along with image parameters and histograms of the inital and final images. Application is based on the self-developed Python library, the graphical interface is developed with Node, Express and Electron.

## Usage

#### Installation
Inside *setup* directory there are two files:
- setup-python.cmd - install Python 3.7.7 x32 or x64 based on system architecture;
- setup-libraries.cmd - install required Python libraries.

#### Application startup
Run *image-processing-app.exe* from directory depending on system architecture:
```
x64: image-processing-app-win32-x64
x32: image-processing-app-win32-ia32
```

#### Development
To contribute to the project, you need to have installed:
- Python along with required libraries (information above) 
- Node.js along with required modules

Modules installation process from the root directory:
```
cd src
npm install
cd express-app
npm install
```

To run application inside a browser (as a local HTTP server)
```
cd src/express-app/bin
node www
```
To run application inside an Electron window:
```
cd src
npm start
```

**WARNING:** To smoothly change between the Electron window and browser startup, you need to refactor paths in Python scripts (*api.py, basic_operations.py*).

## Python scripts details
Python scripts are in *src/express-app/public/python* directory.
- *api.py* - script that allows efficient communication between Node and Python.
- *basic_operations* - script to handle basic operations, such as image loading/saving.
- *binary_operations* - functions that allow operating on binary images and transforming to binary images.
- *filtering.py* - filtration operations (matrix, median, gamma correction).
- *noising.py* - noises operations (salt-pepper, Gauss).

## Application walkthrough and screenshots
###### **screenshots in Polish, to be updated**

**Show basic information about given image and choose operation (sample images are places inside *sample images* directory):**
![scr1](https://user-images.githubusercontent.com/48838669/85070869-dbeb0c00-b1b6-11ea-8d76-55e35c80009f.PNG)

**Operation being handled:**
![scr2](https://user-images.githubusercontent.com/48838669/85070868-db527580-b1b6-11ea-99b3-cedf63ddd641.PNG)

**Show original and final images parameters**
![scr3](https://user-images.githubusercontent.com/48838669/85070867-dab9df00-b1b6-11ea-9998-ce492fea481e.PNG)

**Show histograms for original and final images:**
![scr4](https://user-images.githubusercontent.com/48838669/85070864-da214880-b1b6-11ea-91a2-94535c92ac0d.PNG)

After returning to the home screen, final image is saved inside *src/express-app/public/python/output* directory.

## Credits
The project has been developed by:

- Marcin Nawrocki (Python scripts)
- Tomasz Jankowski (window application and Node-Python integration)
- [Mateusz Kunysz](https://github.com/key999) (Python consulting)


- [frankhale](https://github.com/frankhale) ([Integration between Electron and Express](https://github.com/frankhale/electron-with-express))

## License
 
The MIT License (MIT)

Copyright (c) 2020 Tomasz Jankowski, Marcin Nawrocki

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.