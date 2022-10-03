import { join, resolve } from 'path'
import { Low, JSONFile } from 'lowdb'
import empty from "is-empty"
import status from "./status.js"

interface Look {
    number: number,
    name: string
}

interface ResultData{
    message: string,
    status: boolean
}

interface Type {
    email: string,
    password: string,
    name: string,
    time: string,
    date: string[]
}

interface Data{
    message: string,
    name: string,
    date: string,
    status: boolean,
    time: string
}

interface RegisterDataMix{
    type: Type[],
    data: Data[]
}

async function look(data: Look) {
    if(!data.number || !data.name){
        return status(401, 'parameter uncompleted');
    }
    data.number = Number(data.number)
    if(data.number > 0){
        return status(404, 'over range')
    }
    const file = join(resolve('.'), 'db.json')
    const adapter = new JSONFile<RegisterDataMix>(file)
    const db = new Low<RegisterDataMix>(adapter)
    await db.read()
    let myTypeProfileArray = db.data?.type.filter(item => item.name == data.name)
    if(empty(myTypeProfileArray) || myTypeProfileArray === undefined){
        return status(404, 'user not found')
    }
    let myTypeProfile = myTypeProfileArray[0]
    let myTypeProfileDate = myTypeProfile.date[myTypeProfile.date.length-1+data.number]
    let dataAllData = db.data?.data
    if(empty(dataAllData) || dataAllData === undefined){
        return status(500, 'server error')
    }
    // when it get the expectation data, and detect it jump out to another day.
    let expirationStatus = false
    let resultData: ResultData[] = []
    /*
    *
    *
    * 
    *  HERE // for doesn't finish
    * 
    * 
    * 
    * */
    for(let i = dataAllData?.length-1; i >= 0; i--){
        if(dataAllData[i].name === data.name && dataAllData[i].date === myTypeProfileDate){
            resultData.push({
                message: dataAllData[i].message,
                status: dataAllData[i].status
            })
            if(!expirationStatus){
                expirationStatus = true
            }
        }else{
            if(expirationStatus){
                let resultObj = {
                    date: dataAllData[i+1].date,
                    data: resultData
                }
                return status(200, 'success', [resultObj])
            }
        }
    }
}

export default look