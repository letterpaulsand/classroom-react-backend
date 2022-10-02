import { join, resolve } from 'path'
import { Low, JSONFile } from 'lowdb'
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
    date: string,
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
    if(empty(myTypeProfileArray) || myTypeProfileArray == undefined){
        // name repeat
        return status(404, 'user not found')
    }
    let myTypeProfile = myTypeProfileArray[0]
    if(empty(myTypeProfile.date) || myTypeProfile.date[myTypeProfile.date.length-1] !== time.formatted){
        /*
        *
        * 
        * HERE.............
        * 
        */
    }
    db.write()
    return status(200, 'success')
}

export default edit