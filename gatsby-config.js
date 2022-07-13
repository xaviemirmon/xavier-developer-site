require(`dotenv`).config()

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE

module.exports = {
  siteMetadata: {
    // You can overwrite values here that are used for the SEO component
    // You can also add new values here to query them like usual
    // See all options: https://github.com/LekoArts/gatsby-themes/blob/main/themes/gatsby-theme-jodie/gatsby-config.js
    siteTitle: `Xavier Mirabelli-Montan`,
    siteTitleAlt: `Xavier Mirabelli-Montan - Lead Fullstack Product Engineer`,
    siteHeadline: `Xavier Mirabelli-Montan is a Lead Fullstack Product Engineer`,
    siteUrl: `https://xavie.mirmon.co.uk`,
    siteDescription: `Xavier Mirabelli-Montan is a Lead Fullstack Product Engineer based in Brighton, UK`,
    siteLanguage: `en`,
    siteImage: `/Xavie-profile.png`,
    author: `@xaviemirmon`,
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-jodie`,
      // See the theme's README for all available options
      options: {
        navigation: [
          { name: `About`, slug: `/about` },
          { name: `Projects`, slug: `/projects` },
          { name: `CV`, slug: `/cv` },
          { name: `Blog`, slug: `https://blog.xavie.mirmon.co.uk/` },
          { name: `Twitter`, slug: `https://twitter.com/xaviemirmon` },
          { name: `LinkedIn`, slug: `https://www.linkedin.com/in/xavier-mirabelli-montan-5633203b` }
        ],
      },
    },
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [`https://fonts.gstatic.com`],
        interval: 300,
        timeout: 30000,
        // If you plan on changing the font you'll also need to adjust the Theme UI config to edit the CSS
        // See: https://github.com/LekoArts/gatsby-themes/tree/main/examples/jodie#changing-your-fonts
        web: [
          {
            name: `Work Sans`,
            file: `https://fonts.googleapis.com/css2?family=Work+Sans:wght@400..700&display=swap`,
          },
        ],
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Xavier Mirabelli-Montan Developer`,
        short_name: `xaviemirmon`,
        description: `Xavier Mirabelli-Montan is a Lead Fullstack Product Engineer based in Brighton, UK`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#b75e09`,
        display: `standalone`,
        icons: [
          {
            src: `/Xavie-profile.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/Xavie-profile.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    `gatsby-plugin-transition-link`,
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `_bundle.html`,
        openAnalyzer: false,
      },
    },
  ].filter(Boolean),
}
