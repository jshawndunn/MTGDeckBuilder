const db = require('./models')

// const saveCard = async () => {
//     const card = await db.card.create({
//         name: 'Test Card',
//         manaCost: '{1}{B}{R}',
//         cmc: 2,
//         colors: [ 'Black', 'Red' ],
//         colorIdentity: [ 'B' ],
//         type: 'Creature — Vampire',
//         types: [ 'Creature' ],
//         subtypes: [ 'Vampire' ],
//         rarity: 'Common',
//         set: 'M20',
//         setName: 'Core Set 2020',
//         text: '{6}{B}: Each opponent loses 2 life and you gain 2 life.',
//         flavor: '"I think I cracked a fang."',
//         artist: 'Jason Rainville',
//         number: '326',
//         power: '2',
//         toughness: '1',
//         layout: 'normal',
//         multiverseid: '469879',
//         imageUrl: 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=469879&type=card',
//         printings: [ 'M20', 'M21' ]
//     })
//     return card
// }

// saveCard()

const createDeck = async (id) => {
    const user = await db.user.findOne({
            where: { id : id}
        })
    const deck = await user.createDeck({
        name: 'Bob the Builder Deck'
    })
        console.log(deck)
        return user, deck
}

createDeck(1);