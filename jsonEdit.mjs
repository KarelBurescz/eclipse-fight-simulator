import fs from 'fs';
class JsonEdit {
    constructor(path) {
        this.path = path
    }
    static edit(path, property, newValue) {
        const rawData = fs.readFileSync(path);
        const jsObject = JSON.parse(rawData);

        jsObject[property] = newValue;
        fs.writeFileSync(path, JSON.stringify(jsObject, null, 2));
        return newJsObject;
    }
    static rewrite(path, newObject) {
        fs.writeFileSync(path, JSON.stringify(newObject, null, 2));
        return newObject;
    }
    static read(path) {
        const rawData = fs.readFileSync(path);
        const jsObject = JSON.parse(rawData);
        return jsObject;
    }
}

export { JsonEdit }
// Edit existing data -> jsonData.someProperty = 'new value';
// Add new data       -> jsonData.newProperty = 'new data'; 