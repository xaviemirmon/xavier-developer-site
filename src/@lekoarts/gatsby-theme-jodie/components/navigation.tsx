/** @jsx jsx */
import { jsx, Link as TLink } from "theme-ui"
import * as React from "react"
import { Link } from "gatsby"
import { readableColor } from "polished"
import { replaceSlashes } from "@lekoarts/gatsby-theme-jodie/src/utils/replace-slashes"
import useJodieConfig from "@lekoarts/gatsby-theme-jodie/src/hooks/use-jodie-config"
import AniLink from "gatsby-plugin-transition-link/AniLink"

const Navigation = ({ bg }: { bg: string }) => {
  const { navigation, basePath } = useJodieConfig()

  return (
    <nav
      aria-label="Primary Navigation"
      sx={{
        a: {
          color: readableColor(bg),
          textDecoration: `none`,
          fontSize: [1, 2, 2, 3],
          marginLeft: [2, 3, 3, 0],
          "&:hover,&:focus": {
            color: readableColor(bg, `primary`, `primaryLight`, false),
          },
        },
        ul: {
          margin: 0,
          padding: 0,
          li: {
            listStyle: `none`,
            display: [`inline-block`, `inline-block`, `inline-block`, `block`],
          },
        },
        variant: `navigation`,
      }}
    >
      <ul>
        {navigation.map((navItem) => (
          <li key={navItem.slug}>
            {console.log(/^\/(?!\/)/.test(navItem.slug))}
            {/^\/(?!\/)/.test(navItem.slug) ? 
              <AniLink to={replaceSlashes(`/${basePath}/${navItem.slug}`)} paintDrip color={'white'}>
                {navItem.name}
              </AniLink> :
              <a href={navItem.slug} target="_blank" rel="noopener noreferrer">{navItem.name} &#8599;</a>
            }
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation
