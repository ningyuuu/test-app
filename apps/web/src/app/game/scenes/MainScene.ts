import { Scene } from 'phaser';
import { EventBus } from '../EventBus';

export class MainScene extends Scene {
  private player!: Phaser.GameObjects.Rectangle;
  private ground!: Phaser.GameObjects.Rectangle;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private spaceKey!: Phaser.Input.Keyboard.Key;
  private returnKey!: Phaser.Input.Keyboard.Key;
  private score: number = 0;

  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    // Create player
    this.player = this.add.rectangle(400, 200, 48, 48, 0x3b82f6);
    this.physics.add.existing(this.player);

    const playerBody = this.player.body as Phaser.Physics.Arcade.Body;
    playerBody.setCollideWorldBounds(true);
    playerBody.setGravityY(2000);

    // Create ground
    this.ground = this.add.rectangle(400, 380, 800, 40, 0xd1d5db);
    this.physics.add.existing(this.ground, true);

    // Add collision between player and ground
    this.physics.add.collider(this.player, this.ground, () => {
      // Emit landing event to React
      EventBus.emit('player-landed');
    });

    // Setup keyboard controls
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    // Add instructions text
    this.add.text(16, 16, 'Press spacebar to jump\nPress return to reset', {
      fontSize: '18px',
      color: '#666666',
      lineSpacing: 10
    });

    // Listen for events from React
    EventBus.on('reset-game', this.resetGame.bind(this));

    // Notify React that the scene is ready
    EventBus.emit('current-scene-ready', this);
  }

  update() {
    const playerBody = this.player.body as Phaser.Physics.Arcade.Body;

    // Handle jumping
    if (this.spaceKey.isDown && playerBody.touching.down) {
      playerBody.setVelocityY(-1000);
      this.score += 10;
      EventBus.emit('score-updated', this.score);
    }

    // Handle reset
    if (this.returnKey.isDown) {
      this.resetGame();
    }

    // Optional: Add left/right movement
    if (this.cursors.left.isDown) {
      playerBody.setVelocityX(-200);
    } else if (this.cursors.right.isDown) {
      playerBody.setVelocityX(200);
    } else {
      playerBody.setVelocityX(0);
    }
  }

  private resetGame() {
    this.score = 0;
    EventBus.emit('score-updated', this.score);
    const playerBody = this.player.body as Phaser.Physics.Arcade.Body;
    playerBody.setVelocity(0, 0);
    playerBody.position.set(400, 200);
  }
} 