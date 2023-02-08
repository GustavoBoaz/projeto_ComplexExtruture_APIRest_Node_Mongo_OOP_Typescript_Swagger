const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
        version: "1.0.0",
        title: "API Carshop",
        description: "Esta documentação é destinada ao projeto Carshop"
    },
    host: "localhost:3013",
    basePath: "/",
    schemes: ['http','https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Car",
            "description": "Endpoitns"
        },
        {
            "name": "Motorcycle",
            "description": "Endpoitns"
        }
    ],
    definitions: {
        Car: {
            $model: "Reno Clio",
            $year: 2008,
            $color: "White",
            status: true,
            $buyValue: 10000,
            $doorsQty: 4,
            $seatsQty: 5
        },
        Motorcycle: {
            $model: "Honda CG Titan 125",
            $year: 2005,
            $color: "Black",
            status: true,
            $buyValue: 6500,
            $category: {
                '@enum':["Street", "Custom", "Trail"]
            },
            $engineCapacity: 125
        },
        BodyNotFound: {
            message: "Body not found"
        },
        IdInvalidError: {
            message: "Invalid mongo id"
        },
        IdNotFoundError: {
            message: "Car not found"
        }
    }
}

const outputFile = './swagger-output.json'
const endpointsFiles = [
    './dist/src/app/api/controllers/CarController.js',
    './dist/src/app/api/controllers/MotorcycleController.js',
]

swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
    await import ('./dist/src/app/App.js');         // Your project's root file
})