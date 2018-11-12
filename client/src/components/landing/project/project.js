import React from "react";
import {
  Typography,
  CardActionArea,
  CardContent,
  Card,
  CardMedia,
  CardActions,
  Button,
  Grid
} from "@material-ui/core";
import "./project.css";

const cardInfo = [
  {
    title: "check out our bars",
    header: "Bars",
    info:
      "Check out our bar page! Here you will be able to see all of our bars in the database. From here you can pick a bar and get bar graphs visualizing their statistics!",
    url: "bars",
    image: require("../../../images/bar.jpg")
  },
  {
    title: "check out our bartenders",
    header: "Bartenders",
    info:
      "Check out our bartenders page! Here you will be able to see all of our bartenders in the database. Pick a bartender and a bar at witch they work and you will get some bar graphs with statistics. Or you can get some general bartender analysis.",
    url: "bartenders",
    image: require("../../../images/bartender.jpg")
  },
  {
    title: "check out our brands",
    header: "Brands",
    info:
      "Check out our brands page! Here you will be able to see all of the brands whose products we stock in inventory across our bars. Check out an individal manufacturer and you will get graphs with statistics!",
    url: "brands",
    image: require("../../../images/brand.jpg")
  },
  {
    title: "check out our beers",
    header: "Beers",
    info:
      "Check out our beer page! With all of the beers we stock across our bars, you will be able to pick one and check out statistics about the beer. Head on over to find out.",
    url: "beers",
    image: require("../../../images/beers.jpg")
  },
  {
    title: "check out our drinkers",
    header: "Drinkers",
    info:
      "Check out our drinkers page! Here you will find thousands of drinkers who visit the bars in our database. These drinkers all live in various states across the US and consume a ton of beer! Head to the drinkers page for stats!",
    url: "bars",
    image: require("../../../images/bar.jpg")
  },
  {
    title: "lets write queries",
    header: "Queries",
    info:
      "Using the text box on the queries page, you can type in an SQL query and have it evaluated on our database. All of the results will be returned in structured JSON. If the query is invalid we will let you know.",
    url: "randomQuerys",
    image: require("../../../images/random.jpg")
  }
];

const Project = props => {
  return (
    <div id="project-container">
      <Typography id="project-title" variant="h4">
        Explore Our Content
      </Typography>
      <Grid container>
        {cardInfo.map(item => (
          <Grid item xs={12} sm={6} md={4} style={{ padding: "20px" }}>
            <Card onClick={() => props.history.push(`/${item.url}`)}>
              <CardActionArea>
                <CardMedia
                  image={item.image}
                  title={item.title}
                  style={{ height: "140px" }}
                />
                <CardContent style={{ height: "160px" }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.header}
                  </Typography>
                  <Typography component="p">{item.info}</Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => props.history.push(`/${item.url}`)}
                  style={{ color: "white", backgroundColor: "#303030" }}
                >
                  Explore
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Project;
