


exports.dateString = (isoDdate:any) =>{

    const date = new Date(isoDdate);
    return date.toISOString().substr(0,10)


}



