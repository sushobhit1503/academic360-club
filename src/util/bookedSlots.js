export const bookedSlots = (bookedSessions) => {
    const result = bookedSessions.map (eachSession => {
        const startingTime = new Date(eachSession.bookingTime)
        const endTime = new Date(startingTime.getTime() + eachSession.sessionTime * 60000).toISOString()
        return {
            startTime: eachSession.bookingTime,
            endTime
        }
    })
    return result
}

export const finalCalculations = (pendingSlots, sessionDetails) => {
    let requiredArray = []
    pendingSlots.map (eachSlot => {
        let currentSlot = eachSlot.startTime
        while (currentSlot < eachSlot.endTime) {
            const timeRequired = new Date(eachSlot.startTime.getTime() + parseInt(sessionDetails.time) * 60000)
            if (timeRequired < eachSlot.endTime) {
                requiredArray.push ({
                    startTime: currentSlot,
                    endTime: timeRequired
                })
            }
            currentSlot = new Date(currentSlot + 15 * 60000)
        }
        
    })
    return requiredArray
}