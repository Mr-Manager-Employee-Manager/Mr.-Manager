import React from 'react';
import Card from 'react-bootstrap/Card';
import classes from './About.module.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';

const About = () => {
    const name = ["Arsh Kashyap", "Sarthak Gaba", "Akshit Jain"];
    const image = ['Arsh.jpg', "Sarthak.jpg", "Akshit.jpg"];
    const github_link = ["https://github.com/Arsh-Kashyap", "https://github.com/Sarthak-Gaba", "https://github.com/akshit2382"]
    const linkedIn_link = ["https://www.linkedin.com/in/arsh-kashyap/", "https://www.linkedin.com/in/sarthak-gaba/", "https://www.linkedin.com/in/akshit-jain-0aa2721ba//"]
    const about =
        name.map((ele, i) => (
            <Col key={i} lg={4} sm={12}>
                <div className={classes.buzzoutonhover} style={{width:"90%"}}>
                    <Card style={{ margin: "20px 5px" }} >
                        <Card.Img style={{ margin: "auto", width: "100%", height: "50%" }} variant="top" src={image[i]} />
                        <Card.Body>
                            <Card.Title>{name[i]}</Card.Title>
                            <Card.Text>
                                Connect with me on
                </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <a href={github_link[i]}><img src="https://github.githubassets.com/favicons/favicon.png" style={{ marginTop: "8px" }} alt="git-hub icon" /></a>
                            <a href={linkedIn_link[i]} ><img style={{ float: "right" }} src="https://img.icons8.com/fluent/50/000000/linkedin.png" alt="linked-in icon" /></a>
                        </Card.Footer>
                    </Card>

                </div>
            </Col>
        ))

    return (
        <Container>
            <Row>
            {about}
            </Row>
        </Container>

    );
}

export default About;