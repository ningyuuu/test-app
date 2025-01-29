type GameEvents = {
  'current-scene-ready': Phaser.Scene;
  'score-updated': number;
  'player-landed': void;
  'reset-game': void;
};

type EventCallback<T> = (data: T) => void;

class EventEmitter {
  private events: Map<keyof GameEvents, Array<EventCallback<GameEvents[keyof GameEvents]>>>;

  constructor() {
    this.events = new Map();
  }

  on<K extends keyof GameEvents>(event: K, callback: EventCallback<GameEvents[K]>): void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(callback as EventCallback<GameEvents[keyof GameEvents]>);
  }

  off<K extends keyof GameEvents>(event: K, callback: EventCallback<GameEvents[K]>): void {
    if (!this.events.has(event)) return;

    const callbacks = this.events.get(event)!;
    const index = callbacks.indexOf(callback as EventCallback<GameEvents[keyof GameEvents]>);
    if (index !== -1) {
      callbacks.splice(index, 1);
    }
  }

  emit<K extends keyof GameEvents>(event: K, data?: GameEvents[K]): void {
    if (!this.events.has(event)) return;

    this.events.get(event)!.forEach(callback => {
      callback(data as GameEvents[K]);
    });
  }
}

export const EventBus = new EventEmitter(); 