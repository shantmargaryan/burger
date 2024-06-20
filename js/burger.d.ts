declare class Burger {
  constructor(burgerElem: string, options: BurgerOptions);

  options: BurgerOptions;
  header: HTMLElement;
  headerContainer: HTMLElement;
  nav: HTMLElement | null;
  navList: HTMLElement | null;
  navItems: NodeListOf<HTMLElement> | null;
  navSubItems: NodeListOf<HTMLElement> | null;
  burger: HTMLElement | null;
  mediaQuery: MediaQueryList;
  elemsClassNameActive: {
      nav: string;
      burger: string;
  };

  documentEventKey(event: KeyboardEvent): void;
  handleMediaChange(event: MediaQueryListEvent): void;
  headerClick(event: Event): void;
  drop(event: Event): void;
  dropdowns: NodeListOf<HTMLElement>;

  disableScroll(): void;
  enableScroll(): void;
  calcBurgerSize(open: boolean): void;
  navToggle(open: boolean): void;
  navShow(): void;
  navHide(): void;
  getOffsetSize(open: boolean): void;
  setWhichSide(open: boolean): void;
  setPosition(): void;
  getFixed(): void;
  enableFixed(): void;
  disableFixed(): void;
  mobileVersion(): void;
  desctopVersion(): void;
  initMedia(): void;
  handleMediaChange(event: MediaQueryListEvent): void;
  documentEventKey(event: KeyboardEvent): void;
  getOverlay(open: boolean): void;
  dropdownHandle(event: Event): void;
  headerHandle(event: Event): void;
}

interface BurgerOptions {
  marker?: boolean;
  dropdown?: {
      click?: boolean;
      hover?: boolean;
  };
  fixed?: {
      defaultValue?: boolean;
      scrolling?: number;
  };
  breakpoint?: number;
  offsetSize?: {
      maxHeight?: string;
      maxWidth?: string;
  };
  whichSide?: {
      top?: boolean;
      bottom?: boolean;
      left?: boolean;
      right?: boolean;
  };
  position?: {
      top?: boolean;
      bottom?: boolean;
      left?: boolean;
      right?: boolean;
  };
  speed?: number;
  overlay?: boolean;
}
