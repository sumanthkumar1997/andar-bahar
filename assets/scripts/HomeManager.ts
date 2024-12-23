import { _decorator, Component, director, Node, Button, tween, Vec3, Label } from 'cc';
import { GenerateLaunchId } from './Utils/Utils';
const { ccclass, property } = _decorator;

@ccclass('HomeManager')
export class HomeManager extends Component {

    @property(Node)
    popUp: Node | null = null;

    @property(Button)
    closeButton: Button | null = null;

    @property(Label)
    LaunchId: Label | null = null;

    onLoad() {
        let launchId = GenerateLaunchId();
        this.LaunchId!.string = `Launch ID - ${launchId}`;
        if (this.closeButton) {
            this.closeButton.node.on('click', this.closePopUp, this);
        }
    }

     start() {
         
    }
    
    showPopUp() {    
        if (this.popUp) {
            console.log("I am supposed to be called");
            this.popUp.active = true;
            tween(this.popUp)
                .to(0.1, { scale: new Vec3(1, 1, 1) })
                .start();
        }
    }



    closePopUp() {
        if (this.popUp) {
            tween(this.popUp)
                .to(0.5, { scale: new Vec3(0, 0, 0) }, { easing: 'backIn' })
                .call(() => { this.popUp!.active = false; })
                .start();
        }
    }

    loadBetScene() {
        // Load the Bet scene
        director.loadScene('Bet');
    }
}