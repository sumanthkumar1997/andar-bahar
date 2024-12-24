import { _decorator, Component, instantiate, Sprite, Vec3 } from "cc";
import { BETS } from "./constant";
const { ccclass, property } = _decorator;


@ccclass('Players')
export class Players extends Component {
    
    @property(Sprite)
    bets: Sprite[] = []; 

     @property(Sprite)
     andar: Sprite | null = null;

     @property(Sprite)
     bahar: Sprite | null = null;



    start() {
       let choice = localStorage.getItem("choice");
       let bet = parseInt(localStorage.getItem("bet") as string);


       if(bet) {
           if(choice === "andar") {
              let betNode = instantiate(this.bets[BETS.indexOf(bet)].node)
              betNode.active = true;
              betNode.setPosition(new Vec3(0, 0, 0))
              this.andar?.node.addChild(betNode)
           }

           else if(choice === "bahar") {
            console.log(choice, bet);
            let betNode = instantiate(this.bets[BETS.indexOf(bet)].node)
            betNode.active = true;
            betNode.setPosition(new Vec3(0, 0, 0))
            this.bahar?.node.addChild(betNode)
           }

       }
    }
}