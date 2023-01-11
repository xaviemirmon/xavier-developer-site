/** @jsx jsx */

import { jsx, get } from "theme-ui"
import * as React from "react"
import { Global } from "@emotion/react"
import Wrapper from "@lekoarts/gatsby-theme-jodie/src/components/layout-wrapper"
import Sidebar from "@lekoarts/gatsby-theme-jodie/src/components/sidebar"
import Footer from "@lekoarts/gatsby-theme-jodie/src/components/footer"
import Seo from "@lekoarts/gatsby-theme-jodie/src/components/seo"
import { SkipNavTarget, SkipNavTrigger } from "@lekoarts/gatsby-theme-jodie/src/components/skip-nav"
import { Script } from "gatsby";

type LayoutProps = { children: React.ReactNode; color?: string }



const Layout = ({ children, color = `white` }: LayoutProps) => {
    const [loaded, setLoaded] = React.useState(false)
    return (
        <React.Fragment>
            <Global
                styles={(t) => ({
                    "*,*:after,*:before": {
                        boxSizing: `border-box`,
                    },
                    html: {
                        fontSize: `18px`,
                        WebkitTextSizeAdjust: `100%`,
                        "@font-face": {
                            fontFamily: "Work Sans-fallback",
                            sizeAdjust: '111.69%',
                            ascentAverride: '80%',
                            src: 'local("Arial")'
                        }
                        
                    },
                    img: {
                        borderStyle: `none`,
                    },
                    pre: {
                        fontFamily: `monospace`,
                        fontSize: `1em`,
                    },
                    "[hidden]": {
                        display: `none`,
                    },
                    "::selection": {
                        background: get(t, `colors.primary`),
                        color: get(t, `colors.white`),
                    },
                    "ul > li > code, ol > li > code, p > code": {
                        color: `#393A34`,
                        background: `#f6f8fa`,
                        padding: 2,
                    },
                    "@media(max-width: 600px)": {
                        html: {
                            fontSize: `16px`,
                        },
                    },
                })}
            />
            <Seo />
            <SkipNavTrigger />
            <Wrapper>
                <Sidebar bg={color} />
                <main sx={{ gridColumnStart: [1, 1, 1, 2] }}>
                    <SkipNavTarget />
                    {children}
                </main>
                <Footer bg={color} />
            </Wrapper>
        </React.Fragment>
    )
}

export default Layout
