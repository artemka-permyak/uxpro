export default class SmoothScroll {
  private readonly target: HTMLElement;
  private readonly speed: number;
  private readonly smooth: number;
  private moving: boolean = false;
  private pos: number = 0;
  private frame: HTMLElement;

  constructor(target: HTMLElement | Document, speed: number, smooth: number) {
    this.target = target === document
      ? (document.scrollingElement || document.documentElement || document.body.parentNode || document.body) as HTMLElement
      : target as HTMLElement;

    this.speed = speed;
    this.smooth = smooth;
    this.frame = this.target === document.body && document.documentElement ? document.documentElement : this.target;

    this.pos = this.target.scrollTop;

    this.target.addEventListener('wheel', this.handleScroll.bind(this), { passive: false });
  }

  public resetPos() {
    this.pos = 0;

    this.target.scrollTop = 0;
  }

  private handleScroll(e: WheelEvent): void {
    e.preventDefault();

    const delta = this.getWheelData(e);

    this.pos += -delta * this.speed;
    this.pos = Math.max(0, Math.min(this.pos, this.target.scrollHeight - this.frame.clientHeight));

    if (!this.moving) this.updateScreen();
  }

  private getWheelData(e: WheelEvent): number {
    if (e.detail) {
      if (e.wheelDelta) {
        return (e.wheelDelta / e.detail / 40) * (e.detail > 0 ? 1 : -1); // Opera
      } else {
        return -e.detail / 3; // Firefox
      }
    } else {
      return e.wheelDelta / 120; // IE, Safari, Chrome
    }
  }

  private updateScreen(): void {
    this.moving = true;

    const delta = (this.pos - this.target.scrollTop) / this.smooth;
    this.target.scrollTop += delta;

    if (Math.abs(delta) > 0.5) {
      requestAnimationFrame(this.updateScreen.bind(this));
    } else {
      this.moving = false;
    }
  }
}
