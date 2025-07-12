//import {tool} from "langchain/tools";
//import {monsterScene} from "../../src/Scenes/Monster.js";
//const bodyTool = new BodyTool(() => monsterScene);

export class BodyTool {
    constructor(sceneGetter) {
        this.sceneGetter = sceneGetter;
        this.name = "body_selector";
        this.description = "Selects a body sprite fpr the monster";
        this.bodyTypes = [];
        this.initialized = false;
    }

    initialize() {
        const scene = this.sceneGetter();
        const cache = scene.textures.get('monsterParts')?.source[0]?.data;

        if(!cache){
            console.warn("Atlad data not found. 'monsterParts' could not be loaded.");
            return;
        }

        const spriteelements = cache.getElementsByTageName("SubTexture");
        for (let i = 0; i < spriteelements.length; i++){
            const name = spriteelements[i].getAttribute("name");
            if(name && name.startsWith("body_")) {
                this.bodyTypes.push(name);
            }
        }

        this.initialized = true;
    }

    async call(input) {
        const scene = this.sceneGetter();

        if (!this.initialized) {
            this.initialize();
        }

        if(!scene || !scene.my || !scene.my.sprite || !scene.textures.exists("monsterParts")) {
            return "Monster scene not property initialized.";
        }

        const query = input.toLowerCase();

        const colors = ["blue", "green", "red", "white", "yellow", "dark"];
        const foundColor = colors.find(curr => query.includes(curr));

        if(!foundColor){
            return `I counld't find a body color in your request. Try with one of thses: ${colors.join(",")}`;
        }


        const matched = this.bodyTypes.filter(name => name.toLowerCase().includes(`body_${foundColor}`));

        const selectedBody = matched[Math.floor(Math.random() * matched.length)];
        console.log(scene.textures.getFrame("monsterParts", selectedBody));
        scene.my.sprite.body.setTexture("monsterParts", selectedBody);

        const x = scene.bodyX ?? 300;
        const y = scene.bodyY ?? 350;

        if(scene.my.sprite.body) {
            scene.my.sprite.body.setTexture("monsterParts", selectedBody);
        }else{
            scene.my.sprite.body = scene.add.sprite(x, y, "monsterParts", selectedBody);
        }

        return `Your monster's body is now "${selectedBody}" (${foundColor}, randomly chosen).`;
        /*
        if(matched) {
            scene.my.sprite.body.setTexture("monsterParts", matched);
            return `Applied body type "${matched}" to the monster.`
        } else {
            return `No matching body type found for "${input}". Available: ${this.bodyTypes.join(", ")}`;
        }
            */
    }
}