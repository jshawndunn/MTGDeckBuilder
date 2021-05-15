const mtg = require('mtgsdk')

mtg.card.where(
    { name: "Black Lotus" })
.then(result => {
    result.forEach(card => {
        console.log(card) // "Black Lotus"
    })
})
