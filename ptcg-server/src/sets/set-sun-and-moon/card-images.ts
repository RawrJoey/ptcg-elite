import { EnergyRetrieval } from './energy-retrieval';
import { ExpShare } from './exp-share';
import { NestBall } from './nest-ball';
import { RainbowEnergy } from './rainbow-energy';
import { RareCandy } from './rare-candy';

export class EnergyRetrievalArt extends EnergyRetrieval {
  public cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SUM/SUM_116_R_EN.png';
}

export class ExpShareArt extends ExpShare {
  public cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SUM/SUM_118_R_EN.png'; 
}

export class NestBallArt extends NestBall {
  public cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SUM/SUM_123_R_EN.png';
}

export class RainbowEnergyArt extends RainbowEnergy {
  public cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SUM/SUM_137_R_EN.png';
}

export class RareCandyArt extends RareCandy {
  public cardImage = 'https://limitlesstcg.nyc3.digitaloceanspaces.com/tpci/SUM/SUM_129_R_EN.png';
}