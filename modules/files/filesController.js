const Busboy = require('busboy');
const path = require('path');

module.exports.uploadFile = function (req, res, next) {
    const busboy = new Busboy({ headers: req.headers });
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        const saveTo = path.join(__dirname, 'uploads', filename);
        file.pipe(fs.createWriteStream(saveTo));
    });

    busboy.on('finish', function () {
        res.send("文件上传成功");
    });
    return req.pipe(busboy);
}

module.exports.listFileOrFolder = (req, res, next) => {
}
