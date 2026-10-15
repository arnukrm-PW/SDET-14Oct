const dotenv = require('dotenv')
const path = require('path')
dotenv.config({path:path.resolve(__dirname,'../.env')})

const ENV_URL={
    dev:process.env.dev_URL,
    qa:process.env.qa_URL,
    stage:process.env.stage_URL,
    prod:process.env.prod_URL
}
const ENV = process.env.ENV || "qa"
const BASE_URL = process.env.BASE_URL ||ENV_URL[ENV]
const INVENTORY_URL = process.env.INVENTORY_URL
if (!BASE_URL) {
    throw new Error(`BASE_URL missing for ENV: ${ENV}`);
}
module.exports={BASE_URL,INVENTORY_URL}