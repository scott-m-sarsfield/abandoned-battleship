
export function objectValues(obj){
    return Object.keys(obj).map(k=>obj[k]);
}

export function matrix(i,j,v){
    return Array(i).fill(0).map(
        ()=>new Array(j).fill(v)
    );
}
