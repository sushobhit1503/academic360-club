export const bookedSlots = (bookedSessions) => {
    const result = bookedSessions.map(eachSession => {
        const startingTime = new Date(eachSession.bookingTime)
        const endTime = new Date(startingTime.getTime() + eachSession.sessionTime * 60000).toISOString()
        return {
            startTime: eachSession.bookingTime,
            endTime
        }
    })
    return result
}

export const finalSlots = (pendingSlots, sessionDetails) => {
    let finalResult = []
    if (pendingSlots.length === 0)
        return
    pendingSlots.map(eachSlot => {
        let currentSlot = eachSlot.startTime
        console.log(currentSlot)
        let nextSlot = new Date(currentSlot.getMinutes() + parseInt(sessionDetails.time) * 60000)
        console.log(nextSlot)
        if (nextSlot <= eachSlot.endTime) {
            finalResult.push({
                startTime: currentSlot,
                endTime: currentSlot + 15 * 60000
            })
            console.log(finalResult)
            currentSlot = new Date(currentSlot + 15 * 60000)
            console.log(currentSlot)
        }
        nextSlot = new Date(currentSlot.getMinutes() + parseInt(sessionDetails.time) * 60000)
        console.log(nextSlot, sessionDetails.time)
        if (nextSlot <= eachSlot.endTime) {
            finalResult.push({
                startTime: currentSlot,
                endTime: currentSlot + 15 * 60000
            })
            console.log(finalResult)
            currentSlot = new Date(currentSlot.getMinutes() + 15 * 60000)
            console.log(currentSlot)
        }
    })

    return finalResult
}