import { _decorator, Component, director, Node, Button, tween, Vec3, Label, Toggle, ToggleComponent } from 'cc';
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

    @property(Toggle)
    musicToggle: Toggle|null = null;

    @property(Node)
    Menu: Node | null = null;

    onLoad() {
        let launchId = GenerateLaunchId();
        if(this.LaunchId) {
            this.LaunchId!.string = `Launch ID - ${launchId}`;
        }
        if (this.closeButton) {
            this.closeButton.node.on('click', this.closePopUp, this);
        }
    }

     start() {
         localStorage.clear();
    }

    showMenu() {
        if(this.Menu) {
            this.Menu.active = true;
        }
    }

    closeMenu() {
        if(this.Menu) {
            this.Menu.active = false;
        }
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
                .to(0.1, { scale: new Vec3(0, 0, 0) })
                .call(() => { this.popUp!.active = false; })
                .start();
        }
    }

    audioHandle() {
        if(this.musicToggle) {
           const isChecked = this.musicToggle.isChecked;
           this.musicToggle.isChecked = !isChecked;
        }
    }

    loadBetScene() {
        // Load the Bet scene
        director.loadScene('Bet');
    }
}