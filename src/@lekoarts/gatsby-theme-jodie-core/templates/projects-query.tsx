import { graphql } from "gatsby"
import ProjectsComponent from "@lekoarts/gatsby-theme-jodie-core/src/components/projects"

export default ProjectsComponent

export const query = graphql`
  query {
    projects: allProject(sort: { fields: date, order: DESC }) {
      nodes {
        shortTitle
        slug
        color
        cover {
          childImageSharp {
            gatsbyImageData(width: 1200, quality: 90)
          }
        }
      }
    }
  }
`
