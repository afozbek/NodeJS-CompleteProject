const fs = require('fs');
const path = require('path');
//products yok şu an
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductsFromFile = (cb) => {

    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]); // empty Array returned 
        }
        else
            cb(JSON.parse(fileContent)); // array returned
    });
}

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }


    save() {
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
}