export const schema = `
Tables:
users(id,name,email,created_at)
orders(id,user_id,total_amount,order_date)
products(id,name,price)`;   