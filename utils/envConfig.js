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
const base_URL = ENV_URL[ENV]


module.exports={base_URL}