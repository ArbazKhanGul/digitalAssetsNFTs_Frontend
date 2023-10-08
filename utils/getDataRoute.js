const getDataRoute=(router,pageName)=>{

    const result = router.query

    let paramid = result.hasOwnProperty('id') ? result.id[0] : 1;
    paramid = parseInt(paramid) ? parseInt(paramid) : 1;
    paramid = paramid >= 1 ? paramid : 1
    let route = `/${pageName}/${paramid}`
    var size = Object.keys(result).length;
    if (size > 1 || ( result['id']===undefined && size >0 ) ) {
        route = route + '?'
        for (let key in result) {
            if (key !== 'id') {
                if (route.charAt(route.length - 1) === '?') {
                    route = route + key + '=' + result[key].trim().toLowerCase();
                }
                else {
                    route = route + '&' + key + '=' + result[key].trim().toLowerCase();
                }
            }
        }
    }

    return {route,paramid};
}

export default getDataRoute;