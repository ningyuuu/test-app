"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[439],{6439:(e,s,t)=>{t.r(s),t.d(s,{default:()=>h});var r=t(4568),i=t(7620),a=t(8161);class n{on(e,s){this.events.has(e)||this.events.set(e,[]),this.events.get(e).push(s)}off(e,s){if(!this.events.has(e))return;let t=this.events.get(e),r=t.indexOf(s);-1!==r&&t.splice(r,1)}emit(e,s){this.events.has(e)&&this.events.get(e).forEach(e=>{e(s)})}constructor(){this.events=new Map}}let d=new n;class o extends a.Scene{create(){this.player=this.add.rectangle(400,200,48,48,3900150),this.physics.add.existing(this.player);let e=this.player.body;e.setCollideWorldBounds(!0),e.setGravityY(2e3),this.ground=this.add.rectangle(400,380,800,40,0xd1d5db),this.physics.add.existing(this.ground,!0),this.physics.add.collider(this.player,this.ground,()=>{d.emit("player-landed")}),this.input.keyboard&&(this.cursors=this.input.keyboard.createCursorKeys(),this.spaceKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),this.returnKey=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)),this.add.text(16,16,"Press spacebar to jump\nPress return to reset",{fontSize:"18px",color:"#666666",lineSpacing:10}),d.on("reset-game",this.resetGame.bind(this)),d.emit("current-scene-ready",this)}update(){let e=this.player.body;this.spaceKey.isDown&&e.touching.down&&(e.setVelocityY(-1e3),this.score+=10,d.emit("score-updated",this.score)),this.returnKey.isDown&&this.resetGame(),this.cursors.left.isDown?e.setVelocityX(-200):this.cursors.right.isDown?e.setVelocityX(200):e.setVelocityX(0)}resetGame(){this.score=0,d.emit("score-updated",this.score);let e=this.player.body;e.setVelocity(0,0),e.position.set(400,200)}constructor(){super({key:"MainScene"}),this.score=0}}let c=(0,i.forwardRef)((e,s)=>{let{currentActiveScene:t}=e,n=(0,i.useRef)(null),[c,h]=(0,i.useState)(0),[l,u]=(0,i.useState)(null);return(0,i.useImperativeHandle)(s,()=>({game:n.current,scene:l})),(0,i.useEffect)(()=>{let e={type:a.AUTO,parent:"phaser-game",width:800,height:400,physics:{default:"arcade",arcade:{gravity:{x:0,y:0},debug:!1}},scene:o,backgroundColor:"#f3f4f6"};return n.current=new a.Game(e),d.on("current-scene-ready",e=>{u(e),null==t||t(e)}),d.on("score-updated",e=>{h(e)}),()=>{n.current&&(n.current.destroy(!0),n.current=null)}},[t]),(0,r.jsxs)("div",{className:"flex flex-col gap-4",children:[(0,r.jsx)("div",{className:"flex justify-between items-center",children:(0,r.jsxs)("div",{className:"text-lg font-semibold",children:["Score: ",c]})}),(0,r.jsx)("div",{id:"phaser-game",className:"rounded-lg overflow-hidden border-2 border-gray-200"})]})});c.displayName="PhaserGameInner";let h=c}}]);