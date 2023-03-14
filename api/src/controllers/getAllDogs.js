const {getApiInfo} = require('./getApiInfo')
const {getDbInfo} = require('./getDbInfo')

//juntamos datos de api con db
const getAllDogs = async () => {
    const apiInfo = await getApiInfo()
    const dbInfo = await getDbInfo()
    const totalInfo = dbInfo.concat(apiInfo).sort((a,b) =>{
        return a.name < b.name ? -1 : 1
    })
    return totalInfo
}

module.exports={getAllDogs}