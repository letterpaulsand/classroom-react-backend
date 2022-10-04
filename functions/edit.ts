import { join, resolve } from 'path'
import { Low, JSONFile } from 'lowdb'
import { v4 as uuidv4 } from 'uuid';
import empty from "is-empty"
import status from "./status.js"

interface Edit {
    message: string,
    name: string,
    password: string
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
    uuid: string,
    status: boolean,
    time: string
}

interface RegisterDataMix{
    type: Type[],
    data: Data[]
}

interface Time{
    normalFormat: string,
    formatted: string
}


async function edit(data: Edit, time: Time) {
    if(!data.message || !data.name || !data.password){
        return status(401, 'parameter uncompleted');
    }
    const file = join(resolve('.'), 'db.json')
    const adapter = new JSONFile<RegisterDataMix>(file)
    const db = new Low<RegisterDataMix>(adapter)
    await db.read()
    let typeAllData = db.data?.type
    let myTypeProfileArray = typeAllData?.filter(item => item.name === data.name)
    if(empty(myTypeProfileArray) || myTypeProfileArray === undefined){
        // name repeat
        return status(404, 'user not found')
    }
    let myTypeProfile = myTypeProfileArray[0]
    if(myTypeProfile.password !== data.password){
        return status(403, 'password incorrect')
    }
    let myTypeProfileIndex = typeAllData?.indexOf(myTypeProfile)
    if(empty(myTypeProfile.date) || myTypeProfile.date[myTypeProfile.date.length-1] !== time.formatted){
        if(myTypeProfileIndex === undefined){
            return status(500, 'server error')
        }
        db.data?.type[myTypeProfileIndex].date.push(time.formatted)
    }
    db.data?.data.push({
        message: data.message,
        name: data.name,
        date: time.formatted,
        uuid: uuidv4(),
        status: true,
        time: time.normalFormat
    })
    db.write()
    return status(200, 'success')
}

export default edit