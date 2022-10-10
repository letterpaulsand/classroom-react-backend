import { join, resolve } from 'path'
import { Low, JSONFile } from 'lowdb'
import empty from "is-empty"
import status from "./status.js"

interface Look {
    number: number,
    name: string
}

interface ResultData {
    message: string,
    status: boolean,
    uuid: string
}

interface Type {
    email: string,
    password: string,
    name: string,
    time: string,
    date: string[]
}

interface Data{
    email: string,
    message: string,
    name: string,
    date: string,
    uuid: string,
    status: boolean,
    time: string
}

interface RegisterDataMix {
    type: Type[],
    data: Data[]
}

async function look(data: Look) {
    if (!data.number || !data.name) {
        return status(401, 'parameter uncompleted');
    }
    data.number = Number(data.number)
    if (data.number > 0) {
        return status(404, 'over range')
    }
    const file = join(resolve('.'), 'db.json')
    const adapter = new JSONFile<RegisterDataMix>(file)
    const db = new Low<RegisterDataMix>(adapter)
    await db.read()
    let myTypeProfileArray = db.data?.type.filter(item => item.name == data.name)
    if (empty(myTypeProfileArray) || myTypeProfileArray === undefined) {
        return status(404, 'user not found')
    }
    let myTypeProfile = myTypeProfileArray[0]
    if(-data.number > myTypeProfile.date.length - 1){
        return status(404, 'over range')
    }
    let myTypeProfileDate = myTypeProfile.date[-data.number]
    let dataAllData = db.data?.data
    if (empty(dataAllData) || dataAllData === undefined) {
        return status(500, 'server error')
    }
    // when it get the expectation data, and detect it jump out to another day.
    let resultData: ResultData[] = []
    let dateExpiration = false
    for (let i = dataAllData?.length - 1; i >= -1; i--) {
        if (i !== -1 && dataAllData[i].date === myTypeProfileDate) {
            dateExpiration = true
            if (dataAllData[i].name === data.name) {
                resultData.push({
                    message: dataAllData[i].message,
                    status: dataAllData[i].status,
                    uuid: dataAllData[i].uuid
                })
            }
        } else {
            if(!dateExpiration) continue
            if(empty(dataAllData) || dataAllData === undefined){
                return status(500, 'server error')
            }
            let resultObj = {
                date: dataAllData[i + 1].date,
                data: resultData
            }
            return status(200, 'success', [resultObj])
        }
    }

}

export default look