
import { _decorator, Component, instantiate, Label, Node, Prefab, Scheduler, Sprite, SpriteFrame, Tween, tween, Vec3 } from 'cc';
import { CARD_COUNT } from './constant';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    @property(Node)
    Stack: Node | null = null;

    @property(SpriteFrame)
    Cards: SpriteFrame[] | null = [];

    @property(Prefab)
    CardPrefab: Prefab | null = null;

    @property(Vec3)
    Openpos: Vec3 | null = null;

    @property(Vec3)
    andarPos: Vec3 | null = null;

    @property(Vec3)
    baharPos: Vec3 | null = null;

    @property(Label)
    amount: Label | null = null

    @property(Label)
    winLabel: Label | null = null;

    @property(Label)
    youWonLabel: Label | null = null;

    stackStartX = -150;
    cardsGap = 5.7;
    shuffleInd = -1;
    pickedCard = "";

    start() {
        let bet = parseInt(localStorage.getItem("bet") as string);
        if (bet) {
            let currentAmount = parseInt(this.amount!.string) - bet;
            localStorage.setItem("amount", JSON.stringify(currentAmount));
            this.amount!.string = currentAmount.toString();

        }
        for (let i = 0; i < CARD_COUNT; ++i) {
            let cardNode: any = instantiate(this.CardPrefab);
            cardNode.getComponent(Sprite).spriteFrame = this.Cards![i];
            cardNode.setPosition(this.stackStartX + (i * 5.7), 0, 0)
            this.Stack!.addChild(cardNode);
        }

        this.shuffleInd = 51;
        this.pickedCard = this.Stack?.children[this.shuffleInd].getComponent(Sprite)?.spriteFrame?.name.split("_")[2] as string;


        tween(this.Stack?.children[this.shuffleInd])
            .to(0.5, { position: new Vec3(this.Stack?.children[this.shuffleInd].position.x, 50, 0) })
            .to(0.5, { position: new Vec3(this.Openpos!) })
            .delay(3)
            .call(() => {
                let strtIdx = 2;
                let isWin = this.setupWin(strtIdx, true);

                if(isWin) {
                    this.CardAnimation(strtIdx);
                }
                else {
                    this.CardAnimation(strtIdx - 1)
                }
            })
            .start()
    }

    CardAnimation(strtIdx: number) {
        let currentPos = this.andarPos;
        for (let i = strtIdx; i < (strtIdx + 52); i++) {
            if (i != this.shuffleInd) {
                this.scheduleOnce(() => {
                    tween(this.Stack?.children[i])
                        .to(0.5, { position: currentPos! })
                        .call(() => {
                            let currentCardName = this.Stack?.children[i].getComponent(Sprite)?.spriteFrame?.name.split("_")[2] as string;
                            if (currentCardName === this.pickedCard) {
                                let choice = localStorage.getItem("choice");
                                let betString = localStorage.getItem("bet");
                                if (this.winLabel && this.youWonLabel) {
                                    this.youWonLabel.node.active = true;
                                    if(this.Stack?.children[i].position.y === this.andarPos!.y) {
                                        this.winLabel.string = "Andar wins"
                                        if(choice === "andar") {
                                            this.youWonLabel!.string = `You won ${betString}`
                                        }
                                        else {
                                            this.youWonLabel!.string = `You lost ${betString}`
                                        }
                                    }
                                    else {
                                        this.winLabel.string = "Bahar wins";
                                        if(choice === "bahar") {
                                            this.youWonLabel!.string = `You won ${betString}`
                                        }
                                        else {
                                            this.youWonLabel!.string = `You lost ${betString}`
                                        }
                                    }
                                    this.winLabel.node.active = true;
                                    this.unscheduleAllCallbacks();
                                }
                            }
                            currentPos!.y === this.andarPos!.y ? currentPos = this.baharPos : currentPos = this.andarPos;
                        })
                        .start();
                }, i)
            }
        }
    }

    setupWin(strtIdx: number, isWin: boolean) {
        let currentChoice = "andar";

        for (let i = strtIdx; i < (strtIdx + 52); i++) {
            if (i != this.shuffleInd) {
                let currentCardName = this.Stack?.children[i].getComponent(Sprite)?.spriteFrame?.name.split("_")[2] as string;
                if (currentCardName === this.pickedCard) {
                    let choice = localStorage.getItem("choice");
                    if (currentChoice === "andar") {
                        if (choice === "andar") {
                            if (isWin) {
                                if(i < this.shuffleInd) return false;
                                return true;
                            }
                            if(i < this.shuffleInd)
                                return true;
                            return false;
                        }

                    }
                    else {
                            if (choice === "bahar") {
                                if(i < this.shuffleInd) return false;
                                if (isWin) {
                                    if(i < this.shuffleInd) return false;
                                    return true;
                                }
                                if(i < this.shuffleInd)
                                    return true;
                                return false;
                            }
                        }

                }
                currentChoice = currentChoice === "andar" ? "bahar": "andar"
            }
        }
    }
}
