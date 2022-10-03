import { join, resolve } from 'path'
import { Low, JSONFile } from 'lowdb'
import empty from "is-empty"
import status from "./status.js"

interface Register {
    email: string,
    password: string,
    name: string
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

interface Time{
    normalFormat: string,
    formatted: string
}


async function register(data: Register, time: Time) {
    if(!data.email || !data.name || !data.password){
        return status(401, 'parameter uncompleted');
    }
    const file = join(resolve('.'), 'db.json')
    const adapter = new JSONFile<RegisterDataMix>(file)
    const db = new Low<RegisterDataMix>(adapter)
    await db.read()
    let typeAllData = db.data?.type
    let typeAllDataFilter = typeAllData?.filter(item => item.name === data.name)
    if(!empty(typeAllDataFilter)){
        // name repeat
        return status(401, 'name has been used')
    }
    db.data?.type.push({
        email: data.email,
        password: data.password,
        name: data.name,
        time: time.normalFormat,
        date: []
    })
    db.write()
    return status(200, 'success')
}

export default register