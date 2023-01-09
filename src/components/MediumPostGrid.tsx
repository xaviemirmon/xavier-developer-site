/** @jsx jsx */
import { useMediumPostTeaserQuery } from "./hooks/useMediumPostTeaserQuery"
import { Grid, Card, Text, Image, jsx, Badge, Box, Button, Link } from "theme-ui"

export default function MediumPostGrid() {
  const posts = useMediumPostTeaserQuery()
  
  return (
    <Box m={"0 auto"} sx={{textAlign: "center"}} pb={4}>
      <Grid gap={4} columns={[1, null, 3]} sx={{ overflow: "visible" }} py={4}>
        {posts.map((data) => {
          return (
            <a href={`https://medium.com/xaviemirmon/${data.uniqueSlug}`} target="_blank" rel="noreferrer" key={data.title} sx={{
              color: "text", textDecoration: "none",
              position: "relative",
              transition: "0.5s", ":hover": {
                "> .card-with-overlay": {
                  opacity: ".25",
                  transition: "0.5s"
                },
                "> #overlay": {
                  display: "block",
                  transition: "0.5s"
                }
              }, "> #overlay": {
                display: "none",
                transition: ".5s",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center"
              }
            }}>
              <Card className="card-with-overlay" key={data.title}>
                <Image src={`https://miro.medium.com/fit/c/500/333/${data.virtuals.previewImage.imageId}`} width="500" height="333"  loading="lazy" alt={`${data.title} promo image`} />
                <Text as="p" pt={2}>{data.title}</Text>
                <Text as="p" pb={3} sx={{color: "textMutedLight", fontSize: '.8rem'}}>{Math.round(data.virtuals.readingTime)} min read</Text>
                {data.virtuals?.tags.map((tag) => {return ( <Badge mr={2} mb={2}>{tag.name}</Badge>)})}
              </Card>
              <Box id="overlay">
                <Button>View post</Button>
              </Box>
            </a>
          )
        })}
      </Grid>
      <Link href={"https://blog.xavie.mirmon.co.uk"} variant="outline" target="_blank" rel="noreferrer">View all posts</Link>
    </Box>

  )
}