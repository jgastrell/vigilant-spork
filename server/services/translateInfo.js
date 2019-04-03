/**
 * Here I used mocked data. I actually obtain randomly data from tesseract funcionality, but in order to work
 * properly tesseract has to be trained and then we can obtain tagged data.
 */

const translateInfo = (dataFromTesseract) => {
    return {
        name: "San Telmo",
        winery: "Bodegas San Telmo", 
        year: 2018, 
        alcohol: 14.04,
        price: 24,
        size: "750",
        color: "red",
        grapes: "RIESLING",
    }
}

module.exports = translateInfo;