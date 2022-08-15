exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    actions.setWebpackConfig({
      resolve: {
        fallback: {
          "path": require.resolve("path-browserify"),
        },
      },
    })
}
