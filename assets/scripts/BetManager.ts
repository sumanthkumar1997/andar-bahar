import { _decorator, Component, director, Label, Sprite, Vec3 } from 'cc';
import { BETS, CHOICES, TIMER } from "./constant";
const { ccclass, property } = _decorator;

@ccclass('BetScreen')
export class BetScreen extends Component {
   
    @property([Sprite])
    bets: Sprite[] = [];

    @property([Sprite])
    choices: Sprite[] = []; 

    @property(Label)
    timer: Label | null = null;
    
    duration = TIMER;
    selectedBet = 100;
    selectedChoice = "andar";

    addBetEffect(event: Event, CustomEventData: any) {
        this.bets.map((bet, index) => {
            if(CustomEventData == (index + 1)) {
                bet.node.scale = new Vec3(1.3, 1.3, 1.3);
                this.selectedBet = BETS[index]
            }
            else {
                bet.node.scale = new Vec3(1.0, 1.0, 1.0)
            }
        })
    }

    addChoiceEffect(event: Event, CustomEventData: any) {
        this.choices.map((choice, index) => {
            if(CustomEventData == (index + 1)) {
                choice.node.scale = new Vec3(1.3, 1.3, 1.3);
                this.selectedChoice = CHOICES[index];
            }
            else {
                choice.node.scale = new Vec3(1.0, 1.0, 1.0)
            }
        })
    }

    start () {
        if(this.timer) {
            this.timer.string = `00 : ${this.duration.toString()}`
        }
    }

    loadGameScene() {
        director.loadScene("Game");
    }

    update(dt: number) {
        if(this.duration > 0) {
            this.duration -= dt;

            if(this.duration < 0) {
                this.duration = 0
                this.loadGameScene();
            }

            const seconds = Math.ceil(this.duration);

            this.timer!.string = `00 : ${seconds < 10 ? "0": ""}${seconds.toString()}`

        }
    }
}
