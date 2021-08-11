
import Coordinates from './components/coordinates/index';

export default (strapi) => {

  const plugin = {
    title: 'Coordinates',
    blockerComponent: null,
    blockerComponentProps: {},
    description: 'Coordinates description',
    icon: 'plug',
    id: 'coordinates',
    initializer: () => null,
    injectedComponents: [],
    isReady: true,
    leftMenuLinks: [],
    leftMenuSections: [],
    mainComponent: null,
    name: 'Coordinates',
    preventComponentRendering: false,
    trads: {},
    autoComplete: 'off'
  };

  strapi.registerField({ type: 'coordinates', Component: Coordinates });

  return strapi.registerPlugin(plugin);
};
