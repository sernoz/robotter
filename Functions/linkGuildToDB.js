const firebase = require('firebase');

module.exports = async (bot, guild) => {
  const db = firebase.firestore();
  const serversRef = db.collection('Servers');

  try {
    // If server doesn't exist, create it
    // Later, verify each variables exists in collection
    if(!checkCollectionExists(serversRef, guild.id)) {
      await serversRef.doc(guild.id).set({
        name: guild.name,
        gameStatus: NotStarted,
        currentPlayer: NotStarted,
        diceRoll : 0,
        remainingDays : 0,
        // Other variables can be added here
      });
      // Sub-Collections
      serversRef.doc(guild.id).collection('players').set({})
      serversRef.doc(guild.id).collection('board').set({})
    }else{
      console.log(`Collection already exists for "(${guild.name})`)
    }
  
    console.log(`Collection server created successful for "${guild.name}" (${guild.id})`);
  } catch (error) {
    console.log(`Error during creating collection for "${guild.name}" (${guild.id}) `, error);
  }
};