import { useStaticQuery, graphql } from "gatsby"

type NodeType = {
    title: string
    virtuals: {
      previewImage: {
        imageId: string
      }
      readingTime: string
      tags: {
        name: string
      }
    }
    uniqueSlug: string
}

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
  
  return allMediumPost.edges.map((nodes: { node: NodeType }) => {return nodes.node})
}