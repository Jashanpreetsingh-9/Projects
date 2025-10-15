use gameDB

db.createCollection("players")
db.createCollection("Islands")
db.createCollection("items")
db.createCollection("villains")


db.players.insertMany([{name: "Luffy",role:"Captain",level:45, coins:3200, membership:"VIP"},{name: "Zoro",role:"Swordsman",level:40, coins:1200, membership:"VIP"},{name: "Sanji",role:"Chef",level:39, coins:2500, membership:"VIP"},{name: "Nami",role:"Navigator",level:21, coins:4000, membership:"Regular"},{name: "Jimbe",role:"Helsman",level:36, coins:3000, membership:"VIP"},{name: "Chopper",role:"Doctor",level:22, coins:1500, membership:"Regular"},{name: "Robin",role:"Archeologist",level:29, coins:3300, membership:"VIP"},{name: "Brook",role:"Musician",level:30, coins:1900, membership:"VIP"},{name: "Usopp",role:"Sniper",level:22, coins:1500, membership:"Regular"},{name: "Franky",role:"Shipwright",level:32, coins:3100, membership:"VIP"}])
db.items.insertMany([{item_name:"Gum-Gum Fruit", item_type:"Devil Fruit",price:2500 ,rarity:"Legendary"},{item_name:"Enma(Sword)", item_type:"weapon",price:1500 ,rarity:"Legendary"},{item_name:"Climate-Tact", item_type:"weapon",price:230 ,rarity:"Common"},{item_name:"Hana Hana Fruit", item_type:"Devil Fruit",price:450 ,rarity:"Rare"},{item_name:"Rumble Ball", item_type:"medicine",price:100 ,rarity:"Common"},{item_name:"Germa 66 Suit", item_type:"weapon",price:940 ,rarity:"Legendary"},{item_name:"Revive Revive Fruit", item_type:"Devil Fruit",price:500 ,rarity:"Rare"},{item_name:"Energy Steroid", item_type:"medicine",price:320 ,rarity:"Rare"},{item_name:"Human Human Fruit: Reindeer", item_type:"Devil Fruit",price:125 ,rarity:"Common"},{item_name:"General Franky", item_type:"weopon",price:600 ,rarity:"Rare"}])
db.Islands.insertMany([{island_name: "Logue Town",location:"East Blue"},{island_name: "Wano",location:"Grand Line"},{island_name: "Goa Kingdom",location:"East Blue"},{island_name: "Alabasta",location:"Grand Line"},{island_name: "Germa Kingdom",location:"North Blue"},{island_name: "Mary Geoise",location:"Red Line"},{island_name: "Skypiea",location:"Sky Islands"},{island_name: "Whole Cake Island",location:"Grand Line"},{island_name: "Laughtale",location:"Unknown"}])
db.villains.insertMany([{villain_name: "Crocodile", difficulty_level:20},{villain_name: "Eneru", difficulty_level:25},{villain_name: "Rob Lucci", difficulty_level:25},{villain_name: "Donquixote Doflamingo", difficulty_level:35},{villain_name: "Arlong", difficulty_level:15},{villain_name: "Hordy", difficulty_level:30},{villain_name: "Akainu", difficulty_level:40},{villain_name: "Kaido", difficulty_level:45},{villain_name: "Charlote Linlin", difficulty_level:40},{villain_name: "Black Beard", difficulty_level:45},{villain_name:"Imu", difficulty_level:99}])


db.players.find().sort({level:-1}).limit(1)
db.players.find({coins:{$gt:2000}})
db.players.find({membership:"VIP"})
db.items.find({$and:[{item_type:"weapon"},{rarity:"Legendary"}]})
db.Islands.find({$or:[{location:"Grand Line"},{location:"Unknown"}]})

db.players.updateOne({name:"Zoro"},{$set:{coins:2900}})
db.players.deleteOne({name: "Usopp"})

db.villains.createIndex({username:1})


// Embedded Data: NoSQL(MongoDB) allows us to contain entries as arrays in our database. Thus, one key may my contain multiple values(entries). I didn't use embedded data to make my content more defined and relational as it looks cleaner and systematics with 1 to 1 values.


/* Referenced Data: I used referenced data in my project to make my collections and documenets look more cleaner and systemtic. 
                    Moreover, using relational data helps to avoid confusion and I never felt any need of using Embedded data as all the keys/values(for example, name: "Luffy", role:"Captain") I wanted to include made sense as a one to one relationship.
                    Moreover, it makes it easier to insert, delete and update data.
                    It also make it easier to retreive data without any excessive queries.
                    Data size is also suitable if subjected to any growth.
*/
