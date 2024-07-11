Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Harvester1')

Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'Builder1', { memory: { role: 'builder' } })
var roleHarvester = require('roleHarvester')
module.exports.loop = function() {
  for (var name in Game.creeps) {
    var creep = Game.creeps[name]
    roleHarvester.run(creep)
  }
}
