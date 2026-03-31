




export const discountPriceCalc = (onSale, discount, price) => {
  if(onSale && discount > 0){
    return price - price * discount / 100
  }
  return price   
}
  