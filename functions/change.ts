import { join, resolve } from 'path'
import { Low, JSONFile } from 'lowdb'
import empty from "is-empty"
import status from "./status.js"

interface Change {
    password: string,
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

interface RegisterDataMix{
    type: Type[],
    data: Data[]
}

async function change(data: Change) {
    if(!data.password || !data.uuid){
        return status(401, 'parameter uncompleted');
    }
    const file = join(resolve('.'), 'db.json')
    const adapter = new JSONFile<RegisterDataMix>(file)
    const db = new Low<RegisterDataMix>(adapter)
    await db.read()
    let dataAllData = db.data?.data
    let typeAllData = db.data?.type
    if(empty(typeAllData) || typeAllData === undefined){
        return status(404, 'user not found')
    }
    if(empty(dataAllData) || dataAllData === undefined){
        return status(404, 'data not found')
    }
    let myData: Data[] = dataAllData.filter(item => item.uuid === data.uuid)
    if(empty(myData) || myData === undefined){
        return status(404, 'data not found')
    }
    let myDataNotArray = myData[0]
    let myTypeProfile: Type | Type[] = typeAllData.filter(item => item.email === myDataNotArray.email)
    if(empty(myTypeProfile) || myTypeProfile === undefined){
        return status(404, 'data not found')
    }
    myTypeProfile = myTypeProfile[0]
    if(myTypeProfile.password !== data.password){
        return status(403, 'password incorrect')
    }
    let myDataIndex = dataAllData.indexOf(myDataNotArray)
    if(db.data === null){
        return status(500, 'server error')
    }
    if(db.data?.data[myDataIndex].status){
        db.data.data[myDataIndex].status = false
    }else{
        db.data.data[myDataIndex].status = true
    }
    
    db.write()
    return status(200, 'success')
}

export default change