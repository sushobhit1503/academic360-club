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
    const time = parseInt(sessionDetails.time)
    if (pendingSlots.length === 0)
        return
    pendingSlots.map(eachSlot => {
        let currentSlot = eachSlot.startTime
        while (currentSlot <= eachSlot.endTime) {
            if (new Date(currentSlot.getTime() + time * 60000) <= eachSlot.endTime) {
                finalResult.push({
                    startTime: currentSlot,
                    endTime: new Date(currentSlot.getTime() + 15 * 60000)
                })
            }
            if (new Date(currentSlot.getTime() + time * 60000) > eachSlot.endTime)
                break
            currentSlot = new Date(currentSlot.getTime() + 15 * 60000)
        }
    })
    return finalResult
}