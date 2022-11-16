import { useStaticQuery, graphql } from "gatsby"

export const useMediumPostTeaserQuery = () => {
  const { allMediumPost } = useStaticQuery(
    graphql`
    query MediumPostTeaserQuery {
        allMediumPost(limit: 6, sort: {updatedAt: DESC}) {
          edges {
            node {
              title
              virtuals {
                previewImage {
                  imageId
                }
                readingTime
                tags {
                  name
                }
              }
              uniqueSlug
            }
          }
        }
      }
    `
  )
  return allMediumPost.edges.map(nodes => {return nodes.node})
}