import { _decorator, Component, TiledMap, TiledLayer, Vec3, Node, UITransform, BoxCollider2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TilemapCollider')
export class TilemapCollider extends Component {

    @property(TiledMap)
    tileMap: TiledMap = null!;

    start() {
        const wallLayer = this.tileMap.getLayer('wall'); // 你的 layer 名

        if (!wallLayer) {
            console.error('找不到 wall 层');
            return;
        }

        const layerSize = wallLayer.getLayerSize();   // tile 数量
        const tileSize = this.tileMap.getTileSize();  // 每个 tile 像素大小

        for (let x = 0; x < layerSize.width; x++) {
            for (let y = 0; y < layerSize.height; y++) {

                const gid = wallLayer.getTileGIDAt(x, y);

                // 0 = 没有 tile
                if (gid === 0) continue;

                // 👉 有 tile，创建碰撞
                this.createCollider(wallLayer, x, y, tileSize);
            }
        }
    }

    createCollider(layer: TiledLayer, x: number, y: number, tileSize: any) {

        // const node = new Node(`wall_${x}_${y}`);
        // node.setParent(this.node);

        // // 👉 tile 转世界坐标
        // const pos = layer.getPositionAt(x, y);

        // // 👉 转世界坐标
        // const worldPos = layer.node.worldPosition.clone();
        // worldPos.x += pos.x;
        // worldPos.y += pos.y;


        // node.setWorldPosition(worldPos);

        // // 👉 设置尺寸
        // const ui = node.addComponent(UITransform);
        // ui.setContentSize(tileSize.width, tileSize.height);

        // // 👉 添加碰撞体
        // node.addComponent(BoxCollider2D);
    }
}