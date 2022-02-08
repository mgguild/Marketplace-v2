import { IGuildpad } from "./types";
import MggGuildpad from "./Guildpads/MggGuildpad";
import TankWarsZoneGuildpad from './Guildpads/TankWarsZone';
import DemoleGuildpad from './Guildpads/Demole';

const Guildpads: IGuildpad[] = [
    // MggGuildpad, disable MGG 
    TankWarsZoneGuildpad,
    DemoleGuildpad
]

export default Guildpads