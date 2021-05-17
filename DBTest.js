const mtg = require('mtgsdk')

mtg.card.where(
    { name: "vampire" })
.then(result => {
    result.forEach(card => {
        console.log(imageUrl) // "Black Lotus"
    })
})
