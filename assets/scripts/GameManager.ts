
import { _decorator, Component, instantiate, Label, Node, Prefab, Sprite, SpriteFrame, tween, Vec3 } from 'cc';
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

    @property(Label)
    amount: Label|null = null

    stackStartX = -150;
    cardsGap = 5.7;

    start () {
        let bet = parseInt(localStorage.getItem("bet") as string);
        if(bet) {
            let currentAmount = parseInt(this.amount!.string) - bet;
            localStorage.setItem("amount", JSON.stringify(currentAmount));
            this.amount!.string = currentAmount.toString();

        }
        for(let i=0; i<CARD_COUNT; ++i) {
           let cardNode: any = instantiate(this.CardPrefab);
           cardNode.getComponent(Sprite).spriteFrame = this.Cards![i];
           cardNode.setPosition(this.stackStartX + (i * 5.7), 0, 0)
           this.Stack!.addChild(cardNode);
        }

        tween(this.Stack?.children[40])
        .to(0.5, { position: new Vec3(this.Stack?.children[40].position.x, 50, 0)})
        .to(0.5, { position: new Vec3(this.Openpos!)})
        .start()
    }
}
