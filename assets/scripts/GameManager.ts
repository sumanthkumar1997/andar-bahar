
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

        this.shuffleInd = Math.floor(1 + Math.random() * 52);
        this.pickedCard = this.Stack?.children[this.shuffleInd].getComponent(Sprite)?.spriteFrame?.name.split("_")[2] as string;
        console.log(this.pickedCard);


        tween(this.Stack?.children[this.shuffleInd])
            .to(0.5, { position: new Vec3(this.Stack?.children[this.shuffleInd].position.x, 50, 0) })
            .to(0.5, { position: new Vec3(this.Openpos!) })
            .delay(3)
            .call(() => {
                this.CardAnimation(1)

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
                            currentPos!.y === this.andarPos!.y ? currentPos = this.baharPos : currentPos = this.andarPos;
                            let currentCardName = this.Stack?.children[i].getComponent(Sprite)?.spriteFrame?.name.split("_")[2] as string;
                            if (currentCardName === this.pickedCard) {
                                if (this.winLabel) {
                                    this.winLabel.node.active = true;
                                    this.unscheduleAllCallbacks();
                                }
                            }
                        })
                        .start();
                }, i)
            }
        }
    }
}
