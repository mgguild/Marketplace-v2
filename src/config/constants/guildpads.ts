import { GuildpadConfig } from './types'
import TankWarsZoneGuildpad from './Guildpads/TankWarsZone'
import TankWarsZoneGuildpad2 from './Guildpads/TankWarsZone2'
import DemoleGuildpad from './Guildpads/Demole'

// Made ids equal to it's index for mergingGuildpads else it wont work
const Guildpads: GuildpadConfig[] = [
  {
    id: 0,
    title: 'TankWars Zone',
    nextRoundID: 1,
    ... TankWarsZoneGuildpad
  },
  {
    id: 1,
    title: 'TankWars Zone',
    ... TankWarsZoneGuildpad2
  },
  {
    id: 2,
    title: 'Demole',
    ... DemoleGuildpad
  },
]

export default Guildpads
