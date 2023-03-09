import { prefixPluginTranslations } from '@strapi/helper-plugin'
import pluginId from './pluginId'
import CoordinatesIcon from './components/coordinates/CoordinatesIcon'
import getTrad from './utils/getTrad'

export default {
  register(app) {

    app.customFields.register({
      name: 'coordinates',
      pluginId: pluginId,
      type: 'json',
      icon: CoordinatesIcon,
      intlLabel: {
        id: getTrad('coordinates.label'),
        defaultMessage: 'Coordinates',
      },
      intlDescription: {
        id: getTrad('coordinates.description'),
        defaultMessage: 'Inser coordinates',
      },
      components: {
        Input: async () => import('./components/coordinates/Coordinates'),
      },
      options: {
        base: [],
        advanced: []
      },
    })

  },

  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return Promise.all([import(`./translations/${locale}.json`)])
          .then(([pluginTranslations]) => {
            return {
              data: {
                ...prefixPluginTranslations(
                  pluginTranslations.default,
                  pluginId,
                ),
              },
              locale,
            }
          })
          .catch(() => {
            return {
              data: {},
              locale,
            }
          })
      }),
    )
    return Promise.resolve(importedTrads)
  },
}
