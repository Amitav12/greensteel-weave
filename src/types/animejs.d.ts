
declare module 'animejs' {
  interface AnimeParams {
    targets: any;
    [key: string]: any;
  }
  
  interface AnimeInstance {
    play(): void;
    pause(): void;
    restart(): void;
    reverse(): void;
    seek(time: number): void;
    finished: Promise<void>;
  }

  interface AnimeStatic {
    (params: AnimeParams): AnimeInstance;
    set(targets: any, properties: any): void;
    random(min: number, max: number): number;
  }
  
  const anime: AnimeStatic;
  export = anime;
}

declare module 'animejs/lib/anime.es.js' {
  export * from 'animejs';
  export { default } from 'animejs';
}
