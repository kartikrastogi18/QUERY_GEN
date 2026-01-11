export function isSafeSQL(sql){
    const forbidden= /(drop|delete|truncate|update|alter|insert)/i;
    return !forbidden.test(sql);
}