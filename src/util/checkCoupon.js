export const checkValidity = (coupon, amount) => {
    let result = {
        status: false,
        value: 0,
        amountSaved: 0
    }
    if (new Date(coupon.expiryDate) > new Date() && parseInt(coupon.expiryCount) > 0) {
        result.status = true
        if (coupon.type === "Amount") {
            result.value = amount - parseInt(coupon.value)
            result.amountSaved = parseInt(coupon.value)
        }
        else {
            result.value = amount - (parseInt(coupon.value) * 0.01 * amount)
            result.amountSaved = (parseInt(coupon.value) * 0.01 * amount)
        }
    }
    return result
}