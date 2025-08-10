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
  
  function anime(params: AnimeParams): AnimeInstance;
  
  export = anime;
}

declare module 'animejs/lib/anime.es.js' {
  export * from 'animejs';
  export { default } from 'animejs';
}